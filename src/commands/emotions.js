// import { InlineKeyboard } from "grammy";
// import { renderUI, clearAudio } from "../ui/uiManager.js";



// export const emotions = async (ctx) => {
//   await ctx.answerCallbackQuery();
//   // удаляем предыдущее меню
//   await clearAudio(ctx);
//   if (ctx.session.uiMessageId) {
//     try {
//       await ctx.api.deleteMessage(ctx.chat.id, ctx.session.uiMessageId);
//       ctx.session.uiMessageId = null;
//     } catch { }
//   }

//   await renderUI(
//     ctx,
//     'Я рядом. \nДавай попробуем быстро снизить уровень стресса — выбери, что тебе подходит сейчас.',
//     {
//       reply_markup: new InlineKeyboard()
//         .text('🔄 Случайная техника', 'emotionsRandom').row()
//         .text('📚 Список техник', 'emotionsList').row()
//         .text('🔥 Экстренная кнопка «Сделай 3 вдоха со мной»', 'emotionsEmergency').row()
//         .text('🎧 Аудио-расслабление', 'emotionsAudio').row()
//         .text('🔙 Назад', 'menu').row()
//     },
//   );
// };