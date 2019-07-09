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
      // ...environment.skyAndGround,
      // ...environment.cheapCornellBox,

      // // TORUS
      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfTorus: { major: 0.25, minor: 0.15 } },
      //       // { dfTwist: Math.PI },
      //       { dfTranslate: [0.35, -0.5, -0.35] }
      //     ],
      //     // material: material.white
      //     material: material.glass
      //     // material: material.red
      //   }
      // }

      // CYLINDER
      // {
      //   implicit: {
      //     distancefunction: [
      //       // { dfCylinder: [0, 0, 0.2] }
      //       { dfCylinder: { height: 0.1, radius: 0.3 } },
      //       // { dfTwist: Math.PI },
      //       { dfTranslate: [0.35, -0.95, -0.35] }
      //     ],
      //     // material: material.white
      //     // material: material.red
      //     material: material.glass
      //   }
      // }

      // // CYLINDER RING
      // {
      //   implicit: {
      //     distancefunction: [
      //       {
      //         dfSubtract: [
      //           {
      //             distancefunction: [
      //               { dfCylinder: { height: 0.05, radius: 0.3 } }
      //             ]
      //           },
      //           {
      //             distancefunction: [
      //               { dfCylinder: { height: 0.2, radius: 0.25 } }
      //             ]
      //           }
      //         ]
      //       },
      //       { dfTranslate: [0.35, -0.95, -0.35] }
      //     ],
      //     // material: material.white
      //     // material: material.red
      //     // material: material.mirror
      //     material: material.glass
      //   }
      // }

      // // TWISTED BOX
      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfBox: [0.3, 0.3, 0.3] },
      //       { dfTwist: Math.PI },
      //       { dfTranslate: [0.35, -0.75, -0.35] }
      //     ],
      //     material: material.white
      //     // material: material.glass
      //     // material: material.red
      //   }
      // }

      // // BOX - SPHERE
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
      //     // material: material.white
      //     // material: material.red
      //     material: material.glass
      //   }
      // }

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

      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfBox: [0.3, 0.3, 0.3] },
      //       { dfRotate: Math.PI / 10 },
      //       { dfTranslate: [0.35, -0.75, -0.35] }
      //     ],
      //     // material: material.white
      //     material: material.glass
      //     // material: material.red
      //   }
      // },
      //
      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfBox: [0.3, 0.6, 0.3] },
      //       { dfRotate: -Math.PI / 10 },
      //       { dfTranslate: [-0.35, -0.4, 0.3] }
      //     ],
      //     material: material.white
      //     // material: material.glass
      //     // material: material.red
      //   }
      // }

      // // SPHERE
      // {
      //   sphere: {
      //     center: [-0.45, -0.6, -0.5],
      //     radius: 0.4,
      //     // material: material.white
      //     material: material.glass
      //     // material: material.mirror
      //   }
      // },
      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfSphere: 0.4 },
      //       // { dfSphere: 0.2 },
      //       // { dfOctahedron: 0.5 }
      //       // { dfTorus: { major: 0.25, minor: 0.15 } },
      //       // { dfBox: [0.25, 0.6, 0.25] },
      //       // { dfTwist: Math.PI },
      //       // { dfTwist: 6 }
      //       // { dfRepeat: [1, 1, 1] }
      //       { dfTranslate: [0.45, -0.6, -0.5] }
      //     ],
      //     // material: material.white
      //     material: material.glass
      //   }
      // }

      // // SPHERE
      // {
      //   sphere: {
      //     center: [-0.5, -0.6, 0.5],
      //     radius: 0.4,
      //     // material: material.white
      //     // material: material.glass
      //     material: material.mirror
      //   }
      // },
      // // SPHERE
      // {
      //   sphere: {
      //     center: [0.5, -0.6, -0.5],
      //     // radius: 0,
      //     radius: 0.4,
      //     // material: material.white
      //     // material: material.mirror
      //     material: material.glass
      //   }
      // }
    ]
  }
}
