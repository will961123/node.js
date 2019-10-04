const express = require('express')


let app = express()

/**
 * 响应和请求
 */

// app.get('/', (request, response) => {
//     response.send('hellow express')
// }).listen(8888)

// app.get('/', (request, response) => {
//     // 发送对象无需JSON.stringfy
//     response.send({ name: '李拴蛋' })
// }).listen(8888)

// app.get('/', (request, response) => {
//     // 也可用json方法发送
//     response.json([{ name: 1 }, { age: 2 }])
// }).listen(8888)

// app.get('/', (requset, response) => {
//     response.send(requset.ip)
// }).listen(8888)

// app.get('/', (requset, response) => {
//     response.send(requset.method)
// }).listen(8888)



/**
 * 路由
 */
// // :id :name 代表路由中不确定的部分 这样可以有无数个路由
// app.get('/home/:id/user/:name', (requset, response) => { 
//     // 获取路由参数
//     console.dir(requset.params);
//     response.send(requset.params.name)
// }).listen(8888)

// ?正则表达式0或1次  
app.get('/ab?cd', (requset, response) => {  
    response.send('ab?cd')
}).listen(8888)

console.log(`server is listen port 8888`);