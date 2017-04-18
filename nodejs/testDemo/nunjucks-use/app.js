//Nunjucks模板引擎最强大的功能在于模板的继承。

const nunjucks = require('nunjucks');
function createEnv(path,opts){
//nunjucks采用同步IO读取模板文件
//在开发环境下，可以关闭cache，这样每次重新加载模板，便于实时修改模板。在生产环境下，一定要打开cache，这样就不会有性能问题。
	autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});
//渲染模板
var s = env.render('hello.html', {
    name: '<Nunjucks>',
    fruits: ['Apple', 'Pear', 'Banana'],
    count: 12000
});

console.log(s);

s = env.render('hello.html',{name:'<script>alert("小明")</script>',
    count: 16});
//这样就避免了输出恶意脚本。
console.log(s);


console.log(env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla bla...'
}));
/**
变量env就表示Nunjucks模板引擎对象，它有一个render(view, model)方法，正好传入view和model两个参数，并返回字符串。

创建env需要的参数可以查看文档获知。我们用autoescape = opts.autoescape && true这样的代码给每个参数加上默认值，最后使用new nunjucks.FileSystemLoader('views')创建一个文件系统加载器，从views目录读取模板。
*/
