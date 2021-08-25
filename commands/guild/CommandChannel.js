const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");
const { MinakoError } = require("../../utils/errors")
const { addCommandChannel, removeCommandChannel, returnCommandChannels } = require("./functions/CommandChannel")

exports.run = async(message, args) => {
    if (args.length < 3 && args[1] != "list") return MinakoError.commandChannel.invalidArgs(message, "commandchannel", "`(add/remove/list)` `#channel-to-allow-command`", "`add` `#commands`");

    if ((!args[1] == "add" || !args[1] == "remove") == true) return MinakoError.commandChannel.invalidArgs(message, "commandchannel", "`(add/remove)` `#channel-to-allow-command`", "`add` `#commands`", "`list` option don't need a mentioned channel");

    if (args[1] == "add") {
        if (message.mentions.channels.size == 0) return MinakoError.commandChannel.invalidArgs(message);

        const action = addCommandChannel(message, message.guild.id, message.mentions.channels.first().id)
        if (action.code != 200) return MinakoError.commandChannel.channelDuplicated(message)

        const currentChannels = returnCommandChannels(message.guild.id);

        if (currentChannels.length == 1) {
            const embed = new MessageEmbed()
                .setTitle("Sucess!")
                .setColor('#D9A0F3')
                .setDescription(`Channel added! Now, members **only** can use commands in ${message.mentions.channels.first()}`)
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
                .setTitle("Sucess!")
                .setColor('#D9A0F3')
                .setDescription(`Channel added! Now, members can use commands in ${message.mentions.channels.first()} too!`)
            message.channel.send(embed)
        }
    }

    if (args[1] == "remove") {
        if (message.mentions.channels.size == 0) return MinakoError.global.commandChannelInvalidArgs(message);
        const action = removeCommandChannel(message, message.guild.id, message.mentions.channels.first().id)
        if (action.code != 200) return MinakoError.commandChannel.channelNotFound(message)


        const currentChannels = returnCommandChannels(message.guild.id);

        if (currentChannels.length == 0) {
            const embed = new MessageEmbed()
                .setTitle("Sucess!")
                .setColor('#D9A0F3')
                .setDescription(`Channel added! Now, members can use commands in all channels!`)
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
                .setTitle("Sucess!")
                .setColor('#D9A0F3')
                .setDescription(`Channel added! Now, members can't use commands in ${message.mentions.channels.first()} anymore!`)
            message.channel.send(embed)
        }
    }

    if (args[1] == "list") {
        const action = returnCommandChannels(message.guild.id);
        const prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;

        if (action.length == 0) {
            const embed = new MessageEmbed()
                .setTitle("Current channels that can be used commands")
                .setColor('#D9A0F3')
                .setDescription(`Nothing here... Use \`${prefix}commandchannel add\` to add a channel.`)
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
                .setTitle("Current channels that can be used commands")
                .setColor('#D9A0F3')
                .setDescription(`**#channel** (ID)\n\n`);

            for (let i = 0; i < action.length; i++) {
                embed.description = embed.description.concat(`**${i+1}** ● <#${action[i]}> (${action[i]})\n`)
            }

            message.channel.send(embed)
        }
    }
}