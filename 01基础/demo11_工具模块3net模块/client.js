const net = require("net");
// 链接到指定服务器
let client = net.connect({ port: 8080 }, () => {
  console.log("链接到指定服务器");
});
client.on("data", data => {
  console.log(data.toString());
  //  断开链接
  client.end();
});
client.on("end", () => console.log("断开指定服务器的链接"));
