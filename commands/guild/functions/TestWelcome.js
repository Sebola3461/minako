const { MinakoDatabase } = require("../../../db");
const { parseMessage } = require("../../../utils/Placeholders/PlaceholderManager");

exports.testWelcome = (message, system) => {
    let welcome = MinakoDatabase.guilds.getGuild(message.guild.id)[system];
    let welcomeMessage = welcome["message"];
    welcomeMessage = parseMessage(welcomeMessage, message.member);

    message.guild.channels.cache.get(welcome["channel"]).send(welcomeMessage)
}