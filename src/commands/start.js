import { InlineKeyboard } from "grammy";

export const start = async (ctx) => {
  const keyboard = new InlineKeyboard().text("Меню", "menu");

  try {
    if (ctx.session?.uiMessageId) {
      await ctx.editMessageText(
        "Привет! \nЯ помогу тебе справиться со стрессом, тревогой, паническими атаками и подготовкой к экзаменам.",
        { reply_markup: keyboard }
      );
    } else {
      const msg = await ctx.reply(
        "Привет! \nЯ помогу тебе справиться со стрессом, тревогой, паническими атаками и подготовкой к экзаменам.",
        { reply_markup: keyboard }
      );
      if (ctx.session) ctx.session.uiMessageId = msg.message_id;
    }
  } catch {
    const msg = await ctx.reply(
      "Привет! \nЯ помогу тебе справиться со стрессом, тревогой, паническими атаками и подготовкой к экзаменам.",
      { reply_markup: keyboard }
    );
    if (ctx.session) ctx.session.uiMessageId = msg.message_id;
  }
};
