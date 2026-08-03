fx_version 'cerulean'
game 'gta5'

name 'spz-spectate'
description 'SPiceZ Spectate — clean spectator overlay usable by all players. Cycle any online player, view their live data (identity, rank, crown, race position/lap, speed, vehicle). Moves the viewer into the target routing bucket so racers in isolated buckets are visible.'
version '1.0.0'
author 'SPiceZ-Core'
lua54 'yes'

shared_scripts {
  '@ox_lib/init.lua',
}

client_scripts {
  'client/main.lua',
}

server_scripts {
  'server/main.lua',
}

ui_page 'ui/index.html'

files {
  'ui/index.html',
  'ui/style.css',
  'ui/app.js',
  'ui/asset/fonts/*.ttf',
  'ui/asset/flags/*.webp',
}
