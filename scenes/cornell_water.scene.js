import * as material from './materials'
import * as environment from './environments'

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
      ...environment.cornellBox,

      {
        implicit: {
          distancefunction: [
            { dfBox: [1.1, 0.25, 1.1] },
            { dfTranslate: [0, -0.9, 0.1] }
          ],
          // material: material.light
          // material: material.white
          // material: material.glass
          material: material.water
        }
      },

      // UNION BOXES
      {
        implicit: {
          distancefunction: [
            {
              dfUnion: [
                {
                  distancefunction: [
                    { dfBox: [0.3, 0.3, 0.3] },
                    { dfRotate: Math.PI / 10 },
                    { dfTranslate: [0.35, -0.75, -0.35] }
                  ]
                },
                {
                  distancefunction: [
                    { dfBox: [0.3, 0.6, 0.3] },
                    { dfRotate: -Math.PI / 10 },
                    { dfTranslate: [-0.35, -0.4, 0.35] }
                  ]
                }
              ]
            }
          ],
          material: material.white
          // material: material.glass
        }
      }
    ]
  }
}
