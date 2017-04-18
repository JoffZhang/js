/**
 * Created by admin01 on 2017/4/17.
 */
const Koa =require('koa');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// redirect to /static/index.html:
app.use(async (ctx, next) => {
    if(ctx.request.url.endsWith('index.html')){
        ctx.response.redirect('/static/index.html');
    }else  if(ctx.request.url.endsWith('form.html')){
        ctx.response.redirect('/static/form.html');
    }else  if(ctx.request.url.endsWith('todo.html')){
        ctx.response.redirect('/static/todo.html');
    }
});

app.listen(3000);
console.log('app started at port 3000...');