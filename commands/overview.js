const nodedactyl = require('nodeactyl');
const info = require('../info.json');
const nclient = new nodedactyl.NodeactylClient(info.petro.PANEL, info.petro.KEY);

module.exports = {
    'name' : 'overview',
    'aliases' : ['info', 'status', 'o'],
    'description' : 'get server performance information',
    execute(message) {
        message.channel.send("Awaiting response from API.").then(async msgdata => {
            try {
                let x = await nclient.getServerUsages(info.petro.ID);
                console.log(await nclient.getServerStatus(info.petro.ID));
                msgdata.edit("POWER: " + x.current_state + "\nCPU: " + x.resources.cpu_absolute.toFixed(0).toString() + "%\nMEMORY: " + (x.resources.memory_bytes / 1024 / 1024 / 1024).toFixed(2).toString() + "GB\nDISK: " + (x.resources.disk_bytes / 1024 / 1024 / 1024).toFixed(2).toString() + "GB");
            } catch (err) {
                msgdata.edit("An error occured.");
            }
        })
    }
}