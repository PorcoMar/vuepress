---
title: "➹ 微信授权和sdk加密算法"
lang: en-US
---

➣ 准备工作：
---

* 申请服务器 公众号 基本配置 这些[微信公众平台](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1472017492_58YV5)上都有，就不介绍了，接下来进入正题。

➣ 微信网页授权
---
::: danger node js-sdk 授权
* [公众平台的技术文档目的为了简明扼要的交代接口的使用，语句难免晦涩，这里写了些了我所理解的微信开放平台中关于利用node.js使用授权和js-sdk的一些方法，详情请见微信公众平台.如果用户在微信客户端中访问第三方网页，公众号可以通过微信网页授权机制，来获取用户基本信息，进而实现业务逻辑。随着微信管控越发严厉，像一些最基本的网页转发都需要授权处理才能获取到图片和描述，描述审查也是相当严格。#](微信授权和sdk加密算法.html)
:::

### 网页授权回调域名的说明

* 在微信公众号请求用户网页授权之前，开发者需要先到公众平台官网中的“开发 - 接口权限 - 网页服务 - 网页帐号 - 网页授权获取用户基本信息”的配置选项中，修改授权回调域名。请注意，这里填写的是域名（是一个字符串），而不是URL，因此请勿加 http:// 等协议头；

* 授权回调域名配置规范为全域名，比如需要网页授权的域名为：www.qq.com，配置以后此域名下面的页面http://www.qq.com/music.html 、 http://www.qq.com/login.html 都可以进行OAuth2.0鉴权。但http://pay.qq.com 、 http://music.qq.com 、 http://qq.com无法进行OAuth2.0鉴权


- - -

### 网页授权的两种scope的区别（snsapi_base snsapi_userinfo）
* 以snsapi_base为scope发起的网页授权，是用来获取进入页面的用户的openid的，并且是静默授权并自动跳转到回调页的。用户感知的就是直接进入了回调页（往往是业务页面）

* 以snsapi_userinfo为scope发起的网页授权，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。

- - -

### 网页授权access_token和普通access_token的区别

* 微信网页授权是通过OAuth2.0机制实现的，在用户授权给公众号后，公众号可以获取到一个网页授权特有的接口调用凭证（网页授权access_token），通过网页授权access_token可以进行授权后接口调用，如获取用户基本信息；

* 其他微信接口，需要通过基础支持中的“获取access_token”接口来获取到的普通access_token调用。

➣ 具体步骤：
---

## * 代码配置：
* package.json 
``` js{4}
{
  "name": "js-sdk",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-runtime": "^6.26.0",
    "body-parser": "^1.18.2",
    "cheerio": "^1.0.0-rc.2",
    "connect-mongo": "^2.0.1",
    "connect-redis": "^3.3.3",
    "cookie-parser": "^1.4.3",
    "crypto": "^1.0.1",
    "ejs": "^2.5.7",
    "express": "^4.16.2",
    "express-session": "^1.15.6",
    "fs": "^0.0.1-security",
    "mongoose": "^5.0.16",
    "morgan": "^1.9.0",
    "redis": "^2.8.0",
    "request": "^2.83.0",
    "sha1": "^1.1.1",
    "util": "^0.10.3",
    "utility": "^1.13.1"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^4.1.0",
    "gulp-babel": "^7.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-connect": "^5.2.0",
    "gulp-imagemin": "^4.1.0",
    "gulp-minify-css": "^1.2.4",
    "gulp-minify-html": "^1.0.6",
    "gulp-px2rem-plugin": "^0.4.0",
    "gulp-uglify": "^3.0.0",
    "gulp-util": "^3.0.8"
  }
}

```
* app.js
``` js{4}
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const indexRoute = require("./app/routes/index.route");
const app = express();


app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

/*配置静态文件路径*/
app.use(express.static(path.join(__dirname, "public")));

/*配置请求日志*/
app.use(logger("dev"));

/*解析application/json格式数据*/
app.use(bodyParser.json());

/*解析application/www-x-form-urlencoded格式数据*/
app.use(bodyParser.urlencoded({extended: false}));

/*解析cookie*/
app.use(cookieParser());

/*解析session*/
const session = require('express-session');
app.use(session({
    secret: "123456", //建议使用随机字符串
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 60 * 60 * 1000}
}));

/*配置路由*/
app.use("/", indexRoute);

app.use((req,res,next)=>{
    let err = new Error("Error 404, the source is not found!");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.message);
    next();
});

module.exports = app;
```
* config/env.config.js
``` js{4}
module.exports = {
  port:"80",
	"token":"yourtoken",
	"appID":"***",
	"appsecret":"***",
	"userAppID": "***",
	"userAppSecret": "***"
}
```

* app/routes/index.routes.js  
``` js{4}
const express = require('express');
const path = require("path");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const querystring = require('querystring');
const url = require('url');
const cheerio = require('cheerio')

router.get("/", authMiddleware.getCode, (req,res,next)=>{
    res.sendFile(path.join(__dirname, "../views/index.html"));
})

```

* app/views/index.html
``` js{4}
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    这里只是测试getCode成功与否
</body>
</html>
```
* 新建 app/config.access_token.json待用
* 新建 app/config.ticket.json待用

* app/middlewares/auth.middlewares.js
``` js{4}
exports.getUserInfo = (req,res,next)=>{
    console.log("<-----------------获取getUserInfo--------------------->")
    console.log('----->req.access_token : '+req.access_token);
    let access_token = req.access_token;
    let openid = req.openid;
    let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
    request(url, (err,httpResponse,body)=>{
        console.log("---->--通过access_token和openid获取到的用户个人信息 :")
        console.log(body);
        let result = JSON.parse(body);
        res.cookie("openid", result.openid, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false});
        res.cookie("nickname", result.nickname, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false});
        res.cookie("headimgurl", result.headimgurl, {maxAge: 24 * 60 * 60 * 10000, httpOnly: false});
        res.cookie("unionid", result.unionid, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false})
        next();
    })
}
```

## * 以snsapi_base为scope发起的授权

### 第一步：用户同意授权，获取code

* app/middleares/auth.middlewares.js
``` js{4}
const config = require("../../config/env.config");
const request = require("request");
const appid = config.appID;
const appsecret = config.appsecret;
/*获取code*/
exports.getCode = function(req,res,next){
    console.log('--|cookies : '+ JSON.stringify(req.cookies));
    if(req.cookies.openid){
        next();
    }else{
        let back_url = escape(req.url);//解码，解决url？后面参数返回消失问题 2.req.url 获取URL
        console.log('获取的url路由参数为 ：'+back_url)
        let redirect_uri = `{你的域名}/getUserInfo?back_url=${back_url}`;    //注意这里执行了getUserInfo路由
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `;
        console.log('重定向的url : '+url);
        //next();
        res.redirect(url);//res.redirect()重定向跳转 参数仅为URL时和res.location(url)一样
    };
};
```

### 第二步：通过code换取网页授权access_token
``` js{4}
/*获取access_token*/
exports.getAccess_token = (req,res,next)=>{
    console.log("<------------------获取snsapi_base access_token----------------------->")
    console.log(JSON.stringify(req.query))
    let code = req.query.code;
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code `;
    request(url, (err, httpResponse, body)=>{
        console.log(err);
        console.log('--||--code换取的所有信息 ：'+body);
        let result = JSON.parse(body);
        req.access_token = result.access_token;
        req.openid = result.openid;
        next();
    })
};

```

### 第三步：拉取用户信息(需scope为 snsapi_userinfo)  
* /getUserInfo使用了getAccess_token  getUserInfo 中间件 在code没过期的情况下可以进一步获取access_token 和个人信息

``` js{4}
router.get("/getUserInfo", authMiddleware.getAccess_token, authMiddleware.getUserInfo, function (req, res, next) {
    console.log("<------------------'/getUserInfo'----------------------->");
    console.log('----->|查询的url字符串参数 ：' + JSON.stringify(req.query));
    let back_url = req.query.back_url;
    for (let item in req.query) {
        if (item !== "back_url" && item !== "code" && item !== "state") {
            back_url += "&" + item + "=" + req.query[item];
        };
    };
    console.log('---->|重新筛选路径back_url : ' + back_url);
    res.redirect(back_url);
});
```

## * 以snsapi_userinfo为scope发起的授权
* app/middlewares/accessToken.middlesware.js
``` js{4}
let weixinConfig = require("../../config/env.config.js");
let request = require("request");
let fs = require("fs");

//获取accessToken
exports.accessToken = function (req, res, next) {
    console.log("<------------------'获取snsapi_userinfo accessToken'----------------------->");
    let valide = isValide(); //{ code: 0, result: result.access_token } or{code:1001}
    if (valide.code === 0) {
        //access_token还没过期，用以前的
        req.query.access_token = valide.result;
        next();
    } else {
        //重新获取access_token && expire_in
        let appid = weixinConfig.appID;
        let secret = weixinConfig.appsecret;
        let url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret;
        request(url, function (error, response, body) {
            let result = JSON.parse(body);
            let now = new Date().getTime(); //new Date().getTime() 获得的是毫秒
            result.expires_in = now + (result.expires_in - 20) * 1000; //expire_in一般是7200s 提前20毫秒

            req.query.access_token = result.access_token; //new access_token
            req.query.tokenExpired = result.expires_in; // 7200s
            next();
        });
    };
};

//获取ticket
exports.ticket = function (req, res, next) {
    console.log("<------------------'获取ticket'----------------------->");
    let ticketResult = isTicket();
    if (ticketResult.code === 0) {
        console.log('已经有了ticket : ' + JSON.stringify(ticketResult));
        req.query.ticket = ticketResult.result;
        next();
    } else {
        console.log("开始获取ticket");
        let access_token = req.query.access_token;
        let _tokenResult = {
            access_token: req.query.access_token,
            expires_in: req.query.tokenExpired
        };
        let url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi";
        request(url, function (err, response, body) {
            let result = JSON.parse(body);
            console.log(result);
            if (result.errcode == "0") {
                let now = new Date().getTime();
                result.expires_in = now + (result.expires_in - 20) * 1000; //   改变时间为当前时间的两小时后
                fs.writeFileSync("./config/access_token.json", JSON.stringify(_tokenResult)); //fs.writeFileSync:以同步的方式将data写入文件，文件已存在的情况下，原内容将被替换。
                fs.writeFileSync("./config/ticket.json", JSON.stringify(result));
                console.log('异步写入access_token ticket.json');
                req.query.ticket = result.ticket;
                next();
            };
        });
    };
};

function isValide() {
    //有效
    let result = fs.readFileSync("./config/access_token.json").toString(); //同步读取json文件 //这里用toString的原因：读出来的数据是一堆包含着16进制数字的对象，必须通过toString转为字符串形式
    if (result) {
        result = JSON.parse(result);
        let now = new Date().getTime();
        if (result.access_token && result.expires_in && now < result.expires_in) {
            console.log("access_token 还在7200s以内，没有过期"); //access_token有效 expires_in应该指的是距离生成时间的7200秒后
            return { code: 0, result: result.access_token };
        } else {
            console.log("access_token 失效");
            return { code: 1001 };
        }
    } else {
        return { code: 1001 };
    };
};

function isTicket() {
    let result = fs.readFileSync("./config/ticket.json").toString();
    console.log("result:", result);
    if (result) {
        result = JSON.parse(result);
        console.log(result);
        let now = new Date().getTime();
        if (result.ticket && result.expires_in && now < result.expires_in) {
            console.log("ticket有效，沿用当前ticket.json里的ticket");
            return { code: 0, result: result.ticket };
        } else {
            console.log("ticket无效需要获取");
            return { code: 1001 };
        }
    } else {
        return { code: 1001 };
    };
}
```
* accessToken.middlesware.js写了关于获取以snsapi_userinfo为scope发起的网页授权的access_token ticket,并用fs以json字符串的形式存到本地，并检测过期时间，如果没过期就继续读取使用，如果过期就重新获取并储存在心的access_token ticket到本地


* app/routes/index.routes.js 
``` js{4}

const crypto = require("crypto");
const sha1 = require("sha1");
const accessTokenMiddle = require("../middlewares/accessToken.middleware.js");
const weixin = require("../../config/env.config");

router.get("/weixin", accessTokenMiddle.accessToken, accessTokenMiddle.ticket, function (req, res, next) {
    console.log("<------------------'/weixin'----------------------->");
    console.log('----->| req.query : ' + JSON.stringify(req.query));
    crypto.randomBytes(16, function (ex, buf) {
        let appId = weixin.appID;
        let noncestr = buf.toString("hex");
        let jsapi_ticket = req.query.ticket;
        let timestamp = new Date().getTime();
        timestamp = parseInt(timestamp / 1000);
        let url = req.query.url;
        console.log("参数 ：");
        console.log(noncestr);
        console.log(jsapi_ticket);
        console.log(timestamp);
        console.log(url);

        let str = ["noncestr=" + noncestr, "jsapi_ticket=" + jsapi_ticket, "timestamp=" + timestamp, "url=" + url].sort().join("&");
        console.log("待混淆加密的字符串 ： ");
        console.log(str);
        let signature = sha1(str);

        console.log("微信sdk签名signature ：");
        console.log(signature);

        let result = { code: 0, result: { appId: appId, timestamp: timestamp, nonceStr: noncestr, signature: signature } };

        res.json(result); //res.json 等同于将一个对象或数组传到给res.send()
    });
});

```
* 在html页面使用微信公众平台提供的API 需要引用 http://res.wx.qq.com/open/js/jweixin-1.2.0.js
* 在静态文件中调用分享功能的api 更多API请打开 
[# 微信JS-SDK说明文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)
* public/index.html 

``` js{4}
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p>userList....</p>
    <button style="color:purple;" onclick="clickMe()">clickMe</button>
</body>
<script src="http://www.jq22.com/jquery/jquery-2.1.1.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script src="../js/userList.js"></script>
</html>
```
public/js/userList.js
``` js{4}
let signatureUrl = url.split("#")[0];
let URL = encodeURIComponent(signatureUrl);


let title = "这是分享的表标题";
let desc = "this is description";
let shareUrl = window.location.href;
let logo = "http://yizhenjia.com/dist/newImg/logo.png";
SHARE(title, desc, shareUrl, logo); 

$.get("/weixin?url=" + URL, function(result) {
    if (result.code == 0) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: result.result.appId, // 必填，公众号的唯一标识
            timestamp: result.result.timestamp, // 必填，生成签名的时间戳
            nonceStr: result.result.nonceStr, // 必填，生成签名的随机串
            signature: result.result.signature, // 必填，签名，见附录1
            jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline", "chooseImage", "scanQRCode", "getLocation", "openLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    };
});

function SHARE(title, desc, shareUrl, logo) {        
    wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        //分享
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: logo, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                用户确认分享后执行的回调函数
                alert("分享成功！");
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            },
            fail: function(err) {
                alert("分享失败");
            }
        });
    });
    wx.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        //alert("Error");
    });
}      

```

注释：
---
* #微信开发必须在微信开发者工具上开发，且只能是默认80端口，在开发中经常有80端口被占用的情况，如果有请使用
``` js {4}
lsof -i tcp:80
kill -9 进程
```

- - -
* #如果想在手机上测试 并抓包数据 可以使用charles抓包工具
1. 打开charles 点击Proxy setting 设置 port 
2. 保证手机和电脑处于同一Wi-Fi下，配置手动代理 输入IP和端口
查看ip地址 ：charles上可查看 或者终端输入ifconfig (cmd:ipconfig)
3. 扫码或使用地址即可访问

- - -

* #在获取以snsapi_userinfo为scope发起的网页授权的时候使用的方式是fs储存到本地的方式，你也可以采用其他方式

➳ [gitee.com地址：点我](https://gitee.com/PorcoMar/WeiXinShouQuanHejs-sdk.git)














