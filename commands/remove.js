const info = require('../src/info.json');
const fs = require('fs');
const playerdata = require('../src/playerdata.json');
const assetsFile = require('../src/assets.json');

//Remove items from circulation, the reverse of the ./add.js file

module.exports = {
    'name' : 'remove',
    'aliases' : [],
    'description' : 'Add items into circulation',
    execute(message) { //main function of the module
        if (message.member.roles.cache.find(role => role.id == info.discord.ADMINROLE)) {
            let payload = message.content.split(" "); //Parse the message content string
            if (payload[1].includes(message.mentions.members.first().id)) {
                try {
                   if (assetsFile.assets.includes(payload[2].toLowerCase())) {
                        playerdata[message.mentions.members.first().id].assets[payload[2].toLowerCase()] -= Math.abs(parseInt(payload[3]));
                        fs.writeFile('./src/playerdata.json', JSON.stringify(playerdata, null, 2), function (err) {  //Save the player data file
                            if (err) {
                                message.channel.send(`❌ Could not complete inventory modifcation.`);
                                return false;
                            }
                            else {
                                message.channel.send(`✅ Removed ${payload[3]} of ${payload[2]} to ${message.mentions.members.first()}'s inventory.`);
                                return true;
                            }
                        });
                   }
                   else {
                       message.channel.send("❌ Could not find asset in the assets file.");
                       return false;
                   }
                }
                catch (err){
                    message.channel.send("❌ An error occurred.");
                }
            }
            else {
                message.channel.send(`❌ You need to mention a member after the ${payload[0]} command to remove more assets to their inventory.`);
            }
        }
        else {
            message.channel.send("❌ You need the operator role to do this.");
        }
    }
}