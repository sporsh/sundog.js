import * as v3 from './src/vector3.js'
import { rayThrough } from './src/camera.js'
import { intersectSphereRay } from './src/sphere.js'

const canvas = document.createElement('canvas')
canvas.width = canvas.height = 0xff
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
const imageData8 = imageData.data.buffer
const imageData32 = new Uint32Array(imageData8)
const halfWidth = canvas.width / 2
const halfHeight = canvas.height / 2

const camera = {
    position: { x: 0, y: 0, z: -2.5 },
    basis: {
        tangent: { x: 1, y: 0, z: 0 },
        bitangent: { x: 0, y: 1, z: 0 },
        normal: { x: 0, y: 0, z: 1 }
    },
    aperture: 0.1,
    fieldOfView: 1,
    focalLength: 1.5
}

const scene = {
    center: { x: 0, y: 0, z: 0 },
    radius: 0.5
}
const intersectRay = intersectSphereRay(scene)

const cameraRayThrough = rayThrough(camera)

const renderRegion = (x0, y0, x1, y1, renderer, time) => {
    const dx = x1 - x0
    const dy = y1 - y0
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const u = x / halfWidth - 1
            const v = y / halfHeight - 1
            const ray = cameraRayThrough(u, v)
            const color = trace(ray)
            setColor(x, y, color)
            if (x == 0 && y == 0) console.log(ray, scene)
        }
    }
    ctx.putImageData(imageData, 0, 0)
}

const trace = ray => {
    const t = intersectRay(ray)
    if (t > 0) {
        return { r: 1, g: 0.5, b: 0.5 }
    } else {
        return { r: 0, g: 0, b: 0 }
    }
}

const setColor = (x, y, color) => {
    const i = x + y * imageData.width
    imageData32[i] = toAbgr32(color)
}

const toAbgr32 = ({ r, g, b }) =>
    0xff000000 |
    (Math.min(0xff, b * 0xff) << 16) |
    (Math.min(0xff, g * 0xff) << 8) |
    Math.min(0xff, r * 0xff)

renderRegion(0, 0, canvas.width, canvas.height)
