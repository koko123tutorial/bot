const Discord = require('discord.js');
const { prefix } = require('../config');

exports.run = (client, message, args) => {
        const cmdh = client.commands.map(command => command.name).join(", ")
        const embed = new Discord.MessageEmbed()
        .setTitle('Help Center')
        .addField(`${client.commands.size} \nPrefix: "${prefix}"`)
        .setDescription(cmdh)
        message.reply({embeds:[embed]})
}

exports.name = "help"