const Discord = require("discord.js")
const db = require('quick.db')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'roleinfo',
    aliases: ['rl'], 
    description: 'gives you the role info',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      
      var r = message.mentions.roles.first()
      if (!r) return message.channel.send('**Mentions a Role First**')

      var embed = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
    .setTitle(`${r.name} info`)
    .setColor(r.hexColor)
    .addField('<:Discord:933249753955860490> Server name : ' + message.guild.name,true)
    .addField('<:Roles:933252107988004925> Role : ' + r.name,true)
    .addField('<:Roles:933252107988004925> Role ID : ' + r.id,true)
    .addField('<:Roles:933252107988004925> Role Created At :' + r.createdAt,true)
    .addField('<:Roles:933252107988004925> Role color :' + r.hexColor,true)
    .addField('<:Roles:933252107988004925> Role Members :' + r.members,true)
    .addField('Permissions : '+ `${r.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
    .setFooter('Made By Uptimer Team')
    message.channel.send(embed)

    }
} 