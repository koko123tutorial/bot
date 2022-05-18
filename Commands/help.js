const Discord = require('discord.js');
const { prefix } = require('../config');

module.exports = {
        name: 'help',
        aliases: ['h'],
        category: "help",
        run(client, message, args) {
        // const cmdh = client.commands.map(command => command.name).join(", ")
        // const cmdh = client.commands.map(cmd => `**${cmd.category}**\n\`\`\`nim\n${client.commands.map(cmd => ` - ${cmd.name}`).join("\n")}\`\`\``).join("\n")
        const commands = (category) => {
                return client.commands
                .filter(cmd => cmd.category === category)
                .map(cmd => `- \`${cmd.name}\``)
                .join("\n");
        }

        const info = client.categories
                .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
                .reduce((string, category) => string + "\n" + category);

        const embed = new Discord.MessageEmbed()
        .setTitle('Help Center')
        .setFooter({ text: `${client.commands.size} \nPrefix: "${prefix}"` })
        .setDescription(info)
        message.reply({ embeds: [ embed ] })
}
}