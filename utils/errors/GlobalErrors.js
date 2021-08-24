const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");

exports.commandNotFound = (message) => {
    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription(`I dont know this command! If you need some help, type \`${prefix}help\` to get help.`);
    message.channel.send(embed)
}

exports.missingPermissions = (message, permission) => {
    let embed = new MessageEmbed()
        .setTitle("Wait a second... You cant execute this command!")
        .setColor('#D9A0F3')
        .setDescription(`Sorry, this command can only be executed by members with the \`${permission}\` permission.`)
    message.channel.send(embed)
}

exports.commandInvalidArguments = (message, command, syntax, example, limitation) => {
    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription("Incorrect syntax! If you need help, see below how to use this command.")
        .addField("**Syntax**", `${prefix}${command} ${syntax}`)
        .addField("**Example**", `${prefix}${command} ${example}`)

    if (limitation) {
        embed.addField("**Aditional info**", limitation)
    }
    return message.channel.send(embed)
}