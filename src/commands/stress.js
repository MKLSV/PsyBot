import { InlineKeyboard } from "grammy";

export const stress = async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    'Я рядом. \nДавай попробуем быстро снизить уровень стресса — выбери, что тебе подходит сейчас.',
    {
      reply_markup: new InlineKeyboard()
        .text('🔄 Случайная техника', 'stressRandom').row()
        .text('📚 Список техник', 'stressList').row()
        .text('🔥 Экстренная кнопка «Сделай 3 вдоха со мной»', 'stressEmergency').row()
        .text('🎧 Аудио-расслабление', 'stressAudio').row()
        .text('🔙 Назад', 'menu').row()
    },
  );
};