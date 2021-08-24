const { MessageEmbed } = require("discord.js")
const { MinakoError } = require("../../utils/errors")
const { fetchActivity } = require("./functions/FetchActivity")

exports.run = (message, args) => {
    // Youtube / Poker / Chees / 
    let activityIDs = ["755600276941176913", "755827207812677713", "832012774040141894"]

    if (args.length < 3 && message.mentions.channels.size < 1) return MinakoError.global.commandInvalidArguments(message, "activity", "`activity-name` `#!channel`", "`activity` `youtube` `#!voice1`", "Avaliable activities:\n`youtube` Watch youtube with your friends!\n`chees` Chees with your friends!\n`poker` Play poker with your friends!");
    if (message.mentions.channels.first().type != "GUILD_VOICE") return MinakoError.activity.incorrectChannelType(message);

    const embed = new MessageEmbed()
        .setColor('#D9A0F3')

    if (args[1] == "youtube") {
        let channelID = message.mentions.channels.first().id
        fetchActivity(activityIDs[0], channelID).then(invite => {
            embed.setTitle("YouTube Together")
            embed.setThumbnail("https://cdn.discordapp.com/app-icons/755600276941176913/4e0fd3bf009282c0ecd1fb010e621f28.webp?size=64&keep_aspect_ratio=false")
            embed.setDescription(`[Join in activity!](https://discord.gg/${invite.code})`)
            message.channel.send(embed)
        })
    }

    if (args[1] == "poker") {
        let channelID = message.mentions.channels.first().id
        fetchActivity(activityIDs[1], channelID).then(invite => {
            embed.setTitle("Poker Night")
            embed.setThumbnail("https://cdn.discordapp.com/app-icons/755827207812677713/e594da3ca4520c7edde5b59948e97cdc.webp?size=64&keep_aspect_ratio=false")
            embed.setDescription(`[Join in activity!](https://discord.gg/${invite.code})`)
            message.channel.send(embed)
        })
    }

    if (args[1] == "chess") {
        let channelID = message.mentions.channels.first().id
        fetchActivity(activityIDs[2], channelID).then(invite => {
            embed.setTitle("Chess in the Park")
            embed.setThumbnail("https://cdn.discordapp.com/app-icons/832012774040141894/3b3981ddf67c8702920fae10b5f123ed.webp?size=64&keep_aspect_ratio=false")
            embed.setDescription(`[Join in activity!](https://discord.gg/${invite.code})`)
            message.channel.send(embed)
        })
    }
}