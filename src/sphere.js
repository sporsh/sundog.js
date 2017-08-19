import { sub, dot, length2 } from './vector3.js'

export const intersectSphereRay = ({ center, radius }) => ({
    origin,
    direction
}) => {
    // Vector pointing from sphere center to ray origin
    const m = sub(origin, center)

    // b = 0 (ray pointing directly at sphere center)
    // b < 0 (ray leaning towards sphere center)
    // b > 0 (ray leaning away from sphere center)
    const b = dot(m, direction)

    // Signed squared distance between ray origin and sphere surface
    const c = length2(m) - radius * radius

    if (c > 0 && b > 0) {
        // Ray origin is outside sphere, and ray direction is >90deg away from sphere center
        return
    }

    const discr = b * b - c

    if (discr < 0) {
        // Ray misses sphere
        // Quadric formula has no real root, means there are no intersections
        return
    }

    const sqrtDiscr = Math.sqrt(discr)
    const t = -b - sqrtDiscr
    if (t < 0) {
        // Intersection was behind ray origin
        // We must be inside the spehre, so find the other intersection point infront of us
        return -b + sqrtDiscr
    }
    return t
}
