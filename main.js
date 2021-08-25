/**
 * * ==== Main ====
 * * The brain of the bot
 */

const { Client, fetchUser } = require('discord.js');
const configs = require('./config/settings.json');
const commands = require("./commands");
const others = require("./utils/others");
const { MinakoError } = require('./utils/errors');
const { MinakoDatabase } = require('./db');
const { checkUrl } = require('./utils/others/Url');
const { checkCommandchannel } = require('./utils/others');
const { MinakoUtils } = require('./utils');
const bot = new Client();

bot.on('ready', () => {
    console.log(`Ready! Running at: ${bot.user.username} - (${bot.user.id})`.bgGreen.black);
    bot.user.setActivity("your commands | m+help/@Minako#6407", {
        type: "LISTENING"
    });
});

bot.on("message", (message) => {
    if (message.channel.type == "dm") return;
    if (message.author.bot) return; // ? Dont reply bot users
    if (message.content == `<@${bot.user.id}>` || message.content == `<@!${bot.user.id}>`) return others["botping"].send(message); // * Send a help embed if the bot its mentioned.

    checkUrl(message)
    MinakoDatabase.guilds.checkGuild(message)

    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
    let args = message.content.slice(prefix.length).split(" ");
    let modWords = MinakoUtils.bannedwords.analyseMessage(message);
    if (modWords.code != 200) return;

    if (!message.content.startsWith(prefix)) return; // ? Now, dont process messages without the prefix
    MinakoDatabase.users.checkUser(message); // * Check if the user exists in the database

    let commandChannel = checkCommandchannel.channel(message);
    if (commandChannel.code == 400) return message.channel.send(commandChannel.message);

    // * ==== Command Handler ====
    let requestedCommand = commands[args[0]]

    if (requestedCommand == undefined) return MinakoError.global.commandNotFound(message); // * Send a embed if the command doesnt exists.

    try {
        requestedCommand.run(message, args, bot)
    } catch (e) {
        MinakoError.global.commandExecError(message, e)
    }
})

bot.on("guildMemberAdd", (member) => {
    MinakoUtils.welcomer.sendWelcome(member)
})

bot.login(configs.discord_token);