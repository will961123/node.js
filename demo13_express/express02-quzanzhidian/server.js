const express = require('express');
const app = express();
const cors = require('cors'); // 解决跨域
const mongoose = require('mongoose'); // 操作数据库
// 链接数据库
mongoose.connect('mongodb://localhost:27017/express-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// 定义模型
const Product = mongoose.model(
    'Product',
    new mongoose.Schema({
        title: String
    })
);
// 测试向数据库插入多条数据
// Product.insertMany([{ title: '产品1' }, { title: '产品2' }, { title: '产品3' }]);

// 使用中间件
app.use('/', express.static('public'));
app.use(cors());
app.use(express.json()) //处理传来的json数据

app.get('/', function(req, res) {
    res.send('home');
});
// 查询列表
app.get('/products', async function(req, res) {
    // find 查询Product模型的数据 skip 跳过几个 limit 限制条数 结合起来是分页
    // const data = await Product.find().skip(3).limit(3)

    // where 传入条件
    // const data = await Product.find().where({
    //     title:"产品4"
    // }) 

    // sort 排序 1正序 -1负序
    const data = await Product.find().sort({
        _id:-1
    }) 

    res.send(data);
});
// 查询详情
app.get("/products/:id",async function(req, res) { 
    const data = await Product.findById(req.params.id)

    res.send(data)
})

/**
 * REST Client vscode 插件 模拟发送请求
 */
// 新增商品
app.post("/products",async function(req, res) { 
    const data = req.body
    const product = await Product.create(data)
    res.send(product)
})

// 修改商品
app.put("/products/:id",async function(req, res) {
    // 先找到商品
    const product = await Product.findById(req.params.id)
    // 修改商品
    product.title = req.body.title
    // 保存修改
    await product.save()
    res.send(product)
})
// 删除商品
app.delete("/products/:id",async function(req, res) {
    const product = await Product.findById(req.params.id)
    await product.remove()
    res.send({returnCode:1,returnStr:'删除成功!'})
})



app.listen(8888);
console.log('sercer is runing prot 8888');
