import { fromXYZ } from './src/vector3.js'
import { arbitraryBasisForNormal } from './src/basis.js'

import { intersectPlaneRay } from './src/plane.js'
import { intersectSphereRay } from './src/sphere.js'
import { intersectTriangleRay } from './src/triangle.js'
import { intersectGroupRay } from './src/group.js'

import {
    lambertianMaterial,
    specularMaterial,
    transmissiveMaterial,
    fresnelSpecularTransmissiveMaterial
} from './src/material.js'

import { rayThrough } from './src/camera.js'

const material = {
    light: lambertianMaterial({
        albedo: fromXYZ(0.9, 0.9, 0.9),
        emittance: fromXYZ(10, 10, 10)
    }),
    dimLight: lambertianMaterial({
        albedo: fromXYZ(0, 0, 0),
        emittance: fromXYZ(1.6, 1.47, 1.29)
    }),
    mirror: specularMaterial({
        albedo: fromXYZ(0.9, 0.9, 0.9)
    }),
    glass: fresnelSpecularTransmissiveMaterial({
        albedo: fromXYZ(0.9, 0.9, 0.9),
        refractiveIndex: 1.62
    }),
    // glass: transmissiveMaterial({
    //     albedo: fromXYZ(0.9, 0.9, 0.9),
    //     refractiveIndex: 1.6
    // }),
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

const intersectQuadRay = (a, b, c, d, material) =>
    intersectGroupRay([
        intersectTriangleRay({
            a,
            b,
            c,
            material
        }),
        intersectTriangleRay({
            a: c,
            b: d,
            c: a,
            material
        })
    ])

const intersectCornellBoxRay = intersectGroupRay([
    // BACK WALL
    intersectQuadRay(
        fromXYZ(-1, -1, 1),
        fromXYZ(-1, 1, 1),
        fromXYZ(1, 1, 1),
        fromXYZ(1, -1, 1),
        material.white
    ),
    // LEFT WALL (RED)
    intersectQuadRay(
        fromXYZ(-1, -1, -1),
        fromXYZ(-1, 1, -1),
        fromXYZ(-1, 1, 1),
        fromXYZ(-1, -1, 1),
        material.red
    ),
    // LEFT WALL (GREEN)
    intersectQuadRay(
        fromXYZ(1, -1, 1),
        fromXYZ(1, 1, 1),
        fromXYZ(1, 1, -1),
        fromXYZ(1, -1, -1),
        material.green
    ),
    // FLOOR
    intersectQuadRay(
        fromXYZ(-1, -1, 1),
        fromXYZ(1, -1, 1),
        fromXYZ(1, -1, -1),
        fromXYZ(-1, -1, -1),
        material.white
    ),
    // ROOF
    intersectQuadRay(
        fromXYZ(-1, 1, -1),
        fromXYZ(1, 1, -1),
        fromXYZ(1, 1, 1),
        fromXYZ(-1, 1, 1),
        material.white
    ),
    // LIGHT
    intersectQuadRay(
        fromXYZ(-0.25, 0.99, -0.25),
        fromXYZ(0.25, 0.99, -0.25),
        fromXYZ(0.25, 0.99, 0.25),
        fromXYZ(-0.25, 0.99, 0.25),
        material.light
    ),
    // FRONT WALL
    intersectQuadRay(
        fromXYZ(1, -1, -1),
        fromXYZ(1, 1, -1),
        fromXYZ(-1, 1, -1),
        fromXYZ(-1, -1, -1),
        material.white
    )
])

export const intersectRay = intersectGroupRay([
    // // LIGHT SURCES
    // intersectSphereRay({
    //     center: fromXYZ(0, 1, 0),
    //     radius: 0.25,
    //     material: material.light
    // }),
    // intersectSphereRay({
    //     center: fromXYZ(0, 0, 0),
    //     radius: 4.1,
    //     material: material.dimLight
    // }),
    // OBJECTS
    // intersectTriangleRay({
    //     a: fromXYZ(-1, -0.5, 0),
    //     b: fromXYZ(0, 0.5, 1),
    //     c: fromXYZ(1, -0.5, 0),
    //     material: material.white
    // }),
    intersectSphereRay({
        center: fromXYZ(-0.5, -0.6, 0.5),
        radius: 0.4,
        material: material.mirror
    }),
    // intersectPlaneRay({
    //     d: -0.5,
    //     basis: arbitraryBasisForNormal(fromXYZ(0, 1, 0)),
    //     material: material.glass
    // }),
    intersectSphereRay({
        center: fromXYZ(0.5, -0.6, -0.5),
        // center: fromXYZ(0, -0.6, -0.5),
        radius: 0.4,
        material: material.glass
    }),
    // intersectSphereRay({
    //     // center: fromXYZ(0.5, -0.5, 0),
    //     center: fromXYZ(0.5, -0.6, 0.5),
    //     radius: 0.4,
    //     material: material.mirror
    // }),
    // WALLS
    intersectCornellBoxRay
])

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
export const cameraRayThrough = rayThrough(camera)
