import { InputFile } from "grammy";

/** Рендер одного UI-сообщения */
export async function renderUI(ctx, text, extra = {}) {
  try {
    if (ctx.session.uiMessageId) {
      await ctx.editMessageText(text, extra);
    } else {
      const msg = await ctx.reply(text, extra);
      ctx.session.uiMessageId = msg.message_id;
    }
  } catch {
    const msg = await ctx.reply(text, extra);
    ctx.session.uiMessageId = msg.message_id;
  }
}

/** Проигрывание аудио с удалением старого UI */
export async function playAudio(ctx, path) {
  // удаляем UI
  if (ctx.session.uiMessageId) {
    try {
      await ctx.api.deleteMessage(ctx.chat.id, ctx.session.uiMessageId);
      ctx.session.uiMessageId = null;
    } catch { }
  }

  // удаляем старое аудио
  if (ctx.session.audioMessageId) {
    try {
      await ctx.api.deleteMessage(ctx.chat.id, ctx.session.audioMessageId);
    } catch { }
  }

  const audio = await ctx.replyWithAudio(new InputFile(path));
  ctx.session.audioMessageId = audio.message_id;
}

/** Очистка аудио при возврате в меню */
export async function clearAudio(ctx) {
  if (ctx.session.audioMessageId) {
    try {
      await ctx.api.deleteMessage(ctx.chat.id, ctx.session.audioMessageId);
      ctx.session.audioMessageId = null;
    } catch { }
  }
}
