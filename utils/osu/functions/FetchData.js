const fetch = require("node-fetch")
const { sendOsuBeatmapEmbed } = require("../messages/Beatmap")
const { sendOsuPlayerEmbed } = require("../messages/Player")
const { osu_api_key } = require("./../../../config/settings.json")

exports.fetchOsuPlayer = (id, mode, message) => {
    fetch(`https://osu.ppy.sh/api/get_user?u=${id}&m=${mode.code}&k=${osu_api_key}`, {
        accept: "application/json"
    }).then(r => {
        return r.json()
    }).then(data => {
        data = data[0]
        sendOsuPlayerEmbed(data, mode, message)
    })
}

exports.fetchMapDiff = (params, message) => {
    fetch(`https://osu.ppy.sh/api/get_beatmaps?s=${params.id}&k=${osu_api_key}`, {
        accept: "application/json"
    }).then(r => {
        return r.json()
    }).then(data => {
        sendOsuBeatmapEmbed(data, params.mode, message)
    })
}