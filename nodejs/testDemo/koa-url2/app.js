// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');


const bodyParser = require('koa-bodyparser');

const controller = require('./controllers/controller');

// 创建一个Koa对象表示web app本身:
const app = new Koa();


app.use(async (ctx ,next)=>{
	console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
	await next(); // 调用下一个middleware
});

//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());
app.use(controller());

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000.....');
