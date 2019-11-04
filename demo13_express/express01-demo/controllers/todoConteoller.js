let data = [{ item: '吃' }, { item: '喝' }, { item: '玩' }];

let bodyParser = require('body-parser');

let mongoose = require('mongoose'); // 操作数据库的包

mongoose.connect('mongodb://hfpp2012:hfpp2012@ds151068.mlab.com:51068/todos'); //链接数据库
// 定义数据库模型
let todoSchema = new mongoose.Schema({
    item: String
});
let Todo = mongoose.model('Todo', todoSchema);
// // 添加一条数据
// let itemOne = Todo({item:'吃'}).save(function(err){
//     if(err) {throw err};
//     console.log('item saved');
// })

let urlencodedParser = bodyParser.urlencoded({ extended: false });

let todoControll = function(app) {
    app.get('/todo', function(req, res) {
        // // 将页面渲染到/todo
        // res.render('todo', { todos: data });

        // 查询数据库
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });
    app.post('/todo', urlencodedParser, function(req, res) {
        // data.push(req.body);
        // res.json(data);

        // 向数据库添加一条数据
        let itemOne = Todo(req.body).save(function(err) {
            if (err) throw err;
            res.json(data);
            console.log('item saved');
        });
    });
    app.delete('/todo/:item', function(req, res) {
        // data = data.filter(function(todo, idx) {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);

        // 向数据库移除一条数据
        Todo.find({item:req.params.item.replace(/-/g," ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
            console.log('item delect');
        })
    });
};

module.exports = todoControll;
