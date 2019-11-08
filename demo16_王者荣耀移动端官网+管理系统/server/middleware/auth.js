module.exports = options => {
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert');
    const AdminUser = require('../models/AdminUser');
    return async function(req, res, next) { 
        // 此时app可以通过从req的挂载上取到
        const SECRET = req.app.get('SECRET');
        const token = String(req.headers.authorization || '')
            .split(' ')
            .pop();
        // 抛出token不存在的异常
        assert(token, 401, { returnCode: -1, returnStr: 'token不存在!' });

        // 解密token
        try {
            const tokenData = jwt.verify(token, SECRET);
            req.user = await AdminUser.findById(tokenData.id);
        } catch (err) {
            assert(false, 401, { returnCode: -1, returnStr: '无效的token!' });
        }

        // 用户不存在抛出异常让后续中间件捕获
        assert(req.user, 401, { returnCode: -1, returnStr: '用户不存在!' });
        next();
    };
};
