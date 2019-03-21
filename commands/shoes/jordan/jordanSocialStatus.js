var request = require('request');
var cheerio = require('cheerio');
var commando = require('discord.js-commando');
const Discord = require('discord.js');

const baseUrl = 'https://www.socialstatuspgh.com';
var msg = null;
var arr = [];

class SpiderCammond extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'jordanss',
      group: 'shoes',
      memberName: 'jordanss',
      description: 'Shoes: Jordan shoes on Social Status.US!'
    });
  }
  async run(message) {
    msg = message;
    fetchData();
  }
}

function fetchData() {
  request({
    url: `${baseUrl}/collections/sneakers/jordan`,
    method: 'GET',
    headers: {
      'User-Agent': 'Chrome/71.0.3578.98',
    }
  }, function (err, res) {
    if (err) return console.log(err);
    var $ = cheerio.load(res.body.toString());
    var segement = $('.product');
    segement.each(function () {
      var title = $(this).find('.text-container').find('h1').text().trim();
      var temp = $(this).find('.product-price-container').text().trim().replace(/\s+/g, "").split('$');
      var price = `$${temp[temp.length - 1]}`;
      var url = `${baseUrl}${$(this).find('.product-card').attr('href')}`;
      var image = `https:${$(this).find('img').attr('src')}`
      var detial = title;
      arr.push({
        title: title,
        url: url,
        price: price,
        detial: '',
        image: image
      });
    });
    sendMsg(arr.shift());
  });
}

function sendMsg(shoeInfor) {
  if (arr.length === 0) {
    return;
  }
  var msgDely = parseInt(Math.random() * 2000, 10);
  const embed = new Discord.RichEmbed()
    .setTitle('Buy it now!')
    .setURL(shoeInfor.url)
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .setColor('#FF6699')
    .setDescription(shoeInfor.detial)
    .addField(shoeInfor.title, shoeInfor.price)
    .setFooter("Github: https://github.com/FanFanFantazy/discord-bot-noobs")
    .setThumbnail(shoeInfor.image)
    .setTimestamp()
  msg.channel.send(embed);
  setTimeout(function () {
    var nextElement = arr.shift();
    // console.log(msgDely);
    sendMsg(nextElement);
  }, msgDely);
}

module.exports = SpiderCammond;