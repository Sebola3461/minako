/**
 * @param {String[]} args 
 */

const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");
const { MinakoError } = require("../../utils/errors");
const { formatNumber } = require("./functions/FormatNumber");
const { getOsuPlayer } = require("./functions/GetOsuPlayer");
const ModesList = require("./rulesets/ModesList.json");

exports.run = (message, args) => {
    let authorUser = MinakoDatabase.users.getUser(message.author.id);
    if (message.mentions.users.size > 0) authorUser = MinakoDatabase.users.getUser(message.mentions.users.first().id);

    let params = {
        username: "",
        modeFormated: "standard",
        mode: 0
    }

    if (args.length == 3) {
        params.mode = ModesList[args[2].replace("-", "").trimStart().trimEnd()].code;
        if (params.mode == undefined) params.mode = "0";
        params.username = args[1];
        params.modeFormated = ModesList[`${params.mode}`].name;
    }

    if (args.length == 2) {
        params.mode = 0;
        if (params.mode == undefined) params.mode = "0";
        params.username = args[1];
        params.modeFormated = ModesList["std"].name;
    }

    if (args.length == 1) {
        if (authorUser == undefined) return MinakoError.osuUserNotFound(message);
        if (authorUser.osu.username == "") return MinakoError.osuPlayerMissingArguments(message);
        params.username = authorUser.osu.username;
        params.modeFormated = authorUser.osu.modeFormated;
        params.mode = authorUser.osu.mode;
    }

    getOsuPlayer(params).then(user => {
        if (user == "") return MinakoError.osuUserNotFound(message);
        user = user[0];

        const embed = new MessageEmbed()
            .setColor('#D9A0F3')
            .setTitle(`osu!${params.modeFormated} stats for ${user.username}`)
            .setDescription(`#${user.pp_rank} (:flag_${user.country.toLowerCase()}: #${user.pp_country_rank})`)
            .setThumbnail(`https://a.ppy.sh/${user.user_id}`)
            .addField("**Stats**", `
            \`Playcount\`: ${formatNumber(user.playcount)}
            \`Accuracy\`: ${new Number(user.accuracy).toFixed(2)}
            \`Ranked Score\`: ${formatNumber(user.ranked_score)}
            \`Total Score\`: ${formatNumber(user.total_score)}
            \`Level\`: ${new Number(user.level).toFixed(0)}
            `)
        message.channel.send(embed)
    })
}