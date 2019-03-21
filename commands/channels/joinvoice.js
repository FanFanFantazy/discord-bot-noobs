const commando = require('discord.js-commando');

class JoinVoiceCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'voicein',
      group: 'channels',
      memberName: 'voicein',
      description: 'Join the voice channel!'
    });
  }
  async run(message, args) {
    if (!message.member.voiceChannel) {
      if (message.guild.voiceConnection) {
        message.member.voiceChannel.join()
          .then(connection => {
            message.reply(' You successfully joined!');
          })
      }
    } else {
      message.reply('You already in a voice channel!');
    }
  }
}

module.exports = JoinVoiceCommand;