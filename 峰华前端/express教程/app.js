const express = require('express')
const app = express()
const port = 8080
const routes = require("./routes")
app.use(express.json()) 

routes(app)

app.listen(port,()=>{
    console.log(`express server listening at http://localhost:${port}`);
})