const canvas = document.createElement('canvas')
canvas.width = canvas.height = 512
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
const imageData8 = new Uint8ClampedArray(imageData.data.buffer)
const imageData32 = new Uint32Array(imageData.data.buffer)
const buffer = new Float64Array(canvas.width * canvas.height * 3)
var numSamples = 0

const numWorkers = 4
const createWorker = () => {
    const worker = new Worker('worker.js', { type: 'module' })
    worker.addEventListener('message', ({ data }) => updateImage(data))
    return worker
}
const updateImage = ({ samples, spp, x0, y0 }) => {
    numSamples += spp
    for (let i = 0; i < samples.length; i++) {
        buffer[i] += samples[i]
    }
    for (let j = 0, k = 0; j < imageData8.length; ) {
        imageData8[j++] = Math.min(0xff, 0xff * buffer[k++] / numSamples)
        imageData8[j++] = Math.min(0xff, 0xff * buffer[k++] / numSamples)
        imageData8[j++] = Math.min(0xff, 0xff * buffer[k++] / numSamples)
        imageData8[j++] = 0xff
    }
    ctx.putImageData(imageData, 0, 0)
    console.log('ITERATIONS:', numSamples)
}
const workers = Array.from({ length: numWorkers }, () => createWorker())

function start() {
    for (let n = 0; n < 100; n++) {
        const worker = workers[n % workers.length]
        worker.postMessage({
            spp: 2,
            x0: 0,
            y0: 0,
            x1: imageData.width,
            y1: imageData.height,
            width: imageData.width,
            height: imageData.height
        })
    }
}

const startButton = document.createElement('input')
startButton.value = 'START'
startButton.type = 'button'
startButton.addEventListener('click', start)
document.body.appendChild(startButton)
