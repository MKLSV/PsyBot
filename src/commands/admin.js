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

    // if (ctx.from.id !== "555207329") {
    //     return ctx.reply("⛔ Нет доступа");
    // }

    const users = await getAllUsers();

    if (!users.length) {
        return ctx.reply("База данных пуста");
    }

    const text = users
        .map((u) => `👤 *${u.first_name}*\n🆔 \`${u.telegram_id}\`\n📛 @${u.username || "нет"}`)
        .join("\n\n");

    await ctx.reply(`👥 *Все пользователи (${users.length}):*\n\n${text}`, {
        parse_mode: "Markdown",
    });
};