const Discord = require("discord.js");
const ownerid = ["745581095747059722"];
const ownerid2 = ["729554449844011130"];
const emoji = require('../../emoji.json')

module.exports = {
    name: "leaveserver",
    aliases: [""],
    category: "owner",
    description: "Displays the list of servers the bot is in!",
    usage: " ",
    accessableby: "Owner",
  run: async (client, message, args) => {
    if (message.author.id == ownerid || ownerid2) {
		
		    const guildId = args[0];
 
    if (!guildId) {
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle("<:no:933239221836206131> Error Occured!")
      .setDescription(`Please Provide A Valid Server ID`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
    }
 
    const guild = client.guilds.cache.find((g) => g.id === guildId);
 
    if (!guild) {
      message.react("<:no:933239221836206131>")
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle("<:no:933239221836206131> Error Occured!")
      .setDescription(`I Am Not In Server`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
    }
 
    try {
      await guild.leave();
      message.react("<:leave:933722870734024724>")
      return message.channel.send(new Discord.MessageEmbed()
      .setThumbnail(guild.iconURL({ dynamic: true }) || null)
      .setTitle("<a:r_dot:935066570630262854> Successfully ")
      .setDescription(`<a:yes:933239140718358558> Successfully Left Guild - **${guild.name}**`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
    } catch (e) {
      console.error(e);
      return message.channel.send("An error occurred leaving that guild");
    }
    }
    }
  }