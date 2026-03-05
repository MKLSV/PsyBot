import { getActiveUsersCount, getAllUsers, getUserCount } from "../../database.js";

export const admin = async (ctx) => {
    if (ctx.from.id == "555207329" || ctx.from.id == "481933828") {
        try {
            const total = await getUserCount();
            const active = await getActiveUsersCount();
            ctx.reply(
                `📊 Статистика бота:\n\n` +
                `👥 Всего пользователей: ${total}\n` +
                `🟢 Активных за последний месяц: ${active}`
            );
            console.log(ctx.from.first_name, ' Просмотрел статистику')

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



export const adminAll = async (ctx) => {


    const users = await getAllUsers();

    if (!users.length) {
        return ctx.reply("База данных пуста");
    }

    const text = users
        .map((u) => `👤 <b>${u.first_name}</b>\n🆔 <code>${u.telegram_id}</code>\n📛 @${u.username || "нет"}`)
        .join("\n\n");

    await ctx.reply(`👥 <b>Все пользователи (${users.length}):</b>\n\n${text}`, {
        parse_mode: "HTML",
    });
};