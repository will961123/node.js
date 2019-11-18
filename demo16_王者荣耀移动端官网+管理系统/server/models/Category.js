// 分类表
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String },
  // 设置关联
  parent: { type: mongoose.Schema.ObjectId, ref: "Category" }
});

// 定义虚拟字段
CategorySchema.virtual("children", {
  //这个虚拟字段的作用 查出来与这个 _id 关联的分类
  // 本地键
  localField: "_id",
  // 外键
  foreignField: "parent",
  justOne: false,
  ref: "Category"
});
CategorySchema.virtual("newsList", {
  // 这个虚拟字段的作用查出来与这个 _id 关联的文章
  // 本地键
  localField: "_id",
  // 外键
  foreignField: "categories",
  justOne: false,
  ref: "Article"
});
CategorySchema.virtual("heroList", {
  // 这个虚拟字段的作用查出来与这个 _id 关联的英雄
  // 本地键
  localField: "_id",
  // 外键
  foreignField: "categories",
  justOne: false,
  ref: "Hero"
});

module.exports = mongoose.model("Category", CategorySchema);
