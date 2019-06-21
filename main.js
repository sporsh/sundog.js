import * as dat from 'dat.gui'
import scene from './scene.js'

const init = config => ({
  config,
  numSamples: 0,
  running: false,
  workers: []
})

const updateCanvas = state => canvas => {
  state.ctx = canvas.getContext('2d')
  state.imageData = state.ctx.getImageData(0, 0, canvas.width, canvas.height)
  state.sampleData = new Float64Array(canvas.width * canvas.height * 3)

  clearCanvas(state)
}

const clearCanvas = state => {
  // Fill alpha channel
  const imageData32 = new Uint32Array(state.imageData.data.buffer)
  imageData32.fill(0xff000000)
  state.ctx.putImageData(state.imageData, 0, 0)
}

const clearSamples = state => {
  state.sampleData.fill(0)
  state.numSamples = 0

  clearCanvas(state)
}

const updateWorkers = state => {
  // Create new workers
  state.workers = Array.from({ length: state.config.numWorkers }, () =>
    createWorker(state)
  )
}

const createWorker = state => {
  const worker = new Worker('./worker.js', { type: 'module' })
  worker.addEventListener('message', updateSampleData(state))
  return worker
}

const updateSampleData = state => ({
  target: worker,
  data: { samples, spp, x0, y0 }
}) => {
  state.numSamples += spp
  for (let i = 0; i < samples.length; i++) {
    state.sampleData[i] += samples[i]
  }

  if (state.config.autoUpdate) {
    updateImage(state)
  }

  if (state.running) {
    worker.postMessage({
      type: 'renderRegion',
      data: {
        spp: state.config.spp,
        x0: x0,
        y0: y0,
        x1: state.imageData.width,
        y1: state.imageData.height,
        width: state.imageData.width,
        height: state.imageData.height
      }
    })
  }
}

const updateImage = ({ ctx, imageData, sampleData, numSamples }) => {
  // Create typed view into imageData
  const imageData8 = new Uint8ClampedArray(imageData.data.buffer)

  // Update imageData with average sample data
  for (let j = 0, k = 0; j < imageData8.length; j++) {
    imageData8[j++] = Math.min(0xff, (0xff * sampleData[k++]) / numSamples)
    imageData8[j++] = Math.min(0xff, (0xff * sampleData[k++]) / numSamples)
    imageData8[j++] = Math.min(0xff, (0xff * sampleData[k++]) / numSamples)
  }
  ctx.putImageData(imageData, 0, 0)

  // Render stats
  ctx.fillStyle = 'white'
  ctx.font = '10px sans-serif'
  ctx.fillText(`SPP: ${numSamples}`, 10, 10)
}

//
//
//

const canvas = document.createElement('canvas')
canvas.width = canvas.height = 512
document.body.appendChild(canvas)

const config = {
  numWorkers: navigator.hardwareConcurrency,
  spp: 2,
  autoUpdate: true,
  scene
}

const state = init(config)
updateCanvas(state)(canvas)

//
//
//

const start = state => {
  updateWorkers(state)

  state.workers.forEach(worker => {
    state.workers.forEach(worker =>
      worker.postMessage({
        type: 'loadScene',
        data: JSON.stringify(state.config.scene)
      })
    )

    worker.postMessage({
      type: 'renderRegion',
      data: {
        spp: state.config.spp,
        x0: 0,
        y0: 0,
        x1: state.imageData.width,
        y1: state.imageData.height,
        width: state.imageData.width,
        height: state.imageData.height
      }
    })
  })

  state.running = true
}

const stop = state => {
  // Terminate all existing workers
  state.workers.forEach(worker => worker.postMessage({ type: 'terminate' }))

  state.running = false
  updateImage(state)
}

const controls = {
  start: () => start(state),
  stop: () => stop(state),
  clear: () => clearSamples(state)
}

window.addEventListener('load', () => {
  var gui = new dat.GUI()

  const rendererGui = gui.addFolder('Renderer')

  rendererGui.add(
    state.config,
    'numWorkers',
    1,
    navigator.hardwareConcurrency,
    1
  )
  rendererGui.add(state.config, 'spp', 1, 10, 1)
  rendererGui.add(state.config, 'autoUpdate', 1, 10, 1)
  rendererGui.open()

  const cameraGui = gui.addFolder('Camera')
  cameraGui.add(state.config.scene.camera, 'aperture')
  cameraGui.add(state.config.scene.camera, 'fieldOfView')
  cameraGui.add(state.config.scene.camera, 'focalLength')
  cameraGui.add(state.config.scene.camera, 'tMin')
  cameraGui.add(state.config.scene.camera, 'tMax')
  cameraGui.open()

  gui.add(controls, 'start')
  gui.add(controls, 'stop')
  gui.add(controls, 'clear')
})
