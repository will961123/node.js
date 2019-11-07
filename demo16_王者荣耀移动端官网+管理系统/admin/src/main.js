import Vue from 'vue';
import App from './App.vue';
import './plugins/element.js';
import "./style.css"
import router from './router';

Vue.config.productionTip = false;

import $http from './http';
Vue.prototype.$http = $http;
Vue.prototype.imgUrl = 'http://localhost:8888';
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
