var Discord = require('discord.js-commando');
var auth = process.env.TOKEN;

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth,
    autorun: true
});

bot.registry.registerGroup('games');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login(auth);
bot.on('ready', function (evt) {
    console.log('---------------------------');
    console.log('FanFan-DC-Bot is Connected!');
    console.log('---------------------------');
});