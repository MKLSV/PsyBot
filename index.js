import 'dotenv/config';
import { Bot, GrammyError, HttpError, InlineKeyboard, session } from 'grammy';
import {
  start,
  admin
} from './src/commands/index.js';
import mongoose from 'mongoose';
// import { renderUI, clearAudio } from './src/ui/uiManager.js';
import { examList, examTech } from './src/callbacks/examCallbacks.js';
import { emotionsList, emotionsTech } from './src/callbacks/emotionsCallbacks.js';
import { thinkingList, thinkingTech } from './src/callbacks/thinkingCallbacks.js';
import { bodyStressList, bodyStressTech } from './src/callbacks/bodyStressCallbacks.js';
import { helpCallbacks } from './src/callbacks/helpCallbacks.js';
import { Stat } from './src/models/Stat.js';
import { User } from './src/models/User.js';


const BOT_API_KEY = process.env.BOT_API_KEY;

const bot = new Bot(BOT_API_KEY);

// bot.use(session({
//   initial: () => ({
//     uiMessageId: null,
//     audioMessageId: null,
//   }),
// }));

// await mongoose.connect(process.env.MONGO_URI, {
//   dbName: 'telegram-bot',
// });

// console.log('✅ MongoDB connected');

// // Запись в БД
// bot.use(async (ctx, next) => {
//   if (!ctx.from) return next();

//   const tgUser = ctx.from;
//   const today = new Date().toISOString().slice(0, 10);

//   let user = await User.findOne({ telegramId: tgUser.id });

//   if (!user) {
//     // Новый пользователь
//     user = await User.create({
//       telegramId: tgUser.id,
//       username: tgUser.username,
//       firstName: tgUser.first_name,
//       lastName: tgUser.last_name,
//     });

//     await Stat.updateOne(
//       { date: today },
//       {
//         $inc: {
//           visits: 1,
//           uniqueUsers: 1,
//         },
//       },
//       { upsert: true }
//     );
//   } else {
//     // Возвратный пользователь
//     user.lastVisitAt = new Date();
//     user.visitsCount += 1;
//     user.isActive = true;
//     await user.save();

//     await Stat.updateOne(
//       { date: today },
//       { $inc: { visits: 1 } },
//       { upsert: true }
//     );
//   }

//   return next();
// });


bot.command('start', start);

//ADMIN CALLBACK
bot.command('admin', admin);

bot.callbackQuery('menu', async (ctx) => {
  await ctx.answerCallbackQuery();
  const keyboard = new InlineKeyboard()
    .text('Перед экзаменом и на экзамене', 'examList').row()
    .text('Когда не справляюсь с эмоциями', 'emotionsList').row()
    .text('Когда негативные мысли лезут в голову', 'thinkingList').row()
    .text('Когда напряжение в теле', 'bodyStressList').row()

  if (ctx.callbackQuery?.message?.photo) {
    try { await ctx.deleteMessage(); } catch { }
    await ctx.reply('Выбери то, что чувствуешь сейчас:', { reply_markup: keyboard });
  } else {
    await ctx.editMessageText('Выбери то, что чувствуешь сейчас:', { reply_markup: keyboard });
  }
  
});


// EXAM CALLBACKS
bot.callbackQuery('examList', examList);
bot.callbackQuery(/examTech_(.+)/, examTech);

// emotions CALLBACKS
bot.callbackQuery('emotionsList', emotionsList);
bot.callbackQuery(/emotionsTech_(.+)/, emotionsTech);


// thinking CALLBACKS
bot.callbackQuery('thinkingList', thinkingList);
bot.callbackQuery(/thinkingTech_(.+)/, thinkingTech);


// bodyStress CALLBACKS
bot.callbackQuery('bodyStressList', bodyStressList);
bot.callbackQuery('bodyStressTech', bodyStressTech);


// HELP CALLBACKS
// bot.callbackQuery('help', help);

// bot.callbackQuery('helpPhone', helpCallbacks.helpPhone);
// bot.callbackQuery('helpPsy', helpCallbacks.helpPsy);
// bot.callbackQuery('helpCenter', helpCallbacks.helpCenter);
// bot.callbackQuery('helpOnline', helpCallbacks.helpOnline);

// Ответ на любое сообщение
bot.on('message', (ctx) => {
  ctx.reply('Выбери свое состояние сейчас:', {
    reply_markup: new InlineKeyboard()
      .text('Перед экзаменом и на экзамене', 'examList').row()
      .text('Когда не справляюсь с эмоциями', 'emotionsList').row()
      .text('Когда негативные мысли лезут в голову', 'thinkingList').row()
      .text('Когда напряжение в теле', 'bodyStressList').row()
    // .text('🤝 Помощь рядом', 'help').row()
  });
});

// Обработка ошибок согласно документации
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;

  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
});

// Функция запуска бота
// async function startBot() {
//   const MONGODB_URI = process.env.MONGODB_URI;
//   if (!MONGODB_URI) {
//     throw new Error('MONGODB_URI is not defined');
//   }
//   try {
//     await mongoose.connect(MONGODB_URI);
//     bot.start();
//     console.log('bot started');
//   } catch (error) {
//     console.error('Error in startBot:', error);
//   }
// }

// startBot();



bot.start();
