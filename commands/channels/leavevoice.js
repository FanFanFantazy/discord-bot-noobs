const commando = require('discord.js-commando');

class LeaveVoiceCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'voiceout',
      group: 'channels',
      memberName: 'voiceout',
      description: 'Leave the voice channel!'
    });
  }
  async run(message, args) {
    if (message.member.voiceChannel) {
      if (message.member.hasPermission("MANAGE_GUILD")) {
        message.member.voiceChannel.leave();
        message.reply(' You successfully left!');
        return;
      } else {
        message.reply(' You dont have Permission!');
      }
    } else {
      message.reply('You arent in any voice channel!');
    }
  }
}

module.exports = LeaveVoiceCommand;