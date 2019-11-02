'use strict';
const Post = use('App/Models/Post');
class PostController {
  async index({ request }) {
    await Post.create({
        title:'1'
    });
    return await Post.all();
  }
  show({ params }) {
    return 'posts ' + params.id;
  }
}

module.exports = PostController;
