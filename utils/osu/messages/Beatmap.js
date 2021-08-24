const { MessageEmbed, MessageAttachment } = require("discord.js")
const { formatNumber } = require("./../../../commands/osu/functions/FormatNumber");
const request = require('request').defaults({ encoding: null });

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

exports.sendOsuBeatmapEmbed = (map, mode, message) => {
    map = map.sort((a, b) => b.difficultyrating - a.difficultyrating)

    request.get(`https://b.ppy.sh/preview/${map[0].beatmapset_id}.mp3`, function(err, res, body) {
        const embed = new MessageEmbed()
            .setColor('#D9A0F3')
            .setTitle(`${map[0].artist} - ${map[0].title} by ${map[0].creator}`)
            .setDescription(`**osu!direct**: [:inbox_tray:](https://osu.ppy.sh/d/${map[0].beatmapset_id}) **beatconnect**: [:inbox_tray:](https://beatconnect.io/b/${map[0].beatmapset_id}/) | \`Duration\`: ${calcBeatmapDuration(map[0].total_length)} \n\n`)
            .setURL(`https://osu.ppy.sh/s/${map[0].beatmapset_id}`)
            .setImage(`https://assets.ppy.sh/beatmaps/${map[0].beatmapset_id}/covers/cover.jpg?${map[0].beatmapset_id}`)

        for (let i = 0; i < map.length; i++) {
            embed.description = embed.description.concat(`:mango: [**${map[i].version}**](https://osu.ppy.sh/beatmapsets/${map[i].beatmapset_id}#taiko/${map[i].beatmap_id}) (⭐ ${new Number(map[i].difficultyrating).toFixed(2)})
            \`OD\`: ${map[i].diff_overall} ● \`HP\`: ${map[i].diff_drain} ● \`AR\`: ${map[i].diff_approach} ● \`Max Combo\`: ${map[i].max_combo}x\n
            `)
        }
        embed.attachFiles(new MessageAttachment(body, "Beatmap_Preview.mp3"))
        message.channel.send(embed)
    })
}

function calcBeatmapDuration(seconds) {
    let n = new Number(seconds / 60);
    n = n.toFixed(2)
    n = n.toString().replace(".", ":")
    return n;
}