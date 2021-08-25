const { MessageEmbed } = require("discord.js")
const { prefix } = require("./../../config/settings.json")

exports.run = async(message) => {
    const help = new MessageEmbed()
        .setTitle(`Hello ${message.author.username}! Here is my commands list:`)
        .setColor('#D9A0F3')
        .setThumbnail()
        .setDescription(`Use the prefix \`${prefix}\` before the command name.`)
        .addField("**osu!**", `
        \`osuplayer\` See the stats of a player
        \`osuset\` Save configs for your profile
        `)
        .addField("**Anime**", `
        \`animesearch\` See info of an anime!
        \`animecharacter\` See info of an anime character!
        `)
        .addField("**Configuration**", `
        \`setprefix\` Set my prefix here
        \`commandchannel\` Select channels my commands can be used
        `)
        .addField("**Fun**", `
        \`activity\` Start a activity in a voice channel!
        \`8ball\` Make a question, ill answer!
        `)
        .addField("**Utils**", `
        \`ping\` See my ping!
        `)
    message.channel.send(help)
}