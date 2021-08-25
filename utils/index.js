/**
 * * Export this 
 */

module.exports = {
    MinakoUtils: {
        osu: require("./osu/OsuUtils"),
        placeholders: require("./Placeholders/PlaceholderManager"),
        bannedwords: require("./Systems/WordModeration")
    }
}