const Discord = require('discord.js');
const { prefix } = require('../config');

module.exports = {
    name: 'suggestions',
    aliases: ['saran'],
    category: "Commands Member",
    run(client, message, args) {
        const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
        if(!channel) return message.reply("suggestions channel does not exist!");

        let msgArgs = args.join()
        const embed =  new Discord.MessageEmbed()
        .setColor('FADF2E')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(msgArgs)
        channel.send({ embeds : [ embed ] }).then((msg) => {
            msg.react("👍");
            message.delete();
        }).catch((err) => {
            throw err;
        })
}
}