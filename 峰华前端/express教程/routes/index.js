const post = require("./post")
const category = require("./category")
module.exports = (app)=>{
    app.use("/post",post)
    app.use("/category",category)
}