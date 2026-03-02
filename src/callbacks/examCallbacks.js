import { InlineKeyboard, InputFile } from "grammy";
import { readFileSync } from "fs";
import path from "path";
import { getCachedFileId, setCachedFileId } from "../utils/photoCache.js";

const data = JSON.parse(
  readFileSync(new URL("../data.json", import.meta.url))
);
const examTechList = data.examTech;

export const examList = async (ctx) => {
  await ctx.answerCallbackQuery();

  const keyboard = new InlineKeyboard();
  examTechList.forEach((tech) => keyboard.text(tech.title, `examTech_${tech.id}`).row());
  keyboard.text("Назад", "menu");

  if (ctx.callbackQuery?.message?.photo) {
    try { await ctx.deleteMessage(); } catch { }
    await ctx.reply("Выберите свое состояние:", { reply_markup: keyboard });
  } else {
    await ctx.editMessageText("Выберите свое состояние:", { reply_markup: keyboard });
  }
};

export const examTech = async (ctx) => {
  await ctx.answerCallbackQuery();

  const techId = Number(ctx.match[1]);
  const tech = examTechList.find((t) => t.id === techId);
  if (!tech) return;

  const filePath = path.join(process.cwd(), tech.image);
  const keyboard = new InlineKeyboard()
    .text("Назад", "examList").row()
    .text("В меню", "menu");

  const cachedId = getCachedFileId(filePath);

  try {
    await ctx.editMessageMedia(
      {
        type: "photo",
        // Если file_id уже есть — Telegram не будет повторно скачивать файл
        media: cachedId ?? new InputFile(filePath),
      },
      { reply_markup: keyboard }
    );

    // Если это была первая загрузка — сохраняем file_id для следующих запросов
    if (!cachedId) {
      const msg = ctx.callbackQuery.message;
      const fileId = msg?.photo?.at(-1)?.file_id;
      if (fileId) setCachedFileId(filePath, fileId);
    }
  } catch (err) {
    console.error("[examTech] editMessageMedia error:", err.message);
    try { await ctx.deleteMessage(); } catch { }
    const sent = await ctx.replyWithPhoto(
      cachedId ?? new InputFile(filePath),
      { reply_markup: keyboard }
    );
    const fileId = sent.photo?.at(-1)?.file_id;
    if (fileId) setCachedFileId(filePath, fileId);
  }
};
