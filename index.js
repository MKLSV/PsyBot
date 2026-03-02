import "dotenv/config";
import { Bot, GrammyError, HttpError, InlineKeyboard } from "grammy";
import { start } from "./src/commands/start.js";
import { admin } from "./src/commands/admin.js";
import { examList, examTech } from "./src/callbacks/examCallbacks.js";
import { emotionsList, emotionsTech } from "./src/callbacks/emotionsCallbacks.js";
import { thinkingList, thinkingTech } from "./src/callbacks/thinkingCallbacks.js";
import { bodyStressList, bodyStressTech } from "./src/callbacks/bodyStressCallbacks.js";

const BOT_API_KEY = process.env.BOT_API_KEY;

if (!BOT_API_KEY) {
  throw new Error("BOT_API_KEY is not defined in .env");
}

const bot = new Bot(BOT_API_KEY);

// ─── Команды ────────────────────────────────────────────────────────────────

bot.command("start", start);
bot.command("admin", admin);

// ─── Главное меню ────────────────────────────────────────────────────────────

bot.callbackQuery("menu", async (ctx) => {
  await ctx.answerCallbackQuery();

  const keyboard = new InlineKeyboard()
    .text("Перед экзаменом и на экзамене", "examList").row()
    .text("Когда не справляюсь с эмоциями", "emotionsList").row()
    .text("Когда негативные мысли лезут в голову", "thinkingList").row()
    .text("Когда напряжение в теле", "bodyStressList").row();

  if (ctx.callbackQuery?.message?.photo) {
    try { await ctx.deleteMessage(); } catch { }
    await ctx.reply("Выбери то, что чувствуешь сейчас:", { reply_markup: keyboard });
  } else {
    await ctx.editMessageText("Выбери то, что чувствуешь сейчас:", { reply_markup: keyboard });
  }
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
// БАГ ИСПРАВЛЕН: было строкой 'bodyStressTech' — ctx.match[1] всегда undefined
bot.callbackQuery(/^bodyStressTech_(.+)$/, bodyStressTech);

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
