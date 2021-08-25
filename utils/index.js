/**
 * * Export this 
 */

module.exports = {
    MinakoUtils: {
        osu: require("./Osu/OsuUtils"),
        placeholders: require("./Placeholders/PlaceholderManager"),
        bannedwords: require("./Systems/WordModeration"),
        welcomer: require("./Systems/Welcomer")
    }
}