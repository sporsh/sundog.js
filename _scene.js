import { fromXYZ } from './src/vector3.js'
import { arbitraryBasisForNormal } from './src/basis.js'

import { intersectPlaneRay } from './src/plane.js'
import { intersectSphereRay } from './src/sphere.js'
import { intersectTriangleRay } from './src/triangle.js'
import { intersectGroupRay } from './src/group.js'
import { boundIntersectRay, testBoxRay } from './src/box.js'

import {
  lambertianMaterial,
  specularMaterial,
  transmissiveMaterial,
  fresnelSpecularTransmissiveMaterial
} from './src/material.js'

import { rayThrough } from './src/camera.js'

const material = {
  light: lambertianMaterial({
    albedo: fromXYZ(0, 0, 0),
    emittance: fromXYZ(10, 10, 10)
  }),
  dimLight: lambertianMaterial({
    albedo: fromXYZ(0, 0, 0),
    emittance: fromXYZ(1.6, 1.47, 1.29)
  }),
  black: lambertianMaterial({
    albedo: fromXYZ(0, 0, 0)
  }),
  mirror: specularMaterial({
    albedo: fromXYZ(0.9, 0.9, 0.9)
  }),
  glass: fresnelSpecularTransmissiveMaterial({
    albedo: fromXYZ(0.9, 0.9, 0.9),
    refractiveIndex: 1.62
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

export const intersectRay = boundIntersectRay(
  testBoxRay({
    min: fromXYZ(-1.0001, -1.0001, -1.0001),
    max: fromXYZ(1.0001, 1.0001, 1.0001)
  }),
  intersectGroupRay([
    //
    // LIGHT SURCES
    //
    intersectSphereRay({
      center: fromXYZ(0, 1, 0),
      radius: 0.25,
      material: material.light
    }),
    //
    // OBJECTS
    //
    // CORNELL BOX
    //
    // CEILING
    intersectPlaneRay({
      d: -1,
      basis: arbitraryBasisForNormal(fromXYZ(0, -1, 0)),
      material: material.white
    }),

    // LEFT WALL (RED)
    intersectPlaneRay({
      d: -1,
      basis: arbitraryBasisForNormal(fromXYZ(1, 0, 0)),
      material: material.red
    }),

    // RIGHT WALL (GREEN)
    intersectPlaneRay({
      d: -1,
      basis: arbitraryBasisForNormal(fromXYZ(-1, 0, 0)),
      material: material.green
    }),

    // BACK WALL
    intersectPlaneRay({
      d: -1,
      basis: arbitraryBasisForNormal(fromXYZ(0, 0, -1)),
      material: material.white
    }),

    // FLOOR
    boundIntersectRay(
      testBoxRay({
        min: fromXYZ(-1, -1.0001, -1),
        max: fromXYZ(1, -0.1, 1)
      }),
      intersectGroupRay([
        intersectSphereRay({
          center: fromXYZ(-0.5, -0.6, 0.5),
          radius: 0.4,
          material: material.mirror
        }),
        intersectSphereRay({
          center: fromXYZ(0.5, -0.6, -0.5),
          // center: fromXYZ(0, -0.6, -0.5),
          radius: 0.4,
          material: material.glass
        }),
        intersectPlaneRay({
          d: -1,
          basis: arbitraryBasisForNormal(fromXYZ(0, 1, 0)),
          material: material.white
        })
      ])
    )
  ])
)

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
