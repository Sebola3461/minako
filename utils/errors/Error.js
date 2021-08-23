const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../config/settings.json")

exports.commandNotFound = (message) => {
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription(`I dont know this command! If you need some help, type \`${prefix}help\` to get help.`);
    message.channel.send(embed)
}

exports.osuUserNotFound = (message) => {
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription("User not found! Please, provide a valid username/ID.")
    message.channel.send(embed)
}

exports.osuPlayerMissingArguments = (message) => {
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription("Incorrect syntax! If you need help, see below how to use this command.")
        .addField("**Syntax**", `${prefix}osuplayer \`Username/ID\` -\`mode\` (optional)`)
        .addField("**Example**", `${prefix}osuplayer \`peppy\` -\`osu\``)
    message.channel.send(embed)
}

exports.osuConfigsMissingArguments = (message) => {
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription("Incorrect syntax! If you need help, see below how to use this command.")
        .addField("**Syntax**", `${prefix}osuset \`Username/ID\` -\`mode\` (optional)`)
        .addField("**Example**", `${prefix}osuset \`${message.author.username}\` -\`osu\``)
    message.channel.send(embed)
}

exports.animeMissingArguments = (message) => {
    let embed = new MessageEmbed()
        .setTitle("You need some help?")
        .setColor('#D9A0F3')
        .setDescription("Incorrect syntax! If you need help, see below how to use this command.")
        .addField("**Syntax**", `${prefix}anime \`Anime name\``)
        .addField("**Example**", `${prefix}anime \`touhou\``)
    message.channel.send(embed)
}