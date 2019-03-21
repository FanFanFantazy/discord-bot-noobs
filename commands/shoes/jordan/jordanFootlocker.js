var request = require('request');
var cheerio = require('cheerio');
var commando = require('discord.js-commando');
const Discord = require('discord.js');

const baseUrl = 'https://www.footlocker.co.uk/en/all/shoes/jordan';
const urls = [];
var msg = null;
var page = 1;
var flt = 0;
var slc = 0;
var arr = [];

class SpiderCammond extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'jordanft',
      group: 'shoes',
      memberName: 'jordanft',
      description: 'Shoes: Top 60 Jordan shoes on Footlocker.UK!'
    });
  }
  async run(message) {
    msg = message;
    acquireUrls();
  }
}

function acquireUrls() {
  request({
    url: baseUrl,
    method: 'GET',
  }, function (err, res) {
    if (err) return console.log(err);
    var $ = cheerio.load(res.body.toString());
    var segement = $('.fl-category--productlist--item');
    var counter = 0;
    segement.each(function () {
      var url = $(this).find('noscript').text().trim().split('href="')[1].split('"><')[0];
      urls.push(`${url}#!searchCategory=all/shoes`);
      counter++;
    });
    setTimeout(function () {
      // console.log(`Acquired ${counter} shoes!`);
      fetchData();
    }, 100);
  });
}

function fetchData() {
  if (urls.length === 0) {
    // console.log(`Access all urls: ${flt} ms`);
    var shoeInfor = arr.shift();
    sendMsg(shoeInfor);
    return;
  }
  var delay = parseInt(Math.random() * 1000, 10);
  var url = urls.shift();
  request({
    url: url,
    method: 'GET',
  }, function (err, res) {
    if (err) return console.log(err);
    var $ = cheerio.load(res.body.toString());
    var segement = $('.fl-product-details');
    segement.each(function () {
      var title = $(this).find('.fl-product-details--headline').text().trim();
      var price = $(this).find('.fl-product-details--price').text().trim();
      var imageId = $(this).find('.fl-product-details--color-variations').find('div').attr('data-owl-pdp-color');
      var image = `https://runnerspoint.scene7.com/is/image/rpe/${imageId}_01`;
      var detial = $(this).find('.fl-panel--header').find('p').text().trim();
      arr.push({
        title: title,
        url: url,
        price: price,
        detial: detial,
        image: image
      });
    });
  });
  setTimeout(function () {
    // console.log('LoopNumber:', page, ' AccessingUrl:', url, ' Delay:' + delay + 'ms');
    page++;
    flt += delay;
    fetchData();
  }, delay);
}

function sendMsg(shoeInfor) {
  slc++;
  if (arr.length === 0) {
    // console.log(`the message has been sent ${slc} times`)
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
  // console.log(`Message sent No.${slc}`);
  setTimeout(function () {
    var nextElement = arr.shift();
    sendMsg(nextElement);
  }, msgDely);
}

module.exports = SpiderCammond;