const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(__dirname + '/uploads'));

// 为app绑定一个变量
app.set('SECRET', '这里传入定义在环境变量或者非代码库中定义的变量');

require('./plugins/db.js')(app);

require('./routers/admin')(app);

app.listen(8888);
console.log('htpp://localhost:8888');
