const { MessageEmbed } = require("discord.js")
const { MinakoError } = require("../../utils/errors")
const { getImage } = require("./functions/getImage")

exports.run = (message) => {

    if (message.mentions.users.size != 1) return MinakoError.global.commandInvalidArguments(message, "kiss", "`@user`", "`@Cino`")
    let mentionedUser = message.mentions.users.first()
    if (mentionedUser.id == "694553618397003799") return message.channel.send(`Stop this! I don't want to kiss you!`);
    if (mentionedUser.id == message.author.id) return message.channel.send(`Why are you trying to kiss yourself?`);

    getImage("kiss+gif").then(img => {
        let embed = new MessageEmbed()
            .setTitle(`:purple_heart: Love is in the air! ${message.author.username} gave ${mentionedUser.username} a kiss!`)
            .setColor('#D9A0F3')
            .setImage(`https://safebooru.org//images/${img.directory}/${img.image}`)
        message.channel.send(embed)
    })
}