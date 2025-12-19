import { InlineKeyboard } from "grammy";

export const help = async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    'Если нужна поддержка от живого человека, вот проверенные контакты, куда можно обратиться прямо сейчас.',
    {
      reply_markup: new InlineKeyboard()
        .text('📞 Телефон доверия', 'helpPhone').row()
        .text('👩‍⚕️ Психологи', 'helpPsy').row()
        .text('🏥 Центр «Доверие»', 'helpCenter').row()
        .text('🌐 Онлайн-ресурсы', 'helpOnline').row()
        .text('🔙 Назад', 'menu').row()
    },
  );
};

