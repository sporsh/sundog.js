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

  const nMax = 200
  // const nMax = 100
  let n = 0

  // Avoid self-intersection
  // while (dt < ray.tMin && n++ < nMax) {
  while (dt < ray.tMin) {
    // while (dt < ray.tMin && t < 2 * ray.tMin) {
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
  // n = 0

  // Check how far the furthest ray distance is from the surface, and subtract that from the max
  let tMax = Math.min(1000, ray.tMax)
  tMax =
    tMax -
    sign * distanceFunction(v3.add(ray.origin, v3.scale(ray.direction, tMax)))

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

      // // DEBUG WHEN OVERSTEPPING
      // const normal = normalAtPoint(distanceFunction, point, ray.tMin)
      // return {
      //   t,
      //   point: v3.add(point, v3.scale(normal, -d)),
      //   basis: arbitraryBasisForNormal(normal),
      //   material: () => ({
      //     pdf: () => v3.fromXYZ(0, 0, 0),
      //     emittance: () => v3.fromXYZ(1, 0, 1)
      //   })
      // }

      // prevD = prevD / 2
      // t -= prevD

      // sign = -sign
      // prevD = Math.min(-prevD, dt)
      // t += prevD

      t += Math.min(-prevD, dt)
      // prevD = dt
      // t += dt * omega

      omega *= 0.5
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
        // point,
        // point: v3.add(point, v3.scale(normal, -dt * sign)),
        // point: v3.add(point, v3.scale(normal, -dt)),
        // point: v3.add(point, v3.scale(normal, d)),
        point: v3.add(point, v3.scale(normal, -d)),
        basis: arbitraryBasisForNormal(normal),
        // basis: arbitraryBasisForNormal(v3.scale(normal, sign)),
        // basis: arbitraryBasisForNormal(directedNormal),
        material
      }
    } else {
      // No hit, continuing to next iteration
      prevD = dt
      t += dt * omega
      omega = 1
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

export const dfCappedCylinder = ({ height, radius }) => ({ x, y, z }) => {
  const dx = Math.abs(Math.sqrt(x * x + z * z) - height)
  const dy = Math.abs(y - radius)

  const dlx = Math.max(dx, 0)
  const dly = Math.max(dy, 0)
  const dl = Math.sqrt(dlx * dlx + dly * dly)
  return Math.min(Math.max(dx, dy), 0) + dl
  // return (
  //   Math.min(Math.max(dx, dy), 0) + v3.length(v3.max(v3.fromXYZ(dx, dy, 0), 0))
  // )
}

export const dfCylinder = ({ height, radius }) => ({ x, y, z }) => {
  const d = Math.sqrt(x * x + z * z) - radius
  return Math.max(d, Math.abs(y) - height)
}

// export const dfCylinder = c => p => {
//   const x = p.x - c.x
//   const y = p.z - c.y
//   const l = Math.sqrt(x * x + y * y)
//   return l - c.z
// }

// float sdCappedCylinder( vec3 p, float h, float r )
// {
//   vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(h,r);
//   return
// min(
//   max(d.x,d.y)
//   ,0.0)
//  + length(max(d,0.0));
// }

export const dfOctahedron = s => point => {
  const p = v3.abs(point)
  return (p.x + p.y + p.z - s) * 0.57735027
}

// Alterations

export const dfTranslate = offset => point => v3.sub(point, offset)

// export const dfRotate = k => ({ x, y, z }) => {
//   const cost = Math.cos(k)
//   const sint = Math.sin(k)
//   // return v3.fromXYZ(cost * x + -sint * z, y, sint * x + cost * z)
//   return v3.fromXYZ(x * cost - z * sint, y, z * cost + x * sint)
// }

export const dfRotate = k => ({ x, y, z }) => {
  const cost = Math.cos(k)
  const sint = Math.sin(k)

  return v3.fromXYZ(x * cost + z * sint, y, z * cost - x * sint)
  // return v3.fromXYZ(x * cost - z * sint, y, z * cost + x * sint)
}

// export const dfTwist = theta => ({ x, y, z }) => {
//   const k = theta
//   const cost = Math.cos(k * y)
//   const sint = Math.sin(k * y)
//   return v3.fromXYZ(cost * x + -sint * z, y, sint * x + cost * z)
// }

// export const dfTwist = theta => ({ x, y, z }) => {
//   // vec2 v = vec2(x, y);
//   // mat2 m = mat2(cost, -sint,  sint, cost);
//   // vec2 w = m * v; // = vec2(cost * x + sint * y, -sint * x + cost * y)
//   //
//   //
//   // const float k = 10.0; // or some other amount
//   // float cost = cos(k*p.y);
//   // float sint = sin(k*p.y);
//   // mat2  m = mat2(cost,-sint,sint,cost);
//   // vec3  q = vec3(m*p.xz,p.y);
//   // return primitive(q);
//
//   const k = theta
//   const cost = Math.cos(k * y)
//   const sint = Math.sin(k * y)
//   // return v3.fromXYZ(cost * x + -sint * z, y, sint * x + cost * z)
//   return v3.fromXYZ(cost * x + sint * z, y, -sint * x + cost * z)
// }

export const dfTwist = theta => point => dfRotate(theta * point.y)(point)

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

// const dfMod2 = size => point => {
//   const halfSize = size * 0.5
//   const c = v3.floor(v3.scale(v3.addAll(point, halfSize), 1 / size))
//   return v3.mod(v3.scale(v3.addAll(point, halfSize),))
//   // c = floor((p + size*0.5)/size);
//   // p = mod(p + size*0.5,size) - size*0.5;
//   // return c;
// }

export const dfRepeat = c => p => {
  // return v3.sub(v3.fromXYZ(p.x % c.x, p.y % c.y, p.z % c.z), v3.scale(c, 0.5))

  // return v3.sub(v3.mod(p, c.x), v3.scale(c, 0.5))
  // return v3.mod(v3.addAll(p, c.x * 0.5), c.x) - c.x * 0.5

  // const q = v3.fromXYZ((p.x % 1.0) - 0.5, p.y, p.z)
  // // const s = 1.0
  // // return v3.addAll(v3.abs(q), -s)
  // return v3.abs(q)

  // return v3.add(v3.mod(p, c), v3.scale(c, -0.5))
  // vec3 q = mod(p,c)-0.5*c;
  // return v3.mod(p, c)

  // return v3.add(v3.mod(p, c), v3.scale(c, -0.5))
  // return v3.mod(v3.add(p, v3.scale(c, -0.5)), c)
  // return v3.add(v3.mod(p, c), v3.scale(c, 0.5))

  const cHalf = v3.scale(c, 0.5)
  return v3.sub(v3.mod(v3.add(p, cHalf), c), cHalf)

  // return v3.mod(v3.add(p, v3.scale(c, 0.5)), c)
  // return v3.add(v3.mod(p, c), v3.scale(c, 0.5))
  // return v3.add(v3.mod(p, c), v3.scale(c, -0.5))

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
