/**
 * * ==== Main ====
 * * The brain of the bot
 */

const { Client } = require('discord.js');
const configs = require('./config/settings.json');
const commands = require("./commands");
const others = require("./utils/others");
const { MinakoError } = require('./utils/errors');
const { MinakoDatabase } = require('./db');
const bot = new Client();

bot.on('ready', () => {
    console.log("READY!");
    console.log(`Running at: ${bot.user.username} - (${bot.user.id})`);
    bot.user.setActivity("hello, i like bananas!");
});

bot.on("message", (message) => {
    if (message.author.bot) return; // ? Dont reply bot users
    if (message.content == `<@${bot.user.id}>` || message.content == `<@!${bot.user.id}>`) return others["botping"].send(message); // * Send a help embed if the bot its mentioned.

    if (!message.content.startsWith(configs.prefix)) return; // ? Now, dont process messages without the prefix

    MinakoDatabase.checkUser(message); // * Check if the user exists in the database

    // ? Add args key to message object
    let args = message.content.slice(configs.prefix.length).split(" ");

    // * ==== Command Handler ====
    let requestedCommand = commands[args[0]]

    if (requestedCommand == undefined) return MinakoError.commandNotFound(message); // * Send a embed if the command doesnt exists.

    requestedCommand.run(message, args, bot);
})

bot.login(configs.discord_token);