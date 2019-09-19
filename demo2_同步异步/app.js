const fs = require("fs");

// 同步读取文件
let readMe = fs.readFileSync("readMe.txt", "utf8");
console.log(readMe);
// 同步写入文件
fs.writeFileSync("writeMe.txt", readMe);

// node.js在执行js代码的时候是单线程的 遇到异步代码会首先在事件队列注册事件 等到主线程空闲时 会从事件队列取出 再从线程池中发起一个线程去执行事件

// 异步读取文件 (异步的方法都要加回调函数)
fs.readFile("readMe.txt", "utf8", function(err, data) {
  // 异步写文件
  fs.writeFile('writeMe2.txt',data+'异步',function(err) {
      console.log('异步写入成功');
  })
});

// 下面是个同步代码 会阻塞4s
let waitTill = new Date(new Date().getTime() + 4 * 1000);
while (waitTill>new Date()) {}
console.log('阻塞了4s');
