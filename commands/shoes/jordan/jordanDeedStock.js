var request = require('request');
var cheerio = require('cheerio');
var commando = require('discord.js-commando');
const Discord = require('discord.js');

const baseUrl = 'https://www.deadstock.ca';
var msg = null;
var arr = [];

class SpiderCammond extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'jordands',
      group: 'shoes',
      memberName: 'jordands',
      description: 'Shoes: Jordan shoes on Dead Stock.CAD!'
    });
  }
  async run(message) {
    msg = message;
    fetchData();
  }
}

function fetchData() {
  request({
    url: `${baseUrl}/collections/jordan`,
    method: 'GET',
    headers: {
      'User-Agent': 'Chrome/71.0.3578.98',
    }
  }, function (err, res) {
    if (err) return console.log(err);
    var $ = cheerio.load(res.body.toString());
    var segement = $('.grid__item');
    segement.each(function () {
      var title = $(this).find('.grid-product__meta').find('.grid-product__title').text().trim();
      if (title !== undefined && title !== null && title !== '') {
        var temp = $(this).find('.grid-product__price').find('.money').text().trim().split('$');
        var price = `$${temp[temp.length - 1]}`;
        var url = `${baseUrl}${$(this).find('.grid-product__meta').attr('href')}`;
        var image = `https:${$(this).find('img').attr('src')}`.split('150x150').join('342x342');
        arr.push({
          title: title,
          url: url,
          price: price,
          detial: '',
          image: image
        });
      }
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