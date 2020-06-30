function pv(ctx) {
    ctx.session.count++
    console.log('pv', ctx.session.count,ctx.path,ctx.req.headers.host)
}

module.exports = function () {
    return async function (ctx, next) {
        pv(ctx)
        await next()
    }
}