const fetch = require("node-fetch")
const { discord_token } = require("./../../../config/settings.json")

exports.fetchActivity = (activity_id, channelID) => {
    let act = fetch(`https://discord.com/api/v8/channels/${channelID}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: activity_id,
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${discord_token}`,
            "Content-Type": "application/json"
        }
    })

    return act.then(r => {
        return r.json()
    }).then(data => {
        return data;
    })
}