const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");
const { MinakoError } = require("../../utils/errors");

exports.run = (message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD")) return MinakoError.global.missingPermissions(message, "MANAGE_GUILD");

    console.log(args)
    if (args.length == 1) return MinakoError.global.commandInvalidArguments(message, "bannedwords `(add/remove/removeall/list/setmessage)`", "`word1 word2 word3`", "`banana pagayo keyboard`", "`add` Add a word (or more) to system.\n`remove` Remove a word (or more) to system.\n`list` See a list of banned words (Dont't need args)\n`setmessage` Set alert the message.");
    if (!["list", "removeall", "setmessage", "add", "remove", ].includes(args[0])) return MinakoError.global.commandInvalidArguments(message, "bannedwords `(add/remove/removeall/list/setmessage)`", "`word1 word2 word3`", "`banana pagayo keyboard`", "`add` Add a word (or more) to system.\n`remove` Remove a word (or more) to system.\n`removeall` Remove all words to the system. (Dont't need args)\n`list` See a list of banned words (Dont't need args)\n`setmessage` Set alert the message.");
    if (args[0].toLowerCase() == "add") {
        args.splice(0, 1)
        let currentSettings = MinakoDatabase.guilds.getGuild(message.guild.id);
        let newSettings = currentSettings["moderation"];

        let processedWords = 0;
        args.forEach(word => {
            let checkingWord = currentSettings["moderation"]["banned_words"].includes(word);

            if (checkingWord == true) return;
            processedWords++;
        });

        if (processedWords < 1) return MinakoError.bannedwords.duplicatedSingleWord(message);

        for (let i = 0; i < args.length; i++) {
            newSettings["banned_words"].push(args[i])
        }

        MinakoDatabase.guilds.editGuildRow(message.guild.id, "moderation", newSettings, message);

        if (args.length == 1) {
            const embed = new MessageEmbed()
                .setTitle("Sucess!")
                .setColor('#D9A0F3')
                .setDescription("Word added! Members without the `MANAGE_MESSAGES` permission can't say this word.")
            return message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
                .setTitle("Sucess!")
                .setColor('#D9A0F3')
                .setDescription("Words added! Members without the `MANAGE_MESSAGES` permission can't say these words.")
            return message.channel.send(embed)
        }
    }

    if (args[0].toLowerCase() == "remove") {
        args.splice(0, 1)
        let currentSettings = MinakoDatabase.guilds.getGuild(message.guild.id);
        let newSettings = currentSettings["moderation"];

        let processedWords = 0;
        args.forEach(word => {
            let checkingWord = currentSettings["moderation"]["banned_words"].includes(word);

            if (checkingWord == false) return;
            return processedWords++;
        });

        if (processedWords == 0) return MinakoError.bannedwords.duplicatedSingleWord(message)

        for (let i = 0; i < args.length; i++) {
            let index = newSettings["banned_words"].findIndex(word => word == args[i]);
            newSettings["banned_words"].splice(index, 1)
        }

        MinakoDatabase.guilds.editGuildRow(message.guild.id, "moderation", newSettings, message);

        if (args.length == 2) {
            const embed = new MessageEmbed()
                .setTitle("Sucess!")
                .setColor('#D9A0F3')
                .setDescription("Word added! Members without the `MANAGE_MESSAGES` permission can say this word again!")
            return message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
                .setTitle("Sucess!")
                .setColor('#D9A0F3')
                .setDescription("Words added! Members without the `MANAGE_MESSAGES` permission can say these words again!")
            return message.channel.send(embed)
        }
    }

    if (args[0].toLowerCase() == "removeall") {
        args.splice(0, 1)
        let currentSettings = MinakoDatabase.guilds.getGuild(message.guild.id);
        let moderationSettings = currentSettings["moderation"];

        if (moderationSettings["banned_words"].length == 0) return MinakoError.bannedwords.duplicatedSingleWord(message);

        moderationSettings["banned_words"] = []

        MinakoDatabase.guilds.editGuildRow(message.guild.id, "moderation", moderationSettings, message);

        const embed = new MessageEmbed()
            .setTitle("Sucess!")
            .setColor('#D9A0F3')
            .setDescription("All words are allowed now!")
        return message.channel.send(embed)
    }

    if (args[0].toLowerCase() == "setmessage") {
        args.splice(0, 1)
        if (args.length == 0) return MinakoError.global.commandInvalidArguments(message, "bannedwords `setmessage`", "`message`", "`{user} Don't say this here!`", "You can use placeholders! See bellow a list of avaliable placeholders for this command:\n`{user}` Mention the user");
        let currentSettings = MinakoDatabase.guilds.getGuild(message.guild.id);
        let moderationSettings = currentSettings["moderation"];

        let newMessage = args.join(" ")

        moderationSettings["banned_word_message"] = newMessage;

        MinakoDatabase.guilds.editGuildRow(message.guild.id, "moderation", moderationSettings, message);

        const embed = new MessageEmbed()
            .setTitle("Sucess!")
            .setColor('#D9A0F3')
            .setDescription("The new alert message is `" + newMessage + "` now!")
        return message.channel.send(embed)
    }

    if (args[0].toLowerCase() == "list") {
        args.splice(0, 1)
        let currentSettings = MinakoDatabase.guilds.getGuild(message.guild.id);
        const prefix = MinakoDatabase.guilds.getGuild(message.guild.id).prefix;
        currentSettings = currentSettings["moderation"]["banned_words"];

        const embed = new MessageEmbed()
            .setDescription("")
            .setColor('#D9A0F3')

        if (currentSettings.length == 0) {
            embed.setTitle("Current banned words")
            embed.setDescription(`Nothing here... Use \`${prefix}bannedwords add\` to add a word.`)
            return message.channel.send(embed);
        }

        for (let i = 0; i < currentSettings.length; i++) {
            embed.description = embed.description.concat(`**${i+1}** ● ${currentSettings[i]}\n`)
        }

        embed.setTitle("Current banned words")
        message.channel.send(embed)
    }
}