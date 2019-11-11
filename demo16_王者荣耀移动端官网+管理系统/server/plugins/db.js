module.exports = function(app) {
    const mongoose = require('mongoose'); 
    mongoose.connect('mongodb://localhost:27017/node-vue-moba',{ 
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
 
    // 在a模型里面查找关联的b模型 需要引入b模型 我们可以在数据库直接把所有模型引入
    // npm i require-all 
    require('require-all')(__dirname+'/../models')
};
