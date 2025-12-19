import { InlineKeyboard } from "grammy";
import { renderUI } from "../ui/uiManager.js";

export const start = async (ctx) => {
  try {
    const keyboard = new InlineKeyboard().text('Меню', 'menu');

    await renderUI(
      ctx,
      'Привет! \nЯ помогу тебе справиться со стрессом, тревогой, паническими атаками и подготовкой к экзаменам.',
      {
        reply_markup: keyboard,
      }
    );
  } catch (error) {
    console.log(error)
    ctx.reply('Произошла ошибка, попробуйте позже');
  }
};
