import { InlineKeyboard } from "grammy";
import { readFileSync } from "fs";
import { renderUI, clearAudio } from "../ui/uiManager.js";

const data = JSON.parse(
  readFileSync(new URL("../data.json", import.meta.url))
);
const examTech = data.examTech;

export const examCallbacks = {

  examRandom: async (ctx) => {
    await ctx.answerCallbackQuery();
    await clearAudio(ctx);

    let random;
    do {
      random = stressTech[Math.floor(Math.random() * stressTech.length)];
    } while (ctx.session.lastStressTechId === random.id && stressTech.length > 1);

    ctx.session.lastStressTechId = random.id;

    await renderUI(
      ctx,
      random.content,
      {
        reply_markup: new InlineKeyboard()
          .text('🔄 Показать другую технику', 'examRandom').row()
          .text('🔙 В меню тревоги', 'examAnxiety').row()
          .text('🏠 В главное меню', 'menu').row()
      }
    );
  },

  examList: async (ctx) => {
    await ctx.answerCallbackQuery();
    await clearAudio(ctx);

    const keyboard = new InlineKeyboard();
    examTech.forEach((tech) => keyboard.text(tech.title, `tech_${tech.id}`).row());
    keyboard.text('🔙 Назад', 'examAnxiety');

    await renderUI(ctx, 'Выберите технику:', { reply_markup: keyboard });
  },

  examTest: async (ctx) => {
    await ctx.answerCallbackQuery();
    await clearAudio(ctx);

    await renderUI(
      ctx,
      '🚧 В разработке 🚧',
      {
        reply_markup: new InlineKeyboard()
          .text('🔙 В меню тревоги', 'examAnxiety').row()
          .text('🏠 В главное меню', 'menu').row()
      }
    );
  },

  tech: async (ctx) => {
    await ctx.answerCallbackQuery();
    await clearAudio(ctx);

    const techId = Number(ctx.match[1]);
    const tech = examTech.find((t) => t.id === techId);
    if (!tech) return;

    await renderUI(
      ctx,
      `${tech.title}:\n\n${tech.content}`,
      {
        reply_markup: new InlineKeyboard()
          .text('🔄 Вернуться к списку', 'examList').row()
          .text('🔙 В меню тревоги', 'examAnxiety').row()
          .text('🏠 В главное меню', 'menu').row()
      }
    );
  }
};
