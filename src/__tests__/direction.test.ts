import { applyControlInversion, flipDirection, isEffectiveTurn, isOppositeDirection, resolveSwipeDirection } from '../direction'

describe('resolveSwipeDirection', () => {
  it('returns null for a drag shorter than minSwipeDistance on both axes', () => {
    expect(resolveSwipeDirection({ x: 5, y: 5 }, 20)).toBeNull()
  })

  it('picks right/left from the dominant horizontal axis', () => {
    expect(resolveSwipeDirection({ x: 30, y: 5 }, 20)).toBe('right')
    expect(resolveSwipeDirection({ x: -30, y: 5 }, 20)).toBe('left')
  })

  it('picks down/up from the dominant vertical axis', () => {
    expect(resolveSwipeDirection({ x: 5, y: 30 }, 20)).toBe('down')
    expect(resolveSwipeDirection({ x: 5, y: -30 }, 20)).toBe('up')
  })

  it('breaks a tie between equal-magnitude axes toward the vertical branch', () => {
    expect(resolveSwipeDirection({ x: 30, y: 30 }, 20)).toBe('down')
  })

  it('only needs one axis past the threshold, not both', () => {
    expect(resolveSwipeDirection({ x: 30, y: 0 }, 20)).toBe('right')
  })
})

describe('flipDirection / isOppositeDirection', () => {
  it('flips each direction to its opposite', () => {
    expect(flipDirection('up')).toBe('down')
    expect(flipDirection('down')).toBe('up')
    expect(flipDirection('left')).toBe('right')
    expect(flipDirection('right')).toBe('left')
  })

  it('identifies opposite pairs', () => {
    expect(isOppositeDirection('up', 'down')).toBe(true)
    expect(isOppositeDirection('left', 'right')).toBe(true)
    expect(isOppositeDirection('up', 'left')).toBe(false)
    expect(isOppositeDirection('up', 'up')).toBe(false)
  })
})

describe('applyControlInversion', () => {
  it('passes the direction through untouched when not inverted', () => {
    expect(applyControlInversion('up', false)).toBe('up')
  })

  it('flips the direction when inverted', () => {
    expect(applyControlInversion('up', true)).toBe('down')
  })
})

describe('isEffectiveTurn', () => {
  it('is false when continuing in the same direction', () => {
    expect(isEffectiveTurn('up', 'up')).toBe(false)
  })

  it('is false for a direct reversal', () => {
    expect(isEffectiveTurn('up', 'down')).toBe(false)
  })

  it('is true for a genuine turn', () => {
    expect(isEffectiveTurn('left', 'up')).toBe(true)
  })
})
