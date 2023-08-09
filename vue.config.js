module.exports = {
    devServer: {
        port: 8888,
        proxy: {
            "/webapi": {
                // target: "http://8.130.52.196:3000",
                target: "http://localhost:3000",
                changeOrigun: true
            }
        }
    },
    lintOnSave: false
}
