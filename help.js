const Discord = require("discord.js"); 
const config = require("./config/settings.json");
const embed = new Discord.MessageEmbed()
module.exports = (embed)
    .setColor('#D9A0F3')
	.setTitle('Commands for Minako v20210803.0')
	.setThumbnail('https://cdn.discordapp.com/avatars/694553618397003799/0eba1c26a5f9899de958d87402fbc615.png')
	.setDescription('**[General]:** `help` `ping`')
	.setFooter('(c) 2020-2021 yuki_momoiro722', 'https://cdn.discordapp.com/avatars/694553618397003799/0eba1c26a5f9899de958d87402fbc615.png?');
