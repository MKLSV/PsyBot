import { InlineKeyboard } from "grammy";
import { readFileSync } from "fs";

const data = JSON.parse(
    readFileSync(new URL("../data.json", import.meta.url))
);
const psyInfo = data.psyInfo;

// экспортируем объект с обработчиками
export const helpCallbacks = {
    helpPhone: async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.editMessageText('Вот номера доверия которыми вы можете воспользоваться', {
            reply_markup: new InlineKeyboard()
                .url('📞 +7 (995) 365-14-65', 'tel:+79953651465').row()
                .url('📞 +7 (995) 895-54-15', 'tel:+79958955415').row()
                .text('🔙 В меню помощи', 'help').row()
                .text('🏠 В главное меню', 'menu').row(),
        });
    },

    helpPsy: async (ctx) => {
        await ctx.answerCallbackQuery();
        const keyboard = new InlineKeyboard();
        psyInfo.forEach((psy) => keyboard.text(psy.title, `psy_${psy.id}`).row());
        keyboard.text('🔙 Назад', 'help');

        await ctx.editMessageText('Выберите психолога:', {
            reply_markup: keyboard,
        });
    },

    helpCenter: async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.editMessageText('🚧 В разработке 🚧', {
            reply_markup: new InlineKeyboard()
                .text('🔙 В меню тревоги', 'help').row()
                .text('🏠 В главное меню', 'menu').row(),
        });
    },

    helpOnline: async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.editMessageText('🚧 В разработке 🚧', {
            reply_markup: new InlineKeyboard()
                .text('🔙 В меню тревоги', 'help').row()
                .text('🏠 В главное меню', 'menu').row(),
        });
    },

    psy: async (ctx) => {
        await ctx.answerCallbackQuery();
        const techId = Number(ctx.match[1]);
        const tech = psyInfo.find((t) => t.id === techId);
        if (!tech) return;

        await ctx.editMessageText(`${tech.title}: \n\n${tech.content}`, {
            reply_markup: new InlineKeyboard()
                .text('🔙 В меню тревоги', 'help').row()
                .text('🏠 В главное меню', 'menu').row(),
        });
    }
};
