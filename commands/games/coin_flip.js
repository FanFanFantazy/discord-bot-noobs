const commando = require('discord.js-commando');
class CoinFlipCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'flip',
      group: 'games',
      memberName: 'flip',
      description: 'Nano Game: Flip a coin'
    });
  }
  async run(message, args) {
    var chance = Math.floor(Math.random() * 2);
    if (chance === 0) {
      message.channel.send(message.author + ' You got Heads!');
    } else {
      message.channel.send(message.author + ' You got Tails!');
    }
  }
}

module.exports = CoinFlipCommand;