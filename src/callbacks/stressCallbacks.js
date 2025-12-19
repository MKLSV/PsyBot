import { InlineKeyboard, InputFile } from "grammy";
import { readFileSync } from "fs";

const data = JSON.parse(
    readFileSync(new URL("../data.json", import.meta.url))
);
const stressTech = data.stressTech;

// экспортируем объект с обработчиками
export const stressCallbacks = {
    stressRandom: async (ctx) => {
        await ctx.answerCallbackQuery();
        const random = stressTech[Math.floor(Math.random() * stressTech.length)];

        await ctx.editMessageText(random.content, {
            reply_markup: new InlineKeyboard()
                .text('🔄 Показать другую технику', 'stressRandom').row()
                .text('🔙 В меню тревоги', 'stress').row()
                .text('🏠 В главное меню', 'menu').row(),
        });
    },

    stressList: async (ctx) => {
        await ctx.answerCallbackQuery();
        const keyboard = new InlineKeyboard();
        stressTech.forEach((tech) => keyboard.text(tech.title, `tech_${tech.id}`).row());
        keyboard.text('🔙 Назад', 'stress');

        await ctx.editMessageText('Выберите технику:', {
            reply_markup: keyboard,
        });
    },

    stressEmergency: async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.editMessageText('Вдох-выдох и мы опять ишраем в любимых...\n\nне знаю как ты а мне всегда становится лучше от этой песни', {
            reply_markup: new InlineKeyboard()
                .text('🔙 Назад', 'stress').row()
                .text('🏠 В главное меню', 'menu').row(),
        });
    },

    stressAudio: async (ctx) => {

        await ctx.answerCallbackQuery();

        await ctx.replyWithAudio(
            new InputFile("src/media/chill.mp3"),
        );

        await ctx.reply(
             "Выбери действие:",
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 Назад', 'stress').row()
                    .text('🏠 В меню', 'menu')
            }
        );
    },

    tech: async (ctx) => {
        await ctx.answerCallbackQuery();
        const techId = Number(ctx.match[1]);
        const tech = stressTech.find((t) => t.id === techId);
        if (!tech) return;

        await ctx.editMessageText(`${tech.title}: \n\n${tech.content}`, {
            reply_markup: new InlineKeyboard()
                .text('🔄 Вернутся к списку', 'stressList').row()
                .text('🔙 Назад', 'stress').row()
                .text('🏠 В главное меню', 'menu').row(),
        });
    }
};
