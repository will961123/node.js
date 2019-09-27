let http = require("http");
let url = require("url");

function start(route) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;
    console.log("Requset for" + pathname + "received");
    route(pathname)
    response.writeHead(200,{'Content-Type':"text/Plain"})
    response.write("hellow world")
    response.end()
  }
  http.createServer(onRequest).listen(8888)
  console.log('Server hsa Start 8888');
}

exports.start = start;
