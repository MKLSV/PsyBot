import 'dotenv/config';
import { Bot, GrammyError, HttpError, InlineKeyboard, session } from 'grammy';
import {
  start,
  examAnxiety,
  stress,
  insomnia,
  panic,
  help
} from './src/commands/index.js';
import { examCallbacks } from './src/callbacks/examCallbacks.js';
import { stressCallbacks } from './src/callbacks/stressCallbacks.js';
import { insomniaCallbacks } from './src/callbacks/insomniaCallbacks.js';
import { panicCallbacks } from './src/callbacks/panicCallbacks.js';
import { helpCallbacks } from './src/callbacks/helpCallbacks.js';

const BOT_API_KEY = process.env.BOT_API_KEY;

const bot = new Bot(BOT_API_KEY);

bot.command('start', start);

bot.use(session({
  initial: () => ({
    uiMessageId: null,
    audioMessageId: null,
  }),
}));

bot.callbackQuery('menu', async (ctx) => {
  ctx.answerCallbackQuery();

  await ctx.editMessageText(
    'Выбери то, что чувствуешь сейчас:',
    {
      reply_markup: new InlineKeyboard()
        .text('🧠 Тревога перед экзаменом', 'examAnxiety').row()
        .text('⚡ Сильный стресс', 'stress').row()
        .text('🌙 Бессонница', 'insomnia').row()
        .text('💨 Паническая атака', 'panic').row()
        .text('🤝 Помощь рядом', 'help').row(),
    },
  );
});

// EXAM CALLBACKS
bot.callbackQuery('examAnxiety', examAnxiety);

bot.callbackQuery('examRandom', examCallbacks.examRandom);
bot.callbackQuery('examList', examCallbacks.examList);
bot.callbackQuery('examTest', examCallbacks.examTest);
bot.callbackQuery(/tech_(.+)/, examCallbacks.tech);

// STRESS CALLBACKS
bot.callbackQuery('stress', stress);

bot.callbackQuery('stressRandom', stressCallbacks.stressRandom);
bot.callbackQuery('stressList', stressCallbacks.stressList);
bot.callbackQuery('stressEmergency', stressCallbacks.stressEmergency);
bot.callbackQuery('stressAudio', stressCallbacks.stressAudio);
bot.callbackQuery(/tech_(.+)/, stressCallbacks.tech);


// INSOMNIA CALLBACKS
bot.callbackQuery('insomnia', insomnia);

bot.callbackQuery('insomniaAudio', insomniaCallbacks.insomniaAudio);
bot.callbackQuery('insomniaRest', insomniaCallbacks.insomniaRest);
bot.callbackQuery('insomniaSleep', insomniaCallbacks.insomniaSleep);
bot.callbackQuery('insomniaVisual', insomniaCallbacks.insomniaVisual);
bot.callbackQuery('insomniaList', insomniaCallbacks.insomniaList);
bot.callbackQuery(/tech_(.+)/, insomniaCallbacks.tech);


// PANIC CALLBACKS
bot.callbackQuery('panic', panic);

bot.callbackQuery('panicBreath', panicCallbacks.panicBreath);
bot.callbackQuery('panicGrounding', panicCallbacks.panicGrounding);
bot.callbackQuery('panicChillVoice', panicCallbacks.panicChillVoice);
bot.callbackQuery('panicAlarm', panicCallbacks.panicAlarm);
bot.callbackQuery('panicPhone', panicCallbacks.panicPhone);


// HELP CALLBACKS
bot.callbackQuery('help', help);

bot.callbackQuery('helpPhone', helpCallbacks.helpPhone);
bot.callbackQuery('helpPsy', helpCallbacks.helpPsy);
bot.callbackQuery('helpCenter', helpCallbacks.helpCenter);
bot.callbackQuery('helpOnline', helpCallbacks.helpOnline);


// Ответ на любое сообщение
bot.on('message', (ctx) => {
  ctx.reply('Выбери то, что чувствуешь сейчас:', {
    reply_markup: new InlineKeyboard()
      .text('🧠 Тревога перед экзаменом', 'examAnxiety').row()
      .text('⚡ Сильный стресс', 'stress').row()
      .text('🌙 Бессонница', 'insomnia').row()
      .text('💨 Паническая атака', 'panic').row()
      .text('🤝 Помощь рядом', 'help')
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
