const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Respond to normal text (non-command) messages
bot.on('message', (option) => {
  if (!option.text.startsWith('/')) {
    bot.sendMessage(option.chat.id, "Hello, I am a bot here to help you with your query. Please type /help to know more about me.");
  }
});

// Handle /joke command
bot.onText(/\/joke/, async (option) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
    const { setup, punchline } = response.data;
    bot.sendMessage(option.chat.id, `${setup}\n${punchline}`);
  } catch (error) {
    bot.sendMessage(option.chat.id, "Oops! Couldn't fetch a joke right now. Please try again later.");
    console.error("Error fetching joke:", error.message);
  }
});
