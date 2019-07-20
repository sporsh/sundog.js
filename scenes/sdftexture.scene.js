import * as material from './materials'
import * as env from './environments'
import * as basis from '../src/basis'
import * as v3 from '../src/vector3'

// const cameraPosition = v3.fromXYZ(3, 3, -5)
const cameraPosition = v3.fromXYZ(0, 2, -3)
const cameraLookAt = v3.fromXYZ(0, -0.7, 0)
const cameraVector = v3.sub(cameraLookAt, cameraPosition)
// const cameraVector = v3.sub(cameraPosition, cameraLookAt)
const cameraFocalLenght = v3.length(cameraVector)
const { normal, tangent, bitangent } = basis.arbitraryBasisForNormal(
  v3.normalize(cameraVector)
)

export default {
  maxDepth: 12,
  camera: {
    // position: [0, 2, -5],
    position: [cameraPosition.x, cameraPosition.y, cameraPosition.z],
    // basis: {
    //   tangent: [1, 0, 0],
    //   bitangent: [0, -1, 0],
    //   normal: [0, 0, 1]
    // },
    basis: {
      tangent: [tangent.x, tangent.y, tangent.z],
      bitangent: [bitangent.x, bitangent.y, bitangent.z],
      normal: [normal.x, normal.y, normal.z]
    },
    aperture: 0.05,
    fieldOfView: 1 / 3,
    // fieldOfView: 0.35,
    focalLength: cameraFocalLenght
    // tMin: 0.00001,
    // tMax: Infinity
  },
  geometry: {
    group: [
      // ...env.cornellBox,

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
      // LIGHT
      {
        sphere: {
          center: [-3, 3, -3],
          radius: 2,
          material: material.light
        }
      },
      // GROUND
      {
        plane: {
          normal: [0, 1, 0],
          d: -1,
          // material: material.checkerCube
          material: material.sdftexture
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
      },
      // ...env.cheapCornellBox,

      // // SPHERE LIGHT
      // {
      //   sphere: {
      //     center: [-1, 1, 1],
      //     radius: 0.4,
      //     material: material.light
      //   }
      // },

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

      // CYLINDER RING
      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfCylinder: { height: 0.4, radius: 0.35 } },
      //       { dfTranslate: [0.0, -0.6, 0] }
      //     ],
      //     // material: material.white
      //     // material: material.red
      //     // material: material.mirror
      //     material: material.glass
      //   }
      // }
      //
      // // CYLINDER RING
      // {
      //   implicit: {
      //     distancefunction: [
      //       {
      //         dfSubtract: [
      //           {
      //             distancefunction: [
      //               { dfCylinder: { height: 0.4, radius: 0.35 } }
      //             ]
      //           },
      //           {
      //             distancefunction: [
      //               { dfCylinder: { height: 0.5, radius: 0.345 } },
      //               { dfTranslate: [0.0, 0.2, 0] }
      //             ]
      //           }
      //         ]
      //       },
      //       { dfTranslate: [0.0, -0.6, 0] }
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

      // BUBBLE - SPHERE
      {
        implicit: {
          distancefunction: [
            {
              dfSubtract: [
                { distancefunction: [{ dfSphere: 0.5 }] },
                // { distancefunction: [{ dfBox: [0.5, 0.5, 0.5] }] },
                {
                  distancefunction: [
                    { dfSphere: 0.48 }
                    // { dfTranslate: [0, 0, 0] }
                  ]
                }
              ]
            },
            // { dfRotate: Math.PI / 3 }
            // { dfSphere: 0.5 }
            // { dfOctahedron: 0.5 }
            // { dfTorus: { major: 0.25, minor: 0.15 } },
            // { dfBox: [0.25, 0.6, 0.25] },
            // { dfTwist: Math.PI }
            // { dfTwist: 6 }
            { dfTranslate: [0, -0.5, 0] }
          ],
          // material: material.white
          // material: material.red
          material: material.glass
        }
      }

      // // BOTTOM WATER
      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfBox: [1.1, 0.25, 1.1] },
      //       { dfTranslate: [0, -0.9, 0.1] }
      //     ],
      //     // material: material.light
      //     // material: material.white
      //     // material: material.glass
      //     material: material.water
      //     // material: material.checker
      //   }
      // },

      // // CHECKERED BOX
      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfBox: [0.3, 0.3, 0.3] },
      //       // { dfRotate: Math.PI / 10 },
      //       { dfTranslate: [0.3, -0.7, 0.3] }
      //     ],
      //     material: material.redAndGreenChecker
      //     // material: material.white
      //     // material: material.glass
      //   }
      // }

      //
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
      //     // material: material.checker
      //     material: material.white
      //     // material: material.glass
      //   }
      // }

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
      //     center: [0, -0.5, 0],
      //     radius: 0.5,
      //     // material: material.white
      //     // material: material.light
      //     // material: material.mirror
      //     // material: material.checker
      //     material: material.glass
      //     // material: material.mirrorChecker
      //   }
      // },
      // // INVERSE SPHERE
      // {
      //   sphere: {
      //     center: [0, -0.5, 0],
      //     radius: -0.48,
      //     // material: material.white
      //     // material: material.light
      //     // material: material.mirror
      //     // material: material.checker
      //     material: material.glass
      //     // material: material.mirrorChecker
      //   }
      // }

      // {
      //   implicit: {
      //     distancefunction: [
      //       // { dfSphere: 0.4 },
      //       // { dfSphere: 0.2 },
      //       // { dfOctahedron: 0.5 }
      //       { dfTorus: { major: 0.35, minor: 0.15 } },
      //       // { dfBox: [0.25, 0.4, 0.25] },
      //       // { dfTwist: Math.PI },
      //       { dfRotate: Math.PI / 5 },
      //       // { dfTwist: 6 }
      //       // { dfTranslate: [0.5, 0.5, 0.5] },
      //       // { dfRepeat: [2, 2, 2] },
      //       { dfTranslate: [0, -0.5, 0] }
      //       // { dfTranslate: [-100, -100, 10] }
      //       // { dfTranslate: [0.45, -0.6, -0.5] }
      //     ],
      //     // material: material.white
      //     // material: material.white
      //     material: material.glass
      //     // material: material.red
      //     // material: material.checker
      //   }
      // }
      //
      // {
      //   implicit: {
      //     distancefunction: [
      //       { dfBox: [0.25, 0.5, 0.25] },
      //       // { dfTwist: -Math.PI / 3 },
      //       // { dfRotate: Math.PI / 4 },
      //       // { dfRotate: Math.PI / 5 },
      //       { dfTwist: Math.PI },
      //       // { dfTranslate: [0.5, 0.5, 0.5] },
      //       // { dfRepeat: [2, 2, 2] },
      //       { dfTranslate: [0, -0.5, 0] }
      //       // { dfTranslate: [-100, -100, 10] }
      //       // { dfTranslate: [0.45, -0.6, -0.5] }
      //     ],
      //     material: material.white
      //     // material: material.glass
      //     // material: material.red
      //     // material: material.checker
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
