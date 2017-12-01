module.exports = {
    entry: { main: './main.js', worker: './worker.js' },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
}
