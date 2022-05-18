const Discord = require('discord.js');
const { prefix } = require('../config');
const ms = require('ms');

    module.exports = {
    name: 'mute',
    aliases: ['mt'],
    category: "Commands Admin",
    run(client, message, args) {
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.reply("You don't have Permission");
        const target = message.mentions.members.first()
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

            if(!mainRole) return message.channel.send("Please add role 'member'");
            if(!muteRole) return message.channel.send("Please add role 'muted'");

            if(!args[1]) {
                target.roles.remove(mainRole);
                target.roles.add(muteRole);
                message.channel.send(`<@${target.user.id}> has been muted`);
                return
            }
            target.roles.remove(mainRole.id);
            target.roles.add(muteRole.id);
            message.channel.send(`<@${target.user.id}> has been muted for ${ms(ms(args[1]))}`);

            setTimeout(function () {
                target.roles.remove(muteRole.id);
                target.roles.add(mainRole.id);
                message.channel.send(`<@${target.user.id}> has been unmuted`)
            }, ms(args[1]));
        } else{
            message.channel.send("Can't find member");
        }
}
}