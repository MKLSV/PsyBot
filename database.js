import Database from "better-sqlite3";

const db = new Database("users.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    telegram_id   INTEGER PRIMARY KEY,
    username      TEXT,
    first_name    TEXT,
    joined_at     TEXT,
    last_visit    TEXT
  )
`);

export function upsertUser(telegramId, username, firstName) {
  const now = new Date().toISOString();

  const existing = db
    .prepare("SELECT telegram_id FROM users WHERE telegram_id = ?")
    .get(telegramId);

  if (existing) {
    db.prepare(
      "UPDATE users SET last_visit = ?, username = ?, first_name = ? WHERE telegram_id = ?"
    ).run(now, username ?? "", firstName ?? "", telegramId);
    return false;
  }

  db.prepare(
    `INSERT INTO users (telegram_id, username, first_name, joined_at, last_visit)
     VALUES (?, ?, ?, ?, ?)`
  ).run(telegramId, username ?? "", firstName ?? "", now, now);

  return true;
}

export function getUserCount() {
  // getAllUsers();
  return db.prepare("SELECT COUNT(*) as count FROM users").get().count;
}

export function getAllUsers() {
  const users = db.prepare("SELECT telegram_id, username, first_name, joined_at FROM users ORDER BY joined_at DESC").all();
  console.log(users)
}

export function getActiveUsersCount() {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  return db
    .prepare("SELECT COUNT(*) as count FROM users WHERE last_visit >= ?")
    .get(oneMonthAgo.toISOString()).count;
}