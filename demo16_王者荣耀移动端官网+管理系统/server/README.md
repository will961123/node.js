#### express @next

#### 封装 CRUD 通用接口例子

#### inflection 包 处理单复数转换

-   将路由接口的 categories 去除
-   1 在中间件的路由定义一个用去区别的参数(如：rest))和一个动态的参数(如：resourse)
-   2 让子路由继承父路由参数
-   3 引入 inflection 包处理单复数转换 const ModelName = require('inflection').classify(req.params.resourse)
-   4 在路由中处理动态参数引出对应的模型并使用(如：const Model = require("../../models\${ModelName}") Model.find() )
-   5 为了复用将 3 4 合并封装为中间件 传给 req 使用时(如：req.Model.find())
-   6 前端接口加上用于区别的参数(如：rest)

#### 上传图片

#### 中间件 multer 包 处理文件

```javascript
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

app.post('/admin/api/upload', upload.single('flie'), async function(req, res) {
    const file = req.file;
    // 拼接上托管的文件夹名字
    const filePath = '/uploads/' + file.filename;
    res.send({
        returnCode: 1,
        returnStr: '上传成功!',
        src: filePath
    });
});

// 前端要访问需配置静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'));
```

#### 连表查询

-   同一张表的情况

```javascript
// 表
const CategorySchema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.Schema.ObjectId, ref: 'Category' }
});
module.exports = mongoose.model('Category', CategorySchema);

// 路由
const queryOptions = {};
queryOptions.populate = 'parent';
const category = await req.Model.find().setOptions(queryOptions);
```

-   不同的表的情况

```javascript
// 表
const Category = require('./Category');
const HeroesSchema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String },
    // 属于不同的表 关联前需导入
    categories: [{ type: mongoose.Schema.ObjectId, ref: Category }]
});
module.exports = mongoose.model('Hero', HeroesSchema);

// 路由
const queryOptions = {};
queryOptions.populate = 'categories';
const category = await req.Model.find().setOptions(queryOptions);

/**
 * 另外一种解决方式
 * npm i require-all
 * 在数据库
 */

require('require-all')(__dirnam + '/../models');
// 这样其他表就不用引用关联表了
categories: [{ type: mongoose.Schema.ObjectId, ref: 'Category' }];
```

#### 散列 引入 bcrypt 包

```javascript
// 加密
const AdminUserSchema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        // 为false的时候 不会被查出来  所以前端不传password这个字段的话不会被修改
        // 如果需要此时还需要查出来密码的话如校验密码 需在查询时加上写上 find().select('+password')
        select: true,
        set(val) {
            return require('bcrypt').hashSync(val, 10);
        }
    }
});
```

#### jsonwebtoken -包 token 生成和解析

```javaScript
// 散列对比和token的生成
app.post('/admin/api/login', async function(req, res) {
        const { username, password } = req.body;
        const AdminUser = require('../../models/AdminUser');
        const bcrypt = require('bcrypt');
        const jwt = require('jsonwebtoken');
        // 1.找到用户
        // 由于在模型中设置了密码不可被查找 所以查询需要这么做
        const user = await AdminUser.findOne({ username: username }).select('+password');
        if (!user || !username) {
            return res.status(422).send({
                returnCode: -1,
                returnStr: '未找到该用户!'
            });
        }
        // 2.比对密码
        const isPasswordVaila = bcrypt.compareSync(password, user.password);
        if (!isPasswordVaila || !password) {
            return res.status(422).send({
                returnCode: -2,
                returnStr: '密码错误!'
            });
        }
        // 3.签名并返回token
        // 签名token   SECRET是在app实例上定义的 app.set('**','**')
        const SECRET = app.get('SECRET');
        const token = jwt.sign({ id: String(user._id) }, SECRET);
        res.send({
            user: {
                username
            },
            token
        });
    });
```

#### 服务端登录校验 jwt 封装中间件处理 token

```javaScript
// 校验token
async function(req, res, next) {
    const token = String(req.headers.authorization || '')
        .split(' ')
        .pop();
    const jwt = require('jsonwebtoken');
    const SECRET = app.get('SECRET');
    // 解密token
    const tokenData = jwt.verify(token, SECRET);
    // 查到用户
    const AdminUser = require('../../models/AdminUser');
    req.user = await AdminUser.findById(tokenData.id);
    console.log(req.user);
    next();
}
```

#### 服务端登录校验 http-assert 包 判断条件是否满足 不满足抛出异常 定义全局处理异常中间件处理异常

```javascript
const assert = require('http-assert');
async function(req, res, next) {
    const token = String(req.headers.authorization || '')
        .split(' ')
        .pop();
    // 抛出token不存在的异常
    assert(token, 401, { returnCode: -1, returnStr: 'token不存在!' });
    const jwt = require('jsonwebtoken');
    const SECRET = app.get('SECRET');
    // 解密token
    const tokenData = jwt.verify(token, SECRET);
    // 查到用户
    const AdminUser = require('../../models/AdminUser');
    req.user = await AdminUser.findById(tokenData.id);
    // 用户不存在抛出异常让后续中间件捕获
    assert(req.user, 401, { returnCode: -1, returnStr: '用户不存在!' });
    next();
};

 // 定义错误处理中间件 4个参数表示错误处理  此中间件要单独拿出来放在接口后
 app.use(async function(err, req, res, next) {
    console.dir(err);
    res.status(err.statusCode || 500).send({
        returnStr: err.returnStr || err.message,
        returnCode: err.returnCode
    });
 });
```

#### 将自定义的中间件统一放到 middleware 文件夹统一管理

```javaScript
// 导出一个函数 函数的返回值是一个函数 使用时可以定义options传入配置
module.exports = options => {
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert');
    const AdminUser = require('../models/AdminUser');
    return async function(req, res, next) {
        // 此时app可以通过从req的挂载上取到
        const SECRET = req.app.get('SECRET');
        const token = String(req.headers.authorization || '')
            .split(' ')
            .pop();
        // 抛出token不存在的异常
        assert(token, 401, { returnCode: -1, returnStr: 'token不存在!' });

        // 解密token
        try {
            const tokenData = jwt.verify(token, SECRET);
            req.user = await AdminUser.findById(tokenData.id);
        } catch (err) {
            assert(false, 401, { returnCode: -1, returnStr: '无效的token!' });
        }

        // 用户不存在抛出异常让后续中间件捕获
        assert(req.user, 401, { returnCode: -1, returnStr: '用户不存在!' });
        next();
    };
};

const authMiddleware = require('../../middleware/auth');

//                                  使用自定义中间件
app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), Router);
```

#### 数据自动加上时间戳

```javaScript
// 在定义数据模型时传入第二个参数即可
const ArticleSchema = new mongoose.Schema(
    {
        categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: Category }],
        title: { type: String },
        body: { type: String }
    },
    // 是否自动生成时间戳
    {
        timestamps: true
    }
);

```

#### 录入数据-（条件查询-打乱-删除-新增）

```javaScript
const Router = require('express').Router();
// 由于我们在db.js 引入了所有的模型 在其他地方引用模型使用相对路径有些麻烦 所以我们可以这样做
const mongoose = require('mongoose');
// 只传入一个参数代表引用
const Article = mongoose.model('Article');
const Category = mongoose.model('Category');

Router.get('/news/init', async function(req, res) {
    // 找到一级分类 新闻分类
    const parent = await Category.findOne({ name: '新闻分类' });
    // 找到新闻分类下的子分类 (公告-活动等) where 条件查询
    const cats = await Category.find().where({parent: parent}).lean();
    // 要录入的数据
    const NewsTitles = [
        '全民赢官方周边',
        '“新文创”下的探索与实践：王者荣耀x越剧文化论坛展开跨界对话',
        '腾讯天美工作室群IP探索新动作，《魂斗罗：归来》联动《终结者》！',
        '皮影婉儿、人偶婉儿、纸雕婉儿、板绘婉儿...你Pick哪一个？',
        '新皮肤爆料丨一个技能三种形态，猜猜这位圣斗士是谁？',
        '11月5日全服不停机更新公告',
        '10月30日全服不停机修复公告',
        '10月30日全服不停机更新公告',
        '亲密度道具使用异常说明',
        '11月8日体验服停机更新公告',
        '告别孤单 浪漫峡谷陪你狂欢 秒杀皮肤限时返场',
        '感恩有你 李白新星元登场 峡谷全新福利来袭',
        '【周年许愿树】活动公告',
        '【周年庆典 明星抽内测】活动公告',
        '极致网速，快乐上分，中国电信邀你畅快赢好礼',
        '双倍积分“通道”再次开启  城市探秘活动邀你竞猜本周入围队伍',
        '佛山“舞狮”助兴  城市赛全国半决赛精彩对抗即将来临！',
        '十校王者少年即将抵达战场, 王者荣耀高校联赛第三周火热备战！',
        '【KPL今日预报】DYG.JC vs EDG.M，DYG.JC目标胜者组',
        '回忆“彩云之滇”上的电竞，王者荣耀城市赛全国大赛圆满落幕！'
    ];
    // 生成加入分类的数组
    const NewsList = NewsTitles.map(title=>{
        // 打乱分类随机取出两个分类
        const RandomCats = cats.slice(0).sort((a,b)=>{
            return Math.random()-0.5
        })
        return {categories: randomCats.slice(0, 2), title: title}
    })
    // 删除数据库文章 以任一条件
    await Article.deleteMany({});
    // 插入文章
    await Article.insertMany(NewsList);
    res.send(NewsList);
 });
```
