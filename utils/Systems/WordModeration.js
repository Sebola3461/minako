const { MinakoDatabase } = require("../../db");
const { parseMessage } = require("../Placeholders/PlaceholderManager");

exports.analyseMessage = (message) => {
    if (message.member.permissions.has("MANAGE_MESSAGES", "MANAGE_GUILD", "ADMIN", "MANAGE_CHANNELS")) return {
        code: 200
    };

    let messageArgs = message.content.split(" ")
    let moderationSettings = MinakoDatabase.guilds.getGuild(message.guild.id)
    moderationSettings = moderationSettings["moderation"]

    let checkPass = 0;
    messageArgs.forEach(word => {
        let check = moderationSettings["banned_words"].includes(word);
        if (check == true) return checkPass++;
    });

    if (checkPass == 0) return {
        code: 200,
        message: ""
    }

    if (checkPass == 0) return;
    let modMessage = parseMessage(moderationSettings["banned_word_message"], message);
    message.delete()
    message.channel.send(modMessage)
    return {
        code: 401,
        message: modMessage
    }
}