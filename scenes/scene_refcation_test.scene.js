const lightMaterial = {
  lambertian: {
    albedo: [0, 0, 0],
    emittance: [10, 10, 10]
    // emittance: [1, 1, 1]
  }
}

const glassMaterial = {
  // transmissive: {
  fresnelSpecularTransmissive: {
    albedo: [1, 1, 1],
    // refractiveIndex: 1
    refractiveIndex: 1.333
    // refractiveIndex: 1.62
  }
}

const mirrorMaterial = {
  specular: {
    albedo: [0.9, 0.9, 0.9],
    emittance: [0, 0, 0]
  }
}

const blackMaterial = {
  lambertian: {
    albedo: [0, 0, 0]
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
          material: whiteMaterial
        }
      },
      // LEFT
      {
        plane: {
          normal: [1, 0, 0],
          d: -1,
          // material: whiteMaterial
          material: blackMaterial
          // material: lightMaterial
        }
      },
      // RIGHT
      {
        plane: {
          normal: [-1, 0, 0],
          d: -1,
          material: whiteMaterial
          // material: lightMaterial
        }
      },
      // CENTER SPLIT
      {
        plane: {
          normal: [0, 1, 0],
          d: 0,
          material: blackMaterial
          // material: lightMaterial
        }
      },
      // CENTER SPLIT
      {
        plane: {
          normal: [0, -1, 0],
          d: 0,
          material: blackMaterial
          // material: lightMaterial
        }
      },
      {
        plane: {
          normal: [0, 1, 0],
          d: 1,
          material: blackMaterial
          // material: lightMaterial
        }
      },
      {
        plane: {
          normal: [0, -1, 0],
          d: 1,
          material: blackMaterial
          // material: lightMaterial
        }
      },

      // LIGHT
      {
        sphere: {
          center: [-0.7, 0.5, 0],
          radius: 0.2,
          material: lightMaterial
        }
      },
      {
        sphere: {
          center: [-0.7, -0.5, 0],
          radius: 0.2,
          material: lightMaterial
        }
      },

      // GLASS BALL
      {
        sphere: {
          center: [0, 0.5, 0],
          radius: 0.3,
          material: glassMaterial
        }
      },
      // GLASS BALL
      // {
      //   sphere: {
      //     center: [0, -0.5, 0.7],
      //     radius: 0.3,
      //     material: glassMaterial
      //   }
      // },
      {
        implicit: {
          distancefunction: [{ dfSphere: 0.3 }, { dfTranslate: [0, -0.5, 0] }],
          material: glassMaterial
        }
      }

      // // DIFFUSE SPHERE
      // {
      //   triangle: {
      //     b: [-0.8, -1, 0],
      //     a: [0, -1, 0],
      //     c: [0, 0, 0],
      //     material: whiteMaterial
      //   }
      // },
      // // DIFFUSE TORUS
      // {
      //   torus: {
      //     major: 0.4,
      //     minor: 0.2,
      //     origin: [-0.4, 0.4, 0],
      //     // material: redMaterial
      //     // material: mirrorMaterial
      //     material: glassMaterial
      //     // material: whiteMaterial
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
      //     // material: redMaterial
      //     // material: mirrorMaterial
      //     // material: glassMaterial
      //     material: whiteMaterial
      //   }
      // }
      // DIFFUSE SPHERE
      // {
      //   sphere: {
      //     center: [-0.5, -0.6, 0.5],
      //     radius: 0.4,
      //     material: mirrorMaterial
      //   }
      // },
      // MIRROR SPHERE
      // {
      //   sphere: {
      //     center: [0.5, -0.6, -0.5],
      //     radius: 0.4,
      //     material: glassMaterial
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
