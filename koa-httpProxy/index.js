const Koa = require('koa')
const c2k = require('koa-connect')
const proxy = require('http-proxy-middleware')
const Router = require('koa-router')
const static = require('koa-static')
const path = require('path');
const app = new Koa();
let home = new Router()

app.use(static(path.join(__dirname, '/')))



// 子路由1
home.get('/',async(ctx,next)=>{
    ctx.body =`<ul>
    <li><a href="/home">/home</a></li>
    <li><a href="/users">/page/404</a></li>
  </ul>`
  await next();

})
home.get('/home', async (ctx,next) => {
    let html = `
    <ul>
      <li><a href="/home/user">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
    ctx.body = html
    await next();
})

home.get('/home/users',async(ctx,next)=>{
    await next();
})

home.get('/users', async (ctx,next) => {
    let html = `user`;
    ctx.body = html
    await next(); 
})

const koaproxy = async (ctx, next) => {
    
    const objproxy = proxy('/home/**', {
        target:'http://localhost:8989',
        //target: 'http://jsonplaceholder.typicode.com',
        pathRewrite: { '^/home': '' },
        changeOrigin: true  
    });
    
    return  await c2k(objproxy)(ctx,next);
    //c2k(objproxy)(ctx,next)
    // return async function(ctx, next) {
    //     await c2k(objproxy)(ctx, next)
    // }
}

app.use(home.routes())
//.use(static(path.join(__dirname, '/')))
.use(koaproxy)
.use((ctx,next)=>{
    console.log('It will continue on to here',ctx)
});


app.listen(3000);
console.log('[DEMO] Server: listening on port 3000')
console.log('[DEMO] Opening: http://localhost:3000/users')
