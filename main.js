import { fromXYZ, negate } from './src/vector3.js'
import { rayThrough } from './src/camera.js'
import { intersectSphereRay } from './src/sphere.js'

const canvas = document.createElement('canvas')
canvas.width = canvas.height = 256
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
const imageData8 = imageData.data.buffer
const imageData32 = new Uint32Array(imageData8)
const halfWidth = Math.floor(imageData.width / 2)
const halfHeight = Math.floor(imageData.height / 2)

const camera = {
    position: fromXYZ(0, 0, -1),
    basis: {
        tangent: fromXYZ(1, 0, 0),
        bitangent: fromXYZ(0, 1, 0),
        normal: fromXYZ(0, 0, 1)
    },
    aperture: 0,
    fieldOfView: 1,
    focalLength: 1
}

const scene = {
    center: fromXYZ(0, 0, 0),
    radius: 0.5
}

const renderRegion = (x0, y0, x1, y1) => {
    const dx = x1 - x0
    const dy = y1 - y0
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const u = x / halfWidth - 1
            const v = y / halfHeight - 1
            const ray = cameraRayThrough(u, v)
            const color = trace(ray, fromXYZ(0, 0, 0), fromXYZ(1, 1, 1), 0)
            setColor(x, y, color)
        }
    }
    ctx.putImageData(imageData, 0, 0)
}

const cameraRayThrough = rayThrough(camera)

const trace = (ray, radiance, weight, depth) => {
    const t = intersectRay(ray)
    if (t > 0) {
        const out = negate(ray.direction)
        const prob = ReflectancePDF(material, out, i.basis)
        // const pMax = Math.max(Math.max(prob.x, prob.y), prob.z)

        //  Russian roulette (after a couple of bounces)
        if (depth > 2 && Math.random() <= pMax) {
            return radiance
        }

        const newWeight = hadamard(weight, scale(prob, 1 / pMax))
        const newRay = {
            origin: i.point,
            direction: reflect(out, i.basis)
        }
        return trace(newRay, radiance, newWeight, depth + 1)
    } else {
        return radiance
    }
}
const intersectRay = intersectSphereRay(scene)

const setColor = (x, y, color) => {
    const i = x + y * imageData.width
    imageData32[i] = toAbgr32(color)
}

const toAbgr32 = ({ r, g, b }) =>
    0xff000000 |
    (Math.min(0xff, b * 0xff) << 16) |
    (Math.min(0xff, g * 0xff) << 8) |
    Math.min(0xff, r * 0xff)

renderRegion(0, 0, halfWidth, halfHeight)
renderRegion(halfWidth, halfHeight, halfWidth * 2, halfHeight * 2)
