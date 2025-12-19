import { InlineKeyboard } from "grammy";
import { readFileSync } from "fs";
import { renderUI, playAudio, clearAudio } from "../ui/uiManager.js";

const data = JSON.parse(
  readFileSync(new URL("../data.json", import.meta.url))
);
const insomniaTech = data.insomniaTech;

export const insomniaCallbacks = {

  insomniaAudio: async (ctx) => {
    await ctx.answerCallbackQuery();

    await playAudio(ctx, "src/media/chill.mp3");

    await renderUI(
      ctx,
      "🎧 Аудио для сна запущено.\nВыбери действие:",
      {
        reply_markup: new InlineKeyboard()
          .text('🔙 Назад', 'insomnia').row()
          .text('🏠 В меню', 'menu')
      }
    );
  },

  insomniaRest: async (ctx) => {
    await ctx.answerCallbackQuery();

    await playAudio(ctx, "src/media/chill.mp3");

    await renderUI(
      ctx,
      "🧘 Мышечная релаксация.\nВыбери действие:",
      {
        reply_markup: new InlineKeyboard()
          .text('🔙 Назад', 'insomnia').row()
          .text('🏠 В меню', 'menu')
      }
    );
  },

  insomniaSleep: async (ctx) => {
    await ctx.answerCallbackQuery();

    await playAudio(ctx, "src/media/chill.mp3");

    await renderUI(
      ctx,
      "🌬 Дыхание для сна.\nВыбери действие:",
      {
        reply_markup: new InlineKeyboard()
          .text('🔙 Назад', 'insomnia').row()
          .text('🏠 В меню', 'menu')
      }
    );
  },

  insomniaVisual: async (ctx) => {
    await ctx.answerCallbackQuery();

    await playAudio(ctx, "src/media/chill.mp3");

    await renderUI(
      ctx,
      "📺 Визуальная медитация.\nВыбери действие:",
      {
        reply_markup: new InlineKeyboard()
          .text('🔙 Назад', 'insomnia').row()
          .text('🏠 В меню', 'menu')
      }
    );
  },

  insomniaList: async (ctx) => {
    await ctx.answerCallbackQuery();
    await clearAudio(ctx);

    const keyboard = new InlineKeyboard();
    insomniaTech.forEach(t =>
      keyboard.text(t.title, `tech_${t.id}`).row()
    );
    keyboard.text('🔙 Назад', 'insomnia');

    await renderUI(ctx, 'Выберите технику:', { reply_markup: keyboard });
  },

  tech: async (ctx) => {
    await ctx.answerCallbackQuery();
    await clearAudio(ctx);

    const techId = Number(ctx.match[1]);
    const tech = insomniaTech.find(t => t.id === techId);
    if (!tech) return;

    await renderUI(
      ctx,
      `${tech.title}:\n\n${tech.content}`,
      {
        reply_markup: new InlineKeyboard()
          .text('🔄 Вернуться к списку', 'insomniaList').row()
          .text('🔙 Назад', 'insomnia').row()
          .text('🏠 В меню', 'menu')
      }
    );
  },
};
