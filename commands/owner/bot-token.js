const axios = require("axios").default;
const Discord = require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
 name: "bot-token",
 aliases: ["discord-token", "discord-bot-token"],
 description: "Generate (fake) random Discord Bot token",
 category: "Fun",
 usage: "bot-token",
 run: async (client, message, args) => {
  try {
   const options = {
    method: "GET",
    url: "https://some-random-api.ml/bottoken",
   };
   axios.request(options).then((response) => {
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTitle("<:Discord:933249753955860490> Random Discord Bot Token")
     .setDescription("```" + response.data.token + "```\n||Note: This token is Propabbly Fake! <a:BunnyLaugh:935870941009965076> ||");
    message.channel.send(embed);
   });
  } catch (err) {
   message.channel.send({
    embed: {
     color: 16734039,
     description: "Something went wrong...",
    },
   });
  }
 },
};