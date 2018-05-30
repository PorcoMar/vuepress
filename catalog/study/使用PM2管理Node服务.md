---
title: "➹ 使用 PM2 管理 Node 服务"
lang: en-US
---
➣ 简介
---
::: warning PM2
PM2 是一个 Node 进程管理工具，可以用来帮助我们更好的管理 Node 服务。PM2 具有以下几个特性：
* 动态监控文件变动，0秒热启动
* 对 CPU 进行负载均衡
* 监控 CPU、内存的使用状况
* 自动重启异常服务
:::


### 使用 PM2 之前需要先进行安装：
``` js{4}
yarn global add pm2
```
如果说 Nginx 是用于服务器间的负载均衡，那么 PM2 就是用于某个具体服务器之上的负载均衡，能够最大程度上帮助我们使用服务器资源，提高 Node 服务运行的性能，同时有助于提高服务的稳定性。
Node 是单线程的，因此无法充分使用服务器的 CPU，PM2 通过 Cluster 模式，能够帮助 Node 应用充分利用 CPU 资源。以下是官网的一张图片，十分形象：
<img src="https://upload-images.jianshu.io/upload_images/3831834-96a069562bea937e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700"/>

### 配置文件

可以通过命令行直接运行 PM2，也可以提供一份配置文件。PM2 的配置文件比较简单，这里提供一份我常用的：
``` js{4}
{
    "name":"node-app",
    "script":"app.js",
    "watch":true,
    "ignore-watch":"node_modules",
    "instances":"max",
    "exec_mode":"cluster",
    "log_date_format":"YYYY-MM-DD HH:mm Z",
    "out_file":"log/node-app.stdout.log"
}
```
现在我们运行 pm2 start pm2.json --watch 就可以通过 PM2 启动 Node 服务了，并且具有监控文件变化自动重启的功能。
``` js{4}
pm2 start pm2.json --watch
```
常用命令

1.查看当前运行的服务
``` js{4}
pm2 list
```
控制台上的界面如下：

``` js{4}
 Name                │ mode │ status │ ↺   │ cpu │ memory    │
├─────────────────────┼──────┼────────┼─────┼─────┼───────────┤
│ node_yizhen_website │ fork │ online │ 121 │ 0%  │ 38.4 MB   │
│ qa_admin            │ fork │ online │ 65  │ 0%  │ 61.7 MB   │
│ shangjia-app        │ fork │ online │ 299 │ 0%  │ 73.6 MB 

```


2.监控服务
``` js{4}
pm2 monit
```

3.重启服务
``` js{4}
pm2 restart xxx.json
```
4.平滑重启
``` js{4}
pm2 reload xxx.json
```
5.停止所有服务
``` js{4}
pm2 stop all
```
在线监控

PM2 官网提供了在线监控 Node 服务的功能，功能十分强大。该功能是付费的，普通用户只能监控一个项目，但对于平常学习使用是足够了。
要使用此项服务，首先需要到 [https://keymetrics.io/](https://keymetrics.io/) 注册一个账号。
注册之后点击登录，首次登陆可以创建一个新的 Bucket，用以监控 Node 服务：
<img src="https://upload-images.jianshu.io/upload_images/3831834-7f40c96dd976f328.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700"/>

点击按钮新建一个 Bucket，填写任务名：
<img src="https://upload-images.jianshu.io/upload_images/3831834-0716e55b048eadea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700"/>

创建 Bucket 后，会分配一个唯一的串号，复制相应的命令在服务器上执行即可：
<img src="https://upload-images.jianshu.io/upload_images/3831834-eb37866f8278367c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700"/>

执行完 pm2 link 命令后，会在控制台输出一个 URL：
<img src="https://upload-images.jianshu.io/upload_images/3831834-ebb7eef669fb6793.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700"/>

在浏览器中打开这个链接地址，就可以在线监控 Node 服务的运行情况了：
<img src="https://upload-images.jianshu.io/upload_images/3831834-43f358d95f3ad514.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700"/>
完。
