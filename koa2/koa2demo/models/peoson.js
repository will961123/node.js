const mongoose = require('mongoose')
const perosonSchema = new mongoose.Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model("Person", perosonSchema)