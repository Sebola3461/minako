module.exports = {
    help: require("./utils/help"),
    eval: require("./utils/eval"),
    ping: require("./utils/ping"),
    commandchannel: require("./guild/CommandChannel"),
    animesearch: require("./anime/Search"),
    setprefix: require("./guild/SetPrefix"),
    osuplayer: require("./osu/Player"),
    osuset: require("./osu/SetConfigs")
}