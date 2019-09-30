const http = require("http");
const url = require("url");
const querystring = require("querystring");
const util = require("util");

/**
 * 获取GET请求内容
 * url 模块中的 parse 函数提供了解析？后面的内容作为GET请求的参数的功能
 */
// 获取GET请求内容
http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(util.inspect(url.parse(req.url, true)));
  })
  .listen(8887);
//  获取 URL 的参数
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    let params = url.parse(request.url, true).query;
    response.write("网站名:" + params.name);
    response.write("\n");
    response.write("url:" + params.url);
    response.end();
  })
  .listen(8888);
// 访问 http://localhost:8888/user?name=谷歌&url=www.google.com

/**
 * 获取 POST 请求内容
 * POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
 * 比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，
 * 所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
 */

http
  .createServer((request, response) => {
    // 定义了一个post变量，用于暂存请求体的信息
    let post = "";
    // 通过request的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    request.on("data", chunk => {
      post += chunk;
    });
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    request.on("end", () => {
      post = querystring.parse(post);
      response.end(util.inspect(post));
    });
  })
  .listen(8889);

var postHTML =
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  "<body>" +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  "</form>" +
  "</body></html>";

http
  .createServer((request, response) => {
    let body = "";
    request.on("data", chunk => {
      body += chunk;
    });
    request.on("end", () => {
      // 解析参数
      body = querystring.parse(body);
      // 设置响应头部信息及编码
      response.writeHead(200, { "content-Type": "text/html;charset=utf-8" });
      // 输出提交的数据
      if (body.name && body.url) {
        response.write("网站名" + body.name);
        response.write("</br>");
        response.write("url" + body.url);
        response.end();
      }
      // 输出表单
      else {
        response.write(postHTML);
      }
    });
  })
  .listen(8890);
