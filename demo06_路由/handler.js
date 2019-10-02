const fs = require('fs')

function home(response) {
    response.writeHead(200, { "Content-Type": 'text/html' })
    fs.createReadStream(__dirname + '/home.html', 'utf-8').pipe(response)
}
function my(response) {
    response.writeHead(200, { "Content-Type": 'text/html' })
    fs.createReadStream(__dirname + '/my.html', 'utf-8').pipe(response)
}
function api(response) {
    response.writeHead(200, { "Content-Type": 'application/json' })
    response.end(JSON.stringify({ name: '李拴蛋', age: 18 }))
}
module.exports = {
    home, my, api
}