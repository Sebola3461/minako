const { MessageEmbed, MessageCollector } = require("discord.js");
const { MinakoError } = require("../../utils/errors");
const { sendCharacterEmbed } = require("./embeds/CharacterEmbed");
const { searchCharacter, fetchCharacter } = require("./functions/FetchAnime");

exports.run = (message, args) => {
    if (args.length == 1) return MinakoError.global.commandInvalidArguments(message, "animecharacter", "`Character Name`", "`Reimu Hakurei`");


    args.splice(0, 1);

    const searchResult = searchCharacter(args.join(" "));

    searchResult.then(result => {
        if (result.length == 0) return MinakoError.anime.notFoundSearch(message, args.join(" "));
        let resultSize = result.length;
        if (resultSize > 10) resultSize = 10;
        let filterArgs = []

        const embed = new MessageEmbed()
            .setTitle("Character search results for " + `"${args.join(" ")}"`)
            .setDescription("Type the number to select the character\n\n")
            .setColor('#D9A0F3');

        for (let i = 0; i < resultSize; i++) {
            filterArgs.push(new String(i + 1).valueOf())
            embed.description = embed.description.concat(`**${i+1}** :small_blue_diamond: __${result[i].name}__\n\n`)
        }

        const filter = (m) => m.content;
        const collector = new MessageCollector(message.channel, filter, { time: 50000, max: 1 });

        collector.on('collect', m => {
            if (!filterArgs.includes(m.content)) return;
            const index = new Number(m.content);
            console.log(m)
            return fetchCharacter(result[index - 1].id).then(character => {
                sendCharacterEmbed(character, message)
            })
        });

        message.channel.send(embed)
    })
}