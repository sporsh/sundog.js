const lightMaterial = {
  lambertian: {
    albedo: [0, 0, 0],
    emittance: [10, 10, 10]
  }
}

const skyMaterial = {
  lambertian: {
    albedo: [0, 0, 0],
    emittance: [0xdd / 255, 0xee / 255, 1]
  }
}

const glassMaterial = {
  // transmissive: {
  fresnelSpecularTransmissive: {
    albedo: [0.9, 0.9, 0.9],
    // refractiveIndex: 1.8
    refractiveIndex: 1.62
    // refractiveIndex: 1.333
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
  // BACK
  {
    plane: {
      normal: [0, 0, -1],
      d: -1,
      // material: mirrorMaterial
      material: whiteMaterial
    }
  },
  // FRONT (BEHIND CAMERA)
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
      center: [0, -1, 0],
      radius: 100,
      material: {
        lambertian: {
          albedo: [0, 0, 0],
          emittance: [0xdd / 255, 0xee / 255, 1]
          // [0xed / 255, 0xf9 / 255, 0xff / 255]
          // [0.8, 0.8, 0.8]
        }
      }
    }
  },
  // GROUND
  {
    plane: {
      normal: [0, 1, 0],
      d: -1,
      material: {
        lambertian: {
          albedo: [0xff / 255, 0xe7 / 255, 0xd9 / 255]
          // [0.4, 0.25, 0.25]
        }
      }
    }
  }
]

export default {
  maxDepth: 2,
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
      ...cornellBox,
      // ...skyAndGround,

      // // TWISTED BOX
      // {
      //   box: {
      //     // box: {
      //     dimensions: [0.25, 0.2, 0.25],
      //     origin: [-0.3, -0.7, -0.3],
      //     // origin: [0, 0, 0],
      //     radius: 0.025,
      //     turns: 1 / 4,
      //     // material: glassMaterial
      //     // material: redMaterial
      //     material: whiteMaterial
      //   }
      // },

      // // SPHERE
      // {
      //   sphere: {
      //     center: [-0.3, -0.2, -0.3],
      //     radius: 0.3,
      //     material: whiteMaterial
      //     // material: glassMaterial
      //     // material: mirrorMaterial
      //   }
      // },

      // // TORUS
      // {
      //   torus: {
      //     major: 0.25,
      //     minor: 0.15,
      //     // origin: [0, 0, 0],
      //     origin: [-0.5, -0.6, -0.5],
      //     // origin: [0, 0, 0],
      //     material: glassMaterial
      //     // material: greenMaterial
      //     // material: redMaterial
      //     // material: mirrorMaterial
      //     // material: whiteMaterial
      //   }
      // },

      // // TWISTED BOX
      // {
      //   box: {
      //     // box: {
      //     dimensions: [0.25, 0.6, 0.25],
      //     // origin: [0.4, -0.4, 0.4],
      //     origin: [0, 0, 0],
      //     radius: 0,
      //     turns: Math.PI,
      //     // material: glassMaterial
      //     // material: redMaterial
      //     // material: mirrorMaterial
      //     material: whiteMaterial
      //   }
      // },

      // {
      //   implicit: {
      //     distancefunction: [
      //       {
      //         dfSubtract: [
      //           // { distancefunction: [{ dfSphere: 0.5 }] },
      //           { distancefunction: [{ dfBox: [0.5, 0.5, 0.5] }] },
      //           {
      //             distancefunction: [
      //               { dfSphere: 0.6 },
      //               { dfTranslate: [0, 0, 0] }
      //             ]
      //           }
      //         ]
      //       },
      //       { dfRotate: Math.PI / 3 }
      //       // { dfSphere: 0.5 }
      //       // { dfOctahedron: 0.5 }
      //       // { dfTorus: { major: 0.25, minor: 0.15 } },
      //       // { dfBox: [0.25, 0.6, 0.25] },
      //       // { dfTwist: Math.PI }
      //       // { dfTwist: 6 }
      //       // { dfTranslate: [0.4, -0.4, 0.4] }
      //     ],
      //     // material: whiteMaterial
      //     // material: redMaterial
      //     material: glassMaterial
      //   }
      // }

      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfSphere: 0.5 }
      //       // { dfOctahedron: 0.5 }
      //       // { dfTorus: { major: 0.25, minor: 0.15 } },
      //       // { dfBox: [0.25, 0.6, 0.25] },
      //       // { dfTwist: Math.PI },
      //       // { dfTwist: 6 }
      //       // { dfTranslate: [0.4, -0.4, 0.4] }
      //     ],
      //     // material: whiteMaterial
      //     material: redMaterial
      //   }
      // }

      // // UNION BOXES
      // {
      //   implicit: {
      //     distancefunction: [
      //       {
      //         dfUnion: [
      //           {
      //             distancefunction: [
      //               { dfBox: [0.3, 0.3, 0.3] },
      //               { dfRotate: Math.PI / 10 },
      //               { dfTranslate: [0.35, -0.75, -0.35] }
      //             ]
      //           },
      //           {
      //             distancefunction: [
      //               { dfBox: [0.3, 0.6, 0.3] },
      //               { dfRotate: -Math.PI / 10 },
      //               { dfTranslate: [-0.35, -0.4, 0.35] }
      //             ]
      //           }
      //         ]
      //       }
      //     ],
      //     material: whiteMaterial
      //   }
      // }

      {
        implicit: {
          distancefunction: [
            { dfBox: [0.3, 0.3, 0.3] },
            { dfRotate: Math.PI / 10 },
            { dfTranslate: [0.35, -0.75, -0.35] }
          ],
          material: whiteMaterial
          // material: glassMaterial
          // material: redMaterial
        }
      },

      {
        implicit: {
          distancefunction: [
            { dfBox: [0.3, 0.6, 0.3] },
            { dfRotate: -Math.PI / 10 },
            { dfTranslate: [-0.35, -0.4, 0.3] }
          ],
          material: whiteMaterial
          // material: glassMaterial
          // material: redMaterial
        }
      }

      // // SPHERE
      // {
      //   sphere: {
      //     center: [-0.5, -0.7, -0.5],
      //     radius: 0.3,
      //     // material: whiteMaterial
      //     material: glassMaterial
      //     // material: mirrorMaterial
      //   }
      // }

      // // SPHERE
      // {
      //   sphere: {
      //     center: [0.5, -0.75, -0.5],
      //     // radius: 0,
      //     radius: 0.35,
      //     // material: whiteMaterial
      //     material: mirrorMaterial
      //     // material: glassMaterial
      //   }
      // }
    ]
  }
}
