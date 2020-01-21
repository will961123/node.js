'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Post = use("App/Models/post")



/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts. 查询全部
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    // return await Post.all()
    // return await Post.query().fetch()

    // 分页
    return await Post.query().paginate(1, 2)
  }

  /**
   * Render a form to be used for creating a new post. get方法创建新文章
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new post. post方法创建新文章
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    // 取出客户端提交的部分产生 或者使用all()方法
    // const data = request.only(['title'])
    const data = request.all(['title'])
    // 实例化新的数据
    const model = new Post
    // 填充数据
    model.fill(data)
    // 保存
    await model.save()
    // 返回
    return model
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    return await Post.find(params.id)
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update post details. put 修改文章详情
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    // 取出客户端提交的部分产生 或者使用all()方法
    // const data = request.only(['title'])
    const data = request.all(['title'])
    // 根据id找到数据
    const model = await Post.find(params.id)
    // 合并数据
    model.merge(data)
    // 保存
    await model.save()
    // 返回
    return model
  }

  /**
   * Delete a post with id. 删除单个
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    // 根据id找到数据
    const model = await Post.find(params.id)
    // 删除
    await model.delete()
    return {
      success: true
    }
  }


}

module.exports = PostController
