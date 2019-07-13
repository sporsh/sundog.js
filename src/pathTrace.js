import * as v3 from './vector3.js'

export const iterative = ({
  maxDepth = 8,
  russianRouletteThreshold = 0
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

      // if (depth >= russianRouletteThreshold) {
      //   //  Russian roulette
      //   if (Math.random() > pMax) {
      //     return radiance
      //   }
      //   prob = v3.scale(prob, 1 / pMax)
      // }
      if (pMax <= 0) {
        return radiance
      }

      const { direction, pdf } = material.scatter(ray.direction, basis)

      weight = v3.hadamard(weight, prob)
      weight = v3.scale(weight, 1 / pdf)

      if (depth > russianRouletteThreshold) {
        const q = Math.max(0.05, 1 - Math.max(weight.x, weight.y, weight.z))
        if (Math.random() < q) {
          return radiance
        }
        weight = v3.scale(weight, 1 / (1 - q))
      }

      ray.origin = point
      ray.direction = direction
      depth++
    } else {
      return radiance
    }
  }
  return radiance
}

export const recursive = ({
  maxDepth = 8,
  russianRouletteThreshold = 2
}) => intersect => {
  const trace = (ray, radiance, weight, depth) => {
    if (depth > maxDepth) {
      return radiance
    }

    const intersection = intersect(ray)
    if (intersection) {
      const { point, basis, material } = intersection

      let prob = material.pdf(ray.direction, basis)
      // if (Math.max(prob.x, prob.y, prob.z) <= 0) {
      //   return radiance
      // }

      const newRadiance = v3.add(
        radiance,
        v3.hadamard(material.emittance(ray.direction), weight)
      )

      const { direction, pdf } = material.scatter(ray.direction, basis)

      // const newWeight = v3.scale(v3.hadamard(weight, prob), 1 / pdf)
      const newWeight = v3.scale(v3.hadamard(weight, prob), pdf)

      // // Russian roulette (after a couple of bounces)
      // const pMax = Math.max(weight.x, weight.y, weight.z)
      //
      // if (pMax <= 0 || depth > russianRouletteThreshold) {
      //   //  Russian roulette
      //   if (Math.random() > pMax) {
      //     return newRadiance
      //   }
      //   weight = v3.scale(weight, 1 / pMax)
      // }
      //
      // if (
      //   depth > maxDepth ||
      //   pMax <= 0 ||
      //   (depth > russianRouletteThreshold && Math.random() > pMax)
      // ) {
      //   return newRadiance
      // }

      const newRay = {
        origin: point,
        direction,
        tMin: ray.tMin,
        tMax: ray.tMax
      }
      // const newWeight = v3.hadamard(weight, prob)
      // const newWeight = weight
      return trace(newRay, newRadiance, newWeight, depth + 1)
    } else {
      return radiance
    }
  }
  return trace
}
