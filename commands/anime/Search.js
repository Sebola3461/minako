const { MessageEmbed, MessageCollector } = require("discord.js");
const { MinakoError } = require("../../utils/errors");
const { sendAnimeEmbed } = require("./embeds/AnimeEmbed");
const { searchAnime, fetchAnime } = require("./functions/FetchAnime");

exports.run = (message, args) => {
    if (args.length == 1) return MinakoError.global.commandInvalidArguments(message, "animesearch", "`anime name`", "`Touhou`");

    args.splice(0, 1);

    const searchResult = searchAnime(args.join(" "));

    searchResult.then(result => {
        if (result.length == 0) return MinakoError.anime.notFoundSearch(message, args.join(" "));
        let resultSize = result.length;
        if (resultSize > 10) resultSize = 10;
        let filterArgs = []

        const embed = new MessageEmbed()
            .setTitle("Anime search results for " + `"${args.join(" ")}"`)
            .setDescription("Type the number to select the anime\n\n")
            .setColor('#D9A0F3');

        for (let i = 0; i < resultSize; i++) {
            filterArgs.push(new String(i + 1).valueOf())
            embed.description = embed.description.concat(`**${i+1}** :small_blue_diamond: __${result[i].title}__\n\n`)
        }

        const filter = (m) => m.content;
        const collector = new MessageCollector(message.channel, filter, { time: 50000, max: 1 });

        collector.on('collect', m => {
            if (!filterArgs.includes(m.content)) return;
            const index = new Number(m.content);
            fetchAnime(result[index - 1].id).then(anime => {
                return sendAnimeEmbed(anime, message);
            })
        });

        message.channel.send(embed)
    })
}