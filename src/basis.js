import * as v3 from './vector3.js'

const basis = (tangent, bitangent, normal) => ({ tangent, bitangent, normal })

export const fromStandardBasis = ({ tangent, bitangent, normal }, v) => ({
  x: v3.dot(v, tangent),
  y: v3.dot(v, bitangent),
  z: v3.dot(v, normal)
})

export const toStandardBasis = (
  { tangent, bitangent, normal },
  { x, y, z }
) => ({
  x: tangent.x * x + bitangent.x * y + normal.x * z,
  y: tangent.y * x + bitangent.y * y + normal.y * z,
  z: tangent.z * x + bitangent.z * y + normal.z * z
})

export const arbitraryBasisForNormal = normal => {
  const tangent = orthogonalUnitVector(normal)
  return basis(tangent, v3.cross(tangent, normal), normal)
}

const orthogonalUnitVector = ({ x, y, z }) => {
  if (x === 0) {
    return {
      x: 1,
      y: 0,
      z: 0
    }
  }
  const f = Math.sqrt(x * x + z * z)
  return v3.normalize({
    x: z * f,
    y: 0,
    z: -x * f
  })
}
