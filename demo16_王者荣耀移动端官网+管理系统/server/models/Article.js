const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String }
});

module.exports = mongoose.model('Article', ArticleSchema);
