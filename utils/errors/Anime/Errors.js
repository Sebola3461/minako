const { MessageEmbed } = require("discord.js")

exports.notFoundSearch = (message, search) => {
    let embed = new MessageEmbed()
        .setTitle("Wha?")
        .setColor('#D9A0F3')
        .setDescription(`I tried, but I didn't find any results for __"${search}"__. Sorry...`);
    message.channel.send(embed)
}