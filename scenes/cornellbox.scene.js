const lightMaterial = {
  lambertian: {
    // albedo: [0, 0, 0],
    albedo: [0.78, 0.78, 0.78],
    emittance: [18.4, 15.6, 8]
  }
}

const whiteMaterial = {
  lambertian: {
    albedo: [0.74, 0.74, 0.74]
  }
}

const redMaterial = {
  lambertian: {
    // albedo: [0.642, 0.287, 0.058]
    albedo: [0.651, 0.115, 0.058]
  }
}

const greenMaterial = {
  lambertian: {
    // albedo: [0.159, 0.481	, 0.285]
    // albedo: [0.159, 0.16, 0.285]
    albedo: [0.159, 0.481, 0.16]
  }
}

const quad = material => (a, b, c, d) => [
  {
    triangle: {
      a,
      b,
      c,
      material
    }
  },
  {
    triangle: {
      a,
      b: c,
      c: d,
      material
    }
  }
]

const block = material => (...v) => [
  ...quad(material)(v[0], v[1], v[2], v[3]),
  ...quad(material)(v[4], v[5], v[6], v[7]),
  ...quad(material)(v[8], v[9], v[10], v[11]),
  ...quad(material)(v[12], v[13], v[14], v[15]),
  ...quad(material)(v[16], v[17], v[18], v[19])
]

const blocks = [
  // SHORT BLOCK
  ...block(whiteMaterial)(
    [130.0, 165.0, 65.0],
    [82.0, 165.0, 225.0],
    [240.0, 165.0, 272.0],
    [290.0, 165.0, 114.0],
    //
    [290.0, 0.0, 114.0],
    [290.0, 165.0, 114.0],
    [240.0, 165.0, 272.0],
    [240.0, 0.0, 272.0],
    //
    [130.0, 0.0, 65.0],
    [130.0, 165.0, 65.0],
    [290.0, 165.0, 114.0],
    [290.0, 0.0, 114.0],
    //
    [82.0, 0.0, 225.0],
    [82.0, 165.0, 225.0],
    [130.0, 165.0, 65.0],
    [130.0, 0.0, 65.0],
    //
    [240.0, 0.0, 272.0],
    [240.0, 165.0, 272.0],
    [82.0, 165.0, 225.0],
    [82.0, 0.0, 225.0]
  ),
  // TALL BLOCK
  ...block(whiteMaterial)(
    [423.0, 330.0, 247.0],
    [265.0, 330.0, 296.0],
    [314.0, 330.0, 456.0],
    [472.0, 330.0, 406.0],

    [423.0, 0.0, 247.0],
    [423.0, 330.0, 247.0],
    [472.0, 330.0, 406.0],
    [472.0, 0.0, 406.0],

    [472.0, 0.0, 406.0],
    [472.0, 330.0, 406.0],
    [314.0, 330.0, 456.0],
    [314.0, 0.0, 456.0],

    [314.0, 0.0, 456.0],
    [314.0, 330.0, 456.0],
    [265.0, 330.0, 296.0],
    [265.0, 0.0, 296.0],

    [265.0, 0.0, 296.0],
    [265.0, 330.0, 296.0],
    [423.0, 330.0, 247.0],
    [423.0, 0.0, 247.0]
  )
]

const cornellBox = [
  // LIGHT
  ...quad(lightMaterial)(
    [343.0, 548.8, 227.0],
    [343.0, 548.8, 332.0],
    [213.0, 548.8, 332.0],
    [213.0, 548.8, 227.0]
  ),

  // CEILING
  // ...quad(whiteMaterial)(
  //   [556.0, 548.8, 0.0],
  //   [556.0, 548.8, 559.2],
  //   [0.0, 548.8, 559.2],
  //   [0.0, 548.8, 0.0]
  // ),
  ...quad(whiteMaterial)(
    [0.0, 548.8, 559.2],
    [0.0, 548.8, 0.0],
    [213.0, 548.8, 227.0],
    [213.0, 548.8, 332.0]
  ),
  ...quad(whiteMaterial)(
    [0.0, 548.8, 0.0],
    [556.0, 548.8, 0.0],
    [343.0, 548.8, 332.0],
    [213.0, 548.8, 332.0]
  ),
  ...quad(whiteMaterial)(
    [556.0, 548.8, 0.0],
    [556.0, 548.8, 559.2],
    [343.0, 548.8, 332.0],
    [343.0, 548.8, 227.0]
  ),
  ...quad(whiteMaterial)(
    [556.0, 548.8, 559.2],
    [0.0, 548.8, 559.2],
    [213.0, 548.8, 332.0],
    [343.0, 548.8, 332.0]
  ),

  // FLOOR
  ...quad(whiteMaterial)(
    [552.8, 0.0, 0.0],
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 559.2],
    [549.6, 0.0, 559.2]
  ),

  // BACK
  ...quad(whiteMaterial)(
    [549.6, 0.0, 559.2],
    [0.0, 0.0, 559.2],
    [0.0, 548.8, 559.2],
    [556.0, 548.8, 559.2]
  ),

  // RIGHT
  ...quad(greenMaterial)(
    [0.0, 0.0, 559.2],
    [0.0, 0.0, 0.0],
    [0.0, 548.8, 0.0],
    [0.0, 548.8, 559.2]
  ),

  // LEFT
  ...quad(redMaterial)(
    [552.8, 0.0, 0.0],
    [549.6, 0.0, 559.2],
    [556.0, 548.8, 559.2],
    [556.0, 548.8, 0.0]
  )
]

export default {
  maxDepth: 8,
  camera: {
    position: [278, 273, -800],
    basis: {
      tangent: [-1, 0, 0],
      bitangent: [0, -1, 0],
      normal: [0, 0, 1]
    },
    aperture: 0,
    fieldOfView: 0.35,
    focalLength: 5
    // tMin: 0.00001,
    // tMax: Infinity
  },
  geometry: {
    group: [...cornellBox, ...blocks]
  }
}