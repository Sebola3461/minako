const { MessageEmbed } = require("discord.js");

exports.run = (message, args) => {
    let msgtime1 = message.createdTimestamp;
    message.channel.send(':purple_heart: :ping_pong: Pinging...')
        .then((msg) => {
            ping = msg.createdTimestamp - msgtime1;
            const embed = new MessageEmbed()
            module.exports = (embed)
                .setColor('#D9A0F3')
                .setDescription(
                    ":purple_heart: :ping_pong: Pong! bot's ping is `" + ping + 'ms`.'
                );
            msg.channel.send(embed);
            message.delete();
        });
}