import * as v3 from './vector3.js'

export const cast = () => intersect => ray => {
  const intersection = intersect(ray)
  if (intersection) {
    return intersection.material(intersection).pdf()

    // return v3.scale(
    //   v3.add(intersection.basis.normal, v3.fromXYZ(1, 1, 1)),
    //   1 / 2
    // )
    //
    // const { t } = intersection
    // return v3.scale(v3.fromXYZ(t - 2, t - 2, t - 2), 1 / 2)
  } else {
    return v3.fromXYZ(0, 0, 0)
  }
}
