//NOT FINISHED

/**const { Player } = require('discord-player');
const Discord = require('discord.js');
const iFile = require('../index.js');
const info = require('../src/info.json');
const player = new Player(iFile.discordClient);

module.exports = {
    'name' : 'play',
    'aliases' : ['p'],
    'description' : 'play audio into a voice channel',
    async execute(message) {
        let payload = message.content.substr(info.discord.PREFIX.length - 1, message.content.length - 1).split(" ");
        if (!message.member.voice.channel) {
            message.channel.send("You need to be in a voice channel to do this.");
        }
        else {
            //member in a voice channel.
            const queue = player.createQueue(message.guild, {
                metadata : {
                    channel : message.channel
                }
            });
            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel)
            }
            catch {
                message.channel.send("error.");
            }
        }
    }
}*/