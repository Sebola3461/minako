const { MessageEmbed, ReactionCollector } = require("discord.js");
const { MinakoError } = require("../../utils/errors");
const { searchAnime } = require("./functions/SearchAnime");
const { sendAnimeEmbed } = require("./functions/sendAnimeEmbed");

exports.run = (message, args) => {
    let messageContent = args.join(" ").slice(args[0].length)
    if (args.length == 1) return MinakoError.animeMissingArguments(message);

    searchAnime(messageContent).then(animes => {
        animes = animes.categories[0].items;

        const searchEmbed = new MessageEmbed()
            .setTitle("Anime Search")
            .setColor('#D9A0F3')
            .setDescription("**Use the emojis to select the anime**\n\n")

        for (let i = 0; i < animes.length; i++) {
            searchEmbed.description = searchEmbed.description.concat(`**(${i+1})** - ${animes[i].name}\n`)
        }

        let emotesReactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

        message.channel.send(searchEmbed).then(msg => {
            for (let i = 0; i < animes.length; i++) {
                msg.react(emotesReactions[i])
                let collector = new ReactionCollector(msg, (reaction, user) => reaction.emoji.name === emotesReactions[i] && user.id === message.author.id, {
                    max: 1
                })
                collector.on('collect', m => {
                    let selectedAnime = animes[emotesReactions.findIndex(emoji => emoji == m.emoji.name)];
                    if (selectedAnime == undefined) return;

                    collector.stop()
                    sendAnimeEmbed(selectedAnime, message)
                });
            }
        })
    })
}