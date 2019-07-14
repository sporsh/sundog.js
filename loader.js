import * as v3 from './src/vector3.js'
import * as camera from './src/camera.js'
import { intersectSphereRay } from './src/sphere.js'
import * as material from './src/material.js'
import { intersectGroupRay } from './src/group.js'
import * as basis from './src/basis.js'
import * as plane from './src/plane.js'
import * as triangle from './src/triangle.js'
import { boundIntersectRay, testBoxRay } from './src/box.js'
import {
  intersectTorusRay,
  intersectBoxRay,
  dfSphere,
  dfBox,
  dfCylinder,
  dfTorus,
  dfOctahedron,
  dfTranslate,
  dfRotate,
  dfTwist,
  dfIntersect,
  dfSubtract,
  dfUnion,
  dfDisplace,
  dfRepeat,
  intersect
} from './src/distancefield.js'

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
      return material.lambertianMaterial(value)
    case 'specular':
      return material.specularMaterial(value)
    case 'fresnelSpecularTransmissive':
      return material.fresnelSpecularTransmissiveMaterial(value)
    case 'transmissive':
      return material.transmissiveMaterial(value)
    case 'checkerCube':
      return material.checkerCube(value)
    case 'proceduralGridTexture':
      return material.proceduralGridTexture(value)
    case 'checkerTexture':
      return material.checkerTexture(value)
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
        // return plane.intersectPlaneRay({
        ...value,
        basis: basis.arbitraryBasisForNormal(value.normal)
      })
    case 'triangle':
      return triangle.intersectTriangleRay(value)
    case 'distancefunction': {
      const dfs = value.map(v => Object.values(v)[0])
      return point => dfs.reduceRight((p, df) => df(p), point)
    }
    // return value.map(v => Object.values(v)[0])
    case 'dfSubtract':
      return dfSubtract(value.map(v => v.distancefunction))
    case 'dfUnion':
      return dfUnion(value.map(v => v.distancefunction))
    case 'dfSphere':
      return dfSphere(value)
    // return dfDisplace(2)(dfSphere(value))
    case 'dfBox':
      return dfBox(v3.fromXYZ(...value))
    case 'dfTorus':
      return dfTorus(value)
    case 'dfCylinder':
      return dfCylinder(value)
    // return dfCylinder(v3.fromXYZ(...value))
    case 'dfOctahedron':
      return dfOctahedron(value)
    case 'dfTranslate':
      return dfTranslate(v3.fromXYZ(...value))
    case 'dfRotate':
      return dfRotate(value)
    case 'dfTwist':
      return dfTwist(value)
    case 'dfRepeat':
      return dfRepeat(v3.fromXYZ(...value))
    case 'implicit':
      return dfIntersect(value)(value.distancefunction)
    // case 'dfBox':
    //   return dfBox(v3.fromXYZ(...value))
    // case 'dfTranslate':
    //   return dfTranslate(v3.fromXYZ(...value))
    default:
      return value
  }
}
