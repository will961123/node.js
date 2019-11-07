import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8888/admin/api'
});

// axios 响应拦截器全局处理报错
import Vue from 'vue';
http.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if (err.response.data.returnStr) {
            Vue.prototype.$message.error(err.response.data.returnStr);
        }
        return Promise.reject(err);
    }
);
// axios 请求拦截器全局处理请求加上token
http.interceptors.request.use(
    config => {
        config.headers.Authorization = 'Bearer ' + localStorage.token;
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

export default http;
