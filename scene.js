const lightMaterial = {
  lambertian: {
    albedo: [0, 0, 0],
    emittance: [10, 10, 10]
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
          material: whiteMaterial
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
      },
      // LIGHT
      {
        sphere: {
          center: [0, 1, 0],
          radius: 0.25,
          material: lightMaterial
        }
      },
      // DIFFUSE SPHAERE
      {
        sphere: {
          center: [-0.5, -0.6, 0.5],
          radius: 0.4,
          material: mirrorMaterial
        }
      },
      // MIRROR SPHAERE
      {
        sphere: {
          center: [0.5, -0.6, -0.5],
          radius: 0.4,
          material: glassMaterial
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
