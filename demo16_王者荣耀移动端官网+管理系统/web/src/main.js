import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

// 工具样式
import "./assets/scss/style.scss";
// swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
// 字体图标
import "./assets/iconfont/iconfont.css";
// 卡片组件
import Card from "./components/Card.vue";
Vue.component("m-card", Card);
// 列表卡片组件
import ListCard from "./components/ListCard.vue";
Vue.component("m-list-card", ListCard);

Vue.use(VueAwesomeSwiper);

import http from "./http";
Vue.prototype.$http = http;
// Vue.prototype.imgUrl = 'http://localhost:8888';
Vue.prototype.imgUrl = process.env.VUE_APP_IMG_URL || "http://test.localhost-8080.cn:8888" 

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
