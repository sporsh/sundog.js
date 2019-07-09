import { quad, block } from '../helpers'

const lightMaterial = {
  lambertian: {
    // albedo: [1, 1, 1],
    albedo: [0, 0, 0],
    // emittance: [20, 15, 10]
    emittance: [10, 10, 10]
  }
}

const skyMaterial = {
  lambertian: {
    // albedo: [0.2, 0.2, 0.2],
    albedo: [0, 0, 0],
    emittance: [0xdd / 255, 0xee / 255, 1]
    // emittance: [0.1, 0.1, 0.1]
  }
}

const glassMaterial = {
  // transmissive: {
  fresnelSpecularTransmissive: {
    // albedo: [0.9, 0.9, 0.9],
    albedo: [1, 1, 1],
    // refractiveIndex: 1.8
    refractiveIndex: 1.62
    // refractiveIndex: 1.333
  }
}

const waterMaterial = {
  // transmissive: {
  fresnelSpecularTransmissive: {
    albedo: [1, 1, 1],
    // albedo: [0.7, 0.9, 1],
    // albedo: [1, 1, 1],
    // refractiveIndex: 1.8
    // refractiveIndex: 1.62
    refractiveIndex: 1.333
  }
}

const mirrorMaterial = {
  specular: {
    albedo: [0.9, 0.9, 0.9],
    emittance: [0, 0, 0]
  }
}

const whiteMaterial = {
  lambertian: {
    albedo: [0.8, 0.8, 0.8]
  }
}

const redMaterial = {
  lambertian: {
    albedo: [0.75, 0.25, 0.25]
  }
}

const greenMaterial = {
  lambertian: {
    albedo: [0.25, 0.75, 0.25]
  }
}

const cornellBox = [
  // LIGHT
  ...quad(lightMaterial)(
    [0.25, 1.0, 0.25],
    [-0.25, 1.0, 0.25],
    [-0.25, 1.0, -0.25],
    [0.25, 1.0, -0.25]
  ),
  // CEILING
  ...quad(whiteMaterial)(
    [-0.25, 1.0, 0.25],
    [-1, 1.0, 1],
    [-1, 1.0, -1],
    [-0.25, 1.0, -0.25]
  ),
  ...quad(whiteMaterial)(
    [1, 1.0, 1],
    [0.25, 1.0, 0.25],
    [0.25, 1.0, -0.25],
    [1, 1.0, -1]
  ),
  ...quad(whiteMaterial)(
    [1, 1.0, 1],
    [-1, 1.0, 1],
    [-0.25, 1.0, 0.25],
    [0.25, 1.0, 0.25]
  ),
  ...quad(whiteMaterial)(
    [0.25, 1.0, -0.25],
    [-0.25, 1.0, -0.25],
    [-1, 1.0, -1],
    [1, 1.0, -1]
  ),
  // FLOOR
  ...quad(whiteMaterial)(
    [-1.0, -1.0, 1.0],
    [1.0, -1.0, 1.0],
    [1.0, -1.0, -1.0],
    [-1.0, -1.0, -1.0]
  ),
  // // BACK
  ...quad(whiteMaterial)(
    [-1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, -1.0, 1.0],
    [-1.0, -1.0, 1.0]
  ),
  // RIGHT
  ...quad(greenMaterial)(
    [1.0, 1.0, 1.0],
    [1.0, 1.0, -1.0],
    [1.0, -1.0, -1.0],
    [1.0, -1.0, 1.0]
  ),
  // LEFT
  ...quad(redMaterial)(
    [-1.0, 1.0, -1.0],
    [-1.0, 1.0, 1.0],
    [-1.0, -1.0, 1.0],
    [-1.0, -1.0, -1.0]
  )
]

const cheapCornellBox = [
  // // LIGHT
  // {
  //   sphere: {
  //     center: [0, 1, 0],
  //     radius: 0.25,
  //     material: lightMaterial
  //   }
  // },
  // {
  //   implicit: {
  //     distancefunction: [
  //       { dfBox: [0.2, 0.02, 0.2] },
  //       { dfTranslate: [0.05, 1.02, 0.05] }
  //     ],
  //     material: lightMaterial
  //   }
  // },

  // CEILING
  {
    plane: {
      normal: [0, -1, 0],
      d: -1,
      // material: whiteMaterial
      material: skyMaterial
    }
  },
  // FLOOR
  {
    plane: {
      normal: [0, 1, 0],
      d: -1,
      material: whiteMaterial
    }
  },
  // // BACK
  {
    plane: {
      normal: [0, 0, -1],
      d: -1,
      // material: mirrorMaterial
      material: whiteMaterial
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
      material: greenMaterial
    }
  },
  // LEFT
  {
    plane: {
      normal: [1, 0, 0],
      d: -1,
      material: redMaterial
    }
  }
]

const skyAndGround = [
  // SKY
  {
    sphere: {
      center: [0, 1, 0],
      radius: 100,
      material: skyMaterial
    }
  }
  // {
  //   plane: {
  //     normal: [0, 1, 0],
  //     d: -1,
  //     material: {
  //       lambertian: {
  //         // albedo: [0xff / 255, 0xe7 / 255, 0xd9 / 255]
  //         // albedo: [0.4, 0.25, 0.25]
  //         // albedo: [0.5, 0.5, 0.5]
  //         albedo: [0.5, 0.5, 0.5]
  //         // emittance: [0.1, 0.1, 0.1]
  //       }
  //     }
  //   }
  // }
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
      // ...skyAndGround,
      ...cheapCornellBox,

      // TWISTED BOX
      {
        implicit: {
          distancefunction: [
            { dfBox: [0.3, 0.3, 0.3] },
            // { dfTwist: Math.PI / 2 }
            { dfRotate: Math.PI / 10 }
            // { dfTwist: Math.PI }
            // { dfTranslate: [0.35, -0.75, -0.35] }
          ],
          // material: whiteMaterial
          material: glassMaterial
          // material: redMaterial
        }
      }

      // // TORUS
      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfTorus: { major: 0.25, minor: 0.15 } }
      //       // { dfTwist: Math.PI },
      //       // { dfTranslate: [0.35, -0.5, -0.35] }
      //     ],
      //     // material: whiteMaterial
      //     // material: glassMaterial
      //     material: redMaterial
      //   }
      // }

      // // SPHERE
      // {
      //   sphere: {
      //     center: [0, 0, 0],
      //     // radius: 0,
      //     radius: 0.4,
      //     // material: whiteMaterial
      //     // material: mirrorMaterial
      //     material: glassMaterial
      //   }
      // }
    ]
  }
}
