module.exports = {
    MinakoError: {
        osu: require("./osu/Errors"),
        commandChannel: require("./CommandChannel/Errors"),
        anime: require("./Anime/Errors"),
        activity: require("./Activity/Errors"),
        bannedwords: require("./BannedWords/Errors"),
        welcome: require("./Welcome/Errors"),
        global: require("./GlobalErrors")
    }
}