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
