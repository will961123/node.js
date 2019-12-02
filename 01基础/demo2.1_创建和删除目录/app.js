const fs = require("fs");
// 同步创建文件
fs.writeFileSync("hellow.tet", "你好");
// 异步删除文件
fs.unlink("hellow.tet", function(err) {
  console.log("异步删除成功");
});
// 同步创建文件夹
fs.mkdirSync("你好");
let waitTime = new Date(new Date().getTime() + 1000 * 2);
while (waitTime > new Date()) {}
fs.rmdirSync("你好");

fs.mkdir("copy", function() {
  fs.readFile("app.js", "utf8", function(err, data) {
    fs.writeFile("./copy/copy.js", data, function() {
        console.log('复制完毕');
    });
  });
});
