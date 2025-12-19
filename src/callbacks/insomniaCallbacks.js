import { InlineKeyboard, InputFile } from "grammy";
import { readFileSync } from "fs";

const data = JSON.parse(
    readFileSync(new URL("../data.json", import.meta.url))
);
const insomniaTech = data.insomniaTech;

// экспортируем объект с обработчиками
export const insomniaCallbacks = {

    insomniaAudio: async (ctx) => {

        await ctx.answerCallbackQuery();
        await ctx.replyWithAudio(
            new InputFile("src/media/chill.mp3"),
        );

        await ctx.reply(
            "Выбери действие:",
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 Назад', 'insomnia').row()
                    .text('🏠 В меню', 'menu')
            }
        );
    },

    insomniaRest: async (ctx) => {

        await ctx.answerCallbackQuery();
        await ctx.replyWithAudio(
            new InputFile("src/media/chill.mp3"),
        );
        await ctx.reply(
            "Выбери действие:",
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 Назад', 'insomnia').row()
                    .text('🏠 В меню', 'menu').row()
            });
    },

    insomniaSleep: async (ctx) => {

        await ctx.answerCallbackQuery();
        await ctx.replyWithAudio(
            new InputFile("src/media/chill.mp3")
        );
        await ctx.reply(
            "Выбери действие:",
            {
            reply_markup: new InlineKeyboard()
                .text('🔙 Назад', 'insomnia').row()
                .text('🏠 В меню', 'menu').row()
        });
    },

    insomniaVisual: async (ctx) => {

        await ctx.answerCallbackQuery();
        await ctx.replyWithAudio(
            new InputFile("src/media/chill.mp3")
        );
        await ctx.reply(
            "Выбери действие:",
            {
            reply_markup: new InlineKeyboard()
                .text('🔙 Назад', 'insomnia').row()
                .text('🏠 В меню', 'menu').row()
        });
    },


    insomniaList: async (ctx) => {
        await ctx.answerCallbackQuery();
        const keyboard = new InlineKeyboard();
        insomniaTech.forEach((tech) => keyboard.text(tech.title, `tech_${tech.id}`).row());
        keyboard.text('🔙 Назад', 'insomnia');

        await ctx.editMessageText('Выберите технику:', {
            reply_markup: keyboard,
        });
    },

    tech: async (ctx) => {
        await ctx.answerCallbackQuery();
        const techId = Number(ctx.match[1]);
        const tech = insomniaTech.find((t) => t.id === techId);
        if (!tech) return;

        await ctx.editMessageText(`${tech.title}: \n\n${tech.content}`, {
            reply_markup: new InlineKeyboard()
                .text('🔄 Вернутся к списку', 'insomniaList').row()
                .text('🔙 В меню тревоги', 'insomnia').row()
                .text('🏠 В главное меню', 'menu').row(),
        });
    }
};
