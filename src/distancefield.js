import * as v3 from './vector3'
import { arbitraryBasisForNormal } from './basis'

const EPSILON = 0.001
let doLog = true

const intersect = intersectable => distanceFunction => ray => {
  const epsilon = 0.0001
  let t = distanceFunction(ray.origin)
  let prevD = 0
  let omega = 1.6

  // Check if we start outside or inside
  const sign = t < 0 ? -1 : 1

  // // Check how far the furthest ray distance is from the surface, and subtract that from the max
  let tMax = Math.min(10, ray.tMax)
  tMax =
    tMax -
    sign * distanceFunction(v3.add(ray.origin, v3.scale(ray.direction, tMax)))

  // if (doLog) {
  //   console.log(`t: ${t}, tMax: ${tMax}`)
  //   doLog = false
  // }

  let n = 0
  const nMax = 10000
  while (t < tMax && n < nMax) {
    const point = v3.add(ray.origin, v3.scale(ray.direction, t))
    const d = distanceFunction(point)
    const dt = d * sign * omega

    if (dt < 0) {
      // Went through surface, stepping back
      // We have a hit between here and previous somewhere... (bisect?)
      // t += 1.6 * dt
      if (doLog) {
        console.log(`dt: ${dt}, prevD: ${prevD}, t: ${t}, tMax: ${tMax}`)
        doLog = false
      }

      t -= prevD
      omega /= 2
      // } else if (dt < epsilon && t > epsilon) {
    } else if (dt < epsilon && n > 1 && t > epsilon) {
      // if (dt < epsilon && t > epsilon * 1.2) {
      // Close enough to consider it a hit
      const normal = normalAtPoint(distanceFunction, point, epsilon)
      const offsetPoint = v3.add(point, v3.scale(normal, -dt))
      // const offsetPoint = point
      return {
        t,
        point: offsetPoint,
        basis: arbitraryBasisForNormal(normal),
        // basis: arbitraryBasisForNormal(directedNormal),
        intersectable: intersectable
      }
    } else {
      // No hit, continuing to next iteration
      prevD = dt
      t += dt
    }
    n++
  }
}

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

const intersect_good = intersectable => distanceFunction => ray => {
  const epsilon = 0.001
  let t = 0.0005 // Prevent sef-intersection
  // let t = epsilon * 10 // Prevent sef-intersection
  let tMax = Math.min(ray.tMax, 10)
  while (t < tMax) {
    const point = v3.add(ray.origin, v3.scale(ray.direction, t))
    // const point = v3.add(ray.origin, v3.scale(ray.direction, t))
    const distance = distanceFunction(point)

    if (
      t > ray.tMin &&
      t < ray.tMax &&
      // distance < epsilon
      distance < epsilon &&
      distance > -epsilon
      // distance > 0
      // distance < epsilon / 2
    ) {
      const normal = normalAtPoint(distanceFunction, point, epsilon)
      return {
        t,
        // point,
        point: v3.add(point, v3.scale(normal, -2 * distance)),
        basis: arbitraryBasisForNormal(
          // normalAtPoint(distanceFunction, point, 0.01)
          // normalAtPoint(distanceFunction, point, epsilon)
          normal
        ),
        intersectable: intersectable
      }
    }
    // t += Math.abs(distance)
    t += Math.max(distance, epsilon)
    // t += distance

    // if (t < ray.tMin && t > ray.tMax) {
    //   return
    // }
  }
}

const intersect__ = intersectable => distanceFunction => ray => {
  // http://erleuchtet.org/~cupe/permanent/enhanced_sphere_tracing.pdf
  const forceHit = true

  const tMin = Math.max(ray.tMin, 0.005)
  const tMax = Math.min(ray.tMax, 10)
  // let omega = 1.6
  // let omega = 1.2
  let omega = 1

  let previousRadius = 0
  let stepLength = 0
  // let stepLength = distanceFunction(ray.origin)
  // let functionSign = stepLength < 0 ? -1 : 1
  // let t = stepLength * functionSign
  let functionSign = distanceFunction(ray.origin) < 0 ? -1 : 1
  let t = tMin

  while (t < tMax) {
    const point = v3.add(ray.origin, v3.scale(ray.direction, t))
    const signedRadius = functionSign * distanceFunction(point)
    const radius = Math.abs(signedRadius)

    const sorFail = omega > 1 && radius + previousRadius < stepLength
    if (sorFail) {
      stepLength -= omega * stepLength
      omega = 1
    } else {
      stepLength = signedRadius * omega

      // if (t > ray.tMin && radius < previousRadius && radius < tMin) {
      if (t > ray.tMin && radius < tMin) {
        // if (t > tMin && radius < tMin && signedRadius > -tMin) {
        // const normal = v3.negate(normalAtPoint(distanceFunction, point, 0.01))
        const normal = normalAtPoint(distanceFunction, point, 0.01)
        return {
          t,
          point: v3.add(point, v3.scale(normal, -2 * radius)),
          basis: arbitraryBasisForNormal(
            normal
            // normalAtPoint(distanceFunction, point, 0.01)
            // normalAtPoint(distanceFunction, point, 0.01)
            // v3.scale(normalAtPoint(distanceFunction, point, tMin), -1)
          ),
          intersectable: intersectable
        }
      }
    }

    previousRadius = radius
    t += stepLength

    if (!sorFail || t > tMax) {
      break
    }
  }

  if (t > tMax && !forceHit) {
    return
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
