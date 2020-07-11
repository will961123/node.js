### koa2 基础

- 安装
  -- npm i koa-generator -g
- 创建项目
  -- koa2 project
  -- ejs 模板引擎 koa2 -e project

### koa2 中间件

- 使用
  -- const app = new Koa()
  -- app.use()

- 自定义中间件

  ```javascript
  // middleware/koa-pv.js
  function pv(ctx) {
    console.log(ctx.path)
  }
  module.exports = function () {
    return async function (ctx, next) {
      pv(ctx)
      await next()
    }
  }

  // app.js
  const pv = require("./middleware/koa-pv")
  app.use(pv())
  ```

### koa 路由

```javascript
// routes/users.js
const router = require("koa-router")()
// 定义前缀
router.prefix("/users")

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!"
})

module.exports = router

// app.js
const users = require("./routes/users")
app.use(users.routes(), users.allowedMethods())
```

### cokie

```javascript
// 设置kookie
router.get("/", async (ctx, next) => {
  ctx.cookies.set("pvid", Math.random())
  await ctx.render("index", {
    title: "Hello Koa 2!",
  })
})
// 读取cookie
router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
    cookie: ctx.cookies.get("pvid"),
  }
})
```

### mongoose

- 安装
  -- npm i mongoose

- 配置数据库

```javascript
// dbs/config.js
export default {
  dbs: "mongodb://127.0.0.1:27017/dbs",
}
```

- 配置模型 (集合/表)

```javascript
// dmodelsbs/person.js
const mongoose = require("mongoose")
const perosonSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

export default mongoose.model("Person", perosonSchema)
```

- 连接数据库

```javascript
// app.js
const mongoose = require("mongoose")
const dbConfig = require("./dbs/config")
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
})
```

- 操作数据库

```javascript
// 引入集合 routes/users
const Person = require("../models/peoson")

router.post("/addPerson", async function (ctx, next) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age,
  })
  let code
  try {
    await person.save()
    code = 0
  } catch (err) {
    code = -1
  }
  ctx.body = {
    code,
  }
})
```

### redis&session

- 启动 redis

```javascript
// cmd
redis-server redis.windows.conf
```

- 安装 koa 中间件 并使用

```javascript
npm i koa-generic-session koa-redis

// app.js
const session = require('koa-generic-session')
const Redis = require('koa-redis')
// keys 做session加密处理
app.keys = ['keys', 'keyskeys']
// session默认使用内存 需要配置使用redis
app.use(session({
  store: new Redis(),
  // 默认session 字段名是 koa.sid 可以自定义
  key:'will',
  prefix:'willpre'
}))

// koa-pv.js
function pv(ctx) {
    ctx.session.count++
    console.log('pv',ctx.session.count)
}
```

- 不经过 session 直接操作 redis

```javascript
// routes/users
const Redis = require("koa-redis");
const Store = new Redis().client;

router.get("/fix", async function(ctx, next) {
  // 前缀   key    value
  await Store.hset("fix", "name", Math.random());
  ctx.body = { code: 0 };
});
// cmd 查看设置的缓存
keys *
hget fix name
```

-- redis 命令

```javascript
// cmd
keys * // 查看全部session
get 一条session // 查看session详情
```

### Nuxt.js

- 安装

```javascript
vue init nuxt-community/koa-template
```

- 2.x 以后的安装方式

```javascript
npm i npx -g
npx create-nuxt-app project-name
```

-- 创建即配置
--- nuxt 中创建文件即可自动配置 如 创建 store 就会自动配置 vuex 创建页面就会自动配置路由

### Nuxt layouts 模板

-- pages 页面 layouts 模板 components 组件
-- 页面放在模板中
-- 模板和页面的区别是 模板需要放入<nuxt /> 标签 类似 <router-view />

```html
<!-- layouts/search -->
<template>
  <div class="layout-search">
    <h1>search title</h1>
    <nuxt />
    <div>search footer</div>
  </div>
</template>

<!-- pages/search -->
<template>
  <div>
    Page is search
  </div>
</template>

<script>
  export default {
    // 指定模板名
    layout: "search",
  }
</script>
```

### Nuxt 创建接口

```javascript
// server/interface/city.js
import Router from "koa-router"

const router = new Router({
  prefix: "/city",
})

router.get("/list", async (ctx) => {
  ctx.body = ["北京", "天津"]
})

export default router

// server/index.js
import cityInterface from "./interface/city"
// 固定写法
app.use(cityInterface.routes()).use(cityInterface.allowedMethods())
```

### 创建即配置 store vuex

```javascript
// 多个vuex
// store/modules/city.js
const state = () => {
  return { list: [] }
}
const mutations = {
  add(state, str) {
    state.list.push(str)
  },
}
const actions = {
  add: ({ commit }, str) => {
    commit("add", str)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

// store/index.js
import Vue from "vue"
import Vuex from "vuex"
import city from "./modules/city"
import navbar from "./modules/navbar"

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      city,
      navbar,
    },
    actions: {
      //   服务端渲的某些数据传递给客户端 客户端无需再次发起请求
      nuxtServerInit({ commit }, { req }) {
        if (true) {
          commit('city/nowSeconds', new Date().getSeconds())
        }
      }
    }
  }
  }
    },
  })

export default store
```

### 服务端渲染

#### asyncData

```javascript
// pages/search.vue
// 传统项目请求接口
 async mounted() {
    let { status, data: list } = await axios.get('/city/list')
    if (status === 200) {
      this.list = list
    }
  }

  // 服务端渲染需要放到 axyncData
  // asyncData 处理 组件数据
  // fetch 处理 vuex
  // 此时 this 不存在app实例 使用return 赋值
  // 好处 不会有闪烁 查看源代码能看到渲染的数据
  async asyncData() {
    let { status, data: list } = await axios.get('http://127.0.0.1:3000/city/list')
    if (status === 200) {
      return {
        list
      }
    }
  }
```

#### fetch

```html
<li v-for="(item, index) in $store.state.city.list" :key="index">{{item}}</li>
```

```javascript
async fetch({ store, params }) {
    let { data: list } = await axios.get('http://127.0.0.1:3000/city/list')
    for (const idx in list) {
      await store.dispatch('city/add', list[idx])
    }
}
```
