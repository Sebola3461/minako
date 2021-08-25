module.exports = {
    help: require("./utils/help"),
    eval: require("./utils/eval"),
    ping: require("./utils/ping"),
    commandchannel: require("./guild/CommandChannel"),
    animesearch: require("./anime/Search"),
    animecharacter: require("./anime/CharacterSearch"),
    activity: require("./activity/Start"),
    "8ball": require("./fun/8ball.js"),
    setprefix: require("./guild/SetPrefix"),
    osuplayer: require("./osu/Player"),
    osuset: require("./osu/SetConfigs")
}