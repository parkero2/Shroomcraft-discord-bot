const Discord = require('discord.js'); 
const client = new Discord.Client; //Import discord.js library & define a new object called client
const fs = require('fs');
const info = require('./src/info.json'); //Import file with data regarding the bot
const playerdata= require('./src/playerdata.json'); //Import player data

const activities = ['shroomers', 'server performance', ` members` , 'minecraft builds', 'ASMR discord videos', 'out for youtube cease and desist notices']; //A list of activities to be referenced when changing the bot's status on discord

//Beginning of the command handler
client.commands = new Discord.Collection();
const commandDir = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); //Finds and stores all files with the .js extention within the commands folder
for(const file of commandDir) { //Iterate through all files and add them to the client.commands object
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Loaded file ${file}`);
}

client.on('ready', () => { //An event handled by the discord.js library to signify the bot has been sucessfully authenticated by Discord
    console.log("Logged in.");
    setInterval(async () => { //The status cycler
        let randactiv = activities[Math.floor(Math.random() * (activities.length - 1) + 1)];
        let mc = await client.guilds.cache.get(info.discord.GUILDID).memberCount.toString();
        activities[2] = mc + " members"; //Sets the member count in the activities array
        client.user.setActivity(randactiv, {type : "WATCHING"});
    }, 5000);
    setInterval(() => { //Creates the save function for playerdata. Interval is to reduce load. The interval is short enough to save often enough in the event of a crash
        try {
            fs.writeFile('./src/playerdata.json', JSON.stringify(playerdata, null, 2), function (err) {
                if (err) {
                    console.log(err)
                    return false;
                }
                else {
                    return true;
                }
            });
        }
        catch (err) {}
    }, 300000);
});

client.on('message', async msg => { //An event from Discord signifying a message has been found
    if (msg.content.startsWith(info.discord.PREFIX)) { //Checks for a command (not discord slash command)
        let messagePayload = msg.content.toUpperCase().split(" "); //Split the message into an array, an indecy at every space in the message
        messagePayload[0] = messagePayload[0].substr(info.discord.PREFIX.length, messagePayload[0].length-1); //Remove the prefix from the command
        let cmd = client.commands.get(messagePayload[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(messagePayload[0].toLowerCase())); //Try to find the command in the client.commands object
        if (cmd) {
            cmd.execute(msg); //Execute the 'execute' function from the module that is identified in the message content and links to the command collection defined on line 10
        }
        else {
            msg.channel.send("Command not found.");
        }
    }
    if (!msg.member.user.bot && playerdata[msg.author.id]) {
        playerdata[msg.author.id].statistics.messages += 1; //Adds one 'message' to the player's message statistic
    }
});

client.login(info.bot.TOKEN); //Authenticate the bot with Discord