const info = require('../src/info.json');
const petrosource = require('../petro.js');
var p = null;
module.exports = {
    'name' : 'restart',
    'aliases' : [],
    'description' : 'Restarts the server.',
    execute(message) {
        if (message.member.roles.cache.find(role => role.id == info.discord.ADMINROLE)) {
            message.channel.send(`Waiting for a response from the panel. (${this.name})`).then(async mdat => {
                if (petrosource.restart()) {
                    mdat.edit(`Send ${this.name} command successfully.`);
                }
                else {
                    mdat.edit(`Send ${this.name} command unsuccessfully.`);
                }
            })
        }
        else {
            message.channel.send("You need the operator role to do this.");
        }
    }
}