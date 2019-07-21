import * as v3 from './vector3.js'
import * as basis from './basis.js'

// const lambertianBsdf = albedo => {
//   const distribution = v3.scale(albedo, 1 / Math.PI)
//   return (incoming, outgoing, { normal }) =>
//     v3.scale(distribution, v3.dot(normal, incoming))
// }
export const lambertianMaterial = ({ albedo, emittance = v3.ZERO }) => () => ({
  // bsdf: lambertianBsdf(albedo),
  emittance: () => emittance,
  pdf: () => albedo,
  scatter: (incoming, surfaceBasis) => {
    const u1 = Math.random()
    const u2 = Math.random()

    const sinTheta = Math.sqrt(u1)
    const cosTheta = Math.sqrt(1 - u1)

    const phi = 2 * Math.PI * u2

    return v3.normalize(
      basis.toStandardBasis(surfaceBasis, {
        x: sinTheta * Math.cos(phi),
        y: sinTheta * Math.sin(phi),
        z: cosTheta
      })
    )
  }
})

export const specularMaterial = ({ albedo, emittance = v3.ZERO }) => () => ({
  pdf: () => albedo,
  emittance: () => emittance,
  scatter: (incoming, { normal }) =>
    v3.normalize(
      v3.sub(incoming, v3.scale(normal, 2 * v3.dot(normal, incoming)))
    )
})

const fresnelDielectric = (cosThetaI, etaI, etaT) => {
  cosThetaI = Math.min(1, Math.max(-1, cosThetaI))
  // Potentially swap indices of refraction
  const entering = cosThetaI > 0
  if (!entering) {
    const etaI_ = etaI
    etaI = etaT
    etaT = etaI_
    cosThetaI = Math.abs(cosThetaI)
  }

  // Compute cosThetaT using Snell’s law
  const sinThetaI = Math.sqrt(Math.max(0, 1 - cosThetaI * cosThetaI))
  const sinThetaT = (etaI / etaT) * sinThetaI

  if (sinThetaT >= 1) {
    // Total internal refletion, always choose the reflection route
    return 1
  }

  const cosThetaT = Math.sqrt(Math.max(0, 1 - sinThetaT * sinThetaT))

  const Rparl =
    (etaT * cosThetaI - etaI * cosThetaT) /
    (etaT * cosThetaI + etaI * cosThetaT)
  const Rperp =
    (etaI * cosThetaI - etaT * cosThetaT) /
    (etaI * cosThetaI + etaT * cosThetaT)
  return (Rparl * Rparl + Rperp * Rperp) / 2
}

const cosTheta = ({ z }) => z
const cos2Theta = ({ z }) => z * z
const absCosTheta = ({ z }) => Math.abs(z)
const sin2Theta = w => Math.max(0, 1 - cos2Theta(w))
const sinTheta = w => Math.sqrt(sin2Theta(w))
const tanTheta = w => sinTheta(w) / cosTheta(w)
const tan2Theta = w => sin2Theta(w) / cos2Theta(w)

const refract = (incident, normal, eta) => {
  // Compute  using Snell’s law
  const cosThetaI = v3.dot(normal, incident)
  const sin2ThetaI = Math.max(0, 1 - cosThetaI * cosThetaI)
  const sin2ThetaT = eta * eta * sin2ThetaI

  if (sin2ThetaT >= 1) {
    // Total internal reflection
    return
  }

  const cosThetaT = Math.sqrt(1 - sin2ThetaT)
  return v3.add(
    v3.scale(v3.negate(incident), eta),
    v3.scale(normal, eta * cosThetaI - cosThetaT)
  )
}

const faceForward = (n, v) => {
  return v3.dot(n, v) < 0 ? v3.negate(n) : n
}

export const fresnelSpecularTransmissiveMaterial = ({
  albedo,
  emittance = v3.ZERO,
  refractiveIndex
}) => () => ({
  pdf: () => albedo,
  emittance: () => emittance,
  scatter: (incoming, surfaceBasis) => {
    const wo = basis.fromStandardBasis(surfaceBasis, v3.negate(incoming))
    const fresnel = fresnelDielectric(cosTheta(wo), 1, refractiveIndex)
    if (Math.random() < fresnel) {
      // Specular reflection
      return basis.toStandardBasis(surfaceBasis, v3.fromXYZ(-wo.x, -wo.y, wo.z))
    } else {
      // Specular transmission
      const entering = cosTheta(wo) > 0
      const etaI = entering ? 1 : refractiveIndex
      const etaT = entering ? refractiveIndex : 1

      return basis.toStandardBasis(
        surfaceBasis,
        refract(wo, faceForward(v3.fromXYZ(0, 0, 1), wo), etaI / etaT)
      )
    }
  }
})

export const checkerCube = ({ black, white, size }) => ({ point }) => {
  const x = Math.floor(point.x * size.x)
  const y = Math.floor(point.y * size.y)
  const z = Math.floor(point.z * size.z)
  return (x + y + z) % 2 ? white.material() : black.material()
}

// export const proceduralGridTexture = ({
//   thickness = 0.01,
//   grid,
//   background
// }) => {
//   const delta = v => Math.abs(v - Math.floor(v + 0.5))
//   const isline = v => (delta(v) < thickness ? true : false)
//   return ({ point: { x, y, z } }) => {
//     if (isline(x) || isline(z)) {
//       return grid.material()
//     } else {
//       return background.material()
//     }
//     // isline(x) *	isline(y) * isline(z)
//
//     // const def eval(vec3 pos) vec3 :
//     // 	vec3( grid(pos*10.0) * grid(pos*100.0) * grid(pos*1000.0) * 0.6 + 0.3)]]
//   }
// }

export const proceduralGridTexture = ({ thickness = 0.01 }) => {
  const delta = v => Math.abs(v - Math.floor(v + 0.5))
  const isline = v => (delta(v) > thickness ? 1 : 0)
  const grid = ({ x, y, z }) => isline(x) * isline(z)
  // const grid = ({ x, y, z }) => v3.fromXYZ(isline(x), isline(y), isline(z))
  // const grid = ({ x, y, z }) => v3.fromXYZ(isline(x), isline(y), isline(z))
  // const grid = ({ x, y, z }) => {
  //   const r = isline(x)
  //   const g = 0 //isline(y)
  //   const b = isline(z)
  //   return v3.fromXYZ(1 - b, 1 - r - b, 1 - r)
  // }

  return ({ point }) => {
    const c =
      grid(point) *
        grid(v3.scale(point, 10.0)) *
        // grid(v3.scale(point, 100.0)) *
        0.6 +
      0.3

    return lambertianMaterial({ albedo: v3.fromXYZ(c, c, c) })()
  }
}

// export const proceduralGridTexture = ({ thickness = 0.01 }) => {
//   const delta = v => Math.abs(v - Math.floor(v + 0.5))
//   const isline = v => (delta(v) < thickness ? 1 : 0)
//   // const grid = ({ x, y, z }) => isline(x) * isline(z)
//   // const grid = ({ x, y, z }) => v3.fromXYZ(isline(x), isline(y), isline(z))
//   // const grid = ({ x, y, z }) => v3.fromXYZ(isline(x), isline(y), isline(z))
//   const grid = ({ x, y, z }) => {
//     const r = isline(x)
//     const g = 0 //isline(y)
//     const b = isline(z)
//     return v3.fromXYZ(1 - b, 1 - r - b, 1 - r)
//   }
//
//   return ({ point }) => {
//     // const c =
//     //   grid(point) *
//     //     grid(v3.scale(point, 10.0)) *
//     //     grid(v3.scale(point, 100.0)) *
//     //     0.6 +
//     //   0.3
//     // return lambertianMaterial({ albedo: v3.fromXYZ(c, c, c) })()
//
//     // const c = v3.addAll(
//     //   v3.scale(
//     //     v3.hadamard(
//     //       v3.hadamard(grid(point), grid(v3.scale(point, 10.0))),
//     //       grid(v3.scale(point, 100.0))
//     //     ),
//     //     0.6
//     //   ),
//     //   0.3
//     // )
//     // const c = v3.sub(
//     //   v3.fromXYZ(1, 1, 1),
//     //   v3.scale(v3.hadamard(grid(point), v3.fromXYZ(1, 0, 1)), 0.5)
//     // )
//     const c = v3.scale(grid(point), 0.9)
//     return lambertianMaterial({ albedo: c })()
//     // if (isline(x) * isline(z)) {
//     //   return grid.material()
//     // } else {
//     //   return background.material()
//     // }
//     // isline(x) *	isline(y) * isline(z)
//
//     // const def eval(vec3 pos) vec3 :
//     // 	vec3( grid(pos*10.0) * grid(pos*100.0) * grid(pos*1000.0) * 0.6 + 0.3)]]
//   }
// }

export const checkerTexture = ({ black, white, size }) => ({
  point,
  basis
}) => {
  // const x = Math.floor(point.x * size.x)
  // const y = Math.floor(point.y * size.y)
  // const z = Math.floor(point.z * size.z)
  // return (x + y + z) % 2 ? white.material() : black.material()

  const { u, v } = sphericalMapping(basis.normal)
  const x = Math.floor(u * size.x)
  const y = Math.floor(v * size.y)
  return (x + y) % 2 ? white.material() : black.material()

  // const x = Math.floor(basis.tangent.y * size.x)
  // const y = Math.floor(basis.tangent.x * size.y)
  // const z = 0 //Math.floor(basis.bitangent.x * size.z)
  // return (x + y + z) % 2 ? white.material() : black.material()

  // const x = Math.floor(basis.normal.y * size.x)
  // const y = Math.floor(basis.normal.x * size.y)
  // const z = 0 //Math.floor(basis.bitangent.x * size.z)
  // return (x + y + z) % 2 ? white.material() : black.material()

  // const x = Math.floor(
  //   (basis.normal.x + basis.normal.y + basis.normal.z) * size.x
  // )
  // const y = Math.floor(
  //   (basis.tangent.x + basis.tangent.y + basis.tangent.z) * size.x
  // )
  // const z = Math.floor(
  //   (basis.bitangent.x + basis.bitangent.y + basis.bitangent.z) * size.x
  // )
  // // const y = Math.floor(
  // //   Math.min(basis.normal.x, basis.normal.y, basis.normal.z) * size.x
  // // )
  // // const y = Math.floor(basis.normal.x * size.y)
  // // const z = Math.floor(basis.normal.z * size.z)
  // // return (x + (y + z)) % 2 ? white.material() : black.material()
  // return y % 2 ? white.material() : black.material()

  // const n = v3.scale(v3.add(basis.normal, v3.fromXYZ(1, 1, 1)), 0.5)
  // const x = 0 //Math.floor(n.x * size.x)
  // const y = Math.floor(n.y * size.y)
  // const z = Math.floor(n.z * size.z)
  // return (x + y + z) % 2 ? white.material() : black.material()
}

export const normalTexture = () => ({ basis: { normal } }) => {
  const albedo = v3.scale(v3.add(normal, v3.fromXYZ(1, 1, 1)), 0.5)
  return lambertianMaterial({ albedo })()
}

const sphericalMapping = vector => {
  const theta = sphericalTheta(vector)
  const phi = sphericalPhi(vector)

  const u = theta / Math.PI
  const v = phi / (Math.PI * 2)
  // const u = theta / (Math.PI * 2)
  // const v = phi / (Math.PI * 2)

  return { u, v }

  // const x = Math.floor(u * size.x)
  // const y = Math.floor(v * size.y)
  // return (x + y) % 2 ? white.material() : black.material()
}

// const sphericalTheta = ({ x, y, z }) => Math.acos(clampUnit(z))
const sphericalTheta = ({ y }) => Math.acos(clampUnit(y))
// const sphericalTheta = ({ x, y, z }) => Math.acos(z)
// return std::acos(Clamp(v.z, -1, 1));

const sphericalPhi = ({ x, y, z }) => {
  // const p = Math.atan2(y, x)
  const p = Math.atan2(x, z)
  return p < 0 ? p + 2 * Math.PI : p
}

const clamp = (min, max) => value => Math.max(min, Math.min(value, max))

const clampUnit = clamp(-1, 1)

import * as v2 from './vector2'
import * as sdf2d from './sdf2d'

export const sdf2dtexture = ({ black, white }) => ({ point }) => {
  let p2d = v2.fromXY(point.x, point.z)
  // let p2d = sdf2d.fTranslate(v2.fromXY(0.5, 0.5))(v2.fromXY(point.x, point.z))
  // p2d = v2.mod(p2d, v2.fromXY(1, 1))
  p2d = sdf2d.fTranslate(v2.fromXY(0.5, 0))(p2d)
  p2d = sdf2d.fRepeat(v2.fromXY(1, 1))(p2d)
  // const p2d = v2.mod(v2.fromXY(point.x, point.z), 2)

  // const d = sdf2d.dCircle({ radius: 0.5 })(p2d)

  // const d = sdf2d.dCircle({ radius: 1 })(sdf2d.fTranslate(0, 0)(p2d))
  // const d = sdf2d.dX({ width: 0.01 })(v2.fromXY(point.x, point.z))
  // const d = sdf2d.dLine({ n: { x: 1, y: 0 }, width: 0.01 })(
  // const d = sdf2d.fUnion([
  //   // const d = sdf2d.fIntersect([
  //   // const d = sdf2d.fSubtract([
  //   sdf2d.dLine({ n: v2.normalize({ x: 1, y: 1 }), width: 0.01 }),
  //   sdf2d.dLine({ n: v2.normalize({ x: -1, y: 1 }), width: 0.01 })
  // ])(p2d)

  const d = sdf2d.fIntersect([
    sdf2d.dLine({ n: v2.normalize({ x: 1, y: 1 }), width: Math.sqrt(2) / 4 }),
    sdf2d.dLine({ n: v2.normalize({ x: -1, y: 1 }), width: Math.sqrt(2) / 4 })
  ])(p2d)

  return d < 0 ? black.material() : white.material()
}
