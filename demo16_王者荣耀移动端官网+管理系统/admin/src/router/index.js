import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';

// 分类
import CategoryEdit from '../views/CategoryEdit.vue';
import CategoryList from '../views/CategoryList.vue';
// 物品
import ItemEdit from '../views/ItemEdit.vue';
import ItemList from '../views/ItemList.vue';
// 英雄
import HeroEdit from '../views/HeroEdit.vue';
import HeroList from '../views/HeroList.vue';
// 文章
import ArticleEdit from '../views/ArticleEdit.vue';
import ArticleList from '../views/ArticleList.vue';
// 广告位
import AdEdit from '../views/AdEdit.vue';
import AdList from '../views/AdList.vue';



Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'main',
        component: Main,
        redirect:'/categories/create',
        children: [
            // 分类
            { path: '/categories/create', component: CategoryEdit },
            // props : true 将parmas 的参数注入 props
            { path: '/categories/edit/:id', component: CategoryEdit, props: true },
            { path: '/categories/list', component: CategoryList },

            // 物品
            { path: '/items/create', component: ItemEdit },
            // props : true 将parmas 的参数注入 props
            { path: '/items/edit/:id', component: ItemEdit, props: true },
            { path: '/items/list', component: ItemList },

            // 英雄
            { path: '/heroes/create', component: HeroEdit },
            // props : true 将parmas 的参数注入 props
            { path: '/heroes/edit/:id', component: HeroEdit, props: true },
            { path: '/heroes/list', component: HeroList },

             // 文章
             { path: '/articles/create', component: ArticleEdit },
             // props : true 将parmas 的参数注入 props
             { path: '/articles/edit/:id', component: ArticleEdit, props: true },
             { path: '/articles/list', component: ArticleList },

             // 广告位
             { path: '/ads/create', component: AdEdit },
             // props : true 将parmas 的参数注入 props
             { path: '/ads/edit/:id', component: AdEdit, props: true },
             { path: '/ads/list', component: AdList }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
