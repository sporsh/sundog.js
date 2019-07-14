import * as material from './materials'

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
      // BACK
      {
        plane: {
          normal: [0, 0, -1],
          d: 0,
          material: material.white
        }
      },
      // LEFT
      {
        plane: {
          normal: [1, 0, 0],
          d: -1,
          // material: material.white
          material: material.black
          // material: material.light
        }
      },
      // RIGHT
      {
        plane: {
          normal: [-1, 0, 0],
          d: -1,
          material: material.white
          // material: material.light
        }
      },
      // CENTER SPLIT
      {
        plane: {
          normal: [0, 1, 0],
          d: 0,
          material: material.black
          // material: material.light
        }
      },
      // CENTER SPLIT
      {
        plane: {
          normal: [0, -1, 0],
          d: 0,
          material: material.black
          // material: material.light
        }
      },
      {
        plane: {
          normal: [0, 1, 0],
          d: 1,
          material: material.black
          // material: material.light
        }
      },
      {
        plane: {
          normal: [0, -1, 0],
          d: 1,
          material: material.black
          // material: material.light
        }
      },

      // LIGHT
      {
        sphere: {
          center: [-0.7, 0.5, 0],
          radius: 0.2,
          material: material.light
        }
      },
      {
        sphere: {
          center: [-0.7, -0.5, 0],
          radius: 0.2,
          material: material.light
        }
      },

      // GLASS BALL
      {
        sphere: {
          center: [0, 0.5, 0],
          radius: 0.3,
          material: material.glass
        }
      },
      // GLASS BALL
      // {
      //   sphere: {
      //     center: [0, -0.5, 0.7],
      //     radius: 0.3,
      //     material: material.glass
      //   }
      // },
      {
        implicit: {
          distancefunction: [{ dfSphere: 0.3 }, { dfTranslate: [0, -0.5, 0] }],
          material: material.glass
        }
      }

      // // DIFFUSE SPHERE
      // {
      //   triangle: {
      //     b: [-0.8, -1, 0],
      //     a: [0, -1, 0],
      //     c: [0, 0, 0],
      //     material: material.white
      //   }
      // },
      // // DIFFUSE TORUS
      // {
      //   torus: {
      //     major: 0.4,
      //     minor: 0.2,
      //     origin: [-0.4, 0.4, 0],
      //     // material: material.red
      //     // material: material.mirror
      //     material: material.glass
      //     // material: material.white
      //   }
      // },
      // // DIFFUSE BOX
      // {
      //   roundedbox: {
      //     dimensions: [0.3, 0.3, 0.3],
      //     origin: [0.5, 0.5, 0.2],
      //     radius: 0.05,
      //     // minor: 0.2,
      //     // origin: [-0.4, 0.4, 0],
      //     // material: material.red
      //     // material: material.mirror
      //     // material: material.glass
      //     material: material.white
      //   }
      // }
      // DIFFUSE SPHERE
      // {
      //   sphere: {
      //     center: [-0.5, -0.6, 0.5],
      //     radius: 0.4,
      //     material: material.mirror
      //   }
      // },
      // MIRROR SPHERE
      // {
      //   sphere: {
      //     center: [0.5, -0.6, -0.5],
      //     radius: 0.4,
      //     material: material.glass
      //     // {
      //     // specular: {
      //     //   albedo: [0.9, 0.9, 0.9],
      //     //   emittance: [0, 0, 0]
      //     // }
      //     // }
      //   }
      // }
    ]
  }
}
