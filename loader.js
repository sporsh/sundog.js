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
import { boundIntersectRay, testBoxRay } from './src/box.js'

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
    case 'albedo':
    case 'emittance':
      return v3.fromXYZ(...value)
    case 'sphere':
      return intersectSphereRay(value)
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
    default:
      return value
  }
}
