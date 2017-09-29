import { dot, cross } from './vector3.js'

const basis = (tangent, bitangent, normal) => ({ tangent, bitangent, normal })

export const fromStandardBasis = ({ tangent, bitangent, normal }, v) => ({
    x: dot(v, tangent),
    y: dot(v, bitangent),
    z: dot(v, normal)
})

export const toStandardBasis = (
    { tangent, bitangent, normal },
    { x, y, z }
) => ({
    x: tangent.x * x + normal.x * y + bitangent.x * z,
    y: tangent.y * x + normal.y * y + bitangent.y * z,
    z: tangent.z * x + normal.z * y + bitangent.z * z
})

export const arbitraryBasisForNormal = normal => {
    const tangent = orthogonalUnitVector(normal)
    return basis(tangent, cross(tangent, normal), normal)
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
    return {
        x: z * f,
        y: 0,
        z: -x * f
    }
}
