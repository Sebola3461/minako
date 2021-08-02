const Discord = require('discord.js');
const settings = require('./settings.json');
const bot = new Discord.Client();

bot.on('ready', () => {
   console.log("READY!");
   bot.user.setActivity("with my master");
});

bot.on('message', msg => {
   if (msg.content.startsWith(`${settings.prefix}ping`)) {
     return msg.reply('pong!');
   }
   else if (msg.content === 'sora wo kakeru you na') {
      return msg.channel.send('kokoro wo te ni shiyou ka');
    }
   else if (msg.content === 'kaze no hikaru tsubu') {
      return msg.channel.send('subete ga mieru you na');
    }
 });
bot.login(settings.discord_token);
