const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");

exports.missingPermissions = (message, permission) => {
    let embed = new MessageEmbed()
        .setTitle("Wait a second... You cant execute this command!")
        .setColor('#D9A0F3')
        .setDescription(`Sorry, this command can only be executed by members with the \`${permission}\` permission.`)
    message.channel.send(embed)
}

exports.setprefixInvalidArguments = (message) => {
    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription("Incorrect syntax! If you need help, see below how to use this command.")
        .addField("**Syntax**", `${prefix}setprefix \`newPrefix\``)
        .addField("**Example**", `${prefix}setprefix \`m!\``)
        .addField("**Limitations**", `The new prefix cannot contain spaces`)
    message.channel.send(embed)
}

exports.commandNotFound = (message) => {
    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription(`I dont know this command! If you need some help, type \`${prefix}help\` to get help.`);
    message.channel.send(embed)
}