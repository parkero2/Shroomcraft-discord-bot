const info = require('../src/info.json');
const indexFile = require('../index.js');

const reactions = ["1️⃣", "2️⃣", "3️⃣",  "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

module.exports = {
    'name' : 'vote',
    'aliases' : ['v', 'votify'],
    'description' : 'create a vote',
    execute(message) {
        try {
            let payload = message.content.split(" ");
            if (parseInt(payload[2]) < 10 && parseInt(payload[2]) > 1) {
                for (let i = 0; i < parseInt(payload[2]); i++) {
                    message.react(reactions[i]);
                }
            }
        }
        catch {
            message.channel.send(`An error occoured, please make sure you have foramtted the command correctly (${"`"}${info.bot.PREFIX}${this.name} <messageID> <number of options${"`"}).`)
        }
    }
}