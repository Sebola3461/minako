const { MessageEmbed, MessageCollector } = require("discord.js");
const { MinakoDatabase } = require("../../db");
const { MinakoError } = require("../../utils/Errors");
const { testWelcome } = require("./functions/TestWelcome");

// * ==================================== Welcome System ==================================== * //
exports.run = async(message, args) => {

    // * * ========================== Check Arguments and Permissions ========================== * * //

    // * Check user permissions
    if (!message.member.permissions.has("MANAGE_GUILD")) return MinakoError.global.missingPermissions(message, "MANAGE_GUILD");

    // * Remove command name from args
    args.splice(0, 1)

    // * Check args size 
    if (args.length < 1) return MinakoError.global.commandInvalidArguments(message, "welcome `(set/remove)`", "`#channel message/embed_object`", "`#channel {user} Hello! Welcome to {guild}`", "`set` Configure channel and message.\n`remove` Disable system.", "You can use placeholders! See bellow the avaliable placeholders for this command.\n`{user}`: Mention the member\n`{guild}` Show server name\n{name} Show member username.");

    // * Check first arg content
    if (args.length < 2 && !["remove", "set"].includes(args[0])) return MinakoError.global.commandInvalidArguments(message, "welcome `(set/remove)`", "`#channel message/embed_object`", "`#channel {user} Hello! Welcome to {guild}`", "`set` Configure channel and message.\n`remove` Disable system.", "You can use placeholders! See bellow the avaliable placeholders for this command.\n`{user}`: Mention the member\n`{guild}` Show server name\n{name} Show member username.");

    // * Check channel mention & channel type
    if (message.mentions.channels.size == 0 && args[0] != "remove") {
        return MinakoError.welcome.invalidMention(message);
    }

    // * * ========================== Subcommands ========================== * * //

    if (args[0].toLowerCase() == "set") {

        if (message.mentions.channels.first().type != "text") {
            return MinakoError.welcome.invalidMention(message);
        }

        // * Remove "set" from args
        args.splice(0, 1)

        if (args.length == 1) return MinakoError.global.commandInvalidArguments(message, "welcome `(set/remove)`", "`#channel message/embed_object`", "`#channel {user} Hello! Welcome to {guild}`", "`set` Configure channel and message.\n`remove` Disable system.", "You can use placeholders! See bellow the avaliable placeholders for this command.\n`{user}`: Mention the member\n`{guild}` Show server name\n{name} Show member username.");

        // * Params object
        let params = {
            channel: "",
            message: "",
        }

        //* Get current settings
        let currentSettings = MinakoDatabase.guilds.getGuild(message.guild.id);

        // * Check channel
        let checkingChannel = currentSettings["welcome"]["channel"]; // ? get channel object
        if (checkingChannel == message.mentions.channels.first().id) return MinakoError.welcome.duplicatedChannel(message);

        // * Set data
        params.channel = message.mentions.channels.first().id;
        args.splice(0, 1) // * Remove mention from args
        params.message = args.join(" ").trimStart().trimEnd()

        // * Update configuration
        MinakoDatabase.guilds.editGuildRow(message.guild.id, "welcome", params, message);

        const embed = new MessageEmbed()
            .setTitle("Sucess!")
            .setColor('#D9A0F3')
            .setDescription("Done! System updated. You can click on emoji to test!")
            .addField("**Configuration**", `
            \`Channel\`: <#${params.channel}>
            \`Message\`: ${params.message}
            `)
        return message.channel.send(embed).then(m => {
            m.react('☑')

            const filter = (reaction, user) => reaction.emoji.name == '☑' && user.id == message.author.id;
            const collector = m.createReactionCollector(filter, { time: 15000 });
            collector.on('collect', () => testWelcome(m.guild.id, message, "welcome"));
        })
    }

    if (args[0].toLowerCase() == "remove") {

        // * Params object
        let params = {
            channel: "",
            message: "",
        }

        // * Update configuration
        MinakoDatabase.guilds.editGuildRow(message.guild.id, "welcome", params, message);

        const embed = new MessageEmbed()
            .setTitle("Sucess!")
            .setColor('#D9A0F3')
            .setDescription("Done! System updated and disabled")

        return message.channel.send(embed)
    }
}