/**
 * @param {String} guildID 
 * @param {String} channelID 
 */

const { readFileSync } = require("fs")
const { MinakoDatabase } = require("../../../db");
const { MinakoError } = require("../../../utils/errors");

exports.addCommandChannel = (message, guildID, channelID) => {
    const currentData = MinakoDatabase.guilds.getGuild(guildID);
    let currentModerationSettings = currentData.moderation;
    let commandChannels = currentModerationSettings["channels_allowed"];

    if (commandChannels.includes(channelID)) return {
        code: 401
    }
    commandChannels.push(channelID)
    currentModerationSettings["channels_allowed"] = commandChannels;
    MinakoDatabase.guilds.editGuildRow(guildID, "moderation", currentModerationSettings, message)

    return {
        code: 200
    }
}

exports.removeCommandChannel = (message, guildID, channelID) => {
    const currentData = MinakoDatabase.guilds.getGuild(guildID);
    let currentModerationSettings = currentData.moderation;
    let commandChannels = currentModerationSettings["channels_allowed"];

    if (!commandChannels.includes(channelID)) return {
        code: 401
    };
    let channelIndex = commandChannels.findIndex(channel => channel == channelID);
    commandChannels.splice(channelIndex, 1)
    currentModerationSettings["channels_allowed"] = commandChannels;

    MinakoDatabase.guilds.editGuildRow(guildID, "moderation", currentModerationSettings, message)
    return {
        code: 200
    }
}

exports.returnCommandChannels = (guildID) => {
    const currentData = MinakoDatabase.guilds.getGuild(guildID);
    let commandChannels = currentData["moderation"]["channels_allowed"];
    return commandChannels;
}