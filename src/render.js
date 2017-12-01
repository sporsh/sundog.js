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
    const imageData = new ImageData(dx, dy)
    const buffer32 = new Uint32Array(imageData.data.buffer)
    const halfWidth = width / 2
    const halfHeight = height / 2

    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const u = x / halfWidth - 1
            const v = y / halfHeight - 1
            let radiance = fromXYZ(0, 0, 0)
            for (let n = spp; n > 0; n--) {
                const ray = cameraRayThrough(
                    u + (2 * Math.random() - 1) / width,
                    v + (2 * Math.random() - 1) / height
                )
                radiance = add(
                    radiance,
                    trace(ray, fromXYZ(0, 0, 0), fromXYZ(1, 1, 1), 0)
                )
            }
            const color = fromV3(scale(radiance, 1 / spp))
            const i = x - x0 + (y - y0) * dx
            buffer32[i] = toAbgr32(color)
        }
    }

    return imageData
}
