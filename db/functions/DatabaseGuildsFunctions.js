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

exports.editGuildRow = (user, row_name, new_content, message) => {
    this.checkUsersDatabase();
    let usersDatabase = readFileSync(__dirname + "/../users.json", "utf8");
    usersDatabase = JSON.parse(usersDatabase);
    let selectedUser = usersDatabase.users[user];

    selectedUser[row_name] = new_content;

    writeFileSync(__dirname + "/../users.json", JSON.stringify(usersDatabase), "utf8")
    console.log(`[Database] User data changed! ${message.author.tag} (${message.author.id})`.bgYellow)
}

exports.appendNewGuild = (message) => {
    this.checkDatabase();
    let guildsDatabase = readFileSync(__dirname + "/../guilds.json", "utf8");
    guildsDatabase = JSON.parse(guildsDatabase);
    let newGuild = {
        "prefix": "",
        "moderation": {
            "channels_allowed": [],
            "users_commands_whitelist": [],
            "banned_words": []
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