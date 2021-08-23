const { MessageEmbed } = require("discord.js")
const { formatNumber } = require("./../../../commands/osu/functions/FormatNumber")

exports.sendOsuPlayerEmbed = (user, mode, message) => {
    const embed = new MessageEmbed()
        .setColor('#D9A0F3')
        .setTitle(`osu!${mode.name} stats for ${user.username}`)
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
}