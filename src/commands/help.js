import { InlineKeyboard } from "grammy";
// import { renderUI, clearAudio } from "../ui/uiManager.js";

export const help = async (ctx) => {
  // await ctx.answerCallbackQuery();
  // // удаляем предыдущее меню
  // await clearAudio(ctx);
  // if (ctx.session.uiMessageId) {
  //   try {
  //     await ctx.api.deleteMessage(ctx.chat.id, ctx.session.uiMessageId);
  //     ctx.session.uiMessageId = null;
  //   } catch { }
  // }

  // await renderUI(
  //   ctx,
  //   'Если нужна поддержка от живого человека, вот проверенные контакты, куда можно обратиться прямо сейчас.',
  //   {
  //     reply_markup: new InlineKeyboard()
  //       .text('📞 Телефон доверия', 'helpPhone').row()
  //       .text('👩‍⚕️ Психологи', 'helpPsy').row()
  //       .text('🏥 Центр «Доверие»', 'helpCenter').row()
  //       .text('🌐 Онлайн-ресурсы', 'helpOnline').row()
  //       .text('🔙 Назад', 'menu').row()
  //   },
  // );
};

