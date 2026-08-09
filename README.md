# spz-spectate

> Spectator overlay with bucket-aware camera · `v1.0.0`

## Overview

`spz-spectate` gives every player a clean spectator mode. Cycle through anyone online and
watch their live data — identity, rank, crown, race position and lap, speed, vehicle. The
viewer is moved into the target's routing bucket, so racers isolated in a race world stay
visible.

## Structure

| Side | File | Purpose |
|---|---|---|
| Client | `client/main.lua` | Camera control, target cycling, NUI bridge |
| Server | `server/main.lua` | Target list, bucket transfer, live data feed |
| UI | `ui/` | Spectator overlay (plain HTML/CSS/JS) |

## Exports

| Export | Description |
|---|---|
| `IsSpectating` | Whether the local player is currently spectating |

## Commands

| Command | Effect |
|---|---|
| `/spectate` | Enter or leave spectator mode |

## Dependencies

`ox_lib`

---

Part of [SPiceZ-Core](../README.md) · GPL-3.0
