import * as material from './materials'

const skyAndGround = [
  // SKY
  {
    sphere: {
      center: [0, -1, 0],
      radius: 100,
      material: material.sky
      // material: {
      //   lambertian: {
      //     // albedo: [0.8, 0.8, 0.8]
      //     albedo: [0, 0, 0],
      //     emittance: [0.5, 0.5, 0.5]
      //     // emittance: [0xdd / 255, 0xee / 255, 1]
      //     // [0xed / 255, 0xf9 / 255, 0xff / 255]
      //     // [0.8, 0.8, 0.8]
      //   }
      // }
    }
  },
  // // LIGHT
  // {
  //   sphere: {
  //     center: [-5, 5, 5],
  //     radius: 2,
  //     material: material.light
  //   }
  // },
  // GROUND
  {
    plane: {
      normal: [0, 1, 0],
      d: -0.4,
      material: {
        lambertian: {
          // albedo: [0xff / 255, 0xe7 / 255, 0xd9 / 255]
          // albedo: [0.4, 0.25, 0.25]
          // albedo: [0.5, 0.5, 0.5]
          albedo: [0.5, 0.5, 0.5]
          // emittance: [0.1, 0.1, 0.1]
        }
      }
    }
  }
]

export default {
  maxDepth: 20,
  camera: {
    position: [0, 0, -4],
    basis: {
      tangent: [1, 0, 0],
      bitangent: [0, -1, 0],
      normal: [0, 0, 1]
    },
    aperture: 0,
    fieldOfView: 1 / 3,
    // fieldOfView: 0.35,
    focalLength: 10
    // tMin: 0.00001,
    // tMax: Infinity
  },
  geometry: {
    group: [
      ...skyAndGround,

      // SPHERE
      {
        sphere: {
          center: [-0.6, 0, 0.8],
          radius: 0.4,
          // material: material.white
          // material: material.glass
          material: material.green
        }
      },
      // SPHERE
      {
        sphere: {
          center: [0.6, 0, 0.8],
          // radius: 0,
          radius: 0.4,
          // material: material.white
          // material: material.mirror
          material: material.red
        }
      },

      // SPHERE
      {
        sphere: {
          center: [0, 0, 0],
          // radius: 0,
          radius: 0.4,
          // material: material.white
          // material: material.mirror
          material: material.glass
        }
      },
      // // SPHERE INTERIOR
      // {
      //   sphere: {
      //     center: [0, 0, 0],
      //     // radius: 0,
      //     radius: -0.38,
      //     // material: material.white
      //     // material: material.mirror
      //     material: material.glass
      //   }
      // },

      // EXTRA LIGHT
      {
        sphere: {
          center: [-2, 2, 2],
          // radius: 0,
          radius: 0.5,
          // material: material.white
          // material: material.mirror
          material: material.light
        }
      }
    ]
  }
}
