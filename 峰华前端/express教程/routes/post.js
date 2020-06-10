const express = require('express')
const route = express.Router()

// 引入文章模型
const postModel = require("../models/post")

route.get("/", async (req, res) => {
    try {
        const postList = await postModel.selectAll()
        res.json({
            str: '查询全部文章',
            postList
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send()
    }

})
route.post("/", async (req, res) => {
    try {
        console.log(req.body);

        const newPost = await postModel.save(req.body)
        res.status(201).json({
            str: '保存文章',
            newPost
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send()
    }

})
route.put("/:id", async (req, res) => {
    try {
        const result = await postModel.update(req.params.id, req.body)
        res.status(201).json({
            str: '更新文章',
            result
        })
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }

})
route.delete("/:id",async (req, res) => {
    try {
        const result = await postModel.deletePost(req.params.id)
        res.status(201).json({
            str: '删除文章',
            result
        })
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }

})
route.delete("/:id/common",async (req, res) => {
    try {
        const result = await postModel.deleteCommonByUser(req.params.id,req.body.user)
        res.status(201).json({
            str: '删除评论',
            result
        })
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }

})

module.exports = route