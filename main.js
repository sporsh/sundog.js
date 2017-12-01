const canvas = document.createElement('canvas')
canvas.width = canvas.height = 512
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
const imageData32 = new Uint32Array(imageData.data.buffer)

const numWorkers = 4
const createWorker = () => {
    const worker = new Worker('worker.js', { type: 'module' })
    worker.addEventListener('message', ({ data }) => updateImage(data))
    return worker
}
const updateImage = ({ imageData, x0, y0 }) => {
    ctx.putImageData(imageData, x0, y0)
}
const workers = Array.from({ length: numWorkers }, () => createWorker())

const blockSize = 64
const rows = imageData.width / blockSize
const columns = imageData.height / blockSize

const messages = []
for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
        const x0 = column * blockSize
        const y0 = row * blockSize
        messages.push({
            spp: 50,
            x0,
            y0,
            x1: x0 + blockSize,
            y1: y0 + blockSize,
            width: imageData.width,
            height: imageData.height
        })
    }
}

messages.forEach((message, index) => {
    const worker = workers[index % workers.length]
    worker.postMessage(message)
})
