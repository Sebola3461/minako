const { MessageEmbed } = require("discord.js")
const { MinakoError } = require("../../utils/errors")
const { getImage } = require("./functions/getImage")

exports.run = (message) => {

    if (message.mentions.users.size != 1) return MinakoError.global.commandInvalidArguments(message, "hug", "`@user`", "`@Minako`")
    let mentionedUser = message.mentions.users.first()

    if (mentionedUser.id != message.author.id) {
        getImage("hug+gif").then(img => {
            let embed = new MessageEmbed()
                .setTitle(`:purple_heart: So cute! ${message.author.username} gave ${mentionedUser.username} a hug!`)
                .setColor('#D9A0F3')
                .setImage(`https://safebooru.org//images/${img.directory}/${img.image}`)
            message.channel.send(embed)
        })
    } else {
        getImage("hug+gif").then(img => {
            let embed = new MessageEmbed()
                .setTitle(`${message.author.username} is a little lonely and gave himself a hug...`)
                .setColor('#D9A0F3')
                .setImage(`https://safebooru.org//images/${img.directory}/${img.image}`)
            message.channel.send(embed)
        })
    }
}