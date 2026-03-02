import { getActiveUsersCount, getUserCount } from "../../database.js";

export const admin = async (ctx) => {
    if (ctx.from.id == "555207329") {
        try {
            const total = getUserCount();
            const active = getActiveUsersCount();
            ctx.reply(
                `📊 Статистика бота:\n\n` +
                `👥 Всего пользователей: ${total}\n` +
                `🟢 Активных за последний месяц: ${active}`
            );
        } catch (error) {
            console.log(error)
            ctx.reply('Произошла ошибка, попробуйте позже');
        }
    }
    else {
        await ctx.reply("У вас нет доступа к данным")
        await ctx.reply(
            "Связаться с администратором:\n👉 @MT191"
        );

    }
};
