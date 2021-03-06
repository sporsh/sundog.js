import { sub, cross, dot, add, negate, scale, normalize } from './vector3.js'
import { arbitraryBasisForNormal } from './basis.js'

export const intersectTriangleRay = ({ a, b, c, material }) => {
  const ab = sub(b, a)
  const ac = sub(c, a)
  const normal = cross(ab, ac)
  const basis = arbitraryBasisForNormal(normalize(normal))

  return ({ origin, direction, tMin, tMax }) => {
    const qp = negate(direction)

    const d = dot(qp, normal)
    if (d === 0) {
      // Ray is parallel to triangle
      return
    }
    if (d < 0) {
      // Ray is potentially hitting the triange from the back
      return
    }

    const ap = sub(origin, a)
    const t = dot(ap, normal) / d
    if (t < tMin || t > tMax) {
      return
    }

    const e = cross(qp, ap)
    const v = dot(ac, e)
    if (v < 0 || v > d) {
      return
    }
    const w = -dot(ab, e)
    if (w < 0 || v + w > d) {
      return
    }

    return {
      t,
      point: add(origin, scale(direction, t)),
      basis: basis,
      material
    }
  }
}
