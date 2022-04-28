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

client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"))
for(file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./Commands/${commandName}`)
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
    const command = client.commands.get(commandName)
    if(!command) return message.reply("The commands not found")
    command.run(client, message, args)
  }
})

client.login(process.env.TOKEN);