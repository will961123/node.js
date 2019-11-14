// 广告位表
const mongoose = require('mongoose');
const AdSchema = new mongoose.Schema({
    name: { type: String },
    items: [{ image: { type: String }, url: { type: String } }]
});

module.exports = mongoose.model('Ad', AdSchema);
