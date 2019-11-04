const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/element-admin', {
    useNewUrlParser: true,
    useFindAndModify: true,
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

app.get('/api', async function(req, res) {
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
    res.send(article);
});

app.listen(8888);
console.log('server is runing http://localhost:8888/');
