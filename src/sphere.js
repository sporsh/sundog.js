import { add, sub, scale, dot, length2, normalize } from './vector3.js'
import { arbitraryBasisForNormal } from './basis.js'

export const intersectSphereRay = ({ center, radius, material }) => ({
  origin,
  direction,
  tMin = 0,
  tMax = Infinity
}) => {
  // Vector pointing from sphere center to ray origin
  const m = sub(origin, center)

  // b = 0 (ray pointing directly at sphere center)
  // b < 0 (ray leaning towards sphere center)
  // b > 0 (ray leaning away from sphere center)
  const b = dot(m, direction)

  // Signed squared distance between ray origin and sphere surface
  const c = length2(m) - radius * radius

  if (c > 0 && b > 0) {
    // Ray origin is outside sphere, and ray direction is >90deg away from sphere center
    return
  }

  const discr = b * b - c

  if (discr < 0) {
    // Ray misses sphere
    // Quadric formula has no real root, means there are no intersections
    return
  }

  const sqrtDiscr = Math.sqrt(discr)
  const t0 = -b - sqrtDiscr
  // t0 < 0  (intersection was behind ray origin, we're inside the sphere so try the other solution)
  const t = t0 < tMin ? -b + sqrtDiscr : t0
  if (t > tMin && t < tMax) {
    const point = add(origin, scale(direction, t))
    const normal = normalize(sub(point, center))
    return {
      t,
      point,
      basis: arbitraryBasisForNormal(normal),
      material
    }
  }
}
