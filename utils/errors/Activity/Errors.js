const { MessageEmbed } = require("discord.js");

exports.incorrectChannelType = (message) => {
    let embed = new MessageEmbed()
        .setTitle("You can't do it.")
        .setColor('#D9A0F3')
        .setDescription("You need to mention a **voice channel**! Type `#!` to see all avaliable voice channels.");
    message.channel.send(embed)
}