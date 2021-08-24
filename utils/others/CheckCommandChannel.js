const { MinakoDatabase } = require("../../db")


exports.channel = (message) => {
    const db = MinakoDatabase.guilds.getGuild(message.guild.id);
    const notAllowedMessage = db.moderation["channel_not_allowed_message"];

    if (!db.moderation["channels_allowed"].includes(message.channel.id) && db.moderation["channels_allowed"] != "") {
        return {
            code: 400,
            message: notAllowedMessage
        }
    } else {
        return {
            code: 200,
        }
    }
}