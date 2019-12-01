module.exports = function(app) {
  const Router = require("express").Router();

  // 引用模型 相对路径太麻烦
  // const Article = require('../../models/Article')
  // 因为我们在db.js 使用require-all 了 所以我们可以这样
  const mongoose = require("mongoose");
  const Article = mongoose.model("Article");
  const Category = mongoose.model("Category");
  const Hero = mongoose.model("Hero");

  // 导入新闻数据
  Router.get("/news/init", async function(req, res) {
    // 找到一级分类 新闻分类
    const parent = await Category.findOne({ name: "新闻分类" });
    // 找到新闻分类下的子分类
    const cats = await Category.find()
      .where({
        parent: parent
      })
      .lean();
    // 这一段数据在浏览器控制台偷 $$('')
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

  // 新闻列表的查询
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

  // 导入英雄数据
  Router.get("/heroes/init", async function(req, res) {
    await Hero.deleteMany({});
    // 从官网偷数据
    const herolist = [
      {
        name: "热门",
        heroes: [
          {
            name: "孙悟空",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
          },
          {
            name: "亚瑟",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
          },
          {
            name: "鲁班七号",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
          },
          {
            name: "后羿",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
          },
          {
            name: "铠",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
          },
          {
            name: "甄姬",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
          },
          {
            name: "安琪拉",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
          },
          {
            name: "孙尚香",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
          },
          {
            name: "妲己",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
          },
          {
            name: "吕布",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
          }
        ]
      },
      {
        name: "战士",
        heroes: [
          {
            name: "赵云",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
          },
          {
            name: "墨子",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
          },
          {
            name: "钟无艳",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
          },
          {
            name: "吕布",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
          },
          {
            name: "夏侯惇",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
          },
          {
            name: "曹操",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"
          },
          {
            name: "典韦",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"
          },
          {
            name: "宫本武藏",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"
          },
          {
            name: "达摩",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
          },
          {
            name: "老夫子",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"
          },
          {
            name: "关羽",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"
          },
          {
            name: "程咬金",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
          },
          {
            name: "露娜",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
          },
          {
            name: "花木兰",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
          },
          {
            name: "橘右京",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
          },
          {
            name: "亚瑟",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
          },
          {
            name: "孙悟空",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
          },
          {
            name: "刘备",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"
          },
          {
            name: "钟馗",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
          },
          {
            name: "杨戬",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"
          },
          {
            name: "雅典娜",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"
          },
          {
            name: "哪吒",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"
          },
          {
            name: "铠",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
          },
          {
            name: "苏烈",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
          },
          {
            name: "裴擒虎",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
          },
          {
            name: "狂铁",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"
          },
          {
            name: "孙策",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
          },
          {
            name: "李信",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"
          },
          {
            name: "盘古",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"
          },
          {
            name: "云中君",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
          },
          {
            name: "曜",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"
          },
          {
            name: "马超",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"
          }
        ]
      },
      {
        name: "法师",
        heroes: [
          {
            name: "小乔",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"
          },
          {
            name: "墨子",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
          },
          {
            name: "妲己",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
          },
          {
            name: "嬴政",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"
          },
          {
            name: "高渐离",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"
          },
          {
            name: "孙膑",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
          },
          {
            name: "扁鹊",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"
          },
          {
            name: "芈月",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
          },
          {
            name: "周瑜",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"
          },
          {
            name: "甄姬",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
          },
          {
            name: "武则天",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"
          },
          {
            name: "貂蝉",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
          },
          {
            name: "安琪拉",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
          },
          {
            name: "露娜",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
          },
          {
            name: "姜子牙",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
          },
          {
            name: "王昭君",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"
          },
          {
            name: "张良",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"
          },
          {
            name: "不知火舞",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
          },
          {
            name: "钟馗",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
          },
          {
            name: "诸葛亮",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"
          },
          {
            name: "干将莫邪",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"
          },
          {
            name: "女娲",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"
          },
          {
            name: "杨玉环",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
          },
          {
            name: "弈星",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"
          },
          {
            name: "米莱狄",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"
          },
          {
            name: "司马懿",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
          },
          {
            name: "沈梦溪",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"
          },
          {
            name: "上官婉儿",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
          },
          {
            name: "嫦娥",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
          },
          {
            name: "西施",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"
          }
        ]
      },
      {
        name: "坦克",
        heroes: [
          {
            name: "廉颇",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
          },
          {
            name: "庄周",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
          },
          {
            name: "刘禅",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
          },
          {
            name: "钟无艳",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
          },
          {
            name: "白起",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
          },
          {
            name: "芈月",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
          },
          {
            name: "吕布",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
          },
          {
            name: "夏侯惇",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
          },
          {
            name: "达摩",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
          },
          {
            name: "项羽",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
          },
          {
            name: "程咬金",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
          },
          {
            name: "刘邦",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
          },
          {
            name: "亚瑟",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
          },
          {
            name: "牛魔",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
          },
          {
            name: "张飞",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
          },
          {
            name: "太乙真人",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
          },
          {
            name: "东皇太一",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
          },
          {
            name: "铠",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
          },
          {
            name: "苏烈",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
          },
          {
            name: "梦奇",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
          },
          {
            name: "孙策",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
          },
          {
            name: "嫦娥",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
          },
          {
            name: "猪八戒",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
          }
        ]
      },
      {
        name: "刺客",
        heroes: [
          {
            name: "赵云",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
          },
          {
            name: "阿轲",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"
          },
          {
            name: "李白",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"
          },
          {
            name: "貂蝉",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
          },
          {
            name: "韩信",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
          },
          {
            name: "兰陵王",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"
          },
          {
            name: "花木兰",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
          },
          {
            name: "不知火舞",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
          },
          {
            name: "娜可露露",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"
          },
          {
            name: "橘右京",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
          },
          {
            name: "孙悟空",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
          },
          {
            name: "百里守约",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
          },
          {
            name: "百里玄策",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"
          },
          {
            name: "裴擒虎",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
          },
          {
            name: "元歌",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"
          },
          {
            name: "司马懿",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
          },
          {
            name: "上官婉儿",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
          },
          {
            name: "云中君",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
          },
          {
            name: "马超",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"
          }
        ]
      },
      {
        name: "射手",
        heroes: [
          {
            name: "孙尚香",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
          },
          {
            name: "鲁班七号",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
          },
          {
            name: "马可波罗",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"
          },
          {
            name: "狄仁杰",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"
          },
          {
            name: "后羿",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
          },
          {
            name: "李元芳",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"
          },
          {
            name: "虞姬",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"
          },
          {
            name: "成吉思汗",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"
          },
          {
            name: "黄忠",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"
          },
          {
            name: "百里守约",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
          },
          {
            name: "公孙离",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"
          },
          {
            name: "伽罗",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"
          }
        ]
      },
      {
        name: "辅助",
        heroes: [
          {
            name: "庄周",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
          },
          {
            name: "刘禅",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
          },
          {
            name: "孙膑",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
          },
          {
            name: "姜子牙",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
          },
          {
            name: "牛魔",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
          },
          {
            name: "张飞",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
          },
          {
            name: "蔡文姬",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"
          },
          {
            name: "太乙真人",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
          },
          {
            name: "大乔",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"
          },
          {
            name: "鬼谷子",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"
          },
          {
            name: "明世隐",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"
          },
          {
            name: "杨玉环",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
          },
          {
            name: "盾山",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"
          },
          {
            name: "瑶",
            icon:
              "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"
          }
        ]
      }
    ];

    // 按分类循环插入
    for (let item of herolist) {
      if (item.name === "热门") {
        continue;
      }
      const catrgory = await Category.findOne({ name: item.name });
      item.heroes.map(hero => {
        hero.categories = [catrgory];
        return hero;
      });
      await Hero.insertMany(item.heroes);
    }
    res.send(await Hero.find());
  });

  // 英雄列表的查询
  Router.get("/heroes/list", async function(req, res) {
    // const parent = await Category.findOne({ name: "英雄分类" })
    //   .populate({ path: "children", populate: { path: "heroList" } })
    //   .lean();

    const parent = await Category.findOne({ name: "英雄分类" });
    // 聚合查询
    const heroes = await Category.aggregate([
      // 找到关联的分类
      { $match: { parent: parent._id } },
      // 通过分类关联英雄表查询
      {
        $lookup: {
          // 英雄表的集合名字 集合名默认是表的复数形式
          from: "heroes",
          // 分类表通过_id与英雄表关联
          localField: "_id",
          // 英雄表通过categories与分类表关联
          foreignField: "categories",
          // 自定义一个字段名
          as: "heroList"
        }
      }
    ]);
    // 找到6个英雄分类的id
    const subCats = heroes.map(cat => cat._id);
    // 插入热门
    heroes.unshift({
      name: "热门",
      heroList: await Hero.find()
        .where({ categories: { $in: subCats } })
        .limit(10)
        .lean()
    });
    res.send(heroes);
  });

  // 查询文章详情
  Router.get("/articles/list/:id", async function(req, res) {
    const articles = await Article.findById(req.params.id).lean();
    articles.related = await Article.find()
      .where({
        categories: { $in: articles.categories }
      })
      .limit(2);
    res.send(articles);
  });

  // 查询英雄详情
  Router.get("/heroes/list/:id", async function(req, res) {
    const heroes = await Hero.findById(req.params.id)
      .populate("categories")
      .lean();
    res.send(heroes);
  });
  app.use("/web/api", Router);
};
