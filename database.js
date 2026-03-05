import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Создаём таблицу при старте
export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      telegram_id   BIGINT PRIMARY KEY,
      username      TEXT,
      first_name    TEXT,
      joined_at     TEXT,
      last_visit    TEXT
    )
  `);
}

export async function upsertUser(telegramId, username, firstName) {
  const now = new Date().toISOString();

  const { rows } = await pool.query(
    "SELECT telegram_id FROM users WHERE telegram_id = $1",
    [telegramId]
  );

  if (rows.length > 0) {
    await pool.query(
      "UPDATE users SET last_visit = $1, username = $2, first_name = $3 WHERE telegram_id = $4",
      [now, username ?? "", firstName ?? "", telegramId]
    );
    return false;
  }

  await pool.query(
    "INSERT INTO users (telegram_id, username, first_name, joined_at, last_visit) VALUES ($1, $2, $3, $4, $5)",
    [telegramId, username ?? "", firstName ?? "", now, now]
  );
  return true;
}

export async function getUserCount() {
  const { rows } = await pool.query("SELECT COUNT(*) as count FROM users");
  return Number(rows[0].count);
}

export async function getActiveUsersCount() {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const { rows } = await pool.query(
    "SELECT COUNT(*) as count FROM users WHERE last_visit >= $1",
    [oneMonthAgo.toISOString()]
  );
  return Number(rows[0].count);
}

export async function getAllUsers() {
  const { rows } = await pool.query(
    "SELECT telegram_id, username, first_name, joined_at FROM users ORDER BY joined_at DESC"
  );
  return rows;
}