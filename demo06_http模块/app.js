const http = require("http");
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("hellow world");
    response.end();
  })
  .listeners(8888);
