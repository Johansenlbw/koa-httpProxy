#### KOA HTTP Server 你需要知道什么  ####

> 目前的技术现状KOA关于HTTP代理的中间件有很多，我们到底怎么使用，对于这种中间件我们能否自己动手去做，完成一个稳定性比较好的中间件。今天我们教大家怎么利用目前成熟技术，构建你的http-proxy-koa中间件。

技术依赖：

* 1. 首先目前的http-proxy-middleware是基于Node.js的代理中间件，适用于connect ,express, browser-sync and many more.
* 2. koa要使用http-proxy-middleware，必需使用koa-connect将其转化,转化成koa可以使用的中间件。
* 3. koa-connect 
