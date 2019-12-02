const fs = require('fs')
const http = require("http")
const url = require('url')
const querystring = require('querystring')

function startServer(router, handler) {
    function onRequest(request, response) {
        // 获取路由
        let pathName = url.parse(request.url).pathname
        let data = ''
        request.on('error', err => console.error(err)).on('data', chunk => data += chunk).on('end', () => {  
            if (request.method === 'POST') {
                if (data.length > 1e6) {
                    response.connection.destroy()
                }
                // post提交取值
                data = querystring.parse(data)
                router(pathName, handler, response, data)
            } else {
                // get提交取值
                let params = url.parse(request.url, true).query
                router(pathName, handler, response, params)
            }

        })
    }
    let server = http.createServer(onRequest)
    server.listen(8888)
    console.log(`server is listen on 8888`);
}
module.exports = { startServer }