const { fetchOsuPlayer, fetchMapDiff } = require("./functions/FetchData")
const ModesList = require("../../commands/osu/rulesets/ModesList.json")


// https://osu.ppy.sh/beatmapsets/1394539#taiko/2907358
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

    if (url[0].startsWith("s") || url[0].startsWith("beatmapsets")) {
        if (url.length == 3 && url[1].includes("#")) {
            let beatmapParams = url[1];
            beatmapParams = beatmapParams.split("#")
            beatmapParams = {
                id: beatmapParams[0],
                mode: beatmapParams[1],
                diffId: url[2]
            }
            fetchMapDiff(beatmapParams, message)
        }
    }
}