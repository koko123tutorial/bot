require('dotenv').config()
const { log } = require('console');
const express = require('express');
const app = express()

app.listen(3000, () => {
  log("p")
})

app.get("/", (req, res) => {
  res.send("p")
})

const Discord = require('discord.js');
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  allowedMentions: ["users"]
});
const config = require('./config.js')
const prefix = config.prefix
const fs = require('fs');

client.categories = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"))
const categories = {
  fun: [],
  info: [],
  admin: [],
  member: []
}
for(file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./Commands/${commandName}`);
  
  if(command.category){
    categories[command.category].push(command);
    client.categories.set(command.category, categories[command.category]);
  }
  client.commands.set(commandName, command)
}

client.on("ready", () => {
  log("online p");
  client.user.setActivity('I see you', { type: 'WATCHING' })
})

client.on("messageCreate", message => {
  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift()
    const command = client.commands.get(commandName) || client.commands.find(a => a.aliases && a.aliases.includes(commandName));
    if(!command) return message.reply("The commands not found")
    command.run(client, message, args)
  }
})

client.login(process.env.TOKEN);
