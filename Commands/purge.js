const Discord = require('discord.js');
const { prefix } = require('../config');

module.exports = {
    name: 'purge',
    aliases: ['deletemessage'],
    category: "Commands Admin",
    run(client, message, args) {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("You don't have Permission");
        if(!args[0]) return message.reply('enter the amount of messages want to delete!')
        if(isNaN(args[0])) return message.reply('enter the real number!')

        if(args[0] > 100) return message.reply("You can't delete more than 100 messages!")
        if(args[0] < 1) return message.reply("You must delete atleast one message!")

        message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages)
        })
}
}