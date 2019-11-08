import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8888/admin/api'
});

// axios 响应拦截器全局处理报错
import Vue from 'vue';
import router from './router';
http.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if (err.response.data.returnStr) {
            Vue.prototype.$message.error(err.response.data.returnStr);
        }
        // 约定 401 是用户未登录，用户不存在 或token异常的情况
        if (err.response.status === 401) {
            router.push('/login');
        }
        return Promise.reject(err);
    }
);
// axios 请求拦截器全局处理请求加上token
http.interceptors.request.use(
    config => {
        if (localStorage.token) {
            config.headers.Authorization = 'Bearer ' + localStorage.token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

export default http;
