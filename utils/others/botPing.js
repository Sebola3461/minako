const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");

exports.send = (message) => {
    let prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
    this.embed = new MessageEmbed()
        .setColor('#D9A0F3')
        .setTitle(`Hello ${message.author.username}!`)
        .setDescription(`I think you are looking for help... If so, my prefix is \`${prefix}\`! Type \`${prefix}help\` to get some help.`);
    message.channel.send(this.embed)
}