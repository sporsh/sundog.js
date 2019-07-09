import * as v3 from './vector3'
import { arbitraryBasisForNormal } from './basis'

export const intersect = ({ material }) => distanceFunction => ray => {
  // TODO: Triangulate where ray intersects with tangent(point - (normal * d))

  let omega = 1

  // Initial step and initialization (for self-intersection)
  let prevD = ray.tMin
  let t = ray.tMin
  let point = v3.add(ray.origin, v3.scale(ray.direction, t))
  let d = distanceFunction(point)
  let sign = d < 0 ? -1 : 1
  let dt = d * sign

  t += dt

  // Avoid self-intersection
  while (dt < ray.tMin) {
    point = v3.add(ray.origin, v3.scale(ray.direction, t))
    d = distanceFunction(point)

    if (d == 0) {
      t += ray.tMin
    } else {
      sign = d < 0 ? -1 : 1
      dt = d * sign

      prevD = dt
      t += dt
    }
  }

  // Check how far the furthest ray distance is from the surface, and subtract that from the max
  let tMax = Math.min(1000, ray.tMax)
  tMax =
    tMax -
    sign * distanceFunction(v3.add(ray.origin, v3.scale(ray.direction, tMax)))

  const nMax = 100
  let n = 0

  while (t < tMax && n++ < nMax) {
    // while (t < tMax) {
    point = v3.add(ray.origin, v3.scale(ray.direction, t))
    d = distanceFunction(point)
    dt = d * sign

    if (dt < 0) {
      // Went through surface, stepping back
      // We have a hit between here and previous somewhere... (bisect?)
      // t += 1.6 * dt

      // const newT = t - prevD
      // prevD = (t - newT) / 2
      // t = newT
      prevD = prevD / 2
      t -= prevD

      omega = 1
    } else if (dt < ray.tMin) {
      // Close enough to consider it a hit
      const normal = normalAtPoint(distanceFunction, point, ray.tMin)

      // Point on tangent plane
      // t =
      //   // (v3.length(v3.add(point, v3.scale(normal, -dt))) -
      //   (v3.length(v3.add(point, v3.scale(normal, d))) -
      //     v3.dot(normal, ray.origin)) /
      //   v3.dot(normal, ray.direction)
      // point = v3.add(ray.origin, v3.scale(ray.direction, t))

      return {
        t,
        point,
        // point: v3.add(point, v3.scale(normal, -dt * sign)),
        // point: v3.add(point, v3.scale(normal, -dt)),
        // point: v3.add(point, v3.scale(normal, d)),
        basis: arbitraryBasisForNormal(normal),
        // basis: arbitraryBasisForNormal(v3.scale(normal, sign)),
        // basis: arbitraryBasisForNormal(directedNormal),
        material
      }
    } else {
      // No hit, continuing to next iteration
      prevD = dt
      t += dt * omega
    }
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

const round = radius => distanceFunction => point =>
  distanceFunction(point) - radius

export const dfSphere = radius => point => v3.length(point) - radius

export const dfBox = dimensions => point => {
  const d = v3.sub(v3.abs(point), dimensions)
  return (
    v3.length(v3.max(d, 0)) + Math.min(Math.max(d.x, Math.max(d.y, d.z)), 0.0)
  )
}

export const dfTorus = ({ major, minor }) => ({ x, y, z }) => {
  const l0 = Math.sqrt(x * x + y * y) - major
  const l1 = z
  return Math.sqrt(l0 * l0 + l1 * l1) - minor
}

export const dfOctahedron = s => point => {
  const p = v3.abs(point)
  return (p.x + p.y + p.z - s) * 0.57735027
}

// Alterations

export const dfTranslate = offset => point => v3.sub(point, offset)

export const dfRotate = k => ({ x, y, z }) => {
  const c = Math.cos(k)
  const s = Math.sin(k)
  return v3.fromXYZ(c * x + -s * z, y, s * x + c * z)
}

export const dfTwist = turns => ({ x, y, z }) => {
  const k = turns
  const c = Math.cos(k * y)
  const s = Math.sin(k * y)
  return v3.fromXYZ(c * x + -s * z, y, s * x + c * z)
}

// Combinations

export const dfUnion = dfs => point => Math.min(...dfs.map(df => df(point)))

// export const dfSubtract = dfs => point => Math.min(...dfs.map(df => df(point)))
export const dfSubtract = ([a, ...b]) => point =>
  Math.max(a(point), ...b.map(df => -df(point)))
// { return max(-d1,d2); }

export const dfIntersect = material => dfs => intersect(material)(dfs)

// DISPLACEMENT
const displace = v => ({ x, y, z }) =>
  Math.sin(v * x) * Math.sin(v * y) * Math.sin(v * z)

export const dfDisplace = v => df => point => {
  const d = df(point)
  const displacement = displace(v)(point)
  return d + displacement
}

// REPETITION

export const dfRepeat = c => p => {
  return v3.sub(v3.fromXYZ(p.x % c.x, p.y % c.y, p.z % c.z), v3.scale(c, 0.5))
  // const q = v3.fromXYZ(p.x % c.x - c.x * 0.5, p.y % c.y, p.z % c.z)
  // const q = v3.fromXYZ((p.x % c.x) - c.x * 0.5, p.y, p.z)
  // return v3.sub(v3.abs(q), v3.fromXYZ(1, 1, 1))
  // return v3.abs(q)
  // return q
  // const q2 = v3.sub(v3.abs(q), v3.scale(c, 0.5))
  // return v3.abs(q2)
  // return v3.scale(q, 0.5)
  // return q
}
