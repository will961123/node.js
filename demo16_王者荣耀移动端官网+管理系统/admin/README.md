#### vue create admin

#### vue add router 不用 history 模式

#### vue add element

#### npm i axios

#### 富文本编辑器 quill npm install --save vue2-editor

#### axios 拦截器

```javaScript
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
```

# admin

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
