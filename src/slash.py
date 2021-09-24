#Adding slash commands is easier with python libaries
import requests


url = "https://discord.com/api/v8/applications/876598429181165620/commands"

json = {
    "name": "play",
    "description": "Plays a song!",
    "options": [
        {
            "name": "query",
            "type": "STRING",
            "description": "The song you want to play",
            "required": true
        }
    ]
}

# For authorization, you can use either your bot token
headers = {
    "Authorization": "ODc2NTk4NDI5MTgxMTY1NjIw.YRmZ5w.tmuPTaL1uD9iwB5HC-AYt3R34gM"
}


r = requests.post(url, headers=headers, json=json)