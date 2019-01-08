const commando = require('discord.js-commando');
const Discord = require('discord.js');
// define local image file
const attachment = new Discord.Attachment('./logo.jpg', 'logo.jpg');

class RichembedCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'richembed',
      group: 'embeds',
      memberName: 'richembed',
      description: 'richembed message'
    });
  }
  async run(message, args) {
    const embed = new Discord.RichEmbed()
      // This is your title, it can hold 256 characters
      .setTitle("FanFanBot-richEmbeds")
      .setAuthor(message.author.username, "https://i.imgur.com/lm8s41J.png")
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor('#005bac')
      .setDescription("This is the main body of text, it can hold 2048 characters.")
      .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
      // attach local image
      .attachFile(attachment)
      .setImage("attachment://logo.jpg")
      .setThumbnail("http://i.imgur.com/p2qNFag.png")
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp()
      .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
      .addField("This is a field title, it can hold 256 characters",
        "This is a field value, it can hold 1024 characters.")
      /*
       * Inline fields may not display as inline if the thumbnail and/or image is too big.
       */
      .addField("Field1", "They can also be inline.", true)
      /*
       * Blank field, useful to create some space.
       */
      .addBlankField(true)
      .addField("Field2", "You can have a maximum of 25 fields.", true);

    message.channel.send({
      embed
    });
  }
}

module.exports = RichembedCommand;