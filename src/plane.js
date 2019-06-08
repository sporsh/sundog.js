import { add, dot, scale } from './vector3.js'

export const intersectPlaneRay = plane => ({
  origin,
  direction,
  tMin = 0,
  tMax = Infinity
}) => {
  const { d, basis } = plane
  const { normal } = basis
  const t = (d - dot(normal, origin)) / dot(normal, direction)
  if (t > tMin && t < tMax) {
    const point = add(origin, scale(direction, t))
    return {
      t,
      point,
      basis,
      intersectable: plane
    }
  }
}
