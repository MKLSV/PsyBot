

import { InlineKeyboard } from "grammy";

export const start = async (ctx) => {

  try {
    const keyboard = new InlineKeyboard().text('Меню', 'menu');
    if (ctx.session.uiMessageId) {
      await ctx.editMessageText('Привет! \nЯ помогу тебе справиться со стрессом, тревогой, паническими атаками и подготовкой к экзаменам.', { reply_markup: keyboard, });
    } else {
      const msg = await ctx.reply('Привет! \nЯ помогу тебе справиться со стрессом, тревогой, паническими атаками и подготовкой к экзаменам.', { reply_markup: keyboard, });
      ctx.session.uiMessageId = msg.message_id;
    }
  } catch {
    const msg = await ctx.reply('Привет! \nЯ помогу тебе справиться со стрессом, тревогой, паническими атаками и подготовкой к экзаменам.', { reply_markup: keyboard, });
    ctx.session.uiMessageId = msg.message_id;
  }

};


