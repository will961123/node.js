#### vue create admin

#### vue add router 不用 history 模式

#### npm i sass sass-loder  -D  （文件是 scss）

#### npm i vue-awesome-swiper --save (main.js 全局引用)

- 在页面中css要引用工具样式中的变量的话 需要@import "../style.scss"; 导入 然后 map-get($colors, "info");
- 但是这样会导致页面引入的样式过多 所以将 工具样式的变量与实现分为两个文件 _variables.scss style.scss
- 一个存放变量 一个实现样式 引入只需引入变量
- 需要注意的是 scss 规定需要被引用的文件前面加上_ 但被引用时不用加_
- 实际引用变量文件 @import "../variables.scss"

#### sprite 在线获取精灵图的位置 spritecow.com

#### npm i dayjs 处理日期
#### 过滤器 filters



# web

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
