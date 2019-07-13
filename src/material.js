import * as v3 from './vector3.js'
import { toStandardBasis } from './basis.js'

const lambertianScatter = (incoming, surface) => {
  const u1 = Math.random()
  const u2 = Math.random()

  const sinTheta = Math.sqrt(u1)
  const cosTheta = Math.sqrt(1 - u1)

  const phi = 2 * Math.PI * u2

  const direction = v3.normalize(
    toStandardBasis(surface, {
      x: sinTheta * Math.cos(phi),
      y: cosTheta,
      z: sinTheta * Math.sin(phi)
    })
  )

  return { direction, pdf: 1 }
}

const lambertianBsdf = albedo => {
  const distribution = v3.scale(albedo, 1 / Math.PI)
  return (incoming, outgoing, { normal }) =>
    v3.scale(distribution, v3.dot(normal, incoming))
}

export const lambertianMaterial = ({ albedo, emittance = v3.ZERO }) => () => ({
  bsdf: lambertianBsdf(albedo),
  pdf: () => albedo,
  scatter: lambertianScatter,
  emittance: () => emittance
})

export const specularMaterial = ({ albedo, emittance = v3.ZERO }) => () => ({
  pdf: () => albedo,
  scatter: (incoming, { normal }) => ({
    direction: v3.sub(incoming, v3.scale(normal, 2 * v3.dot(normal, incoming))),
    pdf: 1
  }),
  emittance: () => emittance
})

export const transmissiveMaterial = () => ({
  albedo,
  emittance = v3.ZERO,
  refractiveIndex
}) => ({
  pdf: () => albedo,
  scatter: (incoming, { normal }) => {
    const cosi = v3.dot(normal, incoming)
    const eta =
      cosi < 0
        ? // Entering
          1 / refractiveIndex
        : // Exiting
          refractiveIndex / 1
    const normal_ =
      cosi < 0
        ? // Entering
          normal
        : // Exiting
          v3.negate(normal)
    const cost2 = 1 - eta * eta * (1 - cosi * cosi)
    if (cost2 < 0) {
      // Total internal reflection
      return v3.sub(incoming, v3.scale(normal_, 2 * cosi))
    }
    return v3.normalize(
      v3.sub(
        v3.scale(incoming, eta),
        v3.scale(normal_, eta * Math.abs(cosi) + Math.sqrt(cost2))
      )
    )
  },
  emittance: () => emittance
})

const frDiel = (cosi, cost, etai, etat) => {
  const rParallel = (etat * cosi - etai * cost) / (etat * cosi + etai * cost)
  const rPerpendicular =
    (etai * cosi - etat * cost) / (etai * cosi + etat * cost)
  return (rParallel * rParallel + rPerpendicular * rPerpendicular) / 2
}

export const fresnelSpecularTransmissiveMaterial = ({
  albedo,
  emittance = v3.ZERO,
  refractiveIndex
}) => () => ({
  pdf: () => albedo,
  emittance: () => emittance,
  scatter: (incoming, { normal }) => {
    const cosi = v3.dot(normal, incoming)
    const { etat, etai, normal_ } =
      cosi < 0
        ? // Entering
          { etat: refractiveIndex, etai: 1, normal_: normal }
        : // Exiting
          { etat: 1, etai: refractiveIndex, normal_: v3.negate(normal) }
    const eta = etai / etat
    const sint = eta * Math.sqrt(Math.max(0, 1 - cosi * cosi))

    if (sint >= 1) {
      //  Total internal reflection
      return {
        direction: v3.sub(incoming, v3.scale(normal_, 2 * cosi)),
        pdf: 1
      }
    } else {
      const cost = Math.sqrt(Math.max(0, 1 - sint * sint))
      const fresnel = frDiel(Math.abs(cosi), cost, etai, etat) < Math.random()
      if (fresnel) {
        return {
          direction: v3.normalize(
            v3.sub(
              v3.scale(incoming, eta),
              v3.scale(normal_, eta * Math.abs(cosi) + cost)
            )
          ),
          pdf: fresnel
        }
      } else {
        return {
          direction: v3.sub(incoming, v3.scale(normal_, 2 * cosi)),
          pdf: 1 - fresnel
        }
      }
    }
  }
})

export const checkerTexture = ({ black, white, size }) => ({
  point,
  basis
}) => {
  const x = Math.floor(point.x * size.x)
  const y = Math.floor(point.y * size.y)
  const z = Math.floor(point.z * size.z)
  return (x + y + z) % 2 ? white.material() : black.material()
}

export const normalTexture = () => ({ basis: { normal } }) => {
  const albedo = v3.scale(v3.add(normal, v3.fromXYZ(1, 1, 1)), 0.5)
  return lambertianMaterial({ albedo })()
}
