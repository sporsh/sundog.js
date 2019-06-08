import { renderRegion } from './src/render.js'
import { tracer } from './src/trace.js'
import { intersectRay, cameraRayThrough } from './scene.js'

const tracer_ = tracer(intersectRay)
const renderRegion_ = renderRegion(tracer_, cameraRayThrough)

onmessage = ({ data: msg }) => {
  switch (msg.type) {
    case 'renderRegion':
      {
        const { spp, x0, y0, x1, y1, width, height } = msg.data
        const samples = renderRegion_(spp, x0, y0, x1, y1, width, height)
        postMessage({ spp, x0, y0, samples }, [samples.buffer])
      }
      break
    case 'terminate':
      close()
      break
  }
}
