const MongoClient = require("mongodb").MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'fh-blog'
let _db = null

async function connectDb() {
    if (!_db) {
        try {
            const client = new MongoClient(url,{useUnifiedTopology:true})
            await client.connect()
            _db = await client.db(dbName)
        }
        catch (e) {
            throw new Error('数据库连接失败')
        }

    }
    return _db
}

function getCollection(collection) {
    let _collection = null
    return async () => {
        try {
            if (!_collection) {
                const db = await connectDb()
                _collection = await db.collection(collection)
            }
        }
        catch (e) {
            throw new Error('获取集合失败')
        }

        return _collection
    }
}

module.exports.getCollection = getCollection