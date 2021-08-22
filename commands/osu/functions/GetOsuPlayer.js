const fetch = require("node-fetch");
const { osu_api_key } = require("../../../config/settings.json")

exports.getOsuPlayer = (params) => {
    let user = fetch(`https://osu.ppy.sh/api/get_user?k=${osu_api_key}&u=${params.username}&m=${params.mode}`, {
        method: "GET"
    })

    return user.then(r => {
        return r.json();
    }).then(d => {
        return d;
    })
}