const info = require('../src/info.json');
const playerdata = require('../src/playerdata.json');
const fs = require('fs');
var messageToSend = [];

module.exports = {
    'name' : 'leaderboard',
    'aliases' : ['lb','scoreboard'],
    'description' : 'Get a scoreboard overview',
    execute(message) { //Make a leaderboard using the playerdata file
        let data = {
            "msgs" : {

            },
            "vc" : {

            }//Placeholder for the leaderboard dara
        }
        for (let i of Object.keys(playerdata)) { //Get the leaderboard data
            data.msgs[playerdata[Object.keys(playerdata)[i]]] = playerdata[Object.keys(playerdata)[i]].statistics.messages;
        }
        for (let i of Object.keys(playerdata)) {
            data.vc[playerdata[Object.keys(playerdata)[i]]] = playerdata[Object.keys(playerdata)[i]].statistics.vctime;
        }
        Object.keys(data.msgs).sort();//Sort the data
        Object.keys(data.vc).sort();
        messageToSend = ["*MESSAGES*\n"];
        for (let x of Object.keys(data.msgs)){ 
            messageToSend.push(`${x + 1}) <@`+Object.keys(data.msgs[x]+"> : "));
            messageToSend.push(data.msgs[x] + "\n");
        }
        messageToSend.push("*VC TIME*\n");
        for (let p of Object.keys(data.vc)){ 
            messageToSend.push(`${p + 1}) <@`+Object.keys(data.msgs[p]+"> : "));
            messageToSend.push(data.msgs[p] + "\n");
        }
        message.channel.send(messageToSend);
    }
}