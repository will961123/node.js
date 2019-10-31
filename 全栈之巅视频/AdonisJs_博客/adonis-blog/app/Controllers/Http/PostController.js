'use strict'

class PostController {
    index ({request}){
        return 'posts ' + request.input('page')
    }
    show ({params}){
        return 'posts ' + params.id
    }
}

module.exports = PostController
