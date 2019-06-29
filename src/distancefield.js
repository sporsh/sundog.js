import * as v3 from './vector3'
import { arbitraryBasisForNormal } from './basis'

const EPSILON = 0.00001

const intersect = intersectable => distanceFunction => ray => {
  const epsilon = Math.min(EPSILON, ray.tMin)

  for (let t = Math.max(ray.tMin, EPSILON); t < Math.min(ray.tMax, 10); ) {
    const point = v3.add(ray.origin, v3.scale(ray.direction, t))
    const distance = distanceFunction(point)

    if (
      t > ray.tMin &&
      t < ray.tMax &&
      distance < epsilon &&
      distance > -epsilon
    ) {
      const normal = normalAtPoint(distanceFunction, point, epsilon)
      return {
        t,
        point,
        basis: arbitraryBasisForNormal(normal),
        intersectable: intersectable
      }
    }
    t += Math.abs(distance)
  }
}

const normalAtPoint = (distanceFunction, point, epsilon) => {
  let d = offset => {
    return distanceFunction(v3.add(point, offset))
  }

  return v3.normalize(
    v3.fromXYZ(
      d(v3.fromXYZ(epsilon, 0, 0)) - d(v3.fromXYZ(-epsilon, 0, 0)),
      d(v3.fromXYZ(0, epsilon, 0)) - d(v3.fromXYZ(0, -epsilon, 0)),
      d(v3.fromXYZ(0, 0, epsilon)) - d(v3.fromXYZ(0, 0, -epsilon))
    )
  )
}

export const intersectTorusRay = torus => {
  const { major, minor, origin } = torus
  const distanceFunction = point => {
    const { x, y, z } = v3.add(point, origin)
    const l0 = Math.sqrt(x * x + y * y) - major
    const l1 = z
    return Math.sqrt(l0 * l0 + l1 * l1) - minor
  }
  return intersect(torus)(distanceFunction)
}
