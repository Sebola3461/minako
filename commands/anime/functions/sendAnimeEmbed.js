const { MessageEmbed } = require("discord.js")
const { fetchAnime } = require("./SearchAnime")

exports.sendAnimeEmbed = (anime, message) => {
    fetchAnime(anime.id)
    const animeEmbed = new MessageEmbed()
        .setURL(anime.url)
        .setTitle(anime.name)
        .setThumbnail(anime.thumbnail_url)
        .setDescription(``)
        .addField("****")
        .setColor('#D9A0F3')
    message.channel.send(animeEmbed)
}