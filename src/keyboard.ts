import type { Direction } from './direction'

export interface DirectionKeyMap {
  up: string
  down: string
  left: string
  right: string
}

// Three common local-multiplayer keyboard splits, lowercased to match resolveKeyDirection's own
// case-insensitive comparison. Not exhaustive — pass your own DirectionKeyMap for anything else (a
// custom scheme, or a 4th simultaneous local player).
export const KEY_SCHEMES: Record<'wasd' | 'arrows' | 'ijkl', DirectionKeyMap> = {
  wasd: { up: 'w', down: 's', left: 'a', right: 'd' },
  arrows: { up: 'arrowup', down: 'arrowdown', left: 'arrowleft', right: 'arrowright' },
  ijkl: { up: 'i', down: 'k', left: 'j', right: 'l' }
}

// Maps a raw keyboard event key (e.g. from a `keydown` listener's `event.key`) to a Direction given a
// scheme, or null if the key isn't part of it. Case-insensitive, so both 'w' and 'W' (e.g. with Caps
// Lock or Shift held) resolve the same way. Produces the exact same Direction type
// resolveSwipeDirection does, so a game's turn handler doesn't need to know or care whether a
// direction came from a keypress or a swipe.
export function resolveKeyDirection(key: string, keyMap: DirectionKeyMap): Direction | null {
  const normalized = key.toLowerCase()
  if (normalized === keyMap.up) return 'up'
  if (normalized === keyMap.down) return 'down'
  if (normalized === keyMap.left) return 'left'
  if (normalized === keyMap.right) return 'right'
  return null
}
