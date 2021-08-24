const { MessageEmbed } = require("discord.js")

exports.sendAnimeEmbed = (anime, message) => {
    if (anime.source == null) anime.source = "No data.";

    const animeEmbed = new MessageEmbed()
        .setTitle(anime.titles.romaji)
        .setThumbnail(`https://api.minako.moe/anime/${anime.id}/image`)
        .setDescription(anime.synopsis)
        .setColor('#D9A0F3')
        .setFooter("Tags: " + anime.genres.join(", ") + " | " + "Source: " + anime.source)
        .addField("**Rating**", `
        \`Average\`: ${anime.rating.average}
        \`Story\`: ${anime.rating.story}
        \`Visuals\`: ${anime.rating.visuals}
        \`Soundtrack\`: ${anime.rating.soundtrack}
        `, true)
    message.channel.send(animeEmbed)
}