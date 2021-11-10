const nodedactyl = require('nodeactyl');
const info = require('./src/info.json');

const nclient = new nodedactyl.NodeactylClient(info.petro.PANEL, info.petro.KEY);

module.exports = { //The commands to control the 'power' status
    async start() {
        try {
            await nclient.startServer(info.petro.ID);
            return true
        }
        catch {
            return false
        }
    },
    async stop() {
        try {
            await nclient.stopServer(info.petro.ID);
            return true
        }
        catch {
            return false
        }
    },
    async restart() {
        try {
            await nclient.restartServer(info.petro.ID);
            return true
        }
        catch {
            return false
        }
    }
}