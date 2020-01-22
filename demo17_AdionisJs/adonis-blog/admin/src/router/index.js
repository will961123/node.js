import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

import Article from "../views/Article.vue";
import ArticleList from "../views/ArticleList.vue";
import Category from "../views/Category.vue";
import CategoryList from "../views/CategoryList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      { path: "/articlesList", component: ArticleList },
      { path: "/articles/edit/:id", component: Article, props: true },
      { path: "/articles/edit", component: Article },
      { path: "/categoriesList", component: CategoryList },
      { path: "/categories/edit/:id", component: Category, props: true },
      { path: "/categories/edit", component: Category }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  routes
});

export default router;
