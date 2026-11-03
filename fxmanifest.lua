fx_version 'cerulean'
game 'gta5'

name 'spz-spectate'
description 'SPiceZ Spectate + live race board — clean spectator overlay usable by all players. Cycle any online player, view their live data (identity, rank, crown, race position/lap, speed, vehicle). Moves the viewer into the target routing bucket so racers in isolated buckets are visible.'
version '1.2.1'
author 'SPiceZ-Core'
lua54 'yes'

shared_scripts {
  '@ox_lib/init.lua',
  'config.lua',
}

client_scripts {
    '@spz-hud/shim.lua',   -- NUI goes through spz-hud
  'client/main.lua',
  'client/racefeed.lua',
}

server_scripts {
  'server/main.lua',
  'server/racefeed.lua',
}

-- ui_page 'ui/index.html'  -- drawn by spz-hud now (web/public/apps/spz-spectate); uncomment + drop the shim to roll back

files {
  'ui/index.html',
  'ui/style.css',
  'ui/app.js',
  'ui/asset/fonts/*.ttf',
  'ui/asset/flags/*.webp',
}

dependencies {
    'spz-hud',
  'ox_lib',
  'spz-core',
  'spz-races',
}
