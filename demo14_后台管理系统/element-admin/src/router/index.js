import Vue from 'vue';
import VueRouter from 'vue-router'

import listArticle from '../views/listArticle';
import createArticle from '../views/createArticle'; 

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/articels/index'
    },
    {
        path: '/articels/index',
        name: 'list-articels',
        component: listArticle
    },
    {
        path: '/articels/create',
        name: 'create-articels',
        component: createArticle
    }
];

const router = new VueRouter({
    routes
});

export default router;
