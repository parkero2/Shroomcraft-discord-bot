const fs = require('fs');
const playerdata = require('../src/playerdata.json');

module.exports = {
    'name' : 'inventory',
    'aliases' : ['i', 'bag', 'backpack'],
    'description' : 'Check player inventory',
    execute(message) {
        if (playerdata[message.author.id]) {
            if (message.mentions.members.first()) {
                message.channel.send(`${message.mentions.members.first()} has ${playerdata[message.mentions.members.first().id].assets.cookies} cookies!`);
            }
            else {
                message.channel.send(`You have ${playerdata[message.author.id].assets.cookies} cookies!`);
            }
        }
        else {
            //Create a data file
            this.createbag(message);
            this.execute(message);
        }
    },
    async createbag(message) { //A function avaliable for other files to create a bag for a user
        playerdata[message.author.id] = {"assets":{"cookies" : 100},"statistics":{"messages":0,"vctime" : 0}};
        await fs.writeFile('./src/playerdata.json', JSON.stringify(playerdata, null, 2), function (err) { //Save the player bag data
            if (err) {
                message.channel.send(`❌ Could not create a data file for <@${message.author.id}>`);
                console.log(err)
                return false;
            }
            else {
                message.channel.send(`✅ Created a data file for <@${message.author.id}>`);
                return true;
            }
        });
    }
}