export const quad = material => (a, b, c, d) => [
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

export const block = material => (...v) => [
  ...quad(material)(v[0], v[1], v[2], v[3]),
  ...quad(material)(v[4], v[5], v[6], v[7]),
  ...quad(material)(v[8], v[9], v[10], v[11]),
  ...quad(material)(v[12], v[13], v[14], v[15]),
  ...quad(material)(v[16], v[17], v[18], v[19])
]
