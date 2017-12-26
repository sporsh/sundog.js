export const testBoxRay = ({ min, max }) => ({
    origin,
    direction,
    tMin = 0,
    tMax = Infinity
}) => {
    // X-slab
    {
        const ood = 1 / direction.x
        const t1 = (min.x - origin.x) * ood
        const t2 = (max.x - origin.x) * ood
        tMin = Math.max(tMin, Math.min(t1, t2))
        tMax = Math.min(tMax, Math.max(t1, t2))
        if (tMin > tMax) return false
    }
    // Y-slab
    {
        const ood = 1 / direction.y
        const t1 = (min.y - origin.y) * ood
        const t2 = (max.y - origin.y) * ood
        tMin = Math.max(tMin, Math.min(t1, t2))
        tMax = Math.min(tMax, Math.max(t1, t2))
        if (tMin > tMax) return false
    }
    // Z-slab
    {
        const ood = 1 / direction.z
        const t1 = (min.z - origin.z) * ood
        const t2 = (max.z - origin.z) * ood
        tMin = Math.max(tMin, Math.min(t1, t2))
        tMax = Math.min(tMax, Math.max(t1, t2))
        if (tMin > tMax) return false
    }

    return {
        origin,
        direction,
        tMin,
        tMax
    }
}

export const boundIntersectRay = (testRay, intersectRay) => ray => {
    const boundRay = testRay(ray)
    if (boundRay) {
        return intersectRay(boundRay)
    }
}
