const fs = require('fs')
const http = require("http")

function startServer(router, handler) {
    function onRequest(request, response) {
        router(request.url, handler,response) 
    }
    let server = http.createServer(onRequest)
    server.listen(8888)
    console.log(`server is listen on 8888`);
}
module.exports = { startServer }