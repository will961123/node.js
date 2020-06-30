const router = require('koa-router')()
const Person = require('../models/peoson')
const Redis = require('koa-redis')
const Store = new Redis().client

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/fix', async function (ctx, next) {
  //                前缀    key     value
  await Store.hset('fix', 'name', Math.random())
  ctx.body = { code: 0 }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post("/addPerson", async function (ctx, next) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    await person.save()
    code = 0
  }
  catch (err) {
    code = -1
  }

  // const person = {
  //   name: ctx.request.body.name,
  //   age: ctx.request.body.age
  // };
  // let code
  // try {
  //   await Person.create(person)
  //   code = 0
  // }
  // catch (err) {
  //   code = -1
  // }

  ctx.body = {
    code
  }
})

router.post("/getPerson", async function (ctx, next) {
  const result = await Person.findOne({ name: ctx.request.body.name })
  ctx.body = {
    code: 0,
    result
  }
})

router.post("/updatePerson", async function (ctx, next) {
  const result = await Person.findOneAndUpdate({ name: ctx.request.body.name }, { age: ctx.request.body.age })
  ctx.body = {
    code: 0,
    result
  }
})

router.post("/removePerson", async function (ctx, next) {
  const result = await Person.findOneAndRemove({ name: ctx.request.body.name })
  ctx.body = {
    code: 0,
    result
  }
})


module.exports = router
