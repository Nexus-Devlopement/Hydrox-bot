const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const emoji = require('../../emoji.json')
const { default_prefix } = require("./../../config.json");
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = {
  name: "oldhelp",
  aliases : ['?'],
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {

    if (!args[0]) {
      let categories = [];

      const emoji = {
       info: "<:DotInfo:935497986027429899>",
       admin: "<:adminIcon:935066303218204742>",
       uptimer: "<:hydroxuptime:935067594438873088>",
       general: "<a:r_dot:935066570630262854>",
       owner: "<a:scrown:935067053541453825>",
       giveaway: "<a:giveaway:935065926645211167>",
       moderation: "<:adminIcon:935066303218204742>",
       fun: "<:hydroxfun:935064533398093864>",
       ultility: "<:hydroxutility:935068214679965696>",
       chatbot: "<a:r_dot:935066570630262854>",
       music: "<a:playing:933241885730938901>",
       ticket: "<:click_to_create_ticket:935513821131468851>",
       image: "🎭",
       nsfw: ":peach:",       
       music: "<a:playing:933241885730938901>",
       }


      readdirSync("./commands/").forEach((dir) => {
        const e = `${emoji[dir]} ${dir.toLocaleUpperCase()}`
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "`In Progress.`";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: e,
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const invite = new MessageButton()
      .setStyle('url')
      .setLabel("Invite Me")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=849523433657466890&permissions=2147875904&scope=bot")
     .setEmoji("872032870099714088")
    const support = new MessageButton()
      .setStyle('url')
      .setLabel("Support Server")
      .setEmoji("872035574427578398")
      .setURL("https://discord.gg/r7ZRYnYK2g")
    const tutorial = new MessageButton() // prettier
      .setStyle('url')
      .setLabel("Tutorial Video")
      .setURL("https://www.youtube.com/watch?v=qQab-oRY8gk")
      .setEmoji("872035032846454805")

      const contents =
      "<:arrow:934482036377419866> ***Uptimer*** **Is An Free Discord Bot That Allows You To Make Your Projects ( Bot ) Online 24/7 Just By Using A Single Command.**";

      const embed = new MessageEmbed()
        .setTitle("<:DotInfo:935497986027429899> Here Are My Commands")
        .setDescription(contents)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true}))
        .addFields(categories)
        .setFooter(
          `Requested By ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor('#303136');

      let row = new MessageActionRow()
      .addComponents(invite, support, tutorial);

       message.channel.send(embed, row);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${default_prefix}help\` for all of my commands!`)
          .setColor("#303136");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${default_prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${default_prefix}${command.name} ${command.usage}\``
            : `\`${default_prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested By ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor("#303136");
      return message.channel.send(embed);
    }
  },
};
