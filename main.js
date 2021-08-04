const Discord = require('discord.js');
const { chmod } = require('fs');
const settings = require('./config/settings.json');
const bot = new Discord.Client();
const embed = require('./minakoembed.js') 

bot.on('ready', () => {
   console.log("READY!");
   bot.user.setActivity("with my master | m+help");
   });
bot.on('message', async message=>0);
   { // declares a message can happen
     var messagecount
     messagecount = 0;
   }
// Bunch of commands here
   bot.on('message', msg => {
   if (msg.content.startsWith(`${settings.prefix}help`)) {
         let richembed = require('./help.js');
         msg.channel.send({embed: richembed}); 
   }
   else if (msg.content.startsWith(`${settings.prefix}ping`)) {
      return msg.channel.send(":ping_pong: :purple_heart: pong!");
    }
// Jokes
   else if (msg.content === 'sora wo kakeru you na') {
      return msg.channel.send("kokoro wo te ni shiyou ka");
    }
   else if (msg.content === '76 keys') {
      return msg.channel.send("nanajuuroku-nin no yousei");
    }
   else if (msg.content === 'minakoping') {
      return msg.channel.send("<:minakoPing:776778137102975028>");
    }
});

bot.login(settings.discord_token);
