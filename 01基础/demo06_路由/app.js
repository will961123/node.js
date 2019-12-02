const fs = require("fs")
const server = require("./server")
const route = require('./route')
const handle = require("./handler")
let handler = {}
handler['/'] = handle.home
handler['/home'] = handle.home
handler['/my'] = handle.my
handler['/api'] = handle.api
server.startServer(route.router,handler)