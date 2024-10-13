fx_version 'cerulean'
game 'gta5'

description 'PRP Minigame'

client_scripts {
    'client.lua',
}

server_scripts {
    'server.lua',
}

shared_scripts {
    'config.lua',
}

ui_page 'html/ui.html'

files {
    "html/**/**",
}

exports {
    'StartMinigame'
}

---exports['prp-minigame']:StartMinigame()