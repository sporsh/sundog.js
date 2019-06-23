import { add, hadamard, scale } from './vector3.js'

const RUSSIAN_ROULETTE_THRESHOLD = 2

export const tracer = (intersect, maxDepth = 8) => {
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
      const prob = pdf(ray.direction, basis)
      const pMax = Math.max(Math.max(prob.x, prob.y), prob.z)

      const newRadiance = add(
        radiance,
        hadamard(emittance(ray.direction), weight)
      )

      //  Russian roulette (after a couple of bounces)
      if (
        (pMax >= 1 && depth > maxDepth) ||
        pMax <= 0 ||
        (depth > RUSSIAN_ROULETTE_THRESHOLD && Math.random() > pMax)
      ) {
        return newRadiance
      }

      const newRay = {
        origin: point,
        direction: scatter(ray.direction, basis),
        tMin: ray.tMin,
        tMax: ray.tMax
      }
      const newWeight = hadamard(weight, scale(prob, 1 / pMax))
      return trace(newRay, newRadiance, newWeight, depth + 1)
    } else {
      return radiance
    }
  }
  return trace
}
