---
title: "➹ browserify+gulp自动编译打包" 
---

# browserify+gulp自动编译打包 <img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268/sign=92adbbc31fd5ad6eaaf963ecb9ca39a3/79f0f736afc379314ae3062eefc4b74543a91129.jpg"/>
---

➣ 使用browserify
---

::: danger 特性
可以将 Node 上的模块移植到浏览器上使用，或者说，可以将 CommonJS 规范的模块转换成浏览器认识的模块。
:::
安装
===
全局安装
``` js{4}
npm install browserify -g
yarn global add browserify
```
在项目中安装
``` js{4}
npm install browserify -D
yarn add browserify -D
```
使用
===
使用 Browserify 进行转换
``` js{4}
browserify src/main.js -o build/bundle.js
```
浏览器模块化
``` js{4}
browserify -r ./src/main.js:main -r ./src/test.js:custom-test > build/bundle.js
```
通过 文件名:模块名 指定导出的模块名。
然后可以在浏览器端通过 require 方法导入模块：
``` js{4}
<script>
    const main = require("main")
    const test = require("custom-test")
    main()
    test()
</script>
```
# gulp + browserify           <img src="http://img0.imgtn.bdimg.com/it/u=2360616365,391938133&fm=27&gp=0.jpg"/>
---

➣ 单个文件入口下的方法：
---
### package.json
``` js{4}
{
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-preset-es2015": "^6.24.1",
    "babelify": "^8.0.0",
    "browserify": "^16.2.2",
    "css": "^2.2.3",
    "debug": "^3.1.0",
    "debug-fabulous": "^1.1.0",
    "event-stream": "^3.3.4",
    "glob": "^7.1.2",
    "gulp": "^3.9.1",
    "gulp-babel": "^7.0.1",
    "gulp-concat": "^2.6.1",
    "gulp-connect": "^5.5.0",
    "gulp-rename": "^1.2.3",
    "gulp-sourcemaps": "^2.6.4",
    "gulp-uglify": "^3.0.0",
    "gulp-watch": "^5.0.0",
    "http-server": "^0.11.1",
    "vinyl-buffer": "^1.0.1",
    "vinyl-source-stream": "^2.0.0",
    "watchify": "^3.11.0"
  },
  "name": "porco",
  "version": "1.0.0",
  "main": "gulpfile.js",
  "dependencies": {
    "jquery": "^3.3.1"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "http-server -p 8887 -o"
  },
  "author": "",
  "license": "ISC",
  "description": ""
}

```
### 全局安装gulp

``` js{4}
npm i gulp -g
```

### 根目录创建gulpfile
``` js{4}
touch gulpfile.js
```
### gulpfile.js
``` js{4}
const browserify = require("browserify");
const sourcemaps = require("gulp-sourcemaps");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect')
const es = require('event-stream');
const rename = require('gulp-rename');
const babelify = require('babelify')
const watchify = require('watchify');
gulp.task("browserify", function () { //合并单个文件 
const boundler = watchify(browserify({ //监听转化为es5
  entries: "./src/entry.js",
  debug: true /*告知browserify在运行同时生成内联sourcemap用于调试*/
}).transform(babelify))

return boundler.bundle()
  .pipe(source("bundle.js"))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest("./dist"))
  .pipe(connect.reload())
});

gulp.task("watch", () =>{
    gulp.watch('./src/*.js', ['browserify'])
})
gulp.task("server",function(){
    connect.server({
        root:'./',
        port:'8008',
        livereload:true
    })
})
gulp.task('run', ['browserify'])
gulp.task('default', ['server', 'watch']);
```
### 下载依赖 全部依赖 先梭哈了再说
``` js{4}
npm i 
// 推荐cnpm i
```

➣ 多个文件入口下的方法：
---
``` js{4}
gulp.task('browEntrigile', function(){  //合并多个入口文件 到多个地址
//定义多个入口文件
    var entityFiles = [
        './src/entry.js',
        './src/entry2.js',
    ];
//遍历映射这些入口文件
    var tasks = entityFiles.map(function(entity){
        return watchify(browserify({entries: [entity]}).transform(babelify))
            .bundle()
            .pipe(source(entity))
            .pipe(rename({
                extname: '.bundle.js',
                dirname: ''
            }))
            .pipe(gulp.dest('./build'))
            .pipe(connect.reload())
    });
//创建一个合并流
    return es.merge.apply(null, tasks);
});
```
# index.html
---
``` js{4}
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    	#pp{position: relative;top:0;left:0;}
    </style>
</head>
<body>
	<p id ="pp">browserify</p>
</body>
<script src="dist/bundle.js"></script>
<!-- <script src="build/entry2.bundle.js"></script> -->
</html>
```
# :最后 调用
---

``` js{4}
npm run start 
```
浏览器自动打开默认端口运行

