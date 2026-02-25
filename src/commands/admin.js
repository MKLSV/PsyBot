import { User } from "../models/User.js";

export const admin = async (ctx) => {
    if (ctx.from.id == "555207329") {
        try {
            const totalUsers = await User.countDocuments();
            ctx.reply(totalUsers)
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
