import * as v3 from './vector3'
import { arbitraryBasisForNormal } from './basis'

const EPSILON = 0.001

const intersect_ = intersectable => distanceFunction => ray => {
  const epsilon = Math.min(EPSILON, ray.tMin)

  for (let t = epsilon, i = 0; i < 30; i++) {
    const point = v3.add(ray.origin, v3.scale(ray.direction, t))
    const distance = distanceFunction(point)

    if (
      // distance < epsilon
      distance < epsilon &&
      distance > -epsilon
      // // distance >= 0
      // // distance < epsilon / 2
    ) {
      const normal = normalAtPoint(distanceFunction, point, epsilon)
      // const directedNormal = distance < 0 ? v3.negate(normal) : normal
      return {
        t,
        point,
        basis: arbitraryBasisForNormal(normal),
        // basis: arbitraryBasisForNormal(directedNormal),
        intersectable: intersectable
      }
    }
    // t += Math.max(distance / 2, epsilon)
    t += distance
    // t += Math.abs(distance)
    // t += Math.max(distance, epsilon)

    if (t > ray.tMax || t < ray.tMin) {
      return
    }
    // // t += distance
  }
}

const intersect = intersectable => distanceFunction => ray => {
  const epsilon = 0.001
  let t = 0.5 // Prevent sef-intersection
  let tMax = Math.min(ray.tMax, 10)
  while (t < tMax) {
    const point = v3.add(ray.origin, v3.scale(ray.direction, t))
    // const point = v3.add(ray.origin, v3.scale(ray.direction, t))
    const distance = distanceFunction(point)

    if (
      // t > ray.tMin &&
      // t < ray.tMax &&
      distance < epsilon
      // distance < epsilon &&
      // distance > -epsilon
      // distance > 0
      // distance < epsilon / 2
    ) {
      return {
        t,
        point,
        basis: arbitraryBasisForNormal(
          // normalAtPoint(distanceFunction, point, 0.01)
          normalAtPoint(distanceFunction, point, epsilon)
        ),
        intersectable: intersectable
      }
    }
    // t += Math.abs(distance)
    // t += Math.max(distance, epsilon)
    t += distance
    if (t < ray.tMin && t > ray.tMax) {
      return
    }
    // t += distance
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
    const { x, y, z } = point
    // const { x, y, z } = v3.add(point, origin)
    const l0 = Math.sqrt(x * x + y * y) - major
    const l1 = z
    return Math.sqrt(l0 * l0 + l1 * l1) - minor
  }
  // return intersect(torus)(distanceFunction)
  // return intersect(torus)(translate(origin)(distanceFunction))
  return intersect(torus)(translate(origin)(rotate(distanceFunction)))
}

export const intersectBoxRay = box => {
  const { dimensions, radius, origin, turns } = box
  const distanceFunction = point => {
    const d = v3.sub(v3.abs(point), dimensions)
    return (
      v3.length(v3.max(d, 0)) + Math.min(Math.max(d.x, Math.max(d.y, d.z)), 0.0)
    )
  }

  return intersect(box)(
    round(radius)(
      translate(origin)(
        twist((turns / dimensions.y) * Math.PI)(distanceFunction)
      )
    )
  )
  // return intersect(box)(round(0.1)(translate(origin)(rotate(distanceFunction))))
  // return intersect(box)(distanceFunction)
  // return intersect(box)(rotate(distanceFunction))
  // return intersect(box)(translate(origin)(rotate(distanceFunction)))
  // return intersect(box)(distanceFunction)
}

const translate = offset => distanceFunction => point =>
  distanceFunction(v3.sub(point, offset))

const round = radius => distanceFunction => point =>
  distanceFunction(point) - radius

const twist = turns => distanceFunction => ({ x, y, z }) => {
  const k = turns
  const c = Math.cos(k * y)
  const s = Math.sin(k * y)
  return distanceFunction(v3.fromXYZ(c * x + -s * z, y, s * x + c * z))
  // return distanceFunction(v3.fromXYZ(c * x + -s * z, s * x + c * z, y))
  // return distanceFunction(v3.fromXYZ(c * x + s * z, -s * x + c * z, y))
}

const rotate = distanceFunction => ({ x, y, z }) => {
  const k = Math.PI / 6
  const c = Math.cos(k)
  const s = Math.sin(k)
  return distanceFunction(v3.fromXYZ(c * x + -s * z, y, s * x + c * z))
  // return distanceFunction(v3.fromXYZ(c * x + -s * z, s * x + c * z, y))
  // return distanceFunction(v3.fromXYZ(c * x + s * z, -s * x + c * z, y))
}
// float opTwist( in sdf3d primitive, in vec3 p )
// {
//   const float k = 10.0; // or some other amount
//   float c = cos(k*p.y);
//   float s = sin(k*p.y);
//   mat2  m = mat2(c,-s,s,c);
//   vec3  q = vec3(m*p.xz,p.y);
//   return primitive(q);
// }
