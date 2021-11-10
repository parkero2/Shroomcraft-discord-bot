const config = require('../src/info.json');

module.exports = {
    'name' : 'mute', 
    'aliases' : ['m'],
    'description' : "Mute someone",
    execute(message) {
        if(message.member.roles.cache.find(role => role.id == config.discord.ADMINROLE)) { //Verifies the user to be an admin
            let mpl = message.content.split(" ");
            let reason = "";
            for (let i = 0; i < mpl.length - 2; i++) {
                reason = reason + " " + mpl[i+2]; //Adds a reason clause to the mute message
            }
            if (reason == undefined) {
                reason = "none";//If no mute reason is defined
            }
            try {
                //message.mentions.members.first().roles.remove(config.discord.MEMBERROLE);
                message.mentions.members.first().roles.add(config.discord.MUTEROLE);
                message.channel.send(`<@${message.author.id}> muted ${message.mentions.members.first()} for ${reason} successfully.`);
                try {
                    message.mentions.members.first().send(`You were muted by <@${message.author.id}> for ${reason}.`); //Let a user know they were muted
                }
                catch {
                    message.channel.send("Could not DM member.");
                }
            }
            catch {
                message.channel.send(`<@${message.author.id}> failed to mute ${message.mentions.members.first()} for ${reason}.`);
            }
        }
        else {
            message.channel.send("You must me an operator to do this.");
        }
    }
}