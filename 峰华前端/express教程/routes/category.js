const express = require('express')
const route = express.Router()
route.get("/", (req, res) => {
    res.send({
        str: '查询全部分类',
        list: []
    })
})
route.post("/", (req, res) => {
    res.status(201).send({
        str: '保存分类',
        ...req.body
    })
})
route.put("/:id", (req, res) => {
    res.status(201).send({
        str: '更新分类',
        id: req.params.id,
        ...req.body
    })
})
route.delete("/:id", (req, res) => {
    res.status(201).send({
        str: '删除分类',
        id: req.params.id, 
    })
})

module.exports = route