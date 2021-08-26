const { MessageEmbed } = require("discord.js");

exports.invalidMention = (message) => {
    const embed = new MessageEmbed()
        .setTitle("Wat? You forgot a thing...")
        .setColor('#D9A0F3')
        .setDescription("Please, mention a text channel to set!")
    message.channel.send(embed)
}

exports.duplicatedChannel = (message) => {
    const embed = new MessageEmbed()
        .setTitle("Wat? Why you're doing this?")
        .setColor('#D9A0F3')
        .setDescription("This channel has already been added or does not exist.")
    message.channel.send(embed)
}