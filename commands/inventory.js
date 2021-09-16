const fs = require('fs');
const playerdata = require('../src/playerdata.json');

module.exports = {
    'name' : 'inventory',
    'aliases' : ['i', 'bag', 'backpack'],
    'description' : 'Help command',
    execute(message) {
        if (playerdata[message.author.id]) {
            message.channel.send(`You have ${playerdata[message.author.id].assets.cookies} cookies!`);
        }
        else {
            //Create a data file
            this.createbag(message);
            this.execute(message);
        }
    },
    async createbag(message) {
        //let dataToBeWritten = JSON.parse(`{"${message.author.id}":{"assets":{"cookies" : 100},"statistics":{"messages":0,"vctime" : 0}}}`);
        playerdata[message.author.id] = {"assets":{"cookies" : 100},"statistics":{"messages":0,"vctime" : 0}};
        await fs.writeFile('./src/playerdata.json', JSON.stringify(playerdata, null, 2), function (err) {
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