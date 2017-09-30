export const intersectGroupRay = intersectables => ray =>
    intersectables.reduce((nearest, intersectable) => {
        const current = intersectable(ray)
        if (!nearest) {
            return current
        } else if (current && current.t < nearest.t) {
            return current
        } else {
            return nearest
        }
    }, null)

export const renderable = (intersectRay, material) => ({
    intersectRay: ray => {}
})
