const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String },
    // 设置关联
    parent: { type: mongoose.Schema.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Category', CategorySchema);
