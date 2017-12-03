export const testBoxRay = ({ min, max }) => ({
    origin,
    direction,
    tMin = 0,
    tMax = Infinity
}) => {
    const d = [direction.x, direction.y, direction.z]
    const p = [origin.x, origin.y, origin.z]
    const mn = [min.x, min.y, min.z]
    const mx = [max.x, max.y, max.z]

    for (let i = 0; i < 3; ++i) {
        const ood = 1 / d[i]
        const t1 = (mn[i] - p[i]) * ood
        const t2 = (mx[i] - p[i]) * ood

        tMin = Math.max(tMin, Math.min(t1, t2))
        tMax = Math.min(tMax, Math.max(t1, t2))
        if (tMin > tMax) return false
    }

    // return tmax > tmin
    return {
        origin,
        direction,
        tMin,
        tMax
    }
}
