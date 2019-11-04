let express = require('express');
let app = express();
let todoControll = require('./controllers/todoConteoller');

// 设置模板引擎
app.set('view engine', 'ejs');

// 使用内置中间件
app.use(express.static('./public'));

todoControll(app);

app.listen(8888);
console.log('server runing port 8888');
