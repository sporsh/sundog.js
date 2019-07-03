import * as v3 from './src/vector3.js'
import * as camera from './src/camera.js'
import { intersectSphereRay } from './src/sphere.js'
import {
  lambertianMaterial,
  specularMaterial,
  transmissiveMaterial,
  fresnelSpecularTransmissiveMaterial
} from './src/material.js'
import { intersectGroupRay } from './src/group.js'
import * as basis from './src/basis.js'
import * as plane from './src/plane.js'
import * as triangle from './src/triangle.js'
import { boundIntersectRay, testBoxRay } from './src/box.js'
import { intersectTorusRay, intersectBoxRay } from './src/distancefield.js'

export const load = json => {
  return JSON.parse(json, reviver)
}

const reviver = (key, value) => {
  switch (key) {
    case 'camera':
      return camera.rayThrough(value)
    case 'position':
    case 'tangent':
    case 'bitangent':
    case 'normal':
    case 'center':
    case 'origin':
    case 'dimensions':
    case 'albedo':
    case 'emittance':
    case 'a':
    case 'b':
    case 'c':
      return v3.fromXYZ(...value)
    case 'sphere':
      return intersectSphereRay(value)
    case 'torus':
      return intersectTorusRay(value)
    case 'box':
      return intersectBoxRay(value)
    case 'lambertian':
      return lambertianMaterial(value)
    case 'specular':
      return specularMaterial(value)
    case 'fresnelSpecularTransmissive':
      return fresnelSpecularTransmissiveMaterial(value)
    case 'transmissive':
      return transmissiveMaterial(value)
    case 'material':
      return Object.values(value)[0]
    case 'geometry':
      return Object.values(value)[0]
    case 'group':
      // return intersectGroupRay(Object.values(value))
      return intersectGroupRay(value.flatMap(Object.values))
    case 'bound': {
      let { test, intersect } = value
      return boundIntersectRay(test, intersect)
    }
    case 'plane':
      return plane.intersectDirectedPlaneRay({
        ...value,
        basis: basis.arbitraryBasisForNormal(value.normal)
      })
    case 'triangle':
      return triangle.intersectTriangleRay(value)
    default:
      return value
  }
}
