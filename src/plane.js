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

export const intersectDirectedPlaneRay = plane => {
  const intersect = intersectPlaneRay(plane)
  return ray => {
    if (dot(plane.basis.normal, ray.direction) < 0) {
      return intersect(ray)
    }
  }
}
