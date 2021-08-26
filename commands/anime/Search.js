const { MessageEmbed, MessageCollector } = require("discord.js");
const { MinakoError } = require("../../utils/errors");
const { sendAnimeEmbed } = require("./embeds/AnimeEmbed");
const { searchAnime, fetchAnime } = require("./functions/FetchAnime");

exports.run = async(message, args) => {
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
            .setFooter("You have 10s to select")
            .setColor('#D9A0F3');

        for (let i = 0; i < resultSize; i++) {
            filterArgs.push(new String(i + 1).valueOf())
            embed.description = embed.description.concat(`**${i+1}** :small_blue_diamond: __${result[i].title}__\n\n`)
        }

        const filter = (m) => m.content;
        const collector = new MessageCollector(message.channel, filter, { time: 10000, max: 1 });

        let collected = false;
        collector.on('collect', m => {
            if (!filterArgs.includes(m.content)) return;
            collected = true;
            const index = new Number(m.content);
            fetchAnime(result[index - 1].id).then(anime => {
                return sendAnimeEmbed(anime, message);
            })
        }).on("end", () => {
            if (collected == true) return;
            message.channel.send(`${message.author} | You kept me waiting too long. This is not polite at all! Run the command again to use it.`)
        })

        message.channel.send(embed)
    })
}