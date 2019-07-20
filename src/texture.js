export const uniform = ({ material }) => () => material

export const mapXZ = ({ point: { x, z } }) => ({ u: x, v: z })
export const mapZY = ({ point: { y, z } }) => ({ u: z, v: y })

export const mapSphere = ({ point }) => {
  const theta = sphericalTheta(point)
  const phi = sphericalPhi(point)

  const u = theta / Math.PI
  const v = phi / (Math.PI * 2)

  return { u, v }
}

// const sphericalTheta = ({ x, y, z }) => Math.acos(clampUnit(z))
const sphericalTheta = ({ y }) => Math.acos(clampUnit(y))
// const sphericalTheta = ({ x, y, z }) => Math.acos(z)
// return std::acos(Clamp(v.z, -1, 1));

const sphericalPhi = ({ x, z }) => {
  // const p = Math.atan2(y, x)
  const p = Math.atan2(x, z)
  return p < 0 ? p + 2 * Math.PI : p
}
const clamp = (min, max) => value => Math.max(min, Math.min(value, max))

const clampUnit = clamp(-1, 1)

// intersection -> ??? -> material

// uniform -> material

// map2d -> (u,v) -> df2d/image -> material
// map2dSphere -> (u,v) -> df2d/image -> material
// map2dPlanar(plane) -> (u,v) -> df2d/image -> material

// map3d -> (xyz) -> df3d/... -> material
// map3dPoint -> (xyz) -> df3d/... -> material
// map3dNormal -> (xyz) -> df3d/... -> material
