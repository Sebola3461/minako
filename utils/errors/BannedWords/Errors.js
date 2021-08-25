const { MessageEmbed } = require("discord.js")

exports.duplicatedSingleWord = (message) => {
    const embed = new MessageEmbed()
        .setTitle("Wat? Why you're doing this?")
        .setColor('#D9A0F3')
        .setDescription("It looks like one (or all) of the words already exist (or no) in the configuration! Try adding different words.")
    message.channel.send(embed)
}

exports.missingText = (message) => {
    const embed = new MessageEmbed()
        .setTitle("Wat? Why you're doing this?")
        .setColor('#D9A0F3')
        .setDescription("You need to provide a message to set.")
    message.channel.send(embed)
}