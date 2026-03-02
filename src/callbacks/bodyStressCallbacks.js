import { InlineKeyboard, InputFile } from "grammy";
import { readFileSync } from "fs";
import path from "path";


const data = JSON.parse(
  readFileSync(new URL("../data.json", import.meta.url))
);
const bodyStressTechList = data.emotionsTech;

export const bodyStressList = async (ctx) => {
  await ctx.answerCallbackQuery();

  const keyboard = new InlineKeyboard();
  bodyStressTechList.forEach((tech) => keyboard.text(tech.title, `bodyStressTech_${tech.id}`).row());
  keyboard.text('Назад', 'menu');

  if (ctx.callbackQuery?.message?.photo) {
    try { await ctx.deleteMessage(); } catch { }
    await ctx.reply('Выберите свое состояние:', { reply_markup: keyboard });
  } else {
    await ctx.editMessageText('Выберите свое состояние:', { reply_markup: keyboard });
  }
}



export const bodyStressTech = async (ctx) => {
  await ctx.answerCallbackQuery();

  const techId = Number(ctx.match[1]);
  const tech = bodyStressTechList.find((t) => t.id === techId);
  if (!tech) return;

  // Абсолютный путь, чтобы не было ENOENT
  const filePath = path.join(process.cwd(), tech.image);

  // Заменяем текущее сообщение на фото (без текста)
  await ctx.editMessageMedia(
    {
      type: "photo",
      media: new InputFile(filePath),
    },
    {
      reply_markup: new InlineKeyboard()
        .text('Назад', 'bodyStressList').row()
        .text('В меню', 'menu')
    }
  );
};
