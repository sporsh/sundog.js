export default {
  camera: {
    position: [0, 0, -4],
    basis: {
      tangent: [1, 0, 0],
      bitangent: [0, -1, 0],
      normal: [0, 0, 1]
    },
    aperture: 0,
    fieldOfView: 0.35,
    focalLength: 5,
    tMin: 0.00001,
    tMax: 10
  },
  geometry: {
    group: [
      // FLOOR
      {
        plane: {
          normal: [0, 1, 0],
          d: -1,
          material: {
            lambertian: {
              albedo: [0.8, 0.8, 0.8]
            }
          }
        }
      },
      // CEILING
      {
        plane: {
          normal: [0, -1, 0],
          d: -1,
          material: {
            lambertian: {
              albedo: [0.8, 0.8, 0.8]
            }
          }
        }
      },
      // BACK
      {
        plane: {
          normal: [0, 0, -1],
          d: -1,
          material: {
            lambertian: {
              albedo: [0.8, 0.8, 0.8]
            }
          }
        }
      },
      // RIGHT
      {
        plane: {
          normal: [-1, 0, 0],
          d: -1,
          material: {
            lambertian: {
              albedo: [0.25, 0.75, 0.25]
            }
          }
        }
      },
      // LEFT
      {
        plane: {
          normal: [1, 0, 0],
          d: -1,
          material: {
            lambertian: {
              albedo: [0.75, 0.25, 0.25]
            }
          }
        }
      },
      {
        sphere: {
          center: [0, 1, 0],
          radius: 0.25,
          material: {
            lambertian: {
              albedo: [0, 0, 0],
              emittance: [10, 10, 10]
            }
          }
        }
      },
      {
        sphere: {
          center: [-0.5, -0.6, 0.5],
          radius: 0.4,
          material: {
            lambertian: {
              albedo: [0.8, 0.8, 0.8],
              emittance: [0, 0, 0]
            }
          }
        }
      }
    ]
  }
}
