const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'unblock',
    aliases: [''], 
    description: 'unblock user',
    run: async(client, message, args) => {
      if(message.author.id == "745581095747059722" || message.author.id == "729554449844011130" || message.author.id == "440200028292907048") {
      if(!args[0]) return message.channel.send( new MessageEmbed()
      .setTitle("<:no:933239221836206131> Error")
      .setDescription("Please Provide A User ID!")
      .setFooter("Thanks For Using Me!")
      .setColor("RED")
      .setTimestamp()
      ); // in last okokuse ; this not in middle 
      if(isNaN(args[0])) return message.channel.send("This is not vaild user id");
      console.log(args[0])
      const notblocked = db.fetch(`blocked_users_${args[0]}`, "blocked"); 
      if(notblocked === null) {
      return message.channel.send(new MessageEmbed()
      .setTitle("<:no:933239221836206131> Error")
      .setDescription("This User Is Not Blocked!")
      .setFooter("Thanks For Using Me")
      .setColor("RED")
      .setTimestamp()
      )
      }
 db.delete(`blocked_users_${args[0]}`, "blocked"); // idk
return message.channel.send( new MessageEmbed()
      .setTitle("<a:yes:933239140718358558> Successfully UnBlocked ")
      .setDescription("User UnBlocked <a:yes:933239140718358558>! Now The User Can Use My Commands!")
      .setFooter("Thanks For Using Me!")
      .setColor("RANDOM")
      .setTimestamp()
);
      } else {
        const embed1 = new MessageEmbed()
        .setTitle("<:no:933239221836206131> Error")
        .setDescription("You Don't Have Permission To Use This Command.")
        .setFooter("Thanks For Using Me! ")
        .setColor("RED")
        .setTimestamp()
        message.channel.send(embed1);
      }
    }
}
