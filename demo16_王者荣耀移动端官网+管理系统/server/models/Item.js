// 物品表
const mongoose = require('mongoose');
const ItemsSchema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String }
});

module.exports = mongoose.model('Item', ItemsSchema);
