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
const { checkUrl } = require('./utils/others/Url');
const { checkCommandchannel } = require('./utils/others');
const bot = new Client();

bot.on('ready', () => {
    console.log(`Ready! Running at: ${bot.user.username} - (${bot.user.id})`.bgGreen.black);
    bot.user.setActivity("your commands | m+help/@Minako#6407", {
        type: "LISTENING"
    });
});

bot.on("message", (message) => {
    if (message.author.bot) return; // ? Dont reply bot users
    if (message.content == `<@${bot.user.id}>` || message.content == `<@!${bot.user.id}>`) return others["botping"].send(message); // * Send a help embed if the bot its mentioned.

    checkUrl(message)
    MinakoDatabase.guilds.checkGuild(message)
    if (!message.content.startsWith(MinakoDatabase.guilds.getGuild(message.guild.id).prefix)) return; // ? Now, dont process messages without the prefix
    MinakoDatabase.users.checkUser(message); // * Check if the user exists in the database
    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;

    let commandChannel = checkCommandchannel.channel(message);
    if (commandChannel.code == 400) return message.channel.send(commandChannel.message);

    // ? Add args key to message object
    let args = message.content.slice(prefix.length).split(" ");

    // * ==== Command Handler ====
    let requestedCommand = commands[args[0]]

    if (requestedCommand == undefined) return MinakoError.global.commandNotFound(message); // * Send a embed if the command doesnt exists.

    requestedCommand.run(message, args, bot);
})

bot.login(configs.discord_token);