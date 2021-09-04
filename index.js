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
        /*
        if(messagePayload[0] == "OVERVIEW") {
            client.commands.get(messagePayload[0].toLowerCase()).execute(msg);
        }
        else if (messagePayload[0] == prefix + "SA") {
            if (new Date().getMinutes() != initTime) {
                initTime = new Date().getMinutes();
                msg.channel.send("Sending the save command...").then(async awaitmsg => {
                    try {
                        let sares = await nclient.sendServerCommand(server_id, "save-all");
                        awaitmsg.edit("Save all command responded with " + "`" + sares + "`.");
                    } catch (err) {
                        awaitmsg.edit("An error occoured.");
                    }
                });
            }
            else {
                msg.channel.send("Please wait a while before executing the command again.");
            }
        }
        else if (messagePayload[0] == prefix + "MUTE") {
            if (msg.member.hasPermission("ADMINISTRATOR")) {
                try {
                    msg.mentions.members.first().roles.add(mute_role);
                    try {
                        msg.mentions.members.first().voice.setMute(true);
                    } catch (err){}
                    msg.channel.send(`Muted ${msg.mentions.members.first()} successfully.`);
                } catch (err) {
                    msg.channel.send("Something went wrong.");
                }
            }
            else {
                msg.channel.send("You need administrator perms to do this.");
            }
        }
        else if (messagePayload[0] == prefix + "UNMUTE") {
            if (msg.member.hasPermission("ADMINISTRATOR")) {
                try {
                    msg.mentions.members.first().roles.remove(mute_role);
                    try {
                        msg.mentions.members.first().voice.setMute(false);
                    } catch (err){}
                    msg.channel.send(`Unmuted ${msg.mentions.members.first()} successfully.`);
                } catch (err) {
                    msg.channel.send("Something went wrong.");
                }
            }
            else {
                msg.channel.send("You need administrator perms to do this.");
            }
        }
        else if (messagePayload[0] == prefix + "START" || messagePayload[0] == prefix + "RESTART" || messagePayload[0] == prefix + "STOP") {
            if (msg.member.hasPermission("ADMINISTRATOR")) {
                msg.channel.send("Attempting to send a power command...").then(async awaitmsg => {
                    try {
                        let powerstat = null;
                        if (messagePayload[0] == prefix + "START") {
                            powerstat = await nclient.startServer(server_id);
                        }
                        else if (messagePayload[0] == prefix + "RESTART") {
                            powerstat = await nclient.restartServer(server_id);
                        }
                        else if (messagePayload[0] == prefix + "STOP") {
                            powerstat = await nclient.stopServer(server_id);
                        }
                        else {
                            awaitmsg.edit("An unknown error occoured.");
                            return false;
                        }
                        awaitmsg.edit(`Power command returned ${powerstat}`);
                    } catch (err) {
                        awaitmsg.edit("An unknown error occoured.");
                    }
                });
            }
            else {
                msg.channel.send("You need administrative permissions to execute a power command on the server.");
            }
        }*/
    }
});

client.login(info.bot.TOKEN);