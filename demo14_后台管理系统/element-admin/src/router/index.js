import Vue from 'vue';
import VueRouter from 'vue-router'

import listArticle from '../views/listArticle';
import createArticle from '../views/createArticle'; 
import editArticle from '../views/editArticle'; 

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/articles/index'
    },
    {
        path: '/articles/index',
        name: 'list-articels',
        component: listArticle
    },
    {
        path: '/articles/create',
        name: 'create-articels',
        component: createArticle
    },
    {
        path: '/articles/:id/edit',
        name: 'edit-articels',
        component: editArticle
    }
];

const router = new VueRouter({
    routes
});

export default router;
