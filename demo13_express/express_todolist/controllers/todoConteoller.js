let data = [{ item: '吃' }, { item: '喝' }, { item: '玩' }];
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let todoControll = function(app) {
    app.get('/todo', function(req, res) {
        // 将页面渲染到/todo
        res.render('todo', { todos: data });
    });
    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body);
        res.json(data);
    });
    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo, idx) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data)
    });
};

module.exports = todoControll;
