const Discord = require('discord.js');
const client = new Discord.Client;

const nodedactyl = require('nodeactyl');

const prefix = "-";
const server_id = "0ec9d41f";
const mute_role = "879166268542943242";
const admin_role = "868726965539049472";
const nclient = new nodedactyl.NodeactylClient("https://control.sparkedhost.us/", key);

var initTime = new Date().getMinutes();

client.on('ready', () => {
    console.log("Logged in.");
});

client.on('message', async msg => {
    let messagePayload = msg.content.toUpperCase().split(" ");
    if(messagePayload[0] == prefix + "OVERVIEW") {
        msg.channel.send("Contacting pterodactyl API...").then(async awaitmsg => {
            try {
                let x = await nclient.getServerUsages(server_id);
                console.log(x);
                awaitmsg.edit("POWER: " + x.current_state + "\nCPU: " + x.resources.cpu_absolute.toFixed(0).toString() + "%\nMEMORY: " + (x.resources.memory_bytes / 1024 / 1024 / 1024).toFixed(2).toString() + "GB\nDISK: " + (x.resources.disk_bytes / 1024 / 1024 / 1024).toFixed(2).toString() + "GB");
            } catch (err) {
                awaitmsg.edit("Nope, something went wrong. Try again if u want idc.");
            }
        })
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
    }
});

client.login(key);