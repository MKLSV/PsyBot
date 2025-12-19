import { InlineKeyboard } from "grammy";
import { renderUI, clearAudio } from "../ui/uiManager.js";

export const examAnxiety = async (ctx) => {
  await ctx.answerCallbackQuery();
 // удаляем предыдущее меню
  await clearAudio(ctx);
  if (ctx.session.uiMessageId) {
    try {
      await ctx.api.deleteMessage(ctx.chat.id, ctx.session.uiMessageId);
      ctx.session.uiMessageId = null;
    } catch { }
  }

  await renderUI(
    ctx,
    'Похоже, экзамены вызывают у тебя напряжение. \nДавай подберём технику, которая поможет успокоиться и сфокусироваться.',
    {
      reply_markup: new InlineKeyboard()
        .text('🔄 Показать случайную технику', 'examRandom').row()
        .text('📚 Посмотреть список техник', 'examList').row()
        .text('📝 Мини-тест (подбор индивидуальной техники)', 'examTest').row()
        .text('🔙 Назад', 'menu').row()
    },
  );
};
