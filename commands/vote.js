const info = require('../src/info.json');
const indexFile = require('../index.js');

const reactions = ["1️⃣", "2️⃣", "3️⃣",  "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]; //Define a list of reactions for the bot to use in the event a vote is requested

module.exports = {
    'name' : 'vote',
    'aliases' : ['v', 'votify'],
    'description' : 'create a vote',
    async execute(message) {
        try {
            let payload = message.content.split(" ");
            let o = await message.channel.messages.fetch(payload[1]);
            if (parseInt(payload[2]) < 10 && parseInt(payload[2]) > 1) {
                for (let i = 0; i < parseInt(payload[2]); i++) {
                    o.react(reactions[i]);
                }
            }
        }
        catch (err) {
            message.channel.send(`An error occoured, please make sure you have foramtted the command correctly (${"`"}${info.bot.PREFIX}${this.name} <messageID> <number of options${"`"}).`)
        }
    }
}