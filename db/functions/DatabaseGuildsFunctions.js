const { writeFileSync, readFileSync, existsSync } = require("fs")
const configs = require("./../../config/settings.json")
const colors = require("colors")

exports.checkGuildsDatabase = () => {
    if (existsSync(__dirname + "/../guilds.json")) return;
    //this.checkGuild(guildID)

    let db = { guilds: {} }
    writeFileSync(__dirname + "/../guilds.json", JSON.stringify(db), "utf8")
    console.log(`[Database] Guilds database created!`.bgGreen.black)
}

exports.checkGuild = (message) => {
    this.checkGuildsDatabase();
    let guild = readFileSync(__dirname + "/../guilds.json", "utf8");
    guild = JSON.parse(guild).guilds;
    let selectedGuild = guild[message.guild.id];
    if (selectedGuild == undefined) return this.appendNewGuild(message);
}

exports.getGuild = (id) => {
    this.checkGuildsDatabase(id);
    let guilds = readFileSync(__dirname + "/../guilds.json", "utf8");
    guilds = JSON.parse(guilds).guilds
    let selectedGuild = guilds[id];

    return selectedGuild;
}

exports.editGuildRow = (guild, row_name, new_content, message) => {
    this.checkGuildsDatabase(message.guild.id);
    let guildsDatabase = readFileSync(__dirname + "/../guilds.json", "utf8");
    guildsDatabase = JSON.parse(guildsDatabase);
    let selectedGuild = guildsDatabase.guilds[guild];

    selectedGuild[row_name] = new_content;

    writeFileSync(__dirname + "/../guilds.json", JSON.stringify(guildsDatabase), "utf8")
    console.log(`[Database] Guild data changed! ${message.guild.name} (${message.guild.id})`.bgBlue.black)
}

exports.appendNewGuild = (message) => {
    this.checkGuildsDatabase(message.guild.id);
    let guildsDatabase = readFileSync(__dirname + "/../guilds.json", "utf8");
    guildsDatabase = JSON.parse(guildsDatabase);
    let newGuild = {
        "prefix": `${configs.prefix}`,
        "moderation": {
            "channels_allowed": [],
            "channel_not_allowed_message": "Hey, you can't use commands here!",
            "users_commands_whitelist": [],
            "banned_words": [],
            "banned_word_message": "NOOO! DONT SAY THIS AGAIN! BAKA"
        },
        "auditlog": {
            "enabled": false,
            "channel": "",
        },
        "osu": {
            "enable_links": true
        }
    }
    guildsDatabase.guilds[message.guild.id] = newGuild;
    writeFileSync(__dirname + "/../guilds.json", JSON.stringify(guildsDatabase), "utf8")
    console.log(`[Database] New guild added! ${message.guild.name} (${message.guild.id})`.bgGreen.black)
}