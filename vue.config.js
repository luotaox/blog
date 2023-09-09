module.exports = {
    devServer: {
        port: 8888,
        proxy: {
            "/webapi": {
                // target: "http://139.9.102.224:3000",
                target: "http://localhost:3000",
                changeOrigun: true
            }
        }
    },
    lintOnSave: false
}
