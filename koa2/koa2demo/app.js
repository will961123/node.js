const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

const session = require('koa-generic-session')
const Redis = require('koa-redis')

const index = require('./routes/index')
const users = require('./routes/users')

// 自定义的中间件
const pv = require('./middleware/koa-pv')

// error handler
onerror(app)

// 链接redis keys 做session加密处理
app.keys = ['keys', 'keyskeys']
// session默认使用内存 需要配置使用redis
app.use(session({
  store: new Redis(),
  // 默认session 字段名是 koa.sid 可以自定义 
  key:'will',
  prefix:'willpre'
}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(pv())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
