const express = require('express');

let app = express();

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
 * 路由 路由参数
 */
// // :id :name 代表路由中不确定的部分 这样可以有无数个路由
// app.get('/home/:id/user/:name', (requset, response) => {
//     // 获取路由参数
//     console.dir(requset.params);
//     response.send(requset.params.name)
// }).listen(8888)

// ?正则表达式0或1次
// app.get('/ab?cd', (requset, response) => {
//     response.send('ab?cd')
// }).listen(8888)

/**
 * 查询字符串 （get）
 */

// app.get("/",function(req, res) {
//     console.dir(req.query)
//     res.send('query 传参'+req.query.a)
// }).listen(8888)

/**
 * post 请求 表单上传
 * postman工具(浏览器插件 模拟post请求)
 * npm i body-parser (包)
 */
const bodyParser = require('body-parser');
// 使用一个中间件
// 处理urlencoded请求
// app.use(bodyParser.urlencoded({extended: false}))
// 处理json请求
// app.use(bodyParser.json())

// app.post("/",function(req, res, next) {
//     // post 的提交数据在body里面
//     console.dir(req.body)
//     res.send(req.body.name)
// }).listen(8888)

// 既处理urlencoded又处理json
// let urlencodedParser = bodyParser.urlencoded({extended: false})
// let jsonParser = bodyParser.json()
// app.post("/",urlencodedParser,function(req, res, next) {
//     console.dir(req.body)
//     res.send(req.body.name)
// })
// app.post("/upload",jsonParser,function(req, res, next) {
//     console.dir(req.body)
//     res.send(req.body.name)
// })
// app.listen(8888)

/**
 * post 请求 文件上传
 * npm i multer (包)
 */

// 先读取表单
const fs = require('fs');
const multer = require('multer');
app.get('/form', function(req, res) {
    let form = fs.readFileSync('./form.html', { encoding: 'utf8' });
    res.send(form);
}).listen(8888);

// //  1.                      指定上传目录
// let upload = multer({ dest: 'uploads/' });
// // 点击提交进入post方法
// //                          input的name值
// app.post('/upload', upload.single('logo'), function(req, res) {
//     res.send({ returnCode: 1, returnStr: '上传成功!' });
// });

// 2. 自定义上传目录
let createFolder = function(folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
let uploadFolder = './upload/';
createFolder(uploadFolder);
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
let upload = multer({ storage: storage });
// 点击提交进入post方法
//                          input的name值
app.post('/upload', upload.single('logo'), function(req, res) {
    res.send({ returnCode: 1, returnStr: '上传成功!' });
});

console.log(`server is listen port 8888`);
