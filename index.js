import "dotenv/config";
import { readFileSync } from "fs";
import { Bot, GrammyError, HttpError, InlineKeyboard } from "grammy";
import { start } from "./src/commands/start.js";
import { admin } from "./src/commands/admin.js";
import { examList, examTech } from "./src/callbacks/examCallbacks.js";
import { emotionsList, emotionsTech } from "./src/callbacks/emotionsCallbacks.js";
import { thinkingList, thinkingTech } from "./src/callbacks/thinkingCallbacks.js";
import { bodyStressList, bodyStressTech } from "./src/callbacks/bodyStressCallbacks.js";
import { upsertUser } from "./database.js";
import { audioList, audioTech } from "./src/callbacks/audioCallback.js";
import { initDb } from "./database.js";

const BOT_API_KEY = process.env.BOT_API_KEY;

if (!BOT_API_KEY) {
  throw new Error("BOT_API_KEY is not defined in .env");
}
const bot = new Bot(BOT_API_KEY);

const data = JSON.parse(
  readFileSync(new URL("./src/data.json", import.meta.url))
);

const { psyInfo, hotlines } = data;

await initDb();

// ─── Команды ────────────────────────────────────────────────────────────────

bot.command("start", start);
bot.command("admin", admin);

bot.callbackQuery("start", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.deleteMessage()
  await start(ctx);
});

// ─── Главное меню ────────────────────────────────────────────────────────────

bot.callbackQuery("menu", async (ctx) => {
  await ctx.answerCallbackQuery();

  const { id, username, first_name } = ctx.from;
  await upsertUser(id, username, first_name);

  const keyboard = new InlineKeyboard()
    .text("Перед экзаменом и на экзамене", "examList").row()
    .text("Когда не справляюсь с эмоциями", "emotionsList").row()
    .text("Когда негативные мысли лезут в голову", "thinkingList").row()
    .text("Когда напряжение в теле", "bodyStressList").row()
    .text("Назад", "start").row();

  if (ctx.callbackQuery?.message?.photo) {
    try { await ctx.deleteMessage(); } catch { }
    await ctx.reply("Выбери технику:", { reply_markup: keyboard });
  } else {
    await ctx.editMessageText("Выбери то, что чувствуешь сейчас:", { reply_markup: keyboard });
  }
});

// ─── Психологические службы ────────────────────────────────────────────────────────────

bot.callbackQuery("psyServices", async (ctx) => {
  await ctx.answerCallbackQuery();

  const infoText = [
    "🏥 *Психологические службы:*\n",
    ...psyInfo.map((s) => {
      const addresses = s.addresses.length
        ? s.addresses.map((a) => `📍 ${a}`).join("\n")
        : "📍 Адрес не указан";
      const phones = s.phones.length
        ? s.phones.map((p) => `📞 ${p}`).join("\n")
        : "";

      return `*${s.name}*\n${addresses}${phones ? "\n" + phones : ""}`;
    })
  ].join("\n\n");

  await ctx.editMessageText(infoText, {
    parse_mode: "Markdown",
    reply_markup: new InlineKeyboard().text("⬅️ Назад", "start"),
  });
});

// ─── Горячие линии ────────────────────────────────────────────────────────────

bot.callbackQuery("hotlines", async (ctx) => {
  await ctx.answerCallbackQuery();

  const infoText = [
    "📞 *Горячие линии:*\n",
    ...hotlines.map((h) => `*${h.name}*\n📞 ${h.phone}\n🕐 ${h.type}`),
  ].join("\n\n");

  await ctx.editMessageText(infoText, {
    parse_mode: "Markdown",
    reply_markup: new InlineKeyboard().text("⬅️ Назад", "start"),
  });
});

// ─── Exam ────────────────────────────────────────────────────────────────────

bot.callbackQuery("examList", examList);
bot.callbackQuery(/^examTech_(.+)$/, examTech);

// ─── Emotions ────────────────────────────────────────────────────────────────

bot.callbackQuery("emotionsList", emotionsList);
bot.callbackQuery(/^emotionsTech_(.+)$/, emotionsTech);

// ─── Thinking ────────────────────────────────────────────────────────────────

bot.callbackQuery("thinkingList", thinkingList);
bot.callbackQuery(/^thinkingTech_(.+)$/, thinkingTech);

// ─── Body Stress ─────────────────────────────────────────────────────────────

bot.callbackQuery("bodyStressList", bodyStressList);
bot.callbackQuery(/^bodyStressTech_(.+)$/, bodyStressTech);

// ─── Audio ─────────────────────────────────────────────────────────────

bot.callbackQuery("audioList", audioList);
bot.callbackQuery(/^audioTech_(.+)$/, audioTech);

// ─── Любое сообщение ─────────────────────────────────────────────────────────

bot.on("message", (ctx) => {
  ctx.reply("Выбери свое состояние сейчас:", {
    reply_markup: new InlineKeyboard()
      .text("Перед экзаменом и на экзамене", "examList").row()
      .text("Когда не справляюсь с эмоциями", "emotionsList").row()
      .text("Когда негативные мысли лезут в голову", "thinkingList").row()
      .text("Когда напряжение в теле", "bodyStressList").row(),
  });
});

// ─── Обработка ошибок ────────────────────────────────────────────────────────

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;

  if (e instanceof GrammyError) {
    console.error("GrammyError:", e.description);
  } else if (e instanceof HttpError) {
    console.error("HttpError — could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

// ─── Запуск ──────────────────────────────────────────────────────────────────

bot.start();
console.log("✅ Bot started");
