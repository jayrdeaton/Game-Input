import { isTap } from '../tap'

describe('isTap', () => {
  it('is true for a distance at or under tapMaxDistance', () => {
    expect(isTap(0, 18)).toBe(true)
    expect(isTap(18, 18)).toBe(true)
  })

  it('is false for a distance past tapMaxDistance', () => {
    expect(isTap(19, 18)).toBe(false)
  })
})
