const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');
/**
staticFiles是一个普通函数，它接收两个参数：URL前缀和一个目录，然后返回一个async函数。这个async函数会判断当前的URL是否以指定前缀开头，如果是，就把URL的路径视为文件，并发送文件内容。如果不是，这个async函数就不做任何事情，而是简单地调用await next()让下一个middleware去处理请求。

我们使用了一个mz的包，并通过require('mz/fs');导入。mz提供的API和Node.js的fs模块完全相同，但fs模块使用回调，而mz封装了fs对应的函数，并改为Promise。这样，我们就可以非常简单的用await调用mz的函数，而不需要任何回调。
*/
// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
function staticFiles(url,dir){
	return async (ctx,next)=>{
		let rpath = ctx.request.path;
		//判断是否以指定的URL开头；
		if(rpath.startsWith(url)){
			//获取完整路径
			let fp = path.join(dir,rpath.substring(url.length));
			//判断文件是否存在
			if(await fs.exists(fp)){
				//查找文件的mime;
				ctx.response.type = mime.lookup(rpath);
				//读取文件内容并赋值给response.body
				ctx.response.body = await fs.readFile(fp);
			}else{
				//文件不存在；
				ctx.response.status = 404;
			}
		}else{
			//不是制定前缀的URL，继续处理下一个middleware
			await next();
		}
	};
};
module.exports = staticFiles;