import { InlineKeyboard } from "grammy";

export const insomnia = async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    'Не удаётся уснуть? \nСейчас подберём технику, которая поможет расслабиться и легче заснуть.',
    {
      reply_markup: new InlineKeyboard()
        .text('🎧 Аудио для сна', 'insomniaAudio').row()
        .text('🧘 Мышечная релаксация', 'insomniaRest').row()
        .text('🌬 Дыхание для сна', 'insomniaSleep').row()
        .text('📺 Визуальная медитация', 'insomniaVisual').row()
        .text('📚 Cписок техник', 'insomniaList').row()
        .text('🔙 Назад', 'menu').row()
    },
  );
};