const Discord = require('discord.js');
const { prefix } = require('../config');

    module.exports = {
    name: 'unmute',
    aliases: ['unmt'],
    category: "Commands Admin",
    run(client, message, args) {
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.reply("You don't have Permission");
        const target = message.mentions.members.first()
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

            if(!mainRole) return message.channel.send("Please add role 'member'");
            if(!muteRole) return message.channel.send("Please add role 'muted'");

            target.roles.add(mainRole);
            target.roles.remove(muteRole);
            message.channel.send(`<@${target.user.id}> has unmuted`);
        } else{
            message.channel.send("Can't find member");
        }
}
}