const fs = require('fs');
const playerdata = require('../src/playerdata.json');
const bag = require('./inventory.js');
const { SlashCommandBuilder } = require('@discordjs/builders'); //The start of adding clash command handlers to the file

module.exports = {
    data: new SlashCommandBuilder() //More slash command stuff
        .setName(this.name)
        .setDescription(this.description)
        .add,
    'name' : 'give',
    'aliases' : ['g', 'gift'],
    'description' : 'Help command',
    execute(message) { //Execute function; the main function of the module with al the required info
        let payload = message.content.split(" "); //Pasrse the message into an array
        if (message.mentions.members.first() && payload[1].includes(message.mentions.members.first().id)) {
            if (playerdata[message.author.id]) {
                try {
                    if (playerdata[message.author.id].assets[payload[2].toLowerCase()] >= Math.abs(parseInt(payload[3]))) { //Check the player has enough funds to complete the transaction
                        playerdata[message.author.id].assets[payload[2].toLowerCase()] -= Math.abs(parseInt(payload[3])); //Get the absoloute value of the amount the player is wanting to reade
                        playerdata[message.mentions.members.first().id].assets[payload[2].toLowerCase()] += Math.abs(parseInt(payload[3]));
                    }
                    else {
                        message.channel.send("You either have insufficient funds or the requested item does not exist.");
                        return false;
                    }
                    fs.writeFile('./src/playerdata.json', JSON.stringify(playerdata, null, 2), function (err) { //Save the data to the local file
                        if (err) {
                            message.channel.send(`❌ Could not complete transaction.`);
                            console.log(err)
                            return false;
                        }
                        else {
                            message.channel.send(`✅ Transaction completed succssfully.`);
                            return true;
                        }
                    });
                }
                catch (err) {
                    if (err) throw err;
                    message.channel.send("An error occoured");
                }
            }
            else {
                //Player does not have a bag, create one
                bag.execute(message);
                this.execute(message);
            }
        }
        else {
            message.channel.send("Please mention the player you want to gift items to after the `" + payload[0] + "`");
        }
    }
}