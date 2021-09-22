const info = require('../src/info.json');
const playerdata = require('../src/playerdata.json');
const fs = require('fs');

module.exports = {
    'name' : 'leaderboard',
    'aliases' : ['lb','scoreboard'],
    'description' : 'Get a scoreboard overview',
    execute(message) {
        let data = {
            "msgs" : {

            },
            "vc" : {

            }
        }
        for (let i of playerdata) {
            data.msgs[playerdata[Object.keys(playerdata)[i]]] = playerdata[Object.keys(playerdata)[i]].statistics.messages;
        }
        for (let i of playerdata) {
            data.vc[playerdata[Object.keys(playerdata)[i]]] = playerdata[Object.keys(playerdata)[i]].statistics.vctime;
        }
    }
}