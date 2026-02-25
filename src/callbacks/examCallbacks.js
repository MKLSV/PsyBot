import { InlineKeyboard } from "grammy";
import { readFileSync } from "fs";
import { renderUI, clearAudio } from "../ui/uiManager.js";

const data = JSON.parse(
  readFileSync(new URL("../data.json", import.meta.url))
);
const examTechList = data.examTech;

export const examCallbacks = {

  examRandom: async (ctx) => {
    ctx.answerCallbackQuery();
    await clearAudio(ctx);

    let random;
    do {
      random = examTechList[Math.floor(Math.random() * examTechList.length)];
    } while (ctx.session.lastExamTechId === random.id && examTechList.length > 1);

    ctx.session.lastExamTechId = random.id;

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
    ctx.answerCallbackQuery();
    await clearAudio(ctx);

    const keyboard = new InlineKeyboard();
    examTechList.forEach((tech) => keyboard.text(tech.title, `examTech_${tech.id}`).row());
    keyboard.text('🔙 Назад', 'examAnxiety');

    await renderUI(ctx, 'Выберите технику:', { reply_markup: keyboard });
  },

  examTest: async (ctx) => {
    ctx.answerCallbackQuery();
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

  examTech: async (ctx) => {
    ctx.answerCallbackQuery();
    await clearAudio(ctx);

    const techId = Number(ctx.match[1]);
    const tech = examTechList.find((t) => t.id === techId);
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
