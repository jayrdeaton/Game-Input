import { KEY_SCHEMES, resolveKeyDirection, resolveSchemeDirection } from '../keyboard'

describe('resolveKeyDirection', () => {
  it('maps each key in the wasd scheme to its direction', () => {
    expect(resolveKeyDirection('w', KEY_SCHEMES.wasd)).toBe('up')
    expect(resolveKeyDirection('a', KEY_SCHEMES.wasd)).toBe('left')
    expect(resolveKeyDirection('s', KEY_SCHEMES.wasd)).toBe('down')
    expect(resolveKeyDirection('d', KEY_SCHEMES.wasd)).toBe('right')
  })

  it('maps the arrows scheme', () => {
    expect(resolveKeyDirection('ArrowUp', KEY_SCHEMES.arrows)).toBe('up')
    expect(resolveKeyDirection('ArrowDown', KEY_SCHEMES.arrows)).toBe('down')
  })

  it('maps the ijkl scheme', () => {
    expect(resolveKeyDirection('i', KEY_SCHEMES.ijkl)).toBe('up')
    expect(resolveKeyDirection('l', KEY_SCHEMES.ijkl)).toBe('right')
  })

  it('is case-insensitive', () => {
    expect(resolveKeyDirection('W', KEY_SCHEMES.wasd)).toBe('up')
    expect(resolveKeyDirection('ARROWLEFT', KEY_SCHEMES.arrows)).toBe('left')
  })

  it('returns null for a key not in the scheme', () => {
    expect(resolveKeyDirection('q', KEY_SCHEMES.wasd)).toBeNull()
  })

  it('supports a fully custom key map', () => {
    const custom = { up: '8', down: '2', left: '4', right: '6' }
    expect(resolveKeyDirection('8', custom)).toBe('up')
    expect(resolveKeyDirection('w', custom)).toBeNull()
  })

  // numpad's own KEY_SCHEMES entry is a plain DirectionKeyMap like any other — resolveKeyDirection
  // itself has no numpad-specific behavior, it just doesn't know (or need to know) that these
  // particular values are meant to be compared against .code rather than .key. See
  // resolveSchemeDirection below for the function that actually knows that.
  it('maps the numpad scheme like any other DirectionKeyMap', () => {
    expect(resolveKeyDirection('numpad8', KEY_SCHEMES.numpad)).toBe('up')
    expect(resolveKeyDirection('numpad6', KEY_SCHEMES.numpad)).toBe('right')
  })
})

describe('resolveSchemeDirection', () => {
  it('resolves wasd/arrows/ijkl by event.key', () => {
    expect(resolveSchemeDirection({ key: 'w', code: 'KeyW' }, 'wasd')).toBe('up')
    expect(resolveSchemeDirection({ key: 'ArrowDown', code: 'ArrowDown' }, 'arrows')).toBe('down')
    expect(resolveSchemeDirection({ key: 'l', code: 'KeyL' }, 'ijkl')).toBe('right')
  })

  it('resolves numpad by event.code, not event.key', () => {
    expect(resolveSchemeDirection({ key: '8', code: 'Numpad8' }, 'numpad')).toBe('up')
  })

  it('still resolves numpad with NumLock off, where .key becomes an arrow-key name but .code stays Numpad8', () => {
    expect(resolveSchemeDirection({ key: 'ArrowUp', code: 'Numpad8' }, 'numpad')).toBe('up')
  })

  it('does not resolve numpad from the top-row digit keys, which report Digit8 rather than Numpad8', () => {
    expect(resolveSchemeDirection({ key: '8', code: 'Digit8' }, 'numpad')).toBeNull()
  })

  it('returns null for a key not in the given scheme', () => {
    expect(resolveSchemeDirection({ key: 'q', code: 'KeyQ' }, 'wasd')).toBeNull()
    expect(resolveSchemeDirection({ key: '5', code: 'Numpad5' }, 'numpad')).toBeNull()
  })
})
