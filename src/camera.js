import { add, normalize, sub } from './vector3'
import { toStandardBasis } from './basis'

const EPSILON = 0.00001
// const EPSILON = 0.0000001

export const rayThrough = ({
  position,
  basis,
  aperture,
  fieldOfView,
  focalLength,
  tMin = EPSILON,
  tMax = Infinity
}) => (u, v) => {
  const origin = randomOriginWithinAperture(aperture, position, basis)
  const target = add(
    position,
    toStandardBasis(basis, {
      x: u * fieldOfView * focalLength,
      y: v * fieldOfView * focalLength,
      z: focalLength
    })
  )
  const direction = normalize(sub(target, origin))
  return { origin, direction, tMin, tMax }
}

const randomOriginWithinAperture = (aperture, position, basis) => {
  if (aperture == 0) {
    return position
  } else {
    const { x, y } = randomPointOnDisc(aperture)
    return add(position, toStandardBasis(basis, { x, y, z: 0 }))
  }
}

const randomPointOnDisc = r =>
  polarToCartesian(Math.sqrt(Math.random()) * r, randomAngle())

const randomAngle = () => Math.random() * PI2

const polarToCartesian = (r, phi) => ({
  x: r * Math.cos(phi),
  y: r * Math.sin(phi)
})

const PI2 = 2 * Math.PI
