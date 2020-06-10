const postCollection = require('../config/mongoDbConnection').getCollection("postCollection")
const { ObjectId } = require("mongodb")
async function save(post) {
    try {
        // 调用获取文章集合的方法
        const collection = await postCollection()
        // 插入文章并返回集合列表
        const result = await collection.insertOne(post)
        return result.ops && result.ops[0]
    }
    catch (err) {
        throw '保存文章失败'
    }
}
async function selectAll() {
    try {
        const collection = await postCollection()
        const result = await collection.find({}).toArray()
        return result
    } catch (err) {
        throw '查询文章失败'
    }
}
async function update(id, post) {
    try {
        const collection = await postCollection()
        const result = await collection.findOneAndUpdate({ _id: ObjectId(id) }, { $set: post }, { returnOriginal: false })
        return result.value
    } catch (err) {
        throw '更新文章失败'
    }
}
async function deletePost(id) {
    try {
        const collection = await postCollection()
        await collection.deleteOne({ _id: ObjectId(id) })
        return 'ok'
    } catch (err) {
        throw '删除文章失败'
    }
}
async function deleteCommonByUser(id, user) {
    try {
        const collection = await postCollection()
        // $pull 删除数组中的元素
        await collection.updateOne({ _id: ObjectId(id) }, { $pull: { comments: { user } } })
        return 'ok'
    } catch (err) {
        throw '删除文章失败'
    }
}
module.exports = { save, selectAll, update, deletePost, deleteCommonByUser }  