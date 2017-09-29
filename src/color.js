export const fromRGB = (r, g, b) => ({ r, g, b })

export const fromV3 = ({ x, y, z }) => fromRGB(x, y, z)

export const toAbgr32 = ({ r, g, b }) =>
    0xff000000 |
    (Math.min(0xff, b * 0xff) << 16) |
    (Math.min(0xff, g * 0xff) << 8) |
    Math.min(0xff, r * 0xff)
