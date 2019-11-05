const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/element-admin', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const app = express();

app.use('/', express.static('public'));
app.use(express.json());
app.use(cors());

const ArticleSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String }
});
const Article = mongoose.model('Article', ArticleSchema);
const Log = mongoose.model('Log', new mongoose.Schema({ type: Number }));

// 是否允许打印
app.get('/api/log', async function(req, res) {
    const log = await Log.find();
    res.send(log);
});
// 查询文章列表
app.get('/api/articles', async function(req, res) {
    const articles = await Article.find();
    res.send(articles);
});
// 新增文章
app.post('/api/articles', async function(req, res) {
    const article = {
        title: req.body.title,
        body: req.body.body
    };
    await Article.create(article);
    res.send({ returnCode: 1, returnStr: '新增成功!' });
});
// 删除文章
app.delete('/api/articles/:id', async function(req, res) {
    // const article = await Article.findById(req.params.id);
    // await article.remove();

    await Article.findByIdAndRemove(req.params.id);
    res.send({ returnCode: 1, returnStr: '删除成功!' });
});
// 查询单个文章
app.get('/api/articles/:id', async function(req, res) {
    const article = await Article.findById(req.params.id);
    res.send(article);
});
// 修改单个文章
app.put('/api/articles/:id', async function(req, res) {
    await Article.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.title
    });
    res.send({ returnCode: 1, returnStr: '修改成功!' });
});

app.listen(8888);
console.log('server is runing http://localhost:8888/');
