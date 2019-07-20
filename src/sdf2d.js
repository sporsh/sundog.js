import * as v2 from './vector2'

export const dCircle = ({ radius }) => point => v2.length(point) - radius

export const dX = ({ width }) => point => Math.abs(point.x) - width

export const dLine = ({ normal, width }) => point =>
  Math.abs(v2.dot(point, normal)) - width

export const dRectangle = dimensions => point => {
  const d = v2.sub(v2.abs(point), dimensions)
  return v2.length(v2.max(d, 0)) + Math.min(Math.max(d.x, d.y), 0)
}

// Domain Operators

export const fTranslate = offset => point => v2.sub(point, offset)

export const fRepeat = c => {
  const cHalf = v2.scale(c, 0.5)
  return p => v2.sub(v2.mod(v2.abs(p), c), cHalf)
}

// Boolean Operators

export const fUnion = dfs => point => Math.min(...dfs.map(df => df(point)))

// export const dfSubtract = dfs => point => Math.min(...dfs.map(df => df(point)))
export const fSubtract = ([a, ...b]) => point =>
  Math.max(a(point), ...b.map(df => -df(point)))
// { return max(-d1,d2); }

export const fIntersect = dfs => point => Math.max(...dfs.map(df => df(point)))
