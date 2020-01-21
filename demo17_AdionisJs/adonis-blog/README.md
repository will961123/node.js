### adonisjs

- 安装 npm i -g @adonisjs/cli
- 创建一个项目 使用 mongodb 模板 adonis new adonis-blog --blueprint wxs77577/adonis-mongo-app
- 启动 adonis serve --dev

### 路由

```js
//              路由            控制器.方法
// Route.get('/admin/api/posts',"Admin/PostController.index")

// resource 自动匹配请求的方式和控制器上的方法
Route.resource("/admin/api/posts", "Admin/PostController");
```

### 控制器

- 创建控制器 adonis make:controller \*\*
- 为了规范增删改查的控制器 adonis make:controller \*\* --resource

### 模型

- 操作数据库不是直接去查询数据库 需要通过模型
- 创建模型 adonis make:model \*\*
- 使用模型 const ** = use(App/Models/**)

### 视图

- 创建视图 adonis make:view posts.index
- 使用 mongodb 需要 在 app.js 添加

```js
"@adonisjs/framework/providers/ViewProvider";
```

- 返回视图

```js
// 模型
  async index({ request, view }) {
        const postsList = await Post.all()
        return view.render("posts.index", {
            postsList: postsList.toJSON()
        })
  }
// 视图
    <ul>
        @each(post in postsList)
        <li>
            <a href='/posts/{{post._id}}'>{{post.title}}</a>
        </li>
        @endeach
    </ul>

```

### 博客 demo

- .env.example 环境变量模板

### 取参

- get

```javaScript
// 接口
Route.get('/posts', "PostController.index")
// 控制器
class PostController {
    index({ request }) {
        return '页码' + request.input('page')
    }
}
// 访问
// http://127.0.0.1:8888/posts?page=2
```

- 路由取参

```javaScript
// 接口
Route.get('/posts/:id', "PostController.show")
// 控制器
class PostController {
    show({ params }) {
        return 'id为' + params.id
    }
}
// 访问
// http://127.0.0.1:8888/posts/123
```

### 查询

- 模型.all() 查询全部
- 模型.query().fetch() 等同 all()
- 模型.query().paginate(1,10) 分页
### 新增数据

- POST

```js
  async store({ request, response }) {
    // 取出客户端提交的部分产生 或者使用all()方法
    const data = request.sonly(['title'])
    // 实例化新的数据
    const model = new Post
    // 填充数据
    model.fill(data)
    // 保存
    await model.save()
    // 返回
    return model
  }
```

### 修改数据

- PUT

```js
  async update({ params, request, response }) {
    // 取出客户端提交的部分产生 或者使用all()方法
    const data = request.only(['title'])
    // 根据id找到数据
    const model = await Post.find(params.id)
    // 合并数据
    model.merge(data)
    // 保存
    await model.save()
    // 返回
    return model
  }
```

### 删除数据

- DELETE

```js
async destroy({ params, request, response }) {
    // 根据id找到数据
    const model = await Post.find(params.id)
    // 删除
    await model.delete()
    return {
      success: true
    }
  }
```
