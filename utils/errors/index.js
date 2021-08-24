module.exports = {
    MinakoError: {
        osu: require("./osu/Errors"),
        commandChannel: require("./CommandChannel/Errors"),
        anime: require("./Anime/Errors"),
        global: require("./GlobalErrors")
    }
}