// 文章表
const mongoose = require('mongoose');
const Category = require('./Category');

const ArticleSchema = new mongoose.Schema(
    {
        categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: Category }],
        title: { type: String },
        body: { type: String }
    },
    // 是否自动生成时间戳
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Article', ArticleSchema);
