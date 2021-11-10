const info = require('../src/info.json');
const petrosource = require('../petro.js');

module.exports = {
    'name' : 'start',
    'aliases' : [],
    'description' : 'Starts the server.',
    execute(message) {
        if (message.member.roles.cache.find(role => role.id == info.discord.ADMINROLE)) {//Verify permissions
            message.channel.send(`Waiting for a response from the panel. (${this.name})`).then(async mdat => {
                if (petrosource.start()) { //Send start command
                    mdat.edit(`Sent ${this.name} command successfully.`);
                }
                else {
                    mdat.edit(`Sent ${this.name} command unsuccessfully.`);
                }
            })
        }
        else {
            message.channel.send("You need the operator role to do this.");
        }
    }
}