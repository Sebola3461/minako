const { MessageEmbed } = require("discord.js")
const { prefix } = require("./../../config/settings.json")

exports.run = (message) => {
    const help = new MessageEmbed()
        .setTitle(`Hello ${message.author.username}! Here is my commands list:`)
        .setColor('#D9A0F3')
        .setDescription(`Use the prefix \`${prefix}\` before the command name.`)
        .addField("**osu!**", `
        \`osuplayer\` See the stats of a player
        \`osuset\` Save configs for your profile
        `)
    message.channel.send(help)
}