import { InlineKeyboard } from "grammy";
import { readFileSync } from "fs";

const data = JSON.parse(
  readFileSync(new URL("../data.json", import.meta.url))
);
const examTech = data.examTech;

// экспортируем объект с обработчиками
export const examCallbacks = {
  examRandom: async (ctx) => {
    await ctx.answerCallbackQuery();
    const random = examTech[Math.floor(Math.random() * examTech.length)];

    await ctx.editMessageText(random.content, {
      reply_markup: new InlineKeyboard()
        .text('🔄 Показать другую технику', 'examRandom').row()
        .text('🔙 В меню тревоги', 'examAnxiety').row()
        .text('🏠 В главное меню', 'menu').row(),
    });
  },

  examList: async (ctx) => {
    await ctx.answerCallbackQuery();
    const keyboard = new InlineKeyboard();
    examTech.forEach((tech) => keyboard.text(tech.title, `tech_${tech.id}`).row());
    keyboard.text('🔙 Назад', 'examAnxiety');

    await ctx.editMessageText('Выберите технику:', {
      reply_markup: keyboard,
    });
  },

  examTest: async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('🚧 В разработке 🚧', {
      reply_markup: new InlineKeyboard()
        .text('🔙 В меню тревоги', 'examAnxiety').row()
        .text('🏠 В главное меню', 'menu').row(),
    });
  },

  tech: async (ctx) => {
    await ctx.answerCallbackQuery();
    const techId = Number(ctx.match[1]);
    const tech = examTech.find((t) => t.id === techId);
    if (!tech) return;

    await ctx.editMessageText(`${tech.title}: \n\n${tech.content}`, {
      reply_markup: new InlineKeyboard()
        .text('🔄 Вернутся к списку', 'examList').row()
        .text('🔙 В меню тревоги', 'examAnxiety').row()
        .text('🏠 В главное меню', 'menu').row(),
    });
  }
};
