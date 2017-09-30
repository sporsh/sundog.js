import { fromXYZ, ZERO, normalize, scale, sub, dot } from './vector3.js'
import { toStandardBasis } from './basis.js'

const lambertianScatter = (outgoing, surface) => {
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
    scatter: (outgoing, { normal }) =>
        sub(scale(normal, 2 * Math.max(0, dot(normal, outgoing))), outgoing),
    emittance: () => emittance
})
