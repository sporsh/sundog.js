import {
    fromXYZ,
    negate,
    add,
    sub,
    scale,
    normalize,
    hadamard
} from './src/vector3.js'
import { arbitraryBasisForNormal } from './src/basis.js'
import { rayThrough } from './src/camera.js'
import { intersectSphereRay } from './src/sphere.js'
import { fromV3, toAbgr32 } from './src/color.js'
import {
    lambertianMaterial,
    specularMaterial,
    transmissiveMaterial
} from './src/material.js'
import { intersectGroupRay } from './src/group.js'
import { intersectPlaneRay } from './src/plane.js'

const canvas = document.createElement('canvas')
canvas.width = canvas.height = 400
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
const imageData8 = imageData.data.buffer
const imageData32 = new Uint32Array(imageData8)
const halfWidth = Math.floor(imageData.width / 2)
const halfHeight = Math.floor(imageData.height / 2)

const camera = {
    position: fromXYZ(0, 0, -4),
    basis: {
        tangent: fromXYZ(1, 0, 0),
        bitangent: fromXYZ(0, -1, 0),
        normal: fromXYZ(0, 0, 1)
    },
    aperture: 0,
    fieldOfView: 0.35,
    focalLength: 5
}

const material = {
    light: lambertianMaterial({
        albedo: fromXYZ(1, 1, 1),
        emittance: fromXYZ(10, 10, 10)
    }),
    dimLight: lambertianMaterial({
        albedo: fromXYZ(0, 0, 0),
        emittance: fromXYZ(0.6, 0.8, 1)
    }),
    mirror: specularMaterial({
        albedo: fromXYZ(1, 1, 1)
    }),
    glass: transmissiveMaterial({
        albedo: fromXYZ(1, 1, 1),
        refractiveIndex: 1.6
    }),
    white: lambertianMaterial({
        albedo: fromXYZ(0.8, 0.8, 0.8)
    }),
    red: lambertianMaterial({
        albedo: fromXYZ(0.75, 0.25, 0.25)
    }),
    green: lambertianMaterial({
        albedo: fromXYZ(0.25, 0.75, 0.25)
    })
}

const intersectRay = intersectGroupRay([
    // LISGHTS
    intersectSphereRay({
        center: fromXYZ(0, 1, 0),
        radius: 0.25,
        material: material.light
    }),
    // intersectSphereRay({
    //     center: fromXYZ(0, 0, 0),
    //     radius: 4,
    //     material: material.dimLight
    // }),
    // OBJECTS
    // intersectSphereRay({
    //     center: fromXYZ(-0.5, -0.5, 0.5),
    //     radius: 0.5,
    //     material: material.white
    // }),
    // intersectPlaneRay({
    //     d: -0.5,
    //     basis: arbitraryBasisForNormal(fromXYZ(0, 1, 0)),
    //     material: material.glass
    // }),
    intersectSphereRay({
        // center: fromXYZ(0.5, -0.5, 0),
        center: fromXYZ(0.75, -0.75, 0),
        radius: 0.25,
        material: material.glass
    }),
    // WALLS
    intersectPlaneRay({
        d: -1,
        basis: arbitraryBasisForNormal(fromXYZ(1, 0, 0)),
        material: material.red
    }),
    intersectPlaneRay({
        d: -1,
        basis: arbitraryBasisForNormal(fromXYZ(-1, 0, 0)),
        material: material.green
    }),
    // FLOOR
    intersectPlaneRay({
        d: -1,
        basis: arbitraryBasisForNormal(fromXYZ(0, 1, 0)),
        material: material.white
    }),
    // CEILING
    intersectPlaneRay({
        d: -1,
        basis: arbitraryBasisForNormal(fromXYZ(0, -1, 0)),
        material: material.white
    }),
    // BACK WALL
    intersectPlaneRay({
        d: -1,
        basis: arbitraryBasisForNormal(fromXYZ(0, 0, -1)),
        material: material.white
    })
])

const renderRegion = (spp, x0, y0, x1, y1) => {
    const dx = x1 - x0
    const dy = y1 - y0
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const u = x / halfWidth - 1
            const v = y / halfHeight - 1
            let radiance = fromXYZ(0, 0, 0)
            for (let n = spp; n > 0; n--) {
                const ray = cameraRayThrough(
                    u + (2 * Math.random() - 1) / dx,
                    v + (2 * Math.random() - 1) / dy
                )
                radiance = add(
                    radiance,
                    trace(ray, fromXYZ(0, 0, 0), fromXYZ(1, 1, 1), 0)
                )
            }
            setColor(x, y, fromV3(scale(radiance, 1 / spp)))
        }
    }
    ctx.putImageData(imageData, 0, 0)
}

const sample = (color, n) => add(color, trace)

const cameraRayThrough = rayThrough(camera)

const epsilon = 0.0001

const trace = (ray, radiance, weight, depth) => {
    const intersection = intersectRay(ray)
    if (intersection) {
        const {
            t,
            point,
            normal,
            basis,
            intersectable: { material: { pdf, emittance, scatter } }
        } = intersection
        const out = negate(ray.direction)
        const prob = pdf(out, basis)
        const pMax = Math.max(Math.max(prob.x, prob.y), prob.z)

        const newRadiance = add(radiance, hadamard(emittance(out), weight))

        //  Russian roulette (after a couple of bounces)
        if (pMax <= 0 || (depth > 2 && Math.random() > pMax)) {
            return newRadiance
        }

        const newRay = {
            origin: point,
            direction: scatter(out, basis),
            tMin: epsilon,
            tMax: Infinity
        }
        const newWeight = hadamard(weight, scale(prob, 1 / pMax))
        return trace(newRay, newRadiance, newWeight, depth + 1)
    } else {
        return radiance
    }
}

const setColor = (x, y, color) => {
    const i = x + y * imageData.width
    imageData32[i] = toAbgr32(color)
}

renderRegion(10, 0, 0, halfWidth * 2, halfHeight)
renderRegion(10, 0, halfHeight, halfWidth, halfHeight * 2)
renderRegion(100, halfWidth, halfHeight, halfWidth * 2, halfHeight * 2)
// renderRegion(spp, 0, 0, halfWidth * 2, halfHeight * 2)
