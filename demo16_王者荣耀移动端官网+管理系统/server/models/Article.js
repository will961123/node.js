const mongoose = require('mongoose');
const Category = require('./Category');

const ArticleSchema = new mongoose.Schema({
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: Category }],
    title: { type: String },
    body: { type: String }
});

module.exports = mongoose.model('Article', ArticleSchema);
