import { renderRegion } from './src/render.js'
import { tracer } from './src/trace.js'
import { intersectRay, cameraRayThrough } from './scene.js'

const tracer_ = tracer(intersectRay)
const renderRegion_ = renderRegion(tracer_, cameraRayThrough)

onmessage = ({ data }) => {
    const { spp, x0, y0, x1, y1, width, height } = data
    const imageData = renderRegion_(spp, x0, y0, x1, y1, width, height)

    postMessage({ x0, y0, imageData }, [imageData.data.buffer])
}
