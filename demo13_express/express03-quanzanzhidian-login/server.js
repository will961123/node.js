const express = require('express');
const bcrypt = require('bcrypt'); // 散列
const jwt = require('jsonwebtoken'); // token

const app = express();
const SECRET = '这里传入定义在环境变量或者非代码库中定义的变量';

// 引入模型
const { User } = require('./models');

// 使用中间件
app.use(express.static('public'));
app.use(express.json());

// 查询全部用户
app.get('/api/users', async function(req, res, next) {
    const users = await User.find({});
    res.send(users);
});
// 注册
app.post('/api/register', async function(req, res, next) {
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    });
    res.send(user);
});
// 登录
app.post('/api/login', async function(req, res, next) {
    // 先找到用户
    const user = await User.findOne({
        username: req.body.username
    });
    if (!user) {
        return res.status(422).send({ returnCode: -1, returnStr: '用户不存在!' });
    }
    // 比对密码                                     明文                密文
    const isPasswordVaild = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordVaild) {
        return res.status(422).send({ returnCode: -1, returnStr: '密码错误!' });
    }
    // 生成token
    const token = jwt.sign({ id: String(user._id) }, SECRET);

    res.send({
        user,
        token
    });
});
// 授权验证
// 封装为中间件
const auth = async function(req, res, next) {
    // 加密的token
    const raw = String(req.headers.authorization).split(' ')[1];
    // 解密的token信息
    const tokenData = jwt.verify(raw, SECRET);
    // 绑在req上 
    req.user = await User.findById(tokenData.id);
    next();
};
app.get('/api/profile', auth, async function(req, res, next) {
    res.send(req.user);
});

// 清除User模型全部数据
// User.db.dropCollection('users')

app.listen(8888);
console.log('server is runing prot 8888');
