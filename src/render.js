import { fromXYZ, add, scale } from './vector3.js'
import { fromV3, toAbgr32 } from './color.js'

export const renderRegion = (trace, cameraRayThrough) => (
  spp,
  x0,
  y0,
  x1,
  y1,
  width,
  height
) => {
  const dx = x1 - x0
  const dy = y1 - y0
  const buffer = new Float64Array(dx * dy * 3)
  const halfWidth = width / 2
  const halfHeight = height / 2

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      for (let n = 0; n < spp; n++) {
        const u = (x + Math.random()) / halfWidth - 1
        const v = (y + Math.random()) / halfHeight - 1
        const ray = cameraRayThrough(
          u + (2 * Math.random() - 1) / width,
          v + (2 * Math.random() - 1) / height
        )
        let radiance = trace(ray, fromXYZ(0, 0, 0), fromXYZ(1, 1, 1), 0)
        // const color = fromV3(scale(radiance, 1 / spp))
        const i = (x - x0) * 3 + (y - y0) * dx * 3
        buffer[i] += radiance.x
        buffer[i + 1] += radiance.y
        buffer[i + 2] += radiance.z
      }
    }
  }

  return buffer
}
