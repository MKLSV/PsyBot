import { InlineKeyboard, InputFile } from "grammy";
import { readFileSync } from "fs";
import { renderUI, playAudio, clearAudio } from "../ui/uiManager.js";

const data = JSON.parse(
    readFileSync(new URL("../data.json", import.meta.url))
);
const stressTechList = data.stressTech;

export const stressCallbacks = {

    stressRandom: async (ctx) => {
        await ctx.answerCallbackQuery();
        await clearAudio(ctx);

        let random;
        do {
            random = stressTechList[Math.floor(Math.random() * stressTechList.length)];
        } while (ctx.session.lastStressTechId === random.id && stressTechList.length > 1);

        ctx.session.lastStressTechId = random.id;
        await renderUI(
            ctx,
            random.content,
            {
                reply_markup: new InlineKeyboard()
                    .text('🔄 Показать другую технику', 'stressRandom').row()
                    .text('🔙 В меню тревоги', 'stress').row()
                    .text('🏠 В главное меню', 'menu').row()
            }
        );
    },

    stressList: async (ctx) => {
        await ctx.answerCallbackQuery();
        await clearAudio(ctx);

        const keyboard = new InlineKeyboard();
        stressTechList.forEach((tech) => keyboard.text(tech.title, `stressTech_${tech.id}`).row());
        keyboard.text('🔙 Назад', 'stress');

        await renderUI(ctx, 'Выберите технику:', { reply_markup: keyboard });
    },

    stressEmergency: async (ctx) => {
        await ctx.answerCallbackQuery();
        await clearAudio(ctx);

        await renderUI(
            ctx,
            'Вдох-выдох и мы опять играем в любимых...\n\nНе знаю как ты, а мне всегда становится лучше от этой песни',
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 Назад', 'stress').row()
                    .text('🏠 В главное меню', 'menu').row()
            }
        );
    },

    stressAudio: async (ctx) => {
        await ctx.answerCallbackQuery();

        await playAudio(ctx, "src/media/chill.mp3");

        await renderUI(
            ctx,
            "Выбери действие:",
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 Назад', 'stress').row()
                    .text('🏠 В меню', 'menu')
            }
        );
    },

    stressTech: async (ctx) => {
        await ctx.answerCallbackQuery();
        await clearAudio(ctx);

        const techId = Number(ctx.match[1]);
        const tech = stressTechList.find((t) => t.id === techId);
        if (!tech) return;

        await renderUI(
            ctx,
            `${tech.title}:\n\n${tech.content}`,
            {
                reply_markup: new InlineKeyboard()
                    .text('🔄 Вернуться к списку', 'stressList').row()
                    .text('🔙 В меню стресс', 'stress').row()
                    .text('🏠 В главное меню', 'menu').row()
            }
        );
    },
};
