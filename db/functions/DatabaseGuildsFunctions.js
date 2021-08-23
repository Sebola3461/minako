const { writeFileSync, readFileSync, existsSync } = require("fs")
const colors = require("colors")

exports.checkGuildsDatabase = () => {
    if (existsSync(__dirname + "/../guilds.json") == true) return;

    let db = { guilds: {} }
    writeFileSync(__dirname + "/../guilds.json", JSON.stringify(db), "utf8")
    console.log(`[Database] Guilds database created!`.bgGreen.black)
}

exports.checkGuild = (message) => {
    this.checkGuildDatabase();
    let guild = require(__dirname + "/../guilds.json").guilds;
    let selectedGuild = guild[message.guild.id];
    if (selectedGuild == undefined) return this.appendNewUser(message);
}

exports.getGuild = (id) => {
    this.checkUsersDatabase();
    let guilds = require(__dirname + "/../guilds.json").guilds;
    let selectedGuild = guilds[id];
    return selectedGuild;
}