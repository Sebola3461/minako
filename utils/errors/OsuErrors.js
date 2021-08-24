const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");

exports.userNotFound = (message) => {
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription("User not found! Please, provide a valid username/ID.")
    message.channel.send(embed)
}

exports.playerMissingArguments = (message) => {
    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription("Incorrect syntax! If you need help, see below how to use this command.")
        .addField("**Syntax**", `${prefix}osuplayer \`Username/ID\` -\`mode\` (optional)`)
        .addField("**Example**", `${prefix}osuplayer \`peppy\` -\`osu\``)
    message.channel.send(embed)
}

exports.configsMissingArguments = (message) => {
    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription("Incorrect syntax! If you need help, see below how to use this command.")
        .addField("**Syntax**", `${prefix}osuset \`Username/ID\` -\`mode\` (optional)`)
        .addField("**Example**", `${prefix}osuset \`${message.author.username}\` -\`osu\``)
    message.channel.send(embed)
}