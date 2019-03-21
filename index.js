var Discord = require('discord.js-commando');
var auth = process.env.TOKEN;

// Initialize Discord Bota
var bot = new Discord.Client({
  token: auth,
  autorun: true
});

// define register groups 
bot.registry.registerGroup('games');
bot.registry.registerGroup('embeds');
bot.registry.registerGroup('channels');
bot.registry.registerGroup('spiders');
bot.registry.registerGroup('shoes');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');
bot.registry.registerCommandsIn(__dirname + '/commands/shoes');
bot.registry.registerCommandsIn(__dirname + '/commands/samples');

// login discord
bot.login(auth);
// ready info
bot.on('ready', function (evt) {
  console.log('---------------------------');
  console.log('FanFan-DC-Bot is Connected!');
  console.log('---------------------------');
  var myDate = new Date();
  bot.channels.get('532531663486320650').send('channel one - FanFanbot is online now!\n' + myDate.toLocaleString());
});