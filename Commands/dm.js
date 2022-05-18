const Discord = require('discord.js');
const { prefix } = require('../config');

module.exports = {
  name: 'dm',
  aliases: ['sendmessage'],
  category: "member",
  run(client, message, args) {
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send('Mention user to dm')

    let dm = args.slice(1).join(" ")
    if(!dm) return message.channel.send("message?")
    if(dm.length > 200){
      return message.reply("You can't 200 text")
    }

      const embed = new Discord.MessageEmbed()
      .setDescription(`${dm}`)
      .setFooter({ text: `Author: ${message.author.tag}`})
      .setColor('RANDOM')
      user.send({ embeds: [ embed ] })
      
    message.channel.send("Success")
}
}
