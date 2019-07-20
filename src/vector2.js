export const fromXY = (x, y) => ({
  x,
  y
})

export const add = (a, b) => fromXY(a.x + b.x, a.y + b.y)

export const dot = (a, b) => a.x * b.x + a.y * b.y

export const length2 = v => dot(v, v)

export const length = v => Math.sqrt(length2(v))

export const negate = ({ x, y }) => fromXY(-x, -y)

export const normalize = v => scale(v, 1 / length(v))

export const scale = ({ x, y }, f) => fromXY(x * f, y * f)

export const sub = (a, b) => fromXY(a.x - b.x, a.y - b.y)

export const ZERO = fromXY(0, 0)

export const hadamard = (a, b) => fromXY(a.x * b.x, a.y * b.y)

export const abs = ({ x, y }) => fromXY(Math.abs(x), Math.abs(y))

export const floor = ({ x, y }) => fromXY(Math.floor(x), Math.floor(y))

// export const mod = ({ x, y }, v) => fromXY(x % v.x || x, y % v.y || y)
export const mod = ({ x, y }, v) => fromXY(x % v.x, y % v.y)

export const addAll = ({ x, y }, v) => ({ x: x + v, y: y + v })

export const max = ({ x, y }, v) => fromXY(Math.max(x, v), Math.max(y, v))
