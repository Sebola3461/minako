const { MinakoDatabase } = require("../../db");
const { parseMessage } = require("../Placeholders/PlaceholderManager");

exports.sendWelcome = (member) => {
    let welcome = MinakoDatabase.guilds.getGuild(member.guild.id)["welcome"];
    let welcomeMessage = welcome["message"];
    welcomeMessage = parseMessage(welcomeMessage, member);

    if (welcome["channel"] == "") return;
    member.guild.channels.cache.get(welcome["channel"]).send(welcomeMessage)
}

exports.sendBye = (member) => {
    let bye = MinakoDatabase.guilds.getGuild(member.guild.id)["bye"];
    let byeMessage = bye["message"];
    byeMessage = parseMessage(byeMessage, member);

    if (bye["channel"] == "") return;
    member.guild.channels.cache.get(bye["channel"]).send(byeMessage)
}