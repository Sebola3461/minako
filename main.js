const Discord = require('discord.js');
const { chmod } = require('fs');
const settings = require('./config/settings.json');
const bot = new Discord.Client();
// Pile of embeds
const embed = require('./help.js') 

bot.on('ready', () => {
   console.log("READY!");
   console.log('connected');
   console.log('logged in as: ');
   console.log(`${bot.user.username} - (${bot.user.id})`);
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
   if (msg.content.startsWith(`${settings.prefix}ping`)) {
      return msg.channel.send(":ping_pong: :purple_heart: pong!");
   }
// Jokes
   if (msg.content.startsWith(`${settings.prefix}test`)) {
      msg.channel.send(':purple_heart: Test failed successfully.')
      .then(msg => {
                    msg.delete({ timeout: 2000 /*time unitl delete in milliseconds*/});
                })
      .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
}
// Text Jokes
   if (msg.content === '76 keys') {
      return msg.channel.send("nanajuuroku-nin no yousei");
    }
   else if (msg.content === 'minakoping') {
      return msg.channel.send("<:minakoPing:776778137102975028>");
    }
   else if (msg.content === 'minakoWorried') {
      return msg.channel.send("<:minakoPing:872275445821870091>");
    }
   else if (msg.content === 'minakosip') {
      return msg.channel.send("<:minakoSip:872275441048748053>");
    }
   else if (msg.content === 'wat') {
      msg.channel.send('nani?')
      .then(msg => {
                    msg.delete({ timeout: 2000 /*time unitl delete in milliseconds*/});
                })
      .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
   }
   else if (msg.content === 'sora wo kakeru you na') {
      return msg.channel.send("kokoro wo te ni shiyou ka");
   }
   else if (msg.content === 'minako pls remind match') {
      return msg.channel.send("https://media.discordapp.net/attachments/564573201624203299/803028273549803540/match.gif");
    }
});

bot.login(settings.discord_token);
