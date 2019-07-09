import * as v3 from './vector3.js'

const RUSSIAN_ROULETTE_THRESHOLD = 8

export const iterative = ({
  maxDepth = 8,
  russianRouletteThreshold = 3
}) => intersect => ray => {
  let radiance = v3.fromXYZ(0, 0, 0)
  let weight = v3.fromXYZ(1, 1, 1)
  let depth = 0

  while (depth < maxDepth) {
    const intersection = intersect(ray)
    if (intersection) {
      const { point, basis, material } = intersection
      const emittance = material.emittance(ray.direction)
      radiance = v3.add(radiance, v3.hadamard(emittance, weight))

      let prob = material.pdf(ray.direction, basis)
      const pMax = Math.max(prob.x, prob.y, prob.z)

      if (depth >= russianRouletteThreshold) {
        //  Russian roulette
        if (Math.random() > pMax) {
          return radiance
        }
        prob = v3.scale(prob, 1 / pMax)
      }

      weight = v3.hadamard(weight, prob)

      ray.origin = point
      ray.direction = material.scatter(ray.direction, basis)
      depth++
    } else {
      return radiance
    }
  }
  return radiance
}

export const recursive = (intersect, maxDepth = 8) => {
  const trace = (ray, radiance, weight, depth) => {
    const intersection = intersect(ray)
    if (intersection) {
      const {
        point,
        basis,
        intersectable: {
          material: { pdf, emittance, scatter }
        }
      } = intersection
      let prob = pdf(ray.direction, basis)
      const pMax = Math.max(Math.max(prob.x, prob.y), prob.z)

      const newRadiance = v3.add(
        radiance,
        v3.hadamard(emittance(ray.direction), weight)
      )

      //  Russian roulette (after a couple of bounces)
      if (pMax <= 0 || depth > RUSSIAN_ROULETTE_THRESHOLD) {
        //  Russian roulette
        if (Math.random() > pMax) {
          return radiance
        }
        prob = v3.scale(prob, 1 / pMax)
      }
      // if (
      //   (pMax >= 1 && depth > maxDepth) ||
      //   pMax <= 0 ||
      //   (depth > RUSSIAN_ROULETTE_THRESHOLD && Math.random() > pMax)
      // ) {
      //   return newRadiance
      // }

      const newRay = {
        origin: point,
        direction: scatter(ray.direction, basis),
        tMin: ray.tMin,
        tMax: ray.tMax
      }
      const newWeight = v3.hadamard(weight, prob)
      return trace(newRay, newRadiance, newWeight, depth + 1)
    } else {
      return radiance
    }
  }
  return trace
}
