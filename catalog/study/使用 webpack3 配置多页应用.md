# 使用 webpack3 配置多页应用

为什么需要使用 webpack 构建多页应用呢？因为某些项目使用 SPA 不太合适（大多是 SEO 的原因），或者您在做项目时有其他的需求。
如果你有如下需求：

使用 ES6 进行开发
期望使用面向对象开发（class）
自动压缩合并 CSS 和 JS 文件
使用 ESLint 进行代码检查
自动生成 HTML 文件
自动抽取 CSS 文件
···
有了这些需求，基本上就必须使用 webpack 了。

安装依赖
---

首先是项目中需要使用的依赖安装。
1. 安装 webpack 和 webpack-dev-server

        npm install webpack webpack-dev-server --save-dev
2. 安装 webpack-merge

        npm install webpack-merge --save-dev
该插件用来对 webpack 配置进行合并操作。

3. 安装 babel 相关插件

        npm install babel-core babel-loader babel-preset-env --save-dev
这系列插件用来对 ES6 语法进行转换。

4. 安装样式处理相关插件

        npm install css-loader style-loader postcss-loader autoprefixer --save-dev
这系列插件用来处理 CSS 样式，其中 autoprefixer 是 postcss 的一个插件，用来自动给 CSS 样式添加前缀。

5. 安装 file-loader

该插件将在导入图片、字体等文件时发挥作用。PS.您也可以安装 url-loader 以实现相同的作用：

        npm install file-loader --save-dev

        npm install url-loader --save-dev

6. 安装 ESLint 相关的插件

        npm install eslint eslint-loader --save-dev
这些插件用来对 JavaScript 代码进行检查。

7. 安装 html-webpack-plugin 插件

        npm install html-webpack-plugin --save-dev
该插件用来自动生成 HTML 文件。

8. 安装 extract-text-webpack-plugin 插件

        npm install extract-text-webpack-plugin --save-dev
该插件用来将 CSS 抽取到独立的文件。

9. 安装 clean-webpack-plugin 插件

        npm install clean-webpack-plugin --save-dev
该插件用来对 dist 文件夹进行清理工作，每次打包时先清理之前的 dist 文件夹。

#### 下面是这些安装了的所有依赖：

        ...
          "devDependencies": {
            "autoprefixer": "^7.1.3",
            "babel-core": "^6.26.0",
            "babel-loader": "^7.1.2",
            "babel-preset-env": "^1.6.0",
            "clean-webpack-plugin": "^0.1.16",
            "css-loader": "^0.28.7",
            "eslint": "^4.6.1",
            "eslint-loader": "^1.9.0",
            "extract-text-webpack-plugin": "^3.0.0",
            "file-loader": "^0.11.2",
            "html-webpack-plugin": "^2.30.1",
            "postcss-loader": "^2.0.6",
            "style-loader": "^0.18.2",
            "url-loader": "^0.5.9",
            "webpack": "^3.5.5",
            "webpack-dev-server": "^2.7.1",
            "webpack-merge": "^4.1.0"
          },
        ...
配置文件划分
----

使用 webpack 进行项目构建时，我们有不同的目的，因此最好将配置文件进行拆分，以适应不同的工作：

        ├─config
        │      config.js
        │      webpack.config.base.js
        │      webpack.config.dev.js
        │      webpack.config.lint.js
        │      webpack.config.prod.js
        │  webpack.config.js
#### 下面是一些配置的说明：

        config.js：一些全局的配置，比如 HTML 文件的路径、publicPath 等
        webpack.config.base.js：最基础的配置文件
        webpack.config.dev.js：开发环境配置文件
        webpack.config.lint.js：使用 ESLint 代码检查时的配置文件
        webpack.config.prod.js：生产环境配置文件
        webpack.config.js：主配置文件，根据环境变量引用相应的环境的配置
这些配置文件之间是通过 webpack-merge 这个插件进行合并的。



配置多页应用的关键点
---

如何使用 webpack 配置多页面应用呢？实现多页面应用的关键点在哪里呢？首先需要简单看一下多页应用和单页应用功能的区别。
#### 单页应用的特点：

只有一个入口页面（index.html）
这个单页页面（index.html）中需要引入打包后的所有 JavaScript 文件
所有的页面内容完全由 JavaScript 生成
单页应用有自己的路由系统，服务器端没有和路由对应的文件
···
#### 多页应用的特点：

每个版块对应一个页面
每个页面需要对公共的 JavaScript 进行引入
每个页面还需要引入和其自身对应的 JavaScript 文件
由于对应了多个页面，因此不是所有页面内容都是由 JavaScript 生成的
没有自己的路由系统，服务器端有对应的静态文件
···
抛开生成页面内容和路由系统，我们可以看到单页应用和多页应用最大的区别就是：

单页应用需要在入口页面引入所有的 JavaScript 文件
多页应用需要在每个页面中引入公共的 JavaScript 文件以及其自身的 JavaScript 文件
由于 CSS 文件是可以由 extract-text-webpack-plugin 这个插件自动提取并插入到 HTML 页面的，因此我们只需要关心如何在 HTML 页面中引入 JavaScript 文件了。
webpack 在打包时，会将入口文件中的 JavaScript 文件打包到某个目标文件中，在不考虑代码分割提取的情况下，一个入口文件会打包为一个目标文件，多个入口文件会打包为多个对应的目标文件。
因此，我们可以将每个多页页面中的特有的 JavaScript 文件作为入口文件，在打包时将对应打包成不同的 bundle 文件（结果文件），如果你想要的话，还可以在打包时进行代码分割处理，将公用代码抽取成一个文件，然后在 HTML 中引入这些 JavaScript 文件就好了。
总结一下，使用 webpack 配置多页应用的关键点在于：

将每个页面中特有的 JavaScript 文件作为入口文件进行打包
在打包后，每个页面中都需要引入这些打包后的文件
您可以在打包时进行公用代码提取，然后在 HTML 文件中引入
说了这么多，其实就是利用了 webpack 多入口文件进行打包。

自动生成 HTML 页面
---

在使用 webpack 对 JavaScript 文件进行打包时，通常需要在打包的文件名中加一个 hash 字符串用来防止缓存，当我们修改了 JavaScript 代码后，打包后的文件名也会发生变化。此时如果手动在 HTML 中引用这些 JavaScript 文件，是非常麻烦的。
因此，我们期望能自动生成 HTML 文件，并自动引用打包后的 JavaScript 文件。所谓自动生成 HTML 文件，可以理解为将源代码的 HTML 复制到目标文件夹中，同时自动引用打包后的 JavaScript 文件。
要完成这项操作，就需要使用前面安装的 html-webpack-plugin 这个插件。


html-webpack-plugin 插件的使用
---

首先，在我的项目中，有这么一些 HTML 页面，将它们放在 html 文件夹中：

        Mode                LastWriteTime         Length Name
        ----                -------------         ------ ----
        -a----         2017/9/5     18:04           1071 company_intro.html
        -a----         2017/9/5     18:04            988 contact_us.html
        -a----         2017/9/5     18:04           1131 cooperate.html
        -a----         2017/9/5     18:04           1244 enterprise_culture.html
        -a----         2017/9/5     18:04           1011 hornors.html
        -a----         2017/9/5     18:04           1365 index.html
        -a----         2017/9/5     18:04           1769 investment.html
        -a----         2017/9/5     18:04           1005 join_us.html
        -a----         2017/9/5     18:04           1037 news_center.html
        -a----         2017/9/5     18:04            987 news_item.html
        -a----         2017/9/5     18:04           1134 operate.html
        -a----         2017/9/5     18:04           1255 product.html
        -a----         2017/9/5     18:04           1132 schools.html
然后，把这些 HTML 文件名（不要后缀）都写在 config.js 文件中，以供取用：

        module.exports = {
            HTMLDirs:[
                "index",
                "company_intro",
                "enterprise_culture",
                "hornors",
                "news_center",
                "news_item",
                "product",
                "schools",
                "operate",
                "cooperate",
                "join_us",
                "contact_us",
                "investment"
            ],
        }
HTMLDirs 是一个数组，其中保存了项目中会用到的所有 HTML 页面。
接下来，每个 HTML 页面都对应一份 JavaScript 代码，因此在 js 文件夹中建立对应的 JavaScript 文件：

        Mode                LastWriteTime         Length Name
        ----                -------------         ------ ----
        -a----         2017/9/5     18:04           2686 company_intro.js
        -a----         2017/9/5     18:04            594 contact_us.js
        -a----         2017/9/5     18:04           1725 cooperate.js
        -a----         2017/9/8     16:54           3505 enterprise_culture.js
        -a----         2017/9/5     18:04           2208 hornors.js
        -a----         2017/9/8     16:54           4491 index.js
        -a----         2017/9/5     18:04           3180 investment.js
        -a----         2017/9/5     18:04           1327 join_us.js
        -a----         2017/9/8     16:55           3689 news_center.js
        -a----         2017/9/5     18:04           1972 news_item.js
        -a----         2017/9/5     18:04           2728 operate.js
        -a----         2017/9/5     18:04           2664 product.js
        -a----         2017/9/5     18:04           2476 schools.js
这两项是必须的，只有提供了每个页面的 HTML 文件和对应的 JavaScript 文件，才能构建多页面应用。
同时，可能每个页面都有自己的样式，因此您也可以在 css 文件夹中建立一些样式文件：

        Mode                LastWriteTime         Length Name
        ----                -------------         ------ ----
        -a----         2017/9/5     18:04            419 company_intro.css
        -a----         2017/9/5     18:04            167 contact_us.css
        -a----         2017/9/5     18:04            214 cooperate.css
        -a----         2017/9/5     18:04            926 enterprise_culture.css
        -a----         2017/9/5     18:04            255 hornors.css
        -a----         2017/9/5     18:04            693 investment.css
        -a----         2017/9/5     18:04            136 join_us.css
        -a----         2017/9/5     18:04            541 news_center.css
        -a----         2017/9/5     18:04            623 news_item.css
        -a----         2017/9/5     18:04            342 operate.css
        -a----         2017/9/5     18:04            236 product.css
        -a----         2017/9/5     18:04            213 schools.css
关于建立样式这一项，不是必须的。
最后，我们就可以使用 html-webpack-plugin 这个插件来自动生成 HTML 文件了，html-webpack-plugin 插件的用法如下：

        // 引入插件
        const HTMLWebpackPlugin = require("html-webpack-plugin");
        // 引入多页面文件列表
        const { HTMLDirs } = require("./config");
        // 通过 html-webpack-plugin 生成的 HTML 集合
        let HTMLPlugins = [];
        // 入口文件集合
        let Entries = {}

        // 生成多页面的集合
        HTMLDirs.forEach((page) => {
            const htmlPlugin = new HTMLWebpackPlugin({
                filename: `${page}.html`,
                template: path.resolve(__dirname, `../app/html/${page}.html`),
                chunks: [page, 'commons'],
            });
            HTMLPlugins.push(htmlPlugin);
            Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
        })
在上面的代码中，首先引入了所需的插件和变量，然后利用 html-webpack-plugin 循环生成 HTML 页面。
简单说下 HTMLWebpackPlugin 构造函数的几个参数：

filename：生成的 HTML 文件名，我这里选择和原始文件名保持一致
template：生成 HTML 文件使用的模板，也就是我们之前在 html 文件夹中建立的那些文件
chunks：生成 HTML 文件时会自动插入相应的代码片段（也就是 JavaScript 文件），我这里选择插入每个页面对应的 JavaScript 文件，以及最后提取出来的公共文件代码块。
关于 chunks 还需要说明一点，chunks 是一个数组，在生成 HTML 文件时会将数组中的对应的 JavaScript 片段自动插入到 HTML 中，这些片段也就是 webpack 打包时的 output 选项中的 [name]。这里只需要写上 [name] 值就行了，无需使用打包生成的完整名称，因为这会还没开始打包呢，打包后生成的名称咱也不知道。
最后，我们把这些生成 HTML 文件的配置插入到 HTMLPlugins 这个数组中，同时设置 webpack 的入口文件。

目录划分
---

在这个脚手架中，我是这样划分项目结构的：

        ├─app
        │  ├─css
        │  ├─html
        │  ├─img
        │  ├─js
        │  └─lib
        ├─config
        └─dist
            ├─css
            ├─img
            └─js
        其中 app 是项目的源码，config 是 webpack 相关的一些配置文件，dist 是存放打包后的文件，是由 webpack 自动生成的。
        更详细的文件结构如下：

        │  .babelrc
        │  .eslintrc.js
        │  .gitignore
        │  package.json
        │  postcss.config.js
        │  webpack.config.js
        │  
        ├─app
        │  │  favicon.ico
        │  │  
        │  ├─css
        │  │      main.css
        │  │      
        │  ├─html
        │  │      index.html
        │  │    
        │  │      
        │  ├─img
        │  │      back.png
        │  │      
        │  ├─js
        │  │      ajax.js
        │  │      footer.js
        │  │      index.js
        │  │      nav.js
        │  │      public.js
        │  │      tity_nav.js
        │  │      
        │  └─lib
        │        flexible.js
        │        normalize.css
        │        swiper.css
        │        swiper.js
        │        
        └─config
                config.js
                webpack.config.base.js
                webpack.config.dev.js
                webpack.config.lint.js
                webpack.config.prod.js



package.json
---

所有的功能都是从 package.json 的 scripts 入口开始执行的，我想要脚手架有以下功能：

* 开发环境构建
* 生产环境构建
* ESLint 代码检查环境
* 生产环境构建后的服务器预览环境
* 在开发或代码检查环境，需要启用 webpack-dev-server 命令，生产环境构建需要启用 webpack 命令，预览环境需要启用 http-server 环境。
* 上文介绍时把 http-server 给落下了，您现在可以进行如下安装：

        npm install http-server --save-dev

scripts 命令行配置如下：

          "scripts": {
            "dev": "set NODE_ENV=dev && webpack-dev-server --open",
            "build": "set NODE_ENV=prod && webpack -p",
            "lint": "set NODE_ENV=lint && webpack-dev-server --open",
            "serve": "http-server ./dist -p 8888 -o",
            "serve2": "http-server ./dist -p 8888"
          },
下面是整个 package.json 文件：

        {
          "name": "xxx",
          "version": "1.0.0",
          "description": "",
          "main": "index.js",
          "scripts": {
            "dev": "set NODE_ENV=dev && webpack-dev-server --open",
            "build": "set NODE_ENV=prod && webpack -p",
            "lint": "set NODE_ENV=lint && webpack-dev-server --open",
            "serve": "http-server ./dist -p 8888 -o",
            "serve2": "http-server ./dist -p 8888"
          },
          "author": "",
          "license": "ISC",
          "devDependencies": {
            "autoprefixer": "^7.1.3",
            "babel-core": "^6.26.0",
            "babel-loader": "^7.1.2",
            "babel-plugin-transform-es2015-spread": "^6.22.0",
            "babel-preset-env": "^1.6.0",
            "clean-webpack-plugin": "^0.1.16",
            "css-loader": "^0.28.7",
            "eslint": "^4.5.0",
            "eslint-loader": "^1.9.0",
            "extract-text-webpack-plugin": "^3.0.0",
            "file-loader": "^0.11.2",
            "html-webpack-plugin": "^2.30.1",
            "http-server": "^0.10.0",
            "postcss-loader": "^2.0.6",
            "style-loader": "^0.18.2",
            "url-loader": "^0.5.9",
            "webpack": "^3.5.5",
            "webpack-dev-server": "^2.7.1",
            "webpack-merge": "^4.1.0"
          },
          "dependencies": {}
        }
启用环境
----
如果您想启用某个环境，需要使用 npm run xxx 命令：

* npm run dev：进入开发环境
* npm run build：进入生产环境
* npm run lint：执行代码检查
* npm run serve：服务器环境下预览（打开浏览器）
* npm run serve2：服务器环境下预览（不打开浏览器）
默认情况下，使用这些命令都会先引入和 package.js 同目录下的 webpack.config.js 文件。由于我们不会将所有的配置都放在 webpack.config.js 中，而是过环境变量进行区分，在 webpack.config.js 中引用其他的配置文件。
设置环境变量采用的语法：

set NODE_ENV=xxx
这里我们为开发、生产、代码检查和预览这几个环境设置了环境变量。

* webpack.config.js

* webpack.config.js 文件比较简单，只有两行代码，其作用就是用来引用其他的配置文件：

        // 获取环境命令，并去除首尾空格
        const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig,"");
        // 根据环境变量引用相关的配置文件
        module.exports = require(`./config/webpack.config.${env}.js`)
        webpack.config.base.js

webpack.config.base.js 是最基础的配置文件，包含了这些环境都可能使用到的配置。
#### 1）相关插件引入
---

        const path = require("path");
        // 引入插件
        const HTMLWebpackPlugin = require("html-webpack-plugin");
        // 清理 dist 文件夹
        const CleanWebpackPlugin = require("clean-webpack-plugin")
        // 抽取 css
        const ExtractTextPlugin = require("extract-text-webpack-plugin");
#### 2）自动生成 HTML 的配置

        // 引入多页面文件列表
        const config = require("./config");
        // 通过 html-webpack-plugin 生成的 HTML 集合
        let HTMLPlugins = [];
        // 入口文件集合
        let Entries = {}

        // 生成多页面的集合
        config.HTMLDirs.forEach((page) => {
            const htmlPlugin = new HTMLWebpackPlugin({
                filename: `${page}.html`,
                template: path.resolve(__dirname, `../app/html/${page}.html`),
                chunks: [page, 'commons'],
            });
            HTMLPlugins.push(htmlPlugin);
            Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
        })
#### 3）主配置文件一览

        module.exports = {
            // 入口文件
            entry:Entries,
            // 启用 sourceMap
            devtool:"cheap-module-source-map",
            // 输出文件
            output:{},
            // 加载器
            module:{
                rules:[
                ],
            },
            // 插件
            plugins:[],
        }
#### 4）配置 css 加载器

        {
            // 对 css 后缀名进行处理
            test:/\.css$/,
            // 不处理 node_modules 文件中的 css 文件
            exclude: /node_modules/,
            // 抽取 css 文件到单独的文件夹
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                // 设置 css 的 publicPath
                publicPath: config.cssPublicPath,
                use: [{
                        loader:"css-loader",
                        options:{
                            // 开启 css 压缩
                            minimize:true,
                        }
                    },
                    {
                        loader:"postcss-loader",
                    }
                ]
            })
        },
这里有两点需要说明：
A.publicPath：在 css 中设置背景图像的 url 时，经常会找不到图片（默认会在 css 文件所在的文件夹中寻找），这里设置 extract-text-webpack-plugin 插件的 publicPath 为图片文件夹所在的目录，就可以顺利找到图片了。
在 config.js 中，设置 cssPublicPath 的值：

cssPublicPath:"../"
B.postcss 我主要用来自动添加 css 前缀以及一点美化操作，在使用 postcss 时，需要在 postcss.config.js 中进行配置：

        module.exports = {  
          plugins: {  
            'autoprefixer': {
                browsers: ['last 5 version','Android >= 4.0'],
                //是否美化属性值 默认：true 
                cascade: true,
                //是否去掉不必要的前缀 默认：true 
                remove: true
            }  
          }  
        }  
#### 5）配置 js 加载器
js 加载器的配置如下：

        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        },
#### 6）配置图片加载器
图片加载器的配置如下：

        {
            test: /\.(png|svg|jpg|gif)$/,
            use:{
                loader:"file-loader",
                options:{
                    // 打包生成图片的名字
                    name:"[name].[ext]",
                    // 图片的生成路径
                    outputPath:config.imgOutputPath
                }
            }
        },
outputPath 规定了输出图片的位置，默认情况下，图片在打包时会和所有的 HTML/CSS/JS 文件打包到一起，通过设置 outputPath 值可以将所有的图片都打包到一个单独的文件中。
设置 config.js 的 imgOutputPath：

imgOutputPath:"img/",
在打包时，会将所有的图片打包到 dist 文件夹下的 img 文件夹中。
#### 7）配置自定义字体加载器
自定义字体加载器的配置如下：

        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use:["file-loader"]
        }
#### 8）插件配置
插件配置如下：

        plugins:[
            // 自动清理 dist 文件夹
            new CleanWebpackPlugin(["dist"]),
            // 将 css 抽取到某个文件夹
            new ExtractTextPlugin(config.cssOutputPath),        
            // 自动生成 HTML 插件
            ...HTMLPlugins
        ],
同打包图片，在抽取 css 时也可以指定抽取的目录，只需将路径传入 extract-text-webpack-plugin 插件的构造函数中。
配置 config.js 的 cssOutputPath 选项：

cssOutputPath:"./css/styles.css",
这里将所有的 css 提取到 dist 文件夹下的 css 文件夹中，并命名为 style.css。

webpack.config.base.js 详细配置

下面是 webpack.config.base.js 的详细配置文件：

          const path = require("path");
          // 引入插件
          const HTMLWebpackPlugin = require("html-webpack-plugin");
          // 清理 dist 文件夹
          const CleanWebpackPlugin = require("clean-webpack-plugin")
          // 抽取 css
          const ExtractTextPlugin = require("extract-text-webpack-plugin");
          // 引入多页面文件列表
          const config = require("./config");
          // 通过 html-webpack-plugin 生成的 HTML 集合
          let HTMLPlugins = [];
          // 入口文件集合
          let Entries = {}

          // 生成多页面的集合
          config.HTMLDirs.forEach((page) => {
              const htmlPlugin = new HTMLWebpackPlugin({
                  filename: `${page}.html`,
                  template: path.resolve(__dirname, `../app/html/${page}.html`),
                  chunks: [page, 'commons'],
              });
              HTMLPlugins.push(htmlPlugin);
              Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
          })

          module.exports = {
              entry:Entries,
              devtool:"cheap-module-source-map",
              output:{
                  filename:"js/[name].bundle.[hash].js",
                  path:path.resolve(__dirname,"../dist")
              },
              // 加载器
              module:{
                  rules:[
                      {
                          // 对 css 后缀名进行处理
                          test:/\.css$/,
                          // 不处理 node_modules 文件中的 css 文件
                          exclude: /node_modules/,
                          // 抽取 css 文件到单独的文件夹
                          use: ExtractTextPlugin.extract({
                              fallback: "style-loader",
                              // 设置 css 的 publicPath
                              publicPath: config.cssPublicPath,
                              use: [{
                                      loader:"css-loader",
                                      options:{
                                          // 开启 css 压缩
                                          minimize:true,
                                      }
                                  },
                                  {
                                      loader:"postcss-loader",
                                  }
                              ]
                          })
                      },
                      {
                          test: /\.js$/,
                          exclude: /node_modules/,
                          use: {
                              loader: 'babel-loader',
                              options: {
                                  presets: ['env']
                              }
                          }
                      },
                      {
                          test: /\.(png|svg|jpg|gif)$/,
                          use:{
                              loader:"file-loader",
                              options:{
                                  // 打包生成图片的名字
                                  name:"[name].[ext]",
                                  // 图片的生成路径
                                  outputPath:config.imgOutputPath
                              }
                          }
                      },
                      {
                          test: /\.(woff|woff2|eot|ttf|otf)$/,
                          use:["file-loader"]
                      }
                  ],
              },
              plugins:[
                  // 自动清理 dist 文件夹
                  new CleanWebpackPlugin(["dist"]),
                  // 将 css 抽取到某个文件夹
                  new ExtractTextPlugin(config.cssOutputPath),        
                  // 自动生成 HTML 插件
                  ...HTMLPlugins
              ],
          }


webpack.config.dev.js
---

这个配置文件主要用来在开发环境使用，需要 webpack-dev-server 这个插件提供支持。该文件的配置如下：

        // 引入基础配置文件
        const webpackBase = require("./webpack.config.base");
        // 引入 webpack-merge 插件
        const webpackMerge = require("webpack-merge");
        // 引入配置文件
        const config = require("./config");
        // 合并配置文件
        module.exports = webpackMerge(webpackBase,{
            // 配置 webpack-dev-server
            devServer:{
                // 项目根目录
                contentBase:config.devServerOutputPath,
                // 错误、警告展示设置
                overlay:{
                    errors:true,
                    warnings:true
                }
            }
        });
其中，webpack-merge 这个插件用来对配置文件进行合并，在 webpack.config.base.js 的基础上合并新的配置。
devServer 配置项的 contentBase 项是项目的根目录，也就是我们的 dist 目录，区别在于这个 dist 目录不是硬盘上的 dist 目录，而是存在于内存中的 dist 目录。在使用 webpack-dev-server 时，将会以这个内存中的 dist 目录作为根目录。
devServer 的 overlay 选项中设置了展示错误和警告，这样当代码发生错误时，会将错误信息投射到浏览器上，方便我们开发。
这里将 contentBase 指向了 config 中的一个配置：

        devServerOutputPath:"../dist",
        webpack.config.prod.js

该配置文件用来在生产环境启用，主要用来压缩、合并和抽取 JavaScript 代码，并将项目文件打包至硬盘上的 dist 文件夹中。

        // 引入基础配置
        const webpackBase = require("./webpack.config.base");
        // 引入 webpack-merge 插件
        const webpackMerge = require("webpack-merge");
        // 引入 webpack
        const webpack = require("webpack");
        // 合并配置文件
        module.exports = webpackMerge(webpackBase,{
            plugins:[
                // 代码压缩
                new webpack.optimize.UglifyJsPlugin({
                    // 开启 sourceMap
                    sourceMap: true
                }),
                // 提取公共 JavaScript 代码
                new webpack.optimize.CommonsChunkPlugin({
                    // chunk 名为 commons
                    name: "commons",
                    filename: "[name].bundle.js",
                }),
            ]
        });
在抽取公共的 JavaScript 代码时，我们将公共代码抽取为 commons.bundle.js，这个公共代码的 chunk（name）名就是 commons，在使用 html-webpack-plugin 自动生成 HTML 文件时会引用这个 chunk。

        webpack.config.lint.js

这项配置用来进行代码检查，配置如下：

        const webpackBase = require("./webpack.config.base");
        const webpackMerge = require("webpack-merge");
        const config = require("./config");
        module.exports = webpackMerge(webpackBase,{
            module:{
                rules:[
                    {
                        test: /\.js$/,
                        // 强制先进行 ESLint 检查
                        enforce: "pre",
                        // 不对 node_modules 和 lib 文件夹中的代码进行检查
                        exclude: /node_modules|lib/,
                        loader: "eslint-loader",
                        options: {
                            // 启用自动修复
                            fix:true,
                            // 启用警告信息
                            emitWarning:true,
                        }
                    },
                ]
            },
            devServer:{
                contentBase:config.devServerOutputPath,
                overlay:{
                    errors:true,
                    warnings:true
                }
            }
        });
在使用 eslint-loader 时，我们设置了 enforce:"pre" 选项，这个选项表示在处理 JavaScript 之前先启用 ESLint 代码检查，然后再使用 babel 等 loader 对 JavaScript 进行编译。
在 eslint-loader 的 options 选项中，设置了自动修复和启用警告信息，这样当我们的代码出现问题时，ESLint 会首先尝试自动修复（如将双引号改为单引号），对于无法自动修复的问题，将以警告或错误的信息进行展示。

配置 .eslintrc.js
----
要想使用 ESLint 进行代码检查，除了使用 eslint-loader 之外，还需针对 ESLint 本身进行配置，这就需要一个 .eslintrc.js 文件。该文件的配置如下：

        module.exports = {
          env: {
            browser: true,
            commonjs: true,
            es6: true,
            node: true,
          },
          extends: 'eslint:recommended',
          parserOptions: {
            sourceType: 'module',
          },
          rules: {
            'comma-dangle': ['error', 'always-multiline'],
            indent: ['error', 2],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'no-unused-vars': ['warn'],
            'no-console': 0,
          },
        };

package.json
----
        {
          "name": "xxx",
          "version": "1.0.0",
          "description": "",
          "main": "index.js",
          "scripts": {
            "dev": "set NODE_ENV=dev && webpack-dev-server --open",
            "build": "set NODE_ENV=prod && webpack -p",
            "lint": "set NODE_ENV=lint && webpack-dev-server --open",
            "serve": "http-server ./dist -p 8888 -o",
            "serve2": "http-server ./dist -p 8888"
          },
          "author": "",
          "license": "ISC",
          "devDependencies": {
            "autoprefixer": "^7.1.3",
            "babel-core": "^6.26.0",
            "babel-loader": "^7.1.2",
            "babel-plugin-transform-es2015-spread": "^6.22.0",
            "babel-preset-env": "^1.6.0",
            "clean-webpack-plugin": "^0.1.16",
            "css-loader": "^0.28.7",
            "eslint": "^4.5.0",
            "eslint-loader": "^1.9.0",
            "extract-text-webpack-plugin": "^3.0.0",
            "file-loader": "^0.11.2",
            "html-webpack-plugin": "^2.30.1",
            "http-server": "^0.10.0",
            "postcss-loader": "^2.0.6",
            "style-loader": "^0.18.2",
            "url-loader": "^0.5.9",
            "webpack": "^3.5.5",
            "webpack-dev-server": "^2.7.1",
            "webpack-merge": "^4.1.0"
          },
          "dependencies": {}
        }
.gitignore
----
        node_modules
        dist
        npm-debug.log
.babelrc

        {
            "plugins": ["transform-es2015-spread"]
        }
.eslintrc.js
----
        module.exports = {
          env: {
            browser: true,
            commonjs: true,
            es6: true,
            node: true,
          },
          extends: 'eslint:recommended',
          parserOptions: {
            sourceType: 'module',
          },
          rules: {
            'comma-dangle': ['error', 'always-multiline'],
            indent: ['error', 2],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'no-unused-vars': ['warn'],
            'no-console': 0,
          },
        };
postcss.config.js
----
        module.exports = {  
          plugins: {  
            'autoprefixer': {
                browsers: ['last 5 version','Android >= 4.0'],
                //是否美化属性值 默认：true 
                cascade: true,
                //是否去掉不必要的前缀 默认：true 
                remove: true
            }  
          }  
        }  
config.js
----
        module.exports = {
            HTMLDirs:[
                "index",
                "company_intro",
                "enterprise_culture",
                "hornors",
                "news_center",
                "news_item",
                "product",
                "schools",
                "operate",
                "cooperate",
                "join_us",
                "contact_us",
                "investment"
            ],
            cssPublicPath:"../",
            imgOutputPath:"img/",
            cssOutputPath:"./css/styles.css",
            devServerOutputPath:"../dist",

        }
webpack.config.js
----
        // 获取环境命令，并去除首尾空格
        const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig,"");
        // 根据环境变量引用相关的配置文件
        module.exports = require(`./config/webpack.config.${env}.js`)
        webpack.config.base.js

        const path = require("path");
        // 引入插件
        const HTMLWebpackPlugin = require("html-webpack-plugin");
        // 清理 dist 文件夹
        const CleanWebpackPlugin = require("clean-webpack-plugin")
        // 抽取 css
        const ExtractTextPlugin = require("extract-text-webpack-plugin");
        // 引入多页面文件列表
        const config = require("./config");
        // 通过 html-webpack-plugin 生成的 HTML 集合
        let HTMLPlugins = [];
        // 入口文件集合
        let Entries = {}

        // 生成多页面的集合
        config.HTMLDirs.forEach((page) => {
            const htmlPlugin = new HTMLWebpackPlugin({
                filename: `${page}.html`,
                template: path.resolve(__dirname, `../app/html/${page}.html`),
                chunks: [page, 'commons'],
            });
            HTMLPlugins.push(htmlPlugin);
            Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
        })

        module.exports = {
            entry:Entries,
            devtool:"cheap-module-source-map",
            output:{
                filename:"js/[name].bundle.[hash].js",
                path:path.resolve(__dirname,"../dist")
            },
            // 加载器
            module:{
                rules:[
                    {
                        // 对 css 后缀名进行处理
                        test:/\.css$/,
                        // 不处理 node_modules 文件中的 css 文件
                        exclude: /node_modules/,
                        // 抽取 css 文件到单独的文件夹
                        use: ExtractTextPlugin.extract({
                            fallback: "style-loader",
                            // 设置 css 的 publicPath
                            publicPath: config.cssPublicPath,
                            use: [{
                                    loader:"css-loader",
                                    options:{
                                        // 开启 css 压缩
                                        minimize:true,
                                    }
                                },
                                {
                                    loader:"postcss-loader",
                                }
                            ]
                        })
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env']
                            }
                        }
                    },
                    {
                        test: /\.(png|svg|jpg|gif)$/,
                        use:{
                            loader:"file-loader",
                            options:{
                                // 打包生成图片的名字
                                name:"[name].[ext]",
                                // 图片的生成路径
                                outputPath:config.imgOutputPath
                            }
                        }
                    },
                    {
                        test: /\.(woff|woff2|eot|ttf|otf)$/,
                        use:["file-loader"]
                    }
                ],
            },
            plugins:[
                // 自动清理 dist 文件夹
                new CleanWebpackPlugin(["dist"]),
                // 将 css 抽取到某个文件夹
                new ExtractTextPlugin(config.cssOutputPath),        
                // 自动生成 HTML 插件
                ...HTMLPlugins
            ],
        }
webpack.config.dev.js
----
        // 引入基础配置文件
        const webpackBase = require("./webpack.config.base");
        // 引入 webpack-merge 插件
        const webpackMerge = require("webpack-merge");
        // 引入配置文件
        const config = require("./config");
        // 合并配置文件
        module.exports = webpackMerge(webpackBase,{
            // 配置 webpack-dev-server
            devServer:{
                // 项目根目录
                contentBase:config.devServerOutputPath,
                // 错误、警告展示设置
                overlay:{
                    errors:true,
                    warnings:true
                }
            }
        });
webpack.config.prod.js
----

        // 引入基础配置
        const webpackBase = require("./webpack.config.base");
        // 引入 webpack-merge 插件
        const webpackMerge = require("webpack-merge");
        // 引入 webpack
        const webpack = require("webpack");
        // 合并配置文件
        module.exports = webpackMerge(webpackBase,{
            plugins:[
                // 代码压缩
                new webpack.optimize.UglifyJsPlugin({
                    // 开启 sourceMap
                    sourceMap: true
                }),
                // 提取公共 JavaScript 代码
                new webpack.optimize.CommonsChunkPlugin({
                    // chunk 名为 commons
                    name: "commons",
                    filename: "[name].bundle.js",
                }),
            ]
        });
webpack.config.lint.js
----
        const webpackBase = require("./webpack.config.base");
        const webpackMerge = require("webpack-merge");
        const config = require("./config");
        module.exports = webpackMerge(webpackBase,{
            module:{
                rules:[
                    {
                        test: /\.js$/,
                        // 强制先进行 ESLint 检查
                        enforce: "pre",
                        // 不对 node_modules 和 lib 文件夹中的代码进行检查
                        exclude: /node_modules|lib/,
                        loader: "eslint-loader",
                        options: {
                            // 启用自动修复
                            fix:true,
                            // 启用警告信息
                            emitWarning:true,
                        }
                    },
                ]
            },
            devServer:{
                contentBase:config.devServerOutputPath,
                overlay:{
                    errors:true,
                    warnings:true
                }
            }
        });
项目结构
----
        │  .babelrc
        │  .eslintrc.js
        │  .gitignore
        │  package.json
        │  postcss.config.js
        │  webpack.config.js
        │  
        ├─app
        │  │  favicon.ico
        │  │  
        │  ├─css
        │  │      main.css
        │  │      
        │  ├─html
        │  │      index.html
        │  │    
        │  │      
        │  ├─img
        │  │      back.png
        │  │      
        │  ├─js
        │  │      ajax.js
        │  │      footer.js
        │  │      index.js
        │  │      nav.js
        │  │      public.js
        │  │      tity_nav.js
        │  │      
        │  └─lib
        │        flexible.js
        │        normalize.css
        │        swiper.css
        │        swiper.js
        │        
        └─config
                config.js
                webpack.config.base.js
                webpack.config.dev.js
                webpack.config.lint.js
                webpack.config.prod.js
- - - 
- - - 
- - - 
- - - 

注释：
---
#### 想引用jquery而不是每个页面都引用只需要：
#### 引入jquery后如果开启lint检查模式 可以正常使用的前提是每个页面都require 一次
* webpack.config.base.js

        cnpm i jquery --save
        
        const ProvidePlugin = new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
        });



#### 引入sass 
* webpack.config.base.js

        {
            // s?css => scss或者css
            test:/\.s?css$/,
            // 不处理 node_modules 文件中的 css 文件
            exclude: /node_modules/,
            // 抽取 css 文件到单独的文件夹
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                // 设置 css 的 publicPath
                publicPath: config.cssPublicPath,//在 css 中设置背景图像的 url 时，经常会找不到图片（默认会在 css 文件所在的文件夹中寻找），这里设置 extract-text-webpack-plugin 插件的 publicPath 为图片文件夹所在的目录，就可以顺利找到图片了
                use: [{
                        loader:"css-loader",
                        options:{
                            // 开启 css 压缩
                            minimize:true,
                        }
                    },
                    {
                        loader:"postcss-loader",
                    },
                    {
                        loader:"sass-loader", 
                        //启用sass 虽然在这只写了sass-loader 但还要下载node-sass
                    }
                ]
            })
        },


#### 如果import了类似swiper这种库函数 但不处理modules里面的swiper,所以这里要允许除了node_modules里面的swiper的其他所有文件
* webpack.config.base.js

        {
            test: /\.js$/,
            exclude: /^node_modules*swiper$/, 
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        },
