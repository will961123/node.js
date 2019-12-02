const fs = require('fs')

function home(response,params) {
    response.writeHead(200, { "Content-Type": 'text/html' })
    fs.createReadStream(__dirname + '/index.html', 'utf-8').pipe(response)
}
function my(response,params) {
    response.writeHead(200, { "Content-Type": 'text/html' })
    fs.createReadStream(__dirname + '/my.html', 'utf-8').pipe(response)
}
function api(response,params) {
    response.writeHead(200, { "Content-Type": 'application/json' })
    // response.end(JSON.stringify({ name: '李拴蛋', age: 18 }))
    response.end(JSON.stringify(params))
}
module.exports = {
    home, my, api
}