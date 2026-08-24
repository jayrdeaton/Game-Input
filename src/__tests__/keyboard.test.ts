import { KEY_SCHEMES, resolveKeyDirection } from '../keyboard'

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
})
