import { renderUI, clearAudio } from "../ui/uiManager.js";
import { InlineKeyboard } from "grammy";

export const panic = async (ctx) => {
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
    'Ты в безопасности. \nДавай сделаем технику, которая поможет вернуть контроль над дыханием и состоянием.',
    {
      reply_markup: new InlineKeyboard()
        .text('💨 Восстановить дыхание', 'panicBreath').row()
        .text('👀 Заземление', 'panicGrounding').row()
        .text('🎧 Успокаивающий голос', 'panicChillVoice').row()
        .text('❗ Мне хуже (показывает горячую линию)', 'panicAlarm').row()
        .text('🔙 Назад', 'menu').row()
    },
  );
};