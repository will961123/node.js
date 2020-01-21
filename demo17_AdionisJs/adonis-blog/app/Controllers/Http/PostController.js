'use strict'

// 模型
const Post = use('App/Models/Post')

class PostController {

    async index({ request, view }) {
        const postsList = await Post.all()
        // return postsList.toJSON()
        return view.render("posts.index", {
            postsList: postsList.toJSON()
        })
    }
    async show({ params, view }) {
        const postDetail = await Post.find(params.id)
        return view.render('posts.show', {
            postDetail: postDetail.toJSON()
        })
    }
}

module.exports = PostController
