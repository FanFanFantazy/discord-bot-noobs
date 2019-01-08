const commando = require('discord.js-commando');
class RollDiceCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'games',
      memberName: 'roll',
      description: 'Nano Game: Roll a dice'
    });
  }
  async run(message, args) {
    var chance = Math.floor(Math.random() * 6);
    message.channel.send(message.author + ' You got a ' + chance + ' !');
  }
}

module.exports = RollDiceCommand;