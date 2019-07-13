export const fromXYZ = (x, y, z) => ({
  x,
  y,
  z
})

export const add = (a, b) => fromXYZ(a.x + b.x, a.y + b.y, a.z + b.z)

export const cross = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x
})

export const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z

export const length2 = v => dot(v, v)

export const length = v => Math.sqrt(length2(v))

export const negate = ({ x, y, z }) => fromXYZ(-x, -y, -z)

export const normalize = v => scale(v, 1 / length(v))

export const scale = ({ x, y, z }, f) => fromXYZ(x * f, y * f, z * f)

export const sub = (a, b) => fromXYZ(a.x - b.x, a.y - b.y, a.z - b.z)

export const ZERO = fromXYZ(0, 0, 0)

export const hadamard = (a, b) => fromXYZ(a.x * b.x, a.y * b.y, a.z * b.z)

export const abs = ({ x, y, z }) =>
  fromXYZ(Math.abs(x), Math.abs(y), Math.abs(z))

export const floor = ({ x, y, z }) =>
  fromXYZ(Math.floor(x), Math.floor(y), Math.floor(z))

// export const mod = ({ x, y, z }, v) => fromXYZ(x % v, y % v, z % v)
export const mod = ({ x, y, z }, v) =>
  fromXYZ(x % v.x || x, y % v.y || y, z % v.z || z)

export const addAll = ({ x, y, z }, v) => ({ x: x + v, y: y + v, z: z + v })

export const max = ({ x, y, z }, v) =>
  fromXYZ(Math.max(x, v), Math.max(y, v), Math.max(z, v))
