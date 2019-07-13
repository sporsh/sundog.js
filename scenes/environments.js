import { quad } from './helpers'
import * as material from './materials'

export const cornellBox = [
  // LIGHT
  ...quad(material.light)(
    [0.25, 1.0, 0.25],
    [-0.25, 1.0, 0.25],
    [-0.25, 1.0, -0.25],
    [0.25, 1.0, -0.25]
  ),
  // CEILING
  ...quad(material.white)(
    [-0.25, 1.0, 0.25],
    [-1, 1.0, 1],
    [-1, 1.0, -1],
    [-0.25, 1.0, -0.25]
  ),
  ...quad(material.white)(
    [1, 1.0, 1],
    [0.25, 1.0, 0.25],
    [0.25, 1.0, -0.25],
    [1, 1.0, -1]
  ),
  ...quad(material.white)(
    [1, 1.0, 1],
    [-1, 1.0, 1],
    [-0.25, 1.0, 0.25],
    [0.25, 1.0, 0.25]
  ),
  ...quad(material.white)(
    [0.25, 1.0, -0.25],
    [-0.25, 1.0, -0.25],
    [-1, 1.0, -1],
    [1, 1.0, -1]
  ),
  // FLOOR
  ...quad(material.white)(
    [-1.0, -1.0, 1.0],
    [1.0, -1.0, 1.0],
    [1.0, -1.0, -1.0],
    [-1.0, -1.0, -1.0]
  ),
  // // BACK
  ...quad(material.white)(
    [-1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, -1.0, 1.0],
    [-1.0, -1.0, 1.0]
  ),
  // RIGHT
  ...quad(material.green)(
    [1.0, 1.0, 1.0],
    [1.0, 1.0, -1.0],
    [1.0, -1.0, -1.0],
    [1.0, -1.0, 1.0]
  ),
  // LEFT
  ...quad(material.red)(
    [-1.0, 1.0, -1.0],
    [-1.0, 1.0, 1.0],
    [-1.0, -1.0, 1.0],
    [-1.0, -1.0, -1.0]
  )
]

export const cheapCornellBox = [
  // LIGHT
  {
    sphere: {
      center: [0, 1, 0],
      radius: 0.25,
      material: material.light
    }
  },
  // {
  //   implicit: {
  //     distancefunction: [
  //       { dfBox: [0.2, 0.02, 0.2] },
  //       { dfTranslate: [0.05, 1.02, 0.05] }
  //     ],
  //     material: material.light
  //   }
  // },

  // CEILING
  {
    plane: {
      normal: [0, -1, 0],
      d: -1,
      material: material.white
      // material: material.sky
    }
  },
  // FLOOR
  {
    plane: {
      normal: [0, 1, 0],
      d: -1,
      material: material.white
    }
  },
  // // BACK
  {
    plane: {
      normal: [0, 0, -1],
      d: -1,
      // material: material.mirror
      material: material.white
    }
  },
  // // FRONT (BEHIND CAMERA)
  {
    plane: {
      normal: [0, 0, 1],
      d: -1,
      material: {
        lambertian: {
          albedo: [0, 0, 0]
        }
      }
    }
  },
  // RIGHT
  {
    plane: {
      normal: [-1, 0, 0],
      d: -1,
      material: material.green
    }
  },
  // LEFT
  {
    plane: {
      normal: [1, 0, 0],
      d: -1,
      material: material.red
    }
  }
]

export const skyAndGround = [
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
      d: -1,
      material: material.checkerCube
      // material: {
      //   lambertian: {
      //     // albedo: [0xff / 255, 0xe7 / 255, 0xd9 / 255]
      //     // albedo: [0.4, 0.25, 0.25]
      //     // albedo: [0.5, 0.5, 0.5]
      //     albedo: [0.5, 0.5, 0.5]
      //     // emittance: [0.1, 0.1, 0.1]
      //   }
      // }
    }
  }
]
