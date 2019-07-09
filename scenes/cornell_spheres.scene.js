import * as material from './materials'
import { cheapCornellBox } from './environments'

export default {
  maxDepth: 8,
  camera: {
    position: [0, 0, -4],
    basis: {
      tangent: [1, 0, 0],
      bitangent: [0, -1, 0],
      normal: [0, 0, 1]
    },
    aperture: 0,
    fieldOfView: 1 / 3, //0.35,
    focalLength: 5
    // tMin: 0.00001,
    // tMax: Infinity
  },
  geometry: {
    group: [
      ...cheapCornellBox,
      // DIFFUSE SPHERE
      {
        sphere: {
          center: [-0.5, -0.6, 0.5],
          radius: 0.4,
          material: material.mirror
        }
      },
      // MIRROR SPHERE
      {
        sphere: {
          center: [0.5, -0.6, -0.5],
          radius: 0.4,
          material: material.glass
          // {
          // specular: {
          //   albedo: [0.9, 0.9, 0.9],
          //   emittance: [0, 0, 0]
          // }
          // }
        }
      }
    ]
  }
}
