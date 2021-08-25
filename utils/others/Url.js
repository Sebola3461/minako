/**
 * @param {String} message_content 
 */

const { MinakoUtils } = require("..");

exports.checkUrl = (message) => {
    if (!message.content.includes("https://")) return;
    let url = message.content.split(" ")
    url = url.find(arg => arg.startsWith("https://"));

    if (url.includes("https://osu.ppy.sh")) return MinakoUtils.osu.parseURL(url, message);
}