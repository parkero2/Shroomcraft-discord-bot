const Pterodactyl = require('pterodactyl.js');
const info = require('./src/info.json');

const PetroClient = new Pterodactyl.Builder()
    .setURL(info.petro.PANEL)
    .setAPIKey(info.petro.KEY)
    .asUser();

const server = await PetroClient.getClientServer(info.petro.ID);