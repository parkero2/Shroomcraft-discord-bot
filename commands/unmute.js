const config = require('../info.json');

module.exports = {
    'name' : 'unmute', 
    'aliases' : ['u'],
    'description' : "Unmute someone",
    execute(message) {
        if(message.member.roles.cache.find(role => role.id == config.discord.ADMINROLE)) {
            try {
                //message.mentions.members.first().roles.add(config.discord.MEMBERROLE);
                message.mentions.members.first().roles.remove(config.discord.MUTEROLE);
                message.channel.send(`<@${message.author.id}> unmuted ${message.mentions.members.first()}.`);
                try {
                    message.mentions.members.first().send(`You were unmuted by <@${message.author.id}>.`);
                }
                catch {
                    message.channel.send("Could not DM member.");
                }
            }
            catch {
                message.channel.send(`<@${message.author.id}> failed to unmute ${message.mentions.members.first()}.`);
            }
        }
        else {
            message.channel.send("You must me an operator to do this.");
        }
    }
}