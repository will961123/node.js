#### express @next

#### 封装 CRUD 通用接口例子

#### inflection 处理单复数转换

-   将路由接口的 categories 去除
-   1 在中间件的路由定义一个用去区别的参数(如：rest))和一个动态的参数(如：resourse)
-   2 让子路由继承父路由参数
-   3 引入 inflection 包处理单复数转换 const ModelName = require('inflection').classify(req.params.resourse)
-   4 在路由中处理动态参数引出对应的模型并使用(如：const Model = require("../../models\${ModelName}") Model.find() )
-   5 为了复用将 3 4 合并封装为中间件 传给 req 使用时(如：req.Model.find())
-   6 前端接口加上用于区别的参数(如：rest)

#### 上传图片

#### 中间件 multer 处理文件

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
