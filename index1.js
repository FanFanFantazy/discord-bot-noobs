var Discord = require('discord.js-commando');
var auth = process.env.TOKEN;

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth,
    autorun: true
});

// define register groups 
bot.registry.registerGroup('games');
bot.registry.registerGroup('embeds');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

// login discord
bot.login(auth);
// ready info
bot.on('ready', function (evt) {
    console.log('---------------------------');
    console.log('FanFan-DC-Bot is Connected!');
    console.log('---------------------------');
});