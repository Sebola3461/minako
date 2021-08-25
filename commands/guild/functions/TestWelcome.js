const { MinakoDatabase } = require("../../../db");
const { parseMessage } = require("../../../utils/Placeholders/PlaceholderManager");

exports.testWelcome = (guildID, message) => {
    let welcome = MinakoDatabase.guilds.getGuild(guildID)["welcome"];
    let welcomeMessage = welcome["message"];
    welcomeMessage = parseMessage(welcomeMessage, message);

    message.guild.channels.cache.get(welcome["channel"]).send(welcomeMessage)
}