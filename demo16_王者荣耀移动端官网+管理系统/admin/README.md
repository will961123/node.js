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

#### vue 全局代码块

```javaScript
Vue.mixin({
    // 可以写data methods 等
    methods: {
        getAuthHeaders() {
            if (localStorage.token) {
                return {
                    Authorization: 'Bearer ' + (localStorage.token || '')
                };
            } else {
                return {};
            }
        }
    }
});
```

#### 前端路由校验

```javaScript
const routes = [
    {
        path: '/',
        name: 'login',
        redirect: '/login',
        // 前端路由校验
        meta: {
            isPublic: true
        }
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
```

# admin

## Project setup

````

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
```
