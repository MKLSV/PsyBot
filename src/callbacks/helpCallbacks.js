import { InlineKeyboard } from "grammy";
import { readFileSync } from "fs";
import { renderUI, clearAudio } from "../ui/uiManager.js";

const data = JSON.parse(
    readFileSync(new URL("../data.json", import.meta.url))
);
const psyInfo = data.psyInfo;

export const helpCallbacks = {

    helpPhone: async (ctx) => {
        await ctx.answerCallbackQuery();
        await clearAudio(ctx);

        await renderUI(
            ctx,
            'Вот номера доверия которыми вы можете воспользоваться',
            {
                reply_markup: new InlineKeyboard()
                    .text('📞 +7 (995) 365-14-65', 'tel:+79953651465').row()
                    .text('📞 +7 (995) 895-54-15', 'tel:+79958955415').row()
                    .text('🔙 В меню помощи', 'help').row()
                    .text('🏠 В главное меню', 'menu').row()
            }
        );
    },

    helpPsy: async (ctx) => {
        await ctx.answerCallbackQuery();
        await clearAudio(ctx);

        const keyboard = new InlineKeyboard();
        psyInfo.forEach((psy) => keyboard.text(psy.title, `psy_${psy.id}`).row());
        keyboard.text('🔙 Назад', 'help');

        await renderUI(ctx, 'Выберите психолога:', { reply_markup: keyboard });
    },

    helpCenter: async (ctx) => {
        await ctx.answerCallbackQuery();
        await clearAudio(ctx);

        await renderUI(
            ctx,
            '🚧 В разработке 🚧',
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 В меню помощи', 'help').row()
                    .text('🏠 В главное меню', 'menu').row()
            }
        );
    },

    helpOnline: async (ctx) => {
        await ctx.answerCallbackQuery();
        await clearAudio(ctx);

        await renderUI(
            ctx,
            '🚧 В разработке 🚧',
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 В меню помощи', 'help').row()
                    .text('🏠 В главное меню', 'menu').row()
            }
        );
    },

    psy: async (ctx) => {
        await ctx.answerCallbackQuery();
        await clearAudio(ctx);

        const psyId = Number(ctx.match[1]);
        const psy = psyInfo.find((p) => p.id === psyId);
        if (!psy) return;

        await renderUI(
            ctx,
            `${psy.title}:\n\n${psy.content}`,
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 В меню помощи', 'help').row()
                    .text('🏠 В главное меню', 'menu').row()
            }
        );
    }
};
