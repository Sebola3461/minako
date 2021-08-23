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
    let authorUser = MinakoDatabase.getUser(message.author.id);
    if (message.mentions.users.size > 0) authorUser = MinakoDatabase.getUser(message.mentions.users.first().id);
    if (authorUser == undefined) return MinakoError.osuUserNotFound(message);
    if (authorUser.osu.username == "") return MinakoError.osuPlayerMissingArguments(message);


    let params = {
        username: authorUser.osu.username,
        modeFormated: authorUser.osu.modeFormated,
        mode: authorUser.osu.mode
    }

    if (args.length > 2) {
        params.mode = ModesList[args[2].replace("-", "").trimStart().trimEnd()];
        if (params.mode == undefined) params.mode = "0";
        params.modeFormated = ModesList["std"].name;
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