module.exports = function(app) {
    const express = require('express');
    const Router = express.Router();

    // 导入表
    const Category = require('../../models/Category');

    /**
     * 接口
     */
    // 新增分类
    Router.post('/categories', async function(req, res) {
        const category = {
            name: req.body.name
        };
        await Category.create(category);
        res.send({
            returnCode: 1,
            returnStr: '新增成功'
        });
    });
    // 查询全部分类
    Router.get('/categories', async function(req, res) {
        const category = await Category.find();
        res.send(category);
    });

    // 使用路由中间件
    app.use('/admin/api', Router);
};
