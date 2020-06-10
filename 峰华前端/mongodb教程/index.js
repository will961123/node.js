/**
 * cmd
 * mongo 链接数据库
 * 添加数据库 use 数据库
 * db 显示当前正在使用的数据库
 */

/**
 * 设计文档模型
 * 添加一条数据
 * db.postCollection.insertOne({})
 * 查询数据
 * db.postCollection.find({title:'vue 入门'})
 * db.postCollection.find({'author.name':'李拴蛋'})
 * 更新数据 updataOne updataMany
 * db.postCollection.updateOne({title:'typeScript 入门'},{$set:{author:{name:"王花花"}}})
 * 删除数据 deleteOne deleteMany
 * db.postCollection.deleteOne({_id:123})
 */
const postOne = {
    title: "mongodb 入门",
    author: {
        name: '李拴蛋',
        avatar: 'https://localhost:8080'
    },
    cretedAt: '2020-06-04',
    content: 'mongodb 是文档为存储结构的数据库',
    comments: [{
        user: '王花花',
        comment: "评论1"
    }, {
        user: '王花花',
        comment: "评论2"
    }]
}
