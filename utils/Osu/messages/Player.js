const { MessageEmbed } = require("discord.js")
const { formatNumber } = require("../../../commands/osu/functions/FormatNumber")

exports.sendOsuPlayerEmbed = (user, mode, message) => {
    const embed = new MessageEmbed()
        .setColor('#D9A0F3')
        .setTitle(`osu!${mode.name} stats for ${user.username}`)
        .setURL(`https://osu.ppy.sh/users/${user.user_id}`)
        .setDescription(`#${user.pp_rank} (:flag_${user.country.toLowerCase()}: #${user.pp_country_rank})`)
        .setThumbnail(`https://a.ppy.sh/${user.user_id}`)
        .addField("**Stats**", `
        \`Playcount\`: ${formatNumber(user.playcount)}
        \`Accuracy\`: ${new Number(user.accuracy).toFixed(2)}
        \`Ranked Score\`: ${formatNumber(user.ranked_score)}
        \`Total Score\`: ${formatNumber(user.total_score)}
        \`Level\`: ${new Number(user.level).toFixed(0)}
    `)
        .addField("**Ranks**", `<:rankingXH:878812714598797382> \`${user.count_rank_ssh}\` <:rankingX:878812714741403719> \`${user.count_rank_ss}\`  <:rankingSH:878812714758205490> \`${user.count_rank_sh}\` <:rankingS:878812714896592976> \`${user.count_rank_s}\` <:rankingA:878812714552668241> \`${user.count_rank_a}\``)
    message.channel.send(embed)
}