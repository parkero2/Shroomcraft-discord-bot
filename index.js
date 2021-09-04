const Discord = require('discord.js');
const client = new Discord.Client;
const fs = require('fs');
const info = require('./info.json');

const prefix = "-";
const mute_role = "879166268542943242";
const admin_role = "868726965539049472";

var initTime = new Date().getMinutes();

client.commands = new Discord.Collection();
const commandDir = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandDir) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Logged in.");
});

client.on('message', async msg => {
    if (msg.content.startsWith(prefix)) {
        let messagePayload = msg.content.toUpperCase().split(" ");
        messagePayload[0] = messagePayload[0].substr(prefix.length, messagePayload[0].length-1);
        let cmd = client.commands.get(messagePayload[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(messagePayload[0]));
        if (cmd) {
            cmd.execute(msg);
        }
        else {
            msg.channel.send("Command not found.");
        }
    }
});

client.login(info.bot.TOKEN);