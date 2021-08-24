const { MinakoError } = require("../../utils/errors");

exports.run = (message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD")) return MinakoError.global.missingPermissions(message, "MANAGE_GUILD");

    if (args.length == 1) return
}