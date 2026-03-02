// import { renderUI, clearAudio } from "../ui/uiManager.js";
// import { InlineKeyboard } from "grammy";

// export const insomnia = async (ctx) => {
//   await ctx.answerCallbackQuery();

//   // удаляем предыдущее меню
//   await clearAudio(ctx);
//   if (ctx.session.uiMessageId) {
//     try {
//       await ctx.api.deleteMessage(ctx.chat.id, ctx.session.uiMessageId);
//       ctx.session.uiMessageId = null;
//     } catch {}
//   }

//   // рендерим новое меню
//   await renderUI(
//     ctx,
//     'Не удаётся уснуть?\nСейчас подберём технику, которая поможет расслабиться и легче заснуть.',
//     {
//       reply_markup: new InlineKeyboard()
//         .text('🎧 Аудио для сна', 'insomniaAudio').row()
//         .text('🧘 Мышечная релаксация', 'insomniaRest').row()
//         .text('🌬 Дыхание для сна', 'insomniaSleep').row()
//         .text('📺 Визуальная медитация', 'insomniaVisual').row()
//         .text('📚 Cписок техник', 'insomniaList').row()
//         .text('🔙 Назад', 'menu')
//     }
//   );
// };
