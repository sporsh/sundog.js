export const light = {
  lambertian: {
    // albedo: [1, 1, 1],
    albedo: [0, 0, 0],
    // emittance: [20, 15, 10]
    emittance: [10, 10, 10]
  }
}

export const sky = {
  lambertian: {
    // albedo: [0.2, 0.2, 0.2],
    albedo: [0, 0, 0],
    emittance: [0xdd / 255, 0xee / 255, 1]
    // emittance: [0.1, 0.1, 0.1]
  }
}

export const glass = {
  // transmissive: {
  fresnelSpecularTransmissive: {
    // albedo: [0.9, 0.9, 0.9],
    albedo: [0.75, 0.75, 0.75],
    // albedo: [1, 1, 1],
    // refractiveIndex: 1.8
    refractiveIndex: 1.62
    // refractiveIndex: 1.333
  }
}

export const water = {
  // transmissive: {
  fresnelSpecularTransmissive: {
    // albedo: [1, 1, 1],
    albedo: [0.7, 0.9, 1],
    // albedo: [1, 1, 1],
    // refractiveIndex: 1.8
    // refractiveIndex: 1.62
    refractiveIndex: 1.333
  }
}

export const mirror = {
  specular: {
    albedo: [0.9, 0.9, 0.9],
    emittance: [0, 0, 0]
  }
}

export const white = {
  lambertian: {
    albedo: [0.8, 0.8, 0.8]
  }
}

export const black = {
  lambertian: {
    albedo: [0.2, 0.2, 0.2]
  }
}

export const red = {
  lambertian: {
    albedo: [0.75, 0.25, 0.25]
  }
}

export const green = {
  lambertian: {
    albedo: [0.25, 0.75, 0.25]
  }
}

export const checkerCube = {
  checkerCube: {
    size: { x: 3, y: 3, z: 3 },
    white: { material: white },
    black: { material: black }
  }
}

export const checker = {
  checkerTexture: {
    size: { x: 10, y: 10, z: 10 },
    white: { material: white },
    black: { material: black }
  }
}

export const grid = {
  proceduralGridTexture: {
    thickness: 0.005,
    background: { material: white },
    grid: { material: black }
  }
}

export const mirrorChecker = {
  checkerTexture: {
    size: { x: 10, y: 10, z: 10 },
    white: { material: white },
    black: { material: mirror }
  }
}
export const redAndGreenChecker = {
  checkerTexture: {
    size: { x: 10, y: 10, z: 10 },
    white: { material: sky },
    black: { material: white }
  }
}
