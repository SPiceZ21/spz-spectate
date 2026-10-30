# spz-spectate

> Spectator mode and the live race board.

![version](https://img.shields.io/badge/version-1.1.0-ff6200) ![SPiceZ-Core](https://img.shields.io/badge/SPiceZ--Core-beta-18181b)

## Overview

Lets any player spectate anyone online — including racers in private buckets — with a clean overlay of their live data, plus a live race board for following a race.

## Features

- Spectate any player, across routing buckets
- Live position, lap, speed and car
- Race board: full / mini / hidden

## Requirements

| Resource | Type |
|---|---|
| `ox_lib` | third-party |
| `spz-core` | SPiceZ module |
| `spz-races` | SPiceZ module |

## Installation

Included in the [txAdmin recipe](https://github.com/SPiceZ21/spz-txrecipe). Manual install:

1. Download `spz-spectate` from GitHub (latest release, or the repository) into your `resources` folder.
2. Add to `server.cfg`, after its requirements:

```cfg
ensure spz-spectate
```

## Configuration

- `config.lua`

See the file for every option.

## Commands

| Command | Who | Description |
|---|---|---|
| `/raceboard` | player | Cycle the race board |
| `/raceboard_hide` | player | Hide / restore the race board |
| `/spectate` | player | Toggle spectator mode |

## Key binds

Rebindable in **Settings → Key Bindings → FiveM**.

| Action | Default |
|---|---|
| Toggle spectator mode | _unbound_ |
| Race board: cycle full / mini / hidden | `F9` |
| Race board: hide or restore | `F11` |

## Exports

| Export | Side |
|---|---|
| `GetBoard` | server |
| `IsSpectating` | client / server |

```lua
exports["spz-spectate"]:GetBoard(...)
```

---

Part of **SPiceZ-Core** — [documentation](https://github.com/SPiceZ21/Docs) · [all modules](https://github.com/SPiceZ21/Docs/blob/main/modules/README.md)
