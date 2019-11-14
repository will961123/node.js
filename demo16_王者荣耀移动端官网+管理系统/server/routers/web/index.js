module.exports = function(app) {
  const Router = require("express").Router();

  // 引用模型 相对路径太麻烦
  // const Article = require('../../models/Article')
  // 因为我们在db.js 使用require-all 了 所以我们可以这样
  const mongoose = require("mongoose");
  const Article = mongoose.model("Article");
  const Category = mongoose.model("Category");
  Router.get("/news/init", async function(req, res) {
    // 找到一级分类 新闻分类
    const parent = await Category.findOne({ name: "新闻分类" });
    // 找到新闻分类下的子分类
    const cats = await Category.find()
      .where({
        parent: parent
      })
      .lean();
    const NewsTirles = [
      "全民赢官方周边",
      "“新文创”下的探索与实践：王者荣耀x越剧文化论坛展开跨界对话",
      "腾讯天美工作室群IP探索新动作，《魂斗罗：归来》联动《终结者》！",
      "皮影婉儿、人偶婉儿、纸雕婉儿、板绘婉儿...你Pick哪一个？",
      "新皮肤爆料丨一个技能三种形态，猜猜这位圣斗士是谁？",
      "11月5日全服不停机更新公告",
      "10月30日全服不停机修复公告",
      "10月30日全服不停机更新公告",
      "亲密度道具使用异常说明",
      "11月8日体验服停机更新公告",
      "告别孤单 浪漫峡谷陪你狂欢 秒杀皮肤限时返场",
      "感恩有你 李白新星元登场 峡谷全新福利来袭",
      "【周年许愿树】活动公告",
      "【周年庆典 明星抽内测】活动公告",
      "极致网速，快乐上分，中国电信邀你畅快赢好礼",
      "双倍积分“通道”再次开启  城市探秘活动邀你竞猜本周入围队伍",
      "佛山“舞狮”助兴  城市赛全国半决赛精彩对抗即将来临！",
      "十校王者少年即将抵达战场, 王者荣耀高校联赛第三周火热备战！",
      "【KPL今日预报】DYG.JC vs EDG.M，DYG.JC目标胜者组",
      "回忆“彩云之滇”上的电竞，王者荣耀城市赛全国大赛圆满落幕！"
    ];

    // 生成新数组
    const NewsList = NewsTirles.map(title => {
      // 打乱分类随机取出两个分类
      const randomCats = cats.slice(0).sort((a, b) => {
        return Math.random() - 0.5;
      });
      return { categories: randomCats.slice(0, 2), title: title };
    });
    // 删除数据库文章 以任一条件
    await Article.deleteMany({});
    // 插入文章
    await Article.insertMany(NewsList);
    res.send(NewsList);
  });

  Router.get("/news/list", async function(req, res) {
    /**
     * 关联查询
     */
    // // 找出新闻分类这个顶级分类
    // const parent = await Category.findOne({
    //   name: "新闻分类"
    // })
    //   .populate({
    //     // 第一层联查查找属于新闻的四个分类
    //     path: "children",
    //     // 第二层联查查找属于4个分类下的文章
    //     populate: {
    //       path: "newsList"
    //     }
    //   })
    //   .lean();
    // // 这样的弊端如果需要设置条数的话可能截取的条数都是一个子分类的不均匀
    // res.send(parent);

    /**
     * 聚合查询
     */
    // 找出新闻分类这个顶级分类
    const parent = await Category.findOne({
      name: "新闻分类"
    });
    // 聚合查询传递参数叫聚合管道
    const cats = await Category.aggregate([
      // 过滤数据  类似where  找到与顶级分类关联的分类
      { $match: { parent: parent._id } },
      // 表关联查询
      {
        $lookup: {
          // 关联的表的集合名字 默认是表的复数形式
          from: "articles",
          // 从文章表查找和分类的_id关联的数据
          localField: "_id",
          foreignField: "categories",
          // 自定义字段名
          as: "newsList"
        }
      },
      // 新增/修改字段 新增已有的相当于修改
      {
        $addFields: {
          //      类似js的slice  参数: $+操作的数据名,取几个
          newsList: { $slice: ["$newsList", 5] }
        }
      }
    ]);
    // 找到4个id
    const subCats = cats.map(item => item._id);
    // 查找热门数据
    cats.unshift({
      name: "热门",
      newsList: await Article.find()
        // 条件查询  传入多个条件id数组 查找属于这4个分类的文章
        .where({ categories: { $in: subCats } })
        .populate("categories")
        .limit(5)
        .lean()
    });
    // 添加分类名
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === "热门" ? news.categories[0].name : cat.name;
        return news;
      });
      return cat;
    });
    res.send(cats);
  });

  app.use("/web/api", Router);
};
