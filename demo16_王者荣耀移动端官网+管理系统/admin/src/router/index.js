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

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'main',
        component: Main,
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
            { path: '/heroes/list', component: HeroList }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
