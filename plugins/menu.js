const path = require('path');
const fs = require('fs');
const config = require('../config.js');
const print = require('../lib/print.js');

module.exports = {
  name: 'start',
  aliases: ['menu'],
  category: 'main',
  description: 'Menampilkan start bot',
  async execute(bot, msg) {
    const chatId = msg.chat.id;
    const mediaPath = path.join(__dirname, '../media/image.jpg');
    const runtime = bot.runtime(); 
    const time = bot.time();
    const caption = `
\`\`\`
[${time}] Soraaa MD
───────────────
NAME : ${config.botName}
VERSION : ${config.botVersion}
RUNTIME : ${runtime}
───────────────
\`\`\`
    `; 
    
    const inline_keyboard = [
      [
        { text: 'Start', callback_data: 'menubutton' }
      ],
      [
        { text: 'Channel', url: 't.me/depstore11' }
      ],
      [
        { text: 'Developer', url: 'https://t.me/depanncapee' },
        { text: 'Github', url: 'https://github.com/depannn11' }
      ]
    ];

    const options = {
      reply_markup: { inline_keyboard },
      parse_mode: 'Markdown'
    };

    try {
      if (fs.existsSync(mediaPath)) {
        await bot.sendPhoto(chatId, mediaPath, { caption, ...options });
      } else {
        await bot.sendMessage(chatId, caption, options);
      }
    } catch (e) {
      print.error(e, 'Start Command');
      await bot.sendMessage(chatId, caption, options);
    }
  }
};