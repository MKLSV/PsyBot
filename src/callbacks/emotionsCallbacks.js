import { InlineKeyboard, InputFile } from "grammy";
import { readFileSync } from "fs";
import path from "path";

const data = JSON.parse(
    readFileSync(new URL("../data.json", import.meta.url))
);
const emotionsTechList = data.emotionsTech;

export const emotionsList = async (ctx) => {

    await ctx.answerCallbackQuery();

    const keyboard = new InlineKeyboard();
    emotionsTechList.forEach((tech) => keyboard.text(tech.title, `emotionsTech_${tech.id}`).row());
    keyboard.text('Назад', 'menu');

    if (ctx.callbackQuery?.message?.photo) {
        try { await ctx.deleteMessage(); } catch { }
        await ctx.reply('Выберите свое состояние:', { reply_markup: keyboard });
    } else {
        await ctx.editMessageText('Выберите свое состояние:', { reply_markup: keyboard });
    }
}



export const emotionsTech = async (ctx) => {
    await ctx.answerCallbackQuery();

    const techId = Number(ctx.match[1]);
    const tech = emotionsTechList.find((t) => t.id === techId);
    if (!tech) return;

    // Абсолютный путь, чтобы не было ENOENT
    const filePath = path.join(process.cwd(), tech.image);

    await ctx.editMessageMedia(
        {
            type: "photo",
            media: new InputFile(filePath),
        },
        {
            reply_markup: new InlineKeyboard()
                .text('Назад', 'emotionsList').row()
                .text('В меню', 'menu')
        }
    );
}