import { add, normalize, sub } from './vector3.js'
import { fromStandardBasis } from './basis.js'

export const rayThrough = ({
    position,
    basis,
    aperture,
    fieldOfView,
    focalLength
}) => (u, v) => {
    const origin = add(position, randomOriginWithinAperture(aperture))
    const target = add(
        position,
        fromStandardBasis(basis, {
            x: u * fieldOfView * focalLength,
            y: v * fieldOfView * focalLength,
            z: focalLength
        })
    )
    const direction = normalize(sub(target, origin))
    return { origin, direction }
}

const randomOriginWithinAperture = r => {
    const { x, y } = randomPointOnDisc(r)
    return { x, y, z: 0 }
}

const randomPointOnDisc = r =>
    polarToCartesian(Math.sqrt(Math.random()) * r, randomAngle())

const randomAngle = () => Math.random() * PI2

const polarToCartesian = (r, phi) => ({
    x: r * Math.cos(phi),
    y: r * Math.sin(phi)
})

const PI2 = 2 * Math.PI
