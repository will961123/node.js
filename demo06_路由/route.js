const fs = require('fs')

function router(pathName, handle, response) {
    console.log(`路由${pathName}`);
    if (typeof handle[pathName] === 'function') {
        handle[pathName](response)
    } else {
        response.writeHead(200, { "Content-Type": 'text/html' })
        fs.createReadStream(__dirname + '/404.html', 'utf-8').pipe(response)
    }
}
module.exports = { router }