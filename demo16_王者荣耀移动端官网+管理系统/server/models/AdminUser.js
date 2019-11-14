// 管理员账号表
const mongoose = require('mongoose');
const AdminUserSchema = new mongoose.Schema({
    username: { type: String }, 
    password: {
        type: String,
        // 为false的时候 不会被查出来  所以前端不传password这个字段的话不会被修改
        // 如果需要此时还需要查出来密码的话如校验密码 需在查询时加上写上 find().select('+password')
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10);
        }
    }
});

module.exports = mongoose.model('AdminUser', AdminUserSchema);
