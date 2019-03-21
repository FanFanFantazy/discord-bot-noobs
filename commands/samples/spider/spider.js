var request = require('request');
var cheerio = require('cheerio');
var commando = require('discord.js-commando');
const Discord = require('discord.js');

const pageNum = 4;
const baseUrl = 'https://www.cnblogs.com/#p';
const urls = [];
var msg = null;
var page = 1;
var flt = 0;
var slc = 0;
var arr = [];

for (let i = 1; i < pageNum; i++) {
  urls.push(`${baseUrl}${i}`);
}

class SpiderCammond extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'spider',
      group: 'spiders',
      memberName: 'spider',
      description: 'Info: progammer community!'
    });
  }
  async run(message) {
    msg = message;
    fetchData();
  }
}

function sendMsg(element) {
  slc++;
  if (arr.length === 0) {
    console.log(`the message has been sent ${slc} times`)
    // break the inside loop
    return;
  }
  var msgDely = parseInt(Math.random() * 3000, 10);
  // set rich embed message
  const embed = new Discord.RichEmbed()
    .setTitle('AccessUrl')
    .setURL(element.url)
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .setColor('#FF6699')
    .addField(element.title, element.author)
    .setFooter("Github: https://github.com/FanFanFantazy/discord-bot-noobs")
    // still have warning when accessing informal image url
    // .setThumbnail(element.image)
    .setTimestamp()
  msg.channel.send(embed);
  console.log(`Message sent${slc}`);
  setTimeout(function () {
    var nextElement = arr.shift();
    sendMsg(nextElement);
  }, msgDely);
}

function fetchData() {
  if (urls.length === 0) {
    // console.log(flt);
    // asynchronous send the message to prevent discord crash
    var element = arr.shift();
    sendMsg(element);
    // break the outside loop
    return;
  }
  var delay = parseInt(Math.random() * 3000, 10);
  var url = urls.shift();
  request({
    url: url,
    method: 'POST',
    json: {
      "CategoryId": 808,
      "CategoryType": "SiteHome",
      "ItemListActionName": "PostList",
      "PageIndex": page,
      "ParentCategoryId": 0,
      "TotalPostCount": 4000
    },
  }, function (err, res) {
    if (err) return console.log(err);
    var $ = cheerio.load(res.body.toString());
    //decode context
    var segement = $('.post_item_body');
    segement.each(function () {
      var title = $(this).find('h3').text().trim().replace(/\s+/g, "");
      var url = $(this).find('a').attr('href');
      var image = `http:${$(this).find('img').attr('src')}`;
      var author = $(this).find('.post_item_foot').find('.lightblue').text().trim();
      var publishDate = $(this).find('.post_item_foot').text().trim().split('发布于')[1].split('\n')[0];
      var info = {
        title: title,
        author: author,
        publishDate: publishDate,
        url: url,
        image: image,
      };
      arr.push(info);
    });
  });
  // create asynchronous requests
  setTimeout(function () {
    console.log('LoopNumber:', page, ' AccessingUrl:', url, ' Delay:' + delay + 'ms');
    page++;
    flt += delay;
    fetchData();
  }, delay);
}

module.exports = SpiderCammond;