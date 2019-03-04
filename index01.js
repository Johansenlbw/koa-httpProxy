const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa();
let home = new Router()

home.get('/user', async (ctx,next) => {
    console.log('user get')
    ctx.body = 'redirct user'
    await next();
});

app.use(home.routes());

app.listen(8989,()=>{
    console.log('lister user  port 8989');
});
