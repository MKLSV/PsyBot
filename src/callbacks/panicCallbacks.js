import { InlineKeyboard, InputFile } from "grammy";

export const panicCallbacks = {
    panicBreath: async (ctx) => {

        await ctx.answerCallbackQuery();
        await ctx.replyWithAudio(new InputFile("src/media/chill.mp3"));
        await ctx.reply(
            "Выбери действие:",
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 Назад', 'panic').row()
                    .text('🏠 В меню', 'menu')
            }
        );
    },

    panicGrounding: async (ctx) => {

        await ctx.answerCallbackQuery();
        await ctx.replyWithAudio(
            new InputFile("src/media/chill.mp3"),
        );
        await ctx.reply(
            "Выбери действие:",
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 Назад', 'panic').row()
                    .text('🏠 В меню', 'menu')
            }
        );
    },

    panicChillVoice: async (ctx) => {

        await ctx.answerCallbackQuery();
        await ctx.replyWithAudio(
            new InputFile("src/media/chill.mp3")
        );

        await ctx.reply(
            "Выбери действие:",
            {
                reply_markup: new InlineKeyboard()
                    .text('🔙 Назад', 'panic').row()
                    .text('🏠 В меню', 'menu')
            }
        );
    },

    panicAlarm: async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.editMessageText('Выбери как лучше вам помочь', {
            reply_markup: new InlineKeyboard()
                .text('📞 Телефон доверия', 'panicPhone').row()
                .text('🔙 В меню тревоги', 'panic').row()
                .text('🏠 В главное меню', 'menu').row(),
        });
    },


    panicPhone: async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.replyWithContact(
            '+79953651465',
            'Телефон доверия'
        );
        await ctx.reply('Вот номера доверия которыми вы можете воспользоваться', {
            reply_markup: new InlineKeyboard()
                .text('🔙 В меню тревоги', 'panic').row()
                .text('🏠 В главное меню', 'menu').row(),
        });
    },
};
