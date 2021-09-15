const Discord = require('discord.js');
const client = new Discord.Client;
const fs = require('fs');
const info = require('./info.json');

const prefix = "-";
const activities = ['shroomers', 'server performance', ` members` , 'minecraft builds', 'ASMR discord videos', 'out for youtube cease and desist notices'];

var initTime = new Date().getMinutes();

client.commands = new Discord.Collection();
const commandDir = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandDir) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Logged in.");
    setInterval(async () => {
        let randactiv = activities[Math.floor(Math.random() * (activities.length - 1) + 1)];
        let mc = await client.guilds.cache.get(info.discord.GUILDID).memberCount.toString();
        activities[2] = mc + " members";
        client.user.setActivity(randactiv, {type : "WATCHING"});
    }, 5000);
});

client.on('message', async msg => {
    if (msg.content.startsWith(prefix)) {
        let messagePayload = msg.content.toUpperCase().split(" ");
        messagePayload[0] = messagePayload[0].substr(prefix.length, messagePayload[0].length-1);
        let cmd = client.commands.get(messagePayload[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(messagePayload[0].toLowerCase()));
        if (cmd) {
            cmd.execute(msg);
        }
        else {
            msg.channel.send("Command not found.");
        }
    }
});

client.login(info.bot.TOKEN);