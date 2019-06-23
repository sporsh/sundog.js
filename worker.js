import { renderRegion } from './src/render.js'
import { tracer } from './src/trace.js'
import { load } from './loader.js'

let renderRegion_ = () => {}

onmessage = ({ data: msg }) => {
  switch (msg.type) {
    case 'loadScene':
      {
        const {
          camera: cameraRayThrough,
          geometry: intersectRay,
          maxDepth = 8
        } = load(msg.data)
        renderRegion_ = renderRegion(
          tracer(intersectRay, maxDepth),
          cameraRayThrough
        )
      }
      break
    case 'renderRegion':
      {
        const { spp, x0, y0, x1, y1, width, height } = msg.data
        const samples = renderRegion_(spp, x0, y0, x1, y1, width, height)
        postMessage({ spp, x0, y0, x1, y1, width, height, samples }, [
          samples.buffer
        ])
      }
      break
    case 'terminate':
      close()
      break
  }
}
