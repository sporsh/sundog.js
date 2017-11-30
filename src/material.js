import { ZERO, normalize, negate, scale, sub, dot } from './vector3.js'
import { toStandardBasis } from './basis.js'

const lambertianScatter = (incoming, surface) => {
    const u1 = Math.random()
    const u2 = Math.random()

    const sinTheta = Math.sqrt(u1)
    const cosTheta = Math.sqrt(1 - u1)

    const phi = 2 * Math.PI * u2

    return normalize(
        toStandardBasis(surface, {
            x: sinTheta * Math.cos(phi),
            y: cosTheta,
            z: sinTheta * Math.sin(phi)
        })
    )
}

const lambertianBsdf = albedo => {
    const distribution = scale(albedo, 1 / Math.PI)
    return (incoming, outgoing, { normal }) =>
        scale(distribution, dot(normal, incoming))
}

export const lambertianMaterial = ({ albedo, emittance = ZERO }) => ({
    bsdf: lambertianBsdf(albedo),
    pdf: () => albedo,
    scatter: lambertianScatter,
    emittance: () => emittance
})

export const specularMaterial = ({ albedo, emittance = ZERO }) => ({
    pdf: () => albedo,
    scatter: (incoming, { normal }) =>
        sub(incoming, scale(normal, 2 * dot(normal, incoming))),
    emittance: () => emittance
})

export const transmissiveMaterial = ({
    albedo,
    emittance = ZERO,
    refractiveIndex
}) => ({
    pdf: () => albedo,
    scatter: (incoming, { normal }) => {
        const cosi = dot(normal, incoming)
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
                  negate(normal)
        const cost2 = 1 - eta * eta * (1 - cosi * cosi)
        if (cost2 < 0) {
            // Total internal reflection
            return sub(incoming, scale(normal_, 2.0 * cosi))
        }
        return normalize(
            sub(
                scale(incoming, eta),
                scale(normal_, eta * Math.abs(cosi) + Math.sqrt(cost2))
            )
        )
    },
    emittance: () => emittance
})
