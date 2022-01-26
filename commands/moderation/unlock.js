const { MessageEmbed } = require("discord.js")
const emoji = require('../../emoji.json')

module.exports = {
    name: 'unlockchannel',
    description: "Locks a channels and disallows everyone to send messages!",
    usage: "<#channel> <reason>",
    aliases: ['unlock'],
    run: async(client, message, args) => {

        if(!message.member.hasPermission('MANAGE_SERVER')) {
            const lockchannelError = new MessageEmbed()
            .setDescription('You don\'t have permission to lock channels!')
            .setColor("RANDOM")

            return message.channel.send(lockchannelError)
        }

        let channel = message.mentions.channels.first();

        if(channel) {
            reason = args.join(" ").slice(22) || 'Not Specified'
        } else (
            channel = message.channel
        )

        if(channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === true) {
            const lockchannelError2 = new MessageEmbed()
            .setDescription(`<:no:933239221836206131> ${channel} is already Unlocked!`)
            .setColor("RED")

            return message.channel.send(lockchannelError2)
        }

        channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: true })

        const embed = new MessageEmbed()
        .setTitle(`<a:yes:933239140718358558> Channel Unocked!🔓`)
        .setDescription(`**Channel:** ${channel}`)
        .setColor("GREEN")

        message.channel.send(embed)

    }
}