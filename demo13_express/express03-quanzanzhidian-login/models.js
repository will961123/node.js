const mongoose = require('mongoose');
const bcrypt = require('bcrypt');// 散列

mongoose.set("useCreateIndex", true);
mongoose.connect('mongodb://localhost:27017/express-login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 定义一个用户模型              sikeima
const UserSchema = new mongoose.Schema({
    // unique: true 设定为唯一键 需在连接数据库set useCreateIndex true
    username: { type: String, unique: true },
    // 散列  加密
    password: { type: String, set(val) {
        return bcrypt.hashSync(val,10)
    } }
});
const User = mongoose.model('User', UserSchema);

module.exports = { User };
