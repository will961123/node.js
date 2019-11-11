module.exports = function(app) {
    const Router = require('express').Router();

    // 引用模型 相对路径太麻烦
    // const Article = require('../../models/Article')
    // 因为我们在db.js 使用require-all 了 所以我们可以这样
    const mongoose = require('mongoose');
    const Article = mongoose.model('Article');
    const Category = mongoose.model('Category');
    Router.get('/news/init', async function(req, res) {
        // 找到一级分类 新闻分类
        const parent = await Category.findOne({ name: '新闻分类' });
        // 找到新闻分类下的子分类
        const cats = await Category.find()
            .where({
                parent: parent
            })
            .lean();
        const NewsTirles = [
            '全民赢官方周边',
            '“新文创”下的探索与实践：王者荣耀x越剧文化论坛展开跨界对话',
            '腾讯天美工作室群IP探索新动作，《魂斗罗：归来》联动《终结者》！',
            '皮影婉儿、人偶婉儿、纸雕婉儿、板绘婉儿...你Pick哪一个？',
            '新皮肤爆料丨一个技能三种形态，猜猜这位圣斗士是谁？',
            '11月5日全服不停机更新公告',
            '10月30日全服不停机修复公告',
            '10月30日全服不停机更新公告',
            '亲密度道具使用异常说明',
            '11月8日体验服停机更新公告',
            '告别孤单 浪漫峡谷陪你狂欢 秒杀皮肤限时返场',
            '感恩有你 李白新星元登场 峡谷全新福利来袭',
            '【周年许愿树】活动公告',
            '【周年庆典 明星抽内测】活动公告',
            '极致网速，快乐上分，中国电信邀你畅快赢好礼',
            '双倍积分“通道”再次开启  城市探秘活动邀你竞猜本周入围队伍',
            '佛山“舞狮”助兴  城市赛全国半决赛精彩对抗即将来临！',
            '十校王者少年即将抵达战场, 王者荣耀高校联赛第三周火热备战！',
            '【KPL今日预报】DYG.JC vs EDG.M，DYG.JC目标胜者组',
            '回忆“彩云之滇”上的电竞，王者荣耀城市赛全国大赛圆满落幕！'
        ];

        // 生成新数组
        const NewsList = NewsTirles.map(title => {
            // 打乱数组
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

    app.use('/web/api', Router);
};
