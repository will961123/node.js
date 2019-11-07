const mongoose = require('mongoose');
const AdminUserSchema = new mongoose.Schema({
    username: { type: String }, 
    password: {
        type: String,
        // 为false的时候 不会被查出来  所以前端不传password这个字段的话不会被修改
        select: true,
        set(val) {
            return require('bcrypt').hashSync(val, 10);
        }
    }
});

module.exports = mongoose.model('AdminUser', AdminUserSchema);
