import { InlineKeyboard, InputFile } from "grammy";
import { readFileSync } from "fs";
import path from "path";
import { getCachedFileId, setCachedFileId } from "../utils/photoCache.js";

const data = JSON.parse(
  readFileSync(new URL("../data.json", import.meta.url))
);
const bodyStressTechList = data.bodyStressTech;

export const bodyStressList = async (ctx) => {
  await ctx.answerCallbackQuery();

  const keyboard = new InlineKeyboard();
  bodyStressTechList.forEach((tech) =>
    keyboard.text(tech.title, `bodyStressTech_${tech.id}`).row()
  );
  keyboard.text("Назад", "menu");

  if (ctx.callbackQuery?.message?.photo) {
    try { await ctx.deleteMessage(); } catch { }
    await ctx.reply("Выберите технику:", { reply_markup: keyboard });
  } else {
    await ctx.editMessageText("Выберите технику:", { reply_markup: keyboard });
  }
};

export const bodyStressTech = async (ctx) => {
  await ctx.answerCallbackQuery();

  const techId = Number(ctx.match[1]);
  const tech = bodyStressTechList.find((t) => t.id === techId);
  if (!tech) return;

  const filePath = path.join(process.cwd(), tech.image);
  const keyboard = new InlineKeyboard()
    .text("Назад", "bodyStressList").row()
    .text("В меню", "menu");

  const cachedId = getCachedFileId(filePath);

  try {
    await ctx.editMessageMedia(
      { type: "photo", media: cachedId ?? new InputFile(filePath) },
      { reply_markup: keyboard }
    );

    if (!cachedId) {
      const fileId = ctx.callbackQuery.message?.photo?.at(-1)?.file_id;
      if (fileId) setCachedFileId(filePath, fileId);
    }
  } catch (err) {
    console.error("[bodyStressTech] editMessageMedia error:", err.message);
    try { await ctx.deleteMessage(); } catch { }
    const sent = await ctx.replyWithPhoto(
      cachedId ?? new InputFile(filePath),
      { reply_markup: keyboard }
    );
    const fileId = sent.photo?.at(-1)?.file_id;
    if (fileId) setCachedFileId(filePath, fileId);
  }
};
