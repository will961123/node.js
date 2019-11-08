module.exports = options => {
    return function(req, res, next) {
        const inflection = require('inflection');
        // 将小写复数categories 转为大写 Category单数
        const ModelName = inflection.classify(req.params.resource);
        console.log(ModelName + '表');
        req.Model = require(`../models/${ModelName}`);
        next();
    };
};
