const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");
const { MinakoError } = require("../../utils/errors")

exports.run = async(message, args) => {
    if (!message.member.permissions.has(["MANAGE_GUILD", "ADMIN"])) return MinakoError.global.missingPermissions(message, "MANAGE_GUILD | ADMIN");

    if (args.length < 2) return MinakoError.global.commandInvalidArguments(message, "setprefix", "`newPrefix`", "m!");

    args.splice(0, 1)
    let newPrefix = args.join(" ");
    MinakoDatabase.guilds.editGuildRow(message.guild.id, "prefix", newPrefix, message);
    const embed = new MessageEmbed()
        .setTitle("Sucess!")
        .setColor('#D9A0F3')
        .setDescription("You can use the new prefix now!")
        .addField("**New prefix**", `\`${newPrefix}\``)
    message.channel.send(embed)
}