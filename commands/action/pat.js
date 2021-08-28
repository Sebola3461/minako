const { MessageEmbed } = require("discord.js")
const { MinakoError } = require("../../utils/errors")
const { getImage } = require("./functions/getImage")

exports.run = (message) => {

    if (message.mentions.users.size != 1) return MinakoError.global.commandInvalidArguments(message, "pat", "`@user`", "`@Minako`")
    let mentionedUser = message.mentions.users.first()

    if (mentionedUser.id != message.author.id) {
        getImage("headpat").then(img => {
            let embed = new MessageEmbed()
                .setTitle(`:purple_heart: So cute! ${message.author.username} gave ${mentionedUser.username} a pat!`)
                .setColor('#D9A0F3')
                .setImage(`https://safebooru.org//images/${img.directory}/${img.image}`)
            message.channel.send(embed)
        })
    } else {
        getImage("headpat").then(img => {
            let embed = new MessageEmbed()
                .setTitle(`${message.author.username} is a little lonely and gave himself a pat...`)
                .setColor('#D9A0F3')
                .setImage(`https://safebooru.org//images/${img.directory}/${img.image}`)
            message.channel.send(embed)
        })
    }
}