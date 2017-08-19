export const create = (x, y, z) => ({
    x,
    y,
    z
})

export const add = (a, b) => create(a.x + b.x, a.y + b.y, a.z + b.z)
export const cross = (a, b) => ({
    x: a.x * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
})
export const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z
export const length2 = v => dot(v, v)
export const length = v => Math.sqrt(length2(v))
export const normalize = v => scale(v, 1 / length(v))
export const scale = ({ x, y, z }, f) => create(x * f, y * f, z * f)
export const sub = (a, b) => create(a.x - b.x, a.y - b.y, a.z - b.z)
