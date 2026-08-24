import { computeAimVector } from '../aim'

describe('computeAimVector', () => {
  it('returns zero velocity and power for a zero-length drag', () => {
    expect(computeAimVector({ x: 0, y: 0 }, 100, 500)).toEqual({ velocity: { x: 0, y: 0 }, power: 0 })
  })

  it('fires along the drag direction by default (push/swipe feel, sign = 1)', () => {
    const result = computeAimVector({ x: 50, y: 0 }, 100, 500)
    expect(result.velocity.x).toBeGreaterThan(0)
  })

  it('fires opposite the drag direction at sign = -1 (pull/slingshot feel)', () => {
    const result = computeAimVector({ x: 50, y: 0 }, 100, 500, -1)
    expect(result.velocity.x).toBeLessThan(0)
  })

  it('scales power linearly with drag distance up to maxDragPixels', () => {
    const half = computeAimVector({ x: 50, y: 0 }, 100, 500)
    const full = computeAimVector({ x: 100, y: 0 }, 100, 500)
    expect(half.power).toBeCloseTo(0.5)
    expect(full.power).toBeCloseTo(1)
  })

  it('clamps power at 1 for a drag beyond maxDragPixels', () => {
    const result = computeAimVector({ x: 500, y: 0 }, 100, 500)
    expect(result.power).toBe(1)
    expect(Math.hypot(result.velocity.x, result.velocity.y)).toBeCloseTo(500)
  })

  it('preserves the drag direction (normalized) in the resulting velocity', () => {
    const result = computeAimVector({ x: 30, y: 40 }, 100, 500)
    const speed = Math.hypot(result.velocity.x, result.velocity.y)
    expect(result.velocity.x / speed).toBeCloseTo(30 / 50)
    expect(result.velocity.y / speed).toBeCloseTo(40 / 50)
  })
})
