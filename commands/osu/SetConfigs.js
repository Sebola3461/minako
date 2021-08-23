const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");
const { MinakoError } = require("../../utils/errors");
const ModesList = require("./rulesets/ModesList.json");

exports.run = (message, args) => {
    if (args.length == 1) return MinakoError.osuConfigsMissingArguments(message);

    let params = {
        username: args[1].replace("_", " "),
        modeFormated: "standard",
        mode: 0
    }

    if (args.length > 2) {
        params.username = args[1].replace("_", " ");
        params.mode = ModesList[args[2].replace("-", "").trimStart().trimEnd()].code;
        params.modeFormated = ModesList[args[2].replace("-", "").trimStart().trimEnd()].name;
    }

    MinakoDatabase.users.editUserRow(message.author.id, "osu", params, message)

    let sucessEmbed = new MessageEmbed()
        .setTitle("Sucess!")
        .setColor('#D9A0F3')
        .setDescription("Your data has been changed!")
        .addField("**Username**", `${params.username}`, true)
        .addField("**Mode**", `osu!${params.modeFormated}`, true)
    message.channel.send(sucessEmbed)
}