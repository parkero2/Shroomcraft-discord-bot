const info = require('../info.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')

client.commands = new Discord.Collection();
const commandDir = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandDir) {
    const command = require(`./${file}`);
    client.commands.set(command.name, command);
}

module.exports = {
    'name' : 'help',
    'aliases' : [],
    'description' : 'Help command',
    execute(message) {
        let payload = message.content.split(" ");
        let cmd = client.commands.get(payload[1].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(payload[1].toLowerCase()));
        if (cmd) {
            message.channel.send(`**${payload[1]}**\n\n${cmd.description}`);
        }
        else {
            msg.channel.send("Command not found.");
        }
    }
}