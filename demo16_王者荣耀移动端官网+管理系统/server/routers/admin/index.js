module.exports = function(app) {
    const express = require('express');
    const Router = express.Router();

    // 导入分类表
    const Category = require('../../models/Category');

    /**
     * 接口
     */
    // 新增分类
    Router.post('/categories', async function(req, res) {
        const category = {
            name: req.body.name,
            parent: req.body.parent
        };
        await Category.create(category);
        res.send({
            returnCode: 1,
            returnStr: '新增成功!'
        });
    });
    // 查询全部分类
    Router.get('/categories', async function(req, res) {
        // const category = await Category.find().limit(10);
        // 将关联信息查出来
        const category = await Category.find()
            .populate('parent')
            .limit(10);
        res.send({
            list: category,
            returnCode: 1,
            returnStr: '查询全部成功!'
        });
    });
    // 查询单个分类
    Router.get('/categories/:id', async function(req, res) {
        const category = await Category.findById(req.params.id);
        res.send({
            list: category,
            returnCode: 1,
            returnStr: '查询单个成功!'
        });
    });
    // 修改单个分类
    Router.put('/categories/:id', async function(req, res) {
        await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            parent: req.body.parent
        });
        res.send({
            returnCode: 1,
            returnStr: '修改成功!'
        });
    });
    // 删除单个分类
    Router.delete('/categories/:id', async function(req, res) {
        await Category.findByIdAndDelete(req.params.id);
        res.send({
            returnCode: 1,
            returnStr: '删除成功!'
        });
    });

    // 使用路由中间件
    app.use('/admin/api', Router);
};
