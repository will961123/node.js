const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));
// 后台管理页面地址
app.use("/admin", express.static(__dirname + "/public/admin"));
// 移动端页面地址
app.use("/", express.static(__dirname + "/public/web"));

// 为app绑定一个变量
app.set("SECRET", "这里传入定义在环境变量或者非代码库中定义的变量");

require("./plugins/db.js")(app);

require("./routers/admin")(app);

require("./routers/web")(app);

app.listen(8888);
console.log("http://localhost:8888");
