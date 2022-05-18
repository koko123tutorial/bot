const Discord = require('discord.js');
const { prefix } = require('../config');

module.exports = {
    name: 'say',
    aliases: ['bilang'],
    category: "Commands Fun",
    run(client, message, args) {
    let write = args.join()
    if(!write) return message.reply('What the text')
    message.channel.send(write)
}
}