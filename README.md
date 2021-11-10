# Shroomcraft-discord-bot

## Prerequesites
This requires the node.js runtime enviroment, a Discord account and npm package manager
https://www.npmjs.com/  (version 14.17.5)
https://discord.com
https://nodejs.org/

The acting host for the bot requires an active internet connection with the ability to access the [Discord API gateway](https://discord.com/developers/docs/topics/gateway)

Acquire a Discord bot token from https://discord.com/developers/applications and paste it into the `bot` section [the config file](/src/info.json) and select a prefix for your bot.

Acquire an API key from your Pterodactyl panel and paste it into the `petro` section of [the config file](/src/info.json).

Assign the nessicairy role IDs to the correspnding keys under `discord` in [the config file](/src/info.json).
 To do this you need to enable [discord developer mode](https://discordia.me/developer-mode#:~:text=Enabling%20Developer%20Mode&text=Open%20your%20Discord%20settings%20(the,the%20toggle%20to%20enable%20it ) 

## Install dependancies
Execute `npm i` in the root directory of the repository to install the required dependancies in the package.json file.

## Running the bot
Execute `npm run start` to begin the bot.

## Invite the bot to your guild
Go to https://discord.com/developers/applications and select your application from the menu.

Select the bot section and select the `bot` scope and `admin` permission.

Copy and paste the URL to add the bot to your guild/server.
