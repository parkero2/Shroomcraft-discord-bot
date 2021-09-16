const info = require('../src/info.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');



module.exports = {
    'name' : 'help',
    'aliases' : [],
    'description' : 'Help command',
    execute(message) {
        message.channel.send("Coming as soon as I know what I am doing.");
        /**let payload = message.content.split(" ");
        let cmd = client.commands.get(payload[1].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(payload[1].toLowerCase()));
        if (cmd) {
            message.channel.send(`**${payload[1]}**\n\n${cmd.description}`);
        }
        else {
            msg.channel.send("Command not found.");
        }*/
    }
}