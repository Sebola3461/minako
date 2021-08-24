const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");
const { MinakoError } = require("../../utils/errors")

exports.run = (message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD")) return MinakoError.globalMissingPermissions(message, "MANAGE_GUILD");

    if (args.length != 2) return MinakoError.setprefixInvalidArguments(message);
    let newPrefix = args[1];
    MinakoDatabase.guilds.editGuildRow(message.guild.id, "prefix", newPrefix, message);
    const embed = new MessageEmbed()
        .setTitle("Sucess!")
        .setColor('#D9A0F3')
        .setDescription("You can use the new prefix now!")
        .addField("**New prefix**", `\`${newPrefix}\``)
    message.channel.send(embed)
}