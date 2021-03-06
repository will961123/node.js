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
// 管理员
import AdminUserEdit from '../views/AdminUserEdit.vue';
import AdminUserList from '../views/AdminUserList.vue';
// 登录页
import Login from '../views/Login.vue';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        redirect: '/login',
        // 前端路由校验
        meta: {
            isPublic: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            isPublic: true
        }
    },
    {
        path: '/categories/main',
        name: 'main',
        component: Main,
        redirect: '/items/list',
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
            { path: '/ads/list', component: AdList },

            // 管理员
            { path: '/admin_users/create', component: AdminUserEdit },
            // props : true 将parmas 的参数注入 props
            { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
            { path: '/admin_users/list', component: AdminUserList }
        ]
    }
];

const router = new VueRouter({
    routes
});
// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !localStorage.token) {
        Vue.prototype.$message.error("token不存在!")
        return next('/login');
    }
    next();
});
export default router;
