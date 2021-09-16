const fs = require('fs');
const playerdata = require('../src/playerdata.json');

module.exports = {
    'name' : 'give',
    'aliases' : ['g', 'gift'],
    'description' : 'Help command',
    execute(message) {
        let payload = message.content.split(" ");
        if (message.mentions.members.first()) {
            message.channel.send("Trade with yo mom");
        }
        else {
            message.channel.send("Please mention the player you want to gift items to after the `" + payload[0] + "`");
        }
    }
}