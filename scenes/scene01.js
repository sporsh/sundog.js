const lightMaterial = {
  lambertian: {
    albedo: [0, 0, 0],
    emittance: [0xdd / 255, 0xee / 255, 1]
    // [0xed / 255, 0xf9 / 255, 0xff / 255]
    // [0.8, 0.8, 0.8]
  }
}

const glassMaterial = {
  // transmissive: {
  fresnelSpecularTransmissive: {
    albedo: [0.9, 0.9, 0.9],
    refractiveIndex: 1.62
  }
}

const mirrorMaterial = {
  specular: {
    albedo: [0.9, 0.9, 0.9],
    emittance: [0, 0, 0]
  }
}

const groundMaterial = {
  lambertian: {
    albedo: [0xff / 255, 0xe7 / 255, 0xd9 / 255]
    // [0.4, 0.25, 0.25]
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
      // FLOOR
      {
        plane: {
          normal: [0, 1, 0],
          d: -1,
          material: groundMaterial
        }
      },
      // LIGHT
      {
        sphere: {
          center: [0, -1, 0],
          radius: 100,
          material: lightMaterial
        }
      },
      // // DIFFUSE SPHERE
      // {
      //   sphere: {
      //     center: [-0.5, -0.6, 0.5],
      //     radius: 0.4,
      //     material: {
      //       lambertian: {
      //         albedo: [0.25, 0.25, 0.25]
      //       }
      //     }
      //   }
      // },
      // DIFFUSE TORUS
      {
        torus: {
          major: 0.4,
          minor: 0.2,
          epsilon: 0.05,
          // material: redMaterial
          // material: glassMaterial
          material: mirrorMaterial
        }
      },
      // DIFFUSE SPHERE
      {
        sphere: {
          center: [-0.5, -0.6, 0],
          radius: 0.4,
          material: redMaterial
        }
      }
      // // MIRROR SPHERE
      // {
      //   sphere: {
      //     center: [0.5, -0.6, 1],
      //     radius: 0.4,
      //     material: mirrorMaterial
      //     // {
      //     // specular: {
      //     //   albedo: [0.9, 0.9, 0.9],
      //     //   emittance: [0, 0, 0]
      //     // }
      //     // }
      //   }
      // },
      // // GLASS SPHERE
      // {
      //   sphere: {
      //     center: [0.2, -0.8, 0],
      //     radius: 0.2,
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
