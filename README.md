# spz-spectate

> Spectator overlay with bucket-aware camera, plus the live race board · `v1.1.0`

## Overview

`spz-spectate` gives every player a clean spectator mode. Cycle through anyone online and
watch their live data — identity, rank, crown, race position and lap, speed, vehicle. The
viewer is moved into the target's routing bucket, so racers isolated in a race world stay
visible.

It also renders the **live race board**: a passive top-right panel showing the ongoing race
to everyone who is not in it. Same audience as spectating, same flags, fonts and theme
bridge, so it shares this resource rather than adding another. Replaces `spz-betting`,
which previously held that screen slot.

## Live race board

Track, leader's lap, and the running order with **real time gaps** — never a checkpoint
count. It owns no race state: `spz-races` ranks the field once per tick and publishes
`SPZ:standings` for out-of-race consumers, and the board renders that.

Racers are excluded — they already carry the full tower in
[spz-raceUI](../spz-raceUI/README.md), and a second one would cover the road.

### Views

One key cycles three states. The active keys are printed on the board itself.

| View | Shows |
|---|---|
| **full** | Track strip, lap, and `Config.Board.maxRows` of the order (default 8) |
| **mini** | Leader plus `miniRows` (default 3). Shorter, **not** narrower — a panel that changes width on a keypress moves every row under the eye |
| **hidden** | Gone. Hiding remembers the last size, so restoring returns to the view you chose |

Trimmed rows are reported as `+N MORE`, never silently dropped.

### Row states

| Marker | Meaning |
|---|---|
| Gold rail + gold position | Race leader |
| `DC` tag, row dimmed | Dropped mid-race, slot held for reconnect |
| `DNF` gap, row dimmed | Did not finish (final classification only) |

### Lifecycle

The board appears when a race goes live and refreshes on every `SPZ:standings` emit, so
`spz-races`' `Config.StandingsBroadcastInterval` (default 2.5 s) is the visible update rate.

At the flag the standings feed stops, which would drop the board at the one moment a
spectator most wants it — `SPZ:raceEnd` swaps in the final classification and holds it for
`holdAfterFinishMs` (default 12 s). A cancelled cycle never fires `SPZ:raceEnd`, so
`raceState` returning to `IDLE`/`CLEANUP` clears the board too. Players connecting mid-race
request the current board instead of waiting for the next tick.

## Structure

| Side | File | Purpose |
|---|---|---|
| Shared | `config.lua` | Board views, row counts, keys, post-race hold |
| Client | `client/main.lua` | Camera control, target cycling, NUI bridge |
| Client | `client/racefeed.lua` | Board view state, key bindings, audience check |
| Server | `server/main.lua` | Target list, bucket transfer, live data feed |
| Server | `server/racefeed.lua` | Consumes `SPZ:standings` / `SPZ:raceEnd`, broadcasts the board |
| UI | `ui/` | Spectator bar (bottom) and race board (top-right), one page |

Preview both without a server — `ui/app.js` seeds a representative field:

```bash
npx http-server spz-spectate/ui -p 4179 -c-1
```

`?view=full` · `?view=mini` · add `&spectate=1` to show the spectator bar too.

## Exports

| Export | Description |
|---|---|
| `IsSpectating` | Whether the local player is currently spectating |
| `GetBoard` | Current race board snapshot (server), or `nil` when no race is live |

## Commands and keys

| Key | Command | Effect |
|---|---|---|
| — | `/spectate` | Enter or leave spectator mode |
| `F7` | `/raceboard` | Race board: cycle full → mini → hidden |
| `F8` | `/raceboard_hide` | Race board: hide, or restore the last size |

Defaults only — every binding is rebindable by the player in FiveM's own key-binding
settings. Set a key to `""` in `Config.Board.keys` to register the command with no default
binding; the chat commands work either way, so the board is never unreachable.

## Dependencies

`ox_lib` · `spz-core` · `spz-races`

---

Part of [SPiceZ-Core](../README.md) · GPL-3.0
