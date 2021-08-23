const { fetchOsuPlayer } = require("./functions/FetchData")
const ModesList = require("./../../commands/osu/rulesets/ModesList.json")

exports.parseURL = (url, message) => {
    url = url.slice("https://osu.ppy.sh/".length).trimStart().trimEnd().split("/");
    if (url[url.length - 1] == "") url.pop()

    // * Check the url path
    if (url[0].startsWith("u") || url[0].startsWith("users")) {
        let params = {
            user: "",
            mode: ModesList["osu"],
        }

        if (url.length == 2) {
            params.user = url[1];
        }

        if (url.length == 3) {
            params.user = url[1];
            params.mode = ModesList[url[2]]
        }

        fetchOsuPlayer(params.user, params.mode, message)
    }
}