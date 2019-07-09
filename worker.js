import { renderRegion } from './src/render.js'
import { iterative } from './src/pathTrace.js'
import { cast } from './src/rayCast.js'
import { load } from './loader.js'

let renderRegion_ = () => {}

// const trace = cast
const trace = iterative

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
          trace({ maxDepth })(intersectRay),
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
