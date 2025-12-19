import { InlineKeyboard } from "grammy";

export const start = async (ctx) => {

  try {
    const keyboard = new InlineKeyboard().text('Меню', 'menu');

    return ctx.reply('Привет! \nЯ помогу тебе справиться со стрессом, тревогой, паническими атаками и подготовкой к экзаменам.', {
      reply_markup: keyboard,
    });
  } catch (error) {
    ctx.reply('Произошла ошибка, попробуйте позже');
  }
}