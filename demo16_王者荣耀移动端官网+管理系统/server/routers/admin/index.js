// module.exports = function(app) {
//     const express = require('express');
//     const Router = express.Router();

//     // 导入分类模型
//     const Category = require('../../models/Category');

//     /**
//      * 接口
//      */
//     // 新增分类
//     Router.post('/categories', async function(req, res) {
//         const category = {
//             name: req.body.name,
//             parent: req.body.parent
//         };
//         await Category.create(category);
//         res.send({
//             returnCode: 1,
//             returnStr: '新增成功!'
//         });
//     });
//     // 查询全部分类
//     Router.get('/categories', async function(req, res) {
//         // const category = await Category.find().limit(10);
//         // 将关联信息查出来
//         const category = await Category.find()
//             .populate('parent')
//             .limit(10);
//         res.send({
//             list: category,
//             returnCode: 1,
//             returnStr: '查询全部成功!'
//         });
//     });
//     // 查询单个分类
//     Router.get('/categories/:id', async function(req, res) {
//         const category = await Category.findById(req.params.id);
//         res.send({
//             list: category,
//             returnCode: 1,
//             returnStr: '查询单个成功!'
//         });
//     });
//     // 修改单个分类
//     Router.put('/categories/:id', async function(req, res) {
//         await Category.findByIdAndUpdate(req.params.id, {
//             name: req.body.name,
//             parent: req.body.parent
//         });
//         res.send({
//             returnCode: 1,
//             returnStr: '修改成功!'
//         });
//     });
//     // 删除单个分类
//     Router.delete('/categories/:id', async function(req, res) {
//         await Category.findByIdAndDelete(req.params.id);
//         res.send({
//             returnCode: 1,
//             returnStr: '删除成功!'
//         });
//     });

//     // 使用路由中间件
//     app.use('/admin/api', Router);
// };

/**
 * 封装CRUD通用接口
 *
 * 将接口的categories去除
 * 1 在中间件的路由定义一个用去区别的参数(如：rest))和一个动态的参数(如：resourse)
 * 2 让子路由继承父路由参数
 * 3 引入inflection包处理单复数转换 const ModelName = require('inflection').classify(req.params.resourse)
 * 4 在路由中处理动态参数引出对应的模型并使用(如：const Model = require("../../models${ModelName}") Model.find() )
 * 5 为了复用将3 4 合并封装为中间件 传给req 使用时(如：req.Model.find())
 * 6 前端接口加上用于区别的参数(如：rest)
 */

module.exports = function(app) {
    const express = require('express');
    // 合并路由参数才能在路由中取出 让子路由继承父路由的参数
    const Router = express.Router({
        mergeParams: true
    });
    const assert = require('http-assert');

    // 导入分类模型 需要在路由中动态导入了
    // const Category = require('../../models/Category');

    /**
     * 接口
     */
    // 新增分类
    Router.post('/', async function(req, res) {
        await req.Model.create(req.body);
        res.send({
            returnCode: 1,
            returnStr: '新增成功!'
        });
    });
    // 查询全部分类
    Router.get('/', async function(req, res) {
        // 将小写复数categories 转为大写 Category单数
        // const ModelName = require("inflection").classify(req.params.resource)
        // const Model =require(`../../models/${ModelName}`)
        // 为了复用 把引入模型封装为中间件

        // const category = await Model.find().limit(10);
        // 将关联信息查出来
        // const category = await req.Model.find().populate('parent').limit(10);

        // 封装CRUD后对联查做出处理
        const queryOptions = {};
        // 判断分类模型的名字（表的名字）
        if (req.Model.modelName === 'Category') {
            // 需要联查的表才联查
            queryOptions.populate = 'parent';
        } else if (req.Model.modelName === 'Hero') {
            queryOptions.populate = 'categories';
        } else if (req.Model.modelName === 'Article') {
            queryOptions.populate = 'categories';
        }
        const category = await req.Model.find()
            .setOptions(queryOptions)
            .limit(10);
        res.send({
            list: category,
            returnCode: 1,
            returnStr: '查询全部成功!'
        });
    });
    // 查询单个分类
    Router.get('/:id', async function(req, res) {
        const category = await req.Model.findById(req.params.id);
        res.send({
            list: category,
            returnCode: 1,
            returnStr: '查询单个成功!'
        });
    });
    // 修改单个分类
    Router.put('/:id', async function(req, res) {
        await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            returnCode: 1,
            returnStr: '修改成功!'
        });
    });
    // 删除单个分类
    Router.delete('/:id', async function(req, res) {
        await req.Model.findByIdAndDelete(req.params.id);
        res.send({
            returnCode: 1,
            returnStr: '删除成功!'
        });
    });

    /**
     *
     * 中间件相关
     */
    // 使用路由中间件
    // app.use('/admin/api', Router);

    //                          匹配动态参数
    // app.use('/admin/api/rest/:resource', Router);

    // 封装校验登录权限中间件
    // const authMiddleware = async function(req, res, next) {
    //     const token = String(req.headers.authorization || '')
    //         .split(' ')
    //         .pop();
    //     // 抛出token不存在的异常
    //     assert(token, 401, { returnCode: -1, returnStr: 'token不存在!' });
    //     const jwt = require('jsonwebtoken');
    //     const SECRET = app.get('SECRET');
    //     // 解密token
    //     const tokenData = jwt.verify(token, SECRET);
    //     // 查到用户
    //     const AdminUser = require('../../models/AdminUser');
    //     req.user = await AdminUser.findById(tokenData.id);
    //     // 用户不存在抛出异常让后续中间件捕获
    //     assert(req.user, 401, { returnCode: -1, returnStr: '用户不存在!' });
    //     next();
    // };
    const authMiddleware = require('../../middleware/auth');

    // 封装获取模型中间件（处理单复数）
    // const resourceMiddleware = function(req, res, next) {
    //     // 将小写复数categories 转为大写 Category单数
    //     const ModelName = require('inflection').classify(req.params.resource);
    //     console.log(ModelName + '表');
    //     req.Model = require(`../../models/${ModelName}`);
    //     next();
    // };
    const resourceMiddleware = require('../../middleware/resource');

    //                                  使用自定义中间件
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), Router);

    /**
     * 上传图片
     * 引入multer中间件处理文件
     */
    const multer = require('multer');

    // 指定上传目录 不对文件做出处理
    // const upload = multer({ dest: __dirname + '/../../uploads' });

    // 指定上传目录 对文件做出处理
    const fs = require('fs');
    let createFolder = function(folder) {
        try {
            fs.accessSync(folder);
        } catch (e) {
            fs.mkdirSync(folder);
        }
    };
    let uploadFolder = __dirname + '/../../uploads';
    createFolder(uploadFolder);
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, uploadFolder);
        },
        filename: function(req, file, cb) {
            // 对文件做出处理
            cb(null, Date.now() + file.originalname);
        }
    });
    const upload = multer({ storage: storage });

    // 上传图片接口
    app.post('/admin/api/upload', authMiddleware, upload.single('file'), async function(
        req,
        res
    ) {
        const file = req.file;
        // 拼接上托管的文件夹名字
        const filePath = '/uploads/' + file.filename;
        res.send({
            returnCode: 1,
            returnStr: '上传成功!',
            src: filePath
        });
    });
    // 后台用户登录接口
    app.post('/admin/api/login', async function(req, res) {
        const { username = '', password = '' } = req.body;
        const AdminUser = require('../../models/AdminUser');
        const bcrypt = require('bcrypt');
        const jwt = require('jsonwebtoken');
        // 1.找到用户
        // 由于在模型中设置了密码不可被查找 所以查询需要这么做
        const user = await AdminUser.findOne({ username: username }).select('+password');
        // if (!user || !username) {
        //     return res.status(422).send({
        //         returnCode: -1,
        //         returnStr: '未找到该用户!'
        //     });
        // }
        // 引入包后抛出异常让后续中间件处理异常
        assert(user && username, 422, { returnStr: '未找到该用户', returnCode: -1 });

        // 2.比对密码
        const isPasswordVaila = bcrypt.compareSync(password, user.password);
        // if (!isPasswordVaila || !password) {
        //     return res.status(422).send({
        //         returnCode: -2,
        //         returnStr: '密码错误!'
        //     });
        // }
        assert(isPasswordVaila && password, 422, {
            returnStr: '密码错误',
            returnCode: -2
        });

        // 3.签名并返回token
        // 签名token   SECRET是在app实例上定义的 app.set('**','**')
        const SECRET = app.get('SECRET');
        const token = jwt.sign({ id: String(user._id) }, SECRET);
        res.send({
            returnCode: 1,
            returnStr: '登陆成功!',
            user: {
                username
            },
            token
        });
    });

    // 定义错误处理中间件 4个参数表示错误处理  此中间件要单独拿出来放在接口后
    app.use(async function(err, req, res, next) {
        // console.dir(err);
        res.status(err.statusCode || 500).send({
            returnStr: err.returnStr || err.message,
            returnCode: err.returnCode
        });
    });
};
