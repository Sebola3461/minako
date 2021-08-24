const { MessageEmbed } = require("discord.js")

exports.sendCharacterEmbed = (character, message) => {
    if (character.source == null) character.source = "No data.";

    const characterEmbed = new MessageEmbed()
        .setTitle(character.names.canonical)
        .setImage(`https://api.minako.moe/character/${character.id}/image`)
        .setDescription(character.description)
        .setColor('#D9A0F3')
    message.channel.send(characterEmbed)
}