const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../../db");

exports.channelNotFound = (message) => {
    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
    let embed = new MessageEmbed()
        .setTitle("What?")
        .setColor('#D9A0F3')
        .setDescription(`You cannot remove a channel that has not been added. Use \`${prefix}commandchannel remove\` to add a channel.`);
    message.channel.send(embed)
}

exports.invalidArgs = (message) => {
    let embed = new MessageEmbed()
        .setTitle("What?")
        .setColor('#D9A0F3')
        .setDescription(`You you need to mention a channel!`);
    message.channel.send(embed)
}

exports.channelDuplicated = (message) => {
    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
    let embed = new MessageEmbed()
        .setTitle("What?")
        .setColor('#D9A0F3')
        .setDescription(`You cannot add a channel that has already been added. Use \`${prefix}commandchannel remove\` to remove a channel.`);
    message.channel.send(embed)
}