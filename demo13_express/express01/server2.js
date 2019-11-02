const express = require('express');
let app = express();
/**
 * 中间件
 */
// // 使用内置中间件 http://localhost:8888/user/express1.gif
// app.use('/user', express.static('public'));
// // 模拟中间件
// app.use(function(req, res, next) {
//     console.log('第一个中间件');
//     next();
//     console.log('中间件走完才打印我');
// });
// app.use('/home', function(req, res, next) {
//     console.log('第二个中间件');
//     // next();
//     res.send('ok');
// });
// // app.get('/', function(req, res, next) {
// //     res.send('ok');
// // });

/**
 * 路由中间件 
 */
// 直接在一个js定义全部路由不利于维护  在routes中分别定义路由 
let indexRouter = require("./routes/index.js")
let usersRouter = require("./routes/users.js")
app.use("/",indexRouter)
app.use("/users",usersRouter)

app.listen(8888)
console.log('server is runing 8888');
