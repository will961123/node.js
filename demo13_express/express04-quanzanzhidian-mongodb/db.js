const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-relation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 定义分类模型
const CategorySchema = new mongoose.Schema(
    { name: { type: String } },
    // tojson 时是否将虚拟字段加入
    { toJSON: { virtuals: true } }
);
// 为分类模型定义虚拟字段
CategorySchema.virtual('posts', {
    // 参考的数据模型来源
    ref: 'Post',
    // 本地键 哪一个本地键关联外面的键
    localField: '_id',
    // 外键 Post里面哪一个键关联本地键
    foreignField: 'categories',
    // 是否只有一个数据
    justOne: false
});
const Category = mongoose.model('Category', CategorySchema);

// 定义贴子模型
const PostSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    // 绑定单一归属 属于Category模型
    category: { type: mongoose.SchemaTypes.ObjectId, ref: Category },
    // 一篇文章有多个归属 属于Category模型
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: Category }]
});
const Post = mongoose.model('Post', PostSchema);

async function main() {
    // await Category.insertMany([{ name: 'NodeJs' }, { name: 'VueJs' }]);
    // await Post.insertMany([{ title:'第一篇文章',body:'内容1'},{ title:'第二篇文章',body:'内容2'}])

    const post1 = await Post.findOne({ title: '第一篇文章' });
    const post2 = await Post.findOne({ title: '第二篇文章' });
    const category1 = await Category.findOne({ name: 'NodeJs' });
    const category2 = await Category.findOne({ name: 'VueJs' });
    // 设置单一关联
    post1.category = category1._id;
    post2.category = category1._id;
    // 设置多个关联
    post1.categories = [category1._id, category2._id];
    post2.categories = [category2._id];
    await post1.save();
    await post2.save();

    // 只是将贴子信息查出来
    // const posts = await Post.find();

    //  将关联信息查出来
    // const posts = await Post.find().populate('category'); // 属于一个分类的情况
    // const posts = await Post.find().populate('categories');// 属于多个分类的情况

    // 根据分类查询文章                     传入的是虚拟字段
    const posts = await Category.find().populate('posts');
    // 虚拟字段查出的数据不会直接显示
    // console.log(posts[1].posts);
    // 在Schema传入{ toJSON: { virtuals: true } } 调用JSON.stringify 会将虚拟字段加入
    console.log(JSON.stringify(posts));

    // 调用lean()也可以查看虚拟字段
    // const posts = await Category.find().populate('posts').lean(); 
    // console.log(posts[0]);
}
main();
