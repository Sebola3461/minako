const { writeFileSync, readFileSync, existsSync } = require("fs")
const colors = require("colors")

exports.checkUsersDatabase = () => {
    if (existsSync(__dirname + "/../users.json") == true) return;

    let db = { users: {} }
    writeFileSync(__dirname + "/../users.json", JSON.stringify(db), "utf8")
    console.log(`[Database] Users database created!`.bgGreen.black)
}

exports.checkUser = (message) => {
    this.checkUsersDatabase();
    let users = readFileSync(__dirname + "/../users.json", "utf8");
    users = JSON.parse(users).users;
    let selectedUser = users[message.author.id];
    if (selectedUser == undefined) return this.appendNewUser(message);
}

exports.getUser = (id) => {
    this.checkUsersDatabase();
    let users = readFileSync(__dirname + "/../users.json", "utf8");
    users = JSON.parse(users).users;
    let selectedUser = users[id];
    return selectedUser;
}

exports.editUserRow = (user, row_name, new_content, message) => {
    this.checkUsersDatabase();
    let usersDatabase = readFileSync(__dirname + "/../users.json", "utf8");
    usersDatabase = JSON.parse(usersDatabase);
    let selectedUser = usersDatabase.users[user];

    selectedUser[row_name] = new_content;

    writeFileSync(__dirname + "/../users.json", JSON.stringify(usersDatabase), "utf8")
    console.log(`[Database] User data changed! ${message.author.tag} (${message.author.id})`.bgBlue.black)
}

exports.appendNewUser = (message) => {
    this.checkUsersDatabase();
    let usersDatabase = readFileSync(__dirname + "/../users.json", "utf8");
    usersDatabase = JSON.parse(usersDatabase);
    let newUser = {
        "banned": false,
        "osu": {
            "username": "",
            "mode": 0
        },
        "social": {
            "banner": "",
            "xp": 0,
            "level": 0,
            "about": "Hello! Im a cute person."
        }
    }
    usersDatabase.users[message.author.id] = newUser;
    writeFileSync(__dirname + "/../users.json", JSON.stringify(usersDatabase), "utf8")
    console.log(`[Database] New user added! ${message.author.tag} (${message.author.id})`.bgGreen.black)
}