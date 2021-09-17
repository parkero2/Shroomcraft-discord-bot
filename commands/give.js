const fs = require('fs');
const playerdata = require('../src/playerdata.json');
const bag = require('./inventory.js');

module.exports = {
    'name' : 'give',
    'aliases' : ['g', 'gift'],
    'description' : 'Help command',
    execute(message) {
        let payload = message.content.split(" ");
        if (message.mentions.members.first() && payload[1].includes(message.mentions.members.first().id)) {
            if (playerdata[message.author.id]) {
                try {
                    if (playerdata[message.author.id].assets[payload[2].toLowerCase()] >= Math.abs(parseInt(payload[3]))) {
                        playerdata[message.author.id].assets[payload[2].toLowerCase()] -= Math.abs(parseInt(payload[3]));
                        playerdata[message.mentions.members.first().id].assets[payload[2].toLowerCase()] += Math.abs(parseInt(payload[3]));
                    }
                    else {
                        message.channel.send("You either have insufficient funds or the requested item does not exist.");
                        return false;
                    }
                    fs.writeFile('./src/playerdata.json', JSON.stringify(playerdata, null, 2), function (err) {
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
                bag.execute(message);
                this.execute(message);
            }
        }
        else {
            message.channel.send("Please mention the player you want to gift items to after the `" + payload[0] + "`");
        }
    }
}