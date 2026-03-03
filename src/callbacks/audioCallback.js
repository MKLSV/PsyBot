import { InlineKeyboard, InputFile } from "grammy";
import { readFileSync } from "fs";
import path from "path";
// import { getCachedFileId } from "../utils/photoCache";

const data = JSON.parse(
    readFileSync(new URL("../data.json", import.meta.url))
);
const audioTechList = data.audioTech;

export const audioList = async (ctx) => {
    await ctx.answerCallbackQuery();

    const keyboard = new InlineKeyboard();
    audioTechList.forEach((t) =>
        keyboard.text(t.title, `audioTech_${t.id}`).row()
    );
    keyboard.text("Назад", "start");

    const msg = ctx.callbackQuery?.message;

    if (msg?.audio || msg?.voice || msg?.document) {
        try { await ctx.deleteMessage(); } catch { }
        await ctx.reply("Выберите технику:", { reply_markup: keyboard });
    } else {
        await ctx.editMessageText("Выберите технику:", { reply_markup: keyboard });
    }
};

export const audioTech = async (ctx) => {
    await ctx.answerCallbackQuery();

    const techId = Number(ctx.match[1]);
    const tech = audioTechList.find((t) => t.id === techId);
    if (!tech) return;

    const filePath = path.join(process.cwd(), tech.audio);
    const keyboard = new InlineKeyboard()
        .text("Назад", "audioList").row()
        .text("В меню", "start");

    // const cachedId = getCachedFileId(filePath);

    try {
        await ctx.deleteMessage();
    } catch { }

    try {
        await ctx.replyWithAudio(
            new InputFile(filePath),
            {
                caption: "🎧 Для более глубокого погружения используй наушники.",
                reply_markup: keyboard
            }
        );
        // const fileId = sent.audio?.file_id;
        // if (fileId && !cachedId) setCachedFileId(filePath, fileId);
    } catch (err) {
        console.error("[audioTech] replyWithAudio error:", err.message);
    }
};
