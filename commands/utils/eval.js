/**
 * @param {String[]} args 
 */

const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");
const { MinakoError } = require("../../utils/errors");
let devs = ["556639598172962818", "215330105411633154"]

exports.run = (message, args, bot) => {
    args = args.join(" ").slice(args[0].length + 1) // * Remove the command name of the string
    if (args == "") return;
    if (!devs.includes(message.author.id)) return;
    try {
        let evaluate = eval(args);
        evaluate.then(r => {
            let embed = new MessageEmbed()
                .setTitle("Eval")
                .setDescription(r)
                .setColor("#09f47b")

            message.channel.send(embed)
        })
    } catch (e) {
        let embed = new MessageEmbed()
            .setTitle("Eval Error")
            .setDescription(e)
            .setColor("#f40940")

        message.channel.send(embed)
    }
}