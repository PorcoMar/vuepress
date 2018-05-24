---
title: "➹ WePY总结"
lang: en-US
---

介绍
===
WePY资源汇总：[➳ awesome-wepy](https://github.com/aben1188/awesome-wepy)
::: danger Wepy
WePY是一款让小程序支持组件化开发的框架，通过预编译的手段让开发者可以选择自己喜欢的开发风格去开发小程序。框架的细节优化，Promise，Async Functions的引入都是为了能让开发小程序项目变得更加简单，高效。
同时WePY也是一款成长中的框架，大量吸收借鉴了一些优化前端工具以及框架的设计理念和思想。
:::
### 特性：

类Vue开发风格
支持自定义组件开发
支持引入NPM包
支持Promise
支持ES2015+特性，如Async Functions
支持多种编译器，Less/Sass/Stylus/PostCSS、Babel/Typescript、Pug
支持多种插件处理，文件压缩，图片压缩，内容替换等
支持 Sourcemap，ESLint等
小程序细节优化，如请求列队，事件优化等

➣ 解决问题：
---
<h3>开发模式转换：</h3>

  * 在原有的小程序的开发模式下进行再次封装，更贴近于现有MVVM框架开发模式。框架在开发过程中参考了一些现在框架的一些特性，并且融入其中

<h3>支持组件化开发。</h3>

<h3>支持加载外部NPM包。</h3>

<h3>单文件模式，使得目录结构更加清晰。</h3>

  * 官方目录结构要求app必须有三个文件app.json，app.js，app.wxss，页面有4个文件 index.json，index.js，index.wxml，index.wxss。而且文件必须同名。

<h3>默认使用babel编译，支持ES6/7的一些新特性。</h3>

* 用户可以通过修改wepy.config.js(老版本使用.wepyrc)配置文件，配置自己熟悉的babel环境进行开发。默认开启使用了一些新的特性如promise，async/await等等。
<h3>针对原生API进行优化。</h3>

* 对现在API进行promise处理，同时修复一些现有API的缺陷，比如：wx.request并发问题等。
 原有代码：
``` js{4}
onLoad = function () {
    var self = this;
    wx.login({
        success: function (data) {
            wx.getUserInfo({
                success: function (userinfo) {
                    self.setData({userInfo: userinfo});
                }
            });
        }
    });
}
```
基于wepy实现代码：
``` js{4}
async onLoad() {
    await wx.login();
    this.userInfo = await wx.getUserInfo();
}
```
在同时并发10个request请求测试时wepy不会报请求过多

➣ 安装使用
---
安装（更新） wepy 命令行工具。
``` js{4}
npm install wepy-cli -g
```
生成开发示例
``` js{4}
wepy init standard myproject
```
安装依赖
``` js{4}
cd myproject
npm install
```
开发实时编译
``` js{4}
wepy build --watch
```
开发者工具导入项目

使用微信开发者工具新建项目，本地开发选择项目根目录，会自动导入项目配置。

➣ 基本配置
---

* 项目目录结构
``` js{4}
dist
node_modules
src
    components
        com_a.wpy
        com_b.wpy
    pages
        index.wpy
        page2.wpy
    app.wpy
package.json
```
* /src/config/index.js
``` js{4}
export const CONFIG = {
  VERSION: '1.0.0',  //* 版本号
  TEST_API_URL: 'https://ssl.xxxxx.com_test',  //* 测试环境
  YUFA_API_URL: 'https://ssl.xxxx.com/xcxapi_yufa', //* 预发环境
  PROD_API_URL: 'https://ssl.xxxx.com/xcxapi_online', //* 正式环境
  ENV: 'DEV', //* DEV--测试 PRE--语法 PROD--正式
  STORAGE_PREFIX: "YIZHEN__YUESAO__", //* LocalStorage前缀
  USER: 'TEST', // * DEV -- 开发者 TEST -- 测试  USER -- 用户
}
```
* /src/style/common.css
``` js{4}
$color: #4f4f4f;
```
### app.wpy
* /src/app.wpy
``` js{4}
<style type="less">
  @import './styles/common.less';
</style>

<script>
import wepy from 'wepy'
import 'wepy-async-function'
import { CONFIG } from './config'

var APIURL
let VERSION = CONFIG.VERSION
switch (CONFIG.ENV) {
  case 'DEV':
    APIURL = CONFIG.TEST_API_URL
    break
  case 'PRE':
    APIURL = CONFIG.YUFA_API_URL
    break
  case 'PROD':
    APIURL = CONFIG.PROD_API_URL
    break
  default:
    APIURL = CONFIG.PROD_API_URL
    break
}

export default class extends wepy.app {
  config = {
    pages: [
      'pages/my/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fd5a5f',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: '#ffffff'
    },
    tabBar: {
      borderStyle: 'black',
      selectedColor: '#fd5a5f',
      list: [
        {
          pagePath: 'pages/my/index',
          text: '我的',
          iconPath: 'images/tabBar/my@2x.png',
          selectedIconPath: 'images/tabBar/my@2x-z.png'
        }
      ]
    }
  }

  globalData = {
    APIURL: APIURL,
    HEADER: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'xcx-version': VERSION,
      'xcx-name': 'admin'
    },
    role: null,
    user: null,
    openId: null,
    unionId: null,
    userinfo_wx: null,
    session_key: null
  }

  constructor () {
    super()
    this.use('requestfix')
  }

  onLaunch() {
    console.log('小程序版本号: ', VERSION, '请求接口地址: ', APIURL)
  }
}

```
➣ 详细配置
---
### httpRequest.js
* 我们先写一个基于Promise的request请求
* /src/utils/httpRequest.js

``` js{4}
import wepy from 'wepy'
import 'wepy-async-function'
import { CONFIG } from '../config'
import Storage from './Storage'

// 接口
var APIURL
let VERSION = CONFIG.VERSION
switch (CONFIG.ENV) {
  case 'DEV':
    APIURL = CONFIG.TEST_API_URL
    break
  case 'PRE':
    APIURL = CONFIG.YUFA_API_URL
    break
  case 'PROD':
    APIURL = CONFIG.PROD_API_URL
    break
  default:
    APIURL = CONFIG.PROD_API_URL
    break
}

/**
 * 获取数据
 *
 * @param {String} context 上下文
 * @param {String} api 接口地址
 * @param {Object} data 请求数据
 * @param {Boolean} needLogin 是否需要登录
 * @param {Boolean} isShare 是否是分享页
 */

export const httpRequest = (globalData, api, data, needLogin = true, isShare = false) => {
  if (CONFIG.USER === 'DEV') {
    globalData.HEADER.staffuid = 4
  }
  // 需要登录的接口
  if (needLogin && CONFIG.USER !== 'DEV') {
    if (!(globalData.HEADER.staffuid)) {
      let storage = new Storage()
      storage.removeValueFromStorage(`${CONFIG.STORAGE_PREFIX}USER`)
      storage.removeValueFromStorage(`${CONFIG.STORAGE_PREFIX}ROLE`)
      storage.removeValueFromStorage(`${CONFIG.STORAGE_PREFIX}STAFFUID`)
      delete globalData.HEADER.staffuid
      globalData.HEADER =  {
        'Content-Type': 'application/x-www-form-urlencoded',
        'xcx-version': CONFIG.VERSION,
        'xcx-name': 'admin'
      }

      wepy.redirectTo({
        url: '/pages/my/login'
      })

      return false
    }
  }

  wepy.showToast({
    title: '加载中...',
    icon: 'loading',
    duration: 100000,
    mask: true
  })

  return new Promise((resolve, reject) => {
    wepy.request({
      url: APIURL + api,
      method: 'POST',
      header: globalData.HEADER,
      data: data,
      success: (res) => {
        console.log('请求成功', api, data, res)
        wepy.hideToast()
        resolve(res)
      },
      fail: (res) => {
        wx.showToast({
          icon: 'loading',
          title: '请检查网络'
        })
      }
    })
  })
}

```
### index.wpy
* /src/pages/my/index.wpy 业务页面中需要引用的既可以使用AMD方式也可以使用CMD方式 
这里我们引用了一个搜索组件search.wpy,接下来会展示该组件的写法
``` js{4}
<style>
.flex(@align: flex-start, @just: flex-start, @dirction: row){
  display:flex;
  justify-content: @just;
  align-items: @align;
  flex-direction:@dirction;
}
.searchComponent{
  position: fixed;
  top:0;
}
</style>
<script>
import wepy from 'wepy'
import Search from '../../components/common/Search'
export default class index extends wepy.page {
config = {
    navigationBarTitleText: 'index',
    enablePullDownRefresh: false,
    navigationBarBackgroundColor: '#fd5a5f',
    navigationBarTextStyle: '#fff'
  }
  data = {
    num: 0,
  }
  onLoad () {

  }
  onShow () {

  }
  components = {
    search: Search,
    loadMore: LoadMore
  }
  events = {
    'search-keywords': (cpName, keywords) => {
      console.log(cpName, keywords)
      this.pageNo = 1
      this.requestStatus = true
      this.loadMore.showLoading = true
      this.loadMore.tip = ''
      let params = {pageNo: this.pageNo, pageSize: this.pageSize, type: 'YUESAO', keyword: keywords}
      this.keywords = keywords
      this.$apply()
      this.list = []
      this.requestList(params)
    }
}
</script>
<template>
<search :placeholder="placeholder" class="searchComponent"></search>
</template>

```
### search.wpy
* 这里我们将展示search组件的写法，以下就是具体代码
* /src/commponent/common/search.wpy
``` js{4}
<style lang="less">
.Search--Wrapper {
  height: 81rpx;
  width: 100%;
  background: #fd5a5f;
}

.Search--Box__Input {
  height: 65rpx;
  width: 696rpx;
  margin: 0 auto;
  position: relative;

  image {
    height: 28rpx;
    width: 26rpx;
    position: absolute;
    top: 15rpx;
    left: 164rpx;
    z-index: 999;
  }

  input {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    border-radius: 33rpx;;
    background: #fff;
    font-size: 24rpx;
    padding-left: 24rpx;
  }
}

.Search--Input__Placeholder {
  box-sizing: border-box;
  color: #999999;
  font-size: 24rpx;
  padding-left: 180rpx;
}
</style>

<template>
  <view class="Search--Wrapper">
    <view class="Search--Box__Input">
      <image src="/images/components/search/search.png" wx:if="{{searchImg}}"></image>
      <input placeholder="{{placeholder}}" value="{{value}}" placeholder-class="Search--Input__Placeholder" confirm-type="search" @focus="focus" @blur="blur" @input="input" @confirm="search({{keywords}})"/>
    </view>
  </view>
</template>

<script>
import wepy from 'wepy'

export default class Search extends wepy.component {
  props = {
    placeholder: String,
    value: String
  }

  data = {
    keywords: null,
    searchImg: true
  }
  methods = {
    input(e) {
      this.keywords = e.detail.value
      this.$emit('search-input', this.$name, e.detail.value)
    },
    search(keywords) {
      this.$emit('search-keywords', this.$name, keywords)
    },
    close() {
      this.$emit('search-close', this.$name)
    },
    focus() {
      this.searchImg = false
    },
    blur() {
      this.keywords.length ? this.searchImg = false : this.searchImg = true
    }
  }
}

</script>


```

➣ 注释：
---
 * 基于wepy的小程序写法大多融合和vue,结合小程序自身的api。写法上特别严格，一个多余的空格都不允许，需要多注意。

 * 在pages的最后一行需要留出，不然会报错

 * 使用微信开发者工具新建项目，本地开发选择dist目录。

 * 微信开发者工具 --> 项目 --> 关闭ES6转ES5。

 * 本地项目根目录运行wepy build --watch，开启实时编译。效果如下图：

 <img src="https://cloud.githubusercontent.com/assets/2182004/20554645/482b0f64-b198-11e6-8d4e-70c92326004f.png"/>

### 代码规范：

* 变量与方法使用尽量使用驼峰式命名，避免使用$开头。 以$开头的方法或者属性为框架内建方法或者属性，可以被使用，使用前请参考API文档。
入口，页面，组件的命名后缀为.wpy。外链的文件可以是其它后缀。 请参考wpy文件说明
使用ES6语法开发。 框架在ES6下开发，因此也需要使用ES6开发小程序，ES6中有大量的语法糖可以让我们的代码更加简洁高效。
使用Promise 框架默认对小程序提供的API全都进行了 Promise 处理，甚至可以直接使用async/await等新特性进行开发。