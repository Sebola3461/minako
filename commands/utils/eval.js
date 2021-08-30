/**
 * @param {String[]} args 
 */

const { MessageEmbed } = require("discord.js");
const { MinakoDatabase } = require("../../db");
const { MinakoError } = require("../../utils/errors");
let devs = ["556639598172962818", "215330105411633154"]

exports.run = async(message, args, bot) => {
    args = args.join(" ").slice(args[0].length + 1) // * Remove the command name of the string

    if (args == "") return;
    if (!devs.includes(message.author.id)) return;

    let evaled;
    try {
        evaled = await eval(args);
        evaled = require('util').inspect(evaled, { depth: -1 });
        message.channel.send({
            embed: {
                title: "EVAL",
                color: "#09f47b",
                fields: [{
                        name: "Input:",
                        value: "`" + args + "`"
                    },
                    {
                        name: "Result:",
                        value: "`" + evaled + "`"
                    }
                ]
            }
        });
    } catch (error) {
        message.reply({
            embed: {
                color: "#f40940",
                description: "🖨️ - __**Terminal**__\n`" + error + "`"
            }
        });
    }
}