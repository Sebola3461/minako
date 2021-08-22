/**
 * * ==== Main ====
 * * The brain of the bot
 */

const { Client } = require('discord.js');
const configs = require('./config/settings.json');
const bot = new Client();

bot.on('ready', () => {
    console.log("READY!");
    console.log(`Running at: ${bot.user.username} - (${bot.user.id})`);
    bot.user.setActivity("hello, i like bananas!");
});

bot.on("message", (message) => {

})

bot.login(settings.discord_token);