// 英雄表
const mongoose = require("mongoose");
// const Category = require('./Category')
const HeroesSchema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  // 属于不同的表 关联前需导入
  // categories: [{ type: mongoose.Schema.ObjectId, ref: Category }],
  // 在数据库引入require-all 就不需要在每个表引入其他表了
  categories: [{ type: mongoose.Schema.ObjectId, ref: "Category" }],
  title: { type: String },
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      description: { type: String },
      tips: { type: String }
    }
  ],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: { type: String }
    }
  ]
});
// 第三个参数是集合的名字 模式是小写+复数的形式 有时候会出错 比如这个 默认是heros  实际上应该是heroes 所以自己指定
module.exports = mongoose.model("Hero", HeroesSchema, "heroes");
