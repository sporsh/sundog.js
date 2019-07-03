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
    refractiveIndex: 1.62
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

const box = ({ x: x0, y: y0, z: z0 }, { x: x1, y: y1, z: z1 }) => {
  const v = [
    [x0, y0, z0],
    [x0, y0, z1],
    [x0, y1, z1],
    [x0, y1, z0],

    [x1, y0, z0],
    [x1, y0, z1],
    [x1, y1, z1],
    [x1, y1, z0]
  ]

  const t = [
    [v[0], v[1], v[2]],
    [v[0], v[1], v[4]],
    [v[0], v[1], v[4]],
    [v[0], v[3], v[4]],

    [v[1], v[1], v[4]]
  ]
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
          material: whiteMaterial
        }
      },
      // CEILING
      {
        plane: {
          normal: [0, -1, 0],
          d: -1,
          material: skyMaterial
          // material: whiteMaterial
        }
      },
      // BACK
      {
        plane: {
          normal: [0, 0, -1],
          d: -1,
          material: whiteMaterial
        }
      },
      // FRONT (BEHIND CAMERA)
      {
        plane: {
          normal: [0, 0, 1],
          d: -1,
          material: whiteMaterial
          // material: {
          //   lambertian: {
          //     albedo: [0, 0, 0]
          //   }
          // }
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
      },
      // // LIGHT
      // {
      //   sphere: {
      //     center: [0, 1, 0],
      //     radius: 0.25,
      //     material: lightMaterial
      //   }
      // },
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
      // DIFFUSE BOX
      {
        roundedbox: {
          dimensions: [0.3, 0.3, 0.3],
          origin: [0.5, 0.5, 0.2],
          radius: 0.05,
          // minor: 0.2,
          // origin: [-0.4, 0.4, 0],
          // material: redMaterial
          // material: mirrorMaterial
          // material: glassMaterial
          material: whiteMaterial
        }
      }
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
