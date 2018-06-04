---
title: "➹ yarn和npm的比较"
lang: en-US
---

➣ Yarn是什么？
---
::: tip Yarn是什么？
Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如官方文档中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。
:::
### 速度对比
* npm cnpm yarn对比，以安装vue-cli为例，

* 耗时从少到多：
cnpm：
``` js{4}
cnpm install vue-vli --save
//用时：41600ms，包数量：1508
```
yarn：
``` js{4}
yarn add vue-cli
//用时：181200ms，包数量：742
```
npm：
``` js{4}
npm install vue-cli --save
//用时：362400.5ms，包数量：727
```
<h3>速度小结</h3>
cnpm是最快的，不过有很多同行吐槽它的包文件过多和凌乱，包括其他一些问题（安装会出错等），因此国内有一些大的团队在内部并不使用cnpm。yarn，官方给出的说明是：快速、可靠、安全的依赖管理。至少从文件数量上看少了很多，而且安装过程中有美观的 CLI 输出信息（虽然这不重要）。

### 问题

* 同一个项目，安装的时候无法保持一致性。由于package.json文件中版本号的特点，下面三个版本号在安装的时候代表不同的含义。

``` js{4}

"5.0.3",
"~5.0.3",
"^5.0.3"

```
* “5.0.3”表示安装指定的5.0.3版本，“～5.0.3”表示安装5.0.X中最新的版本，“^5.0.3”表示安装5.X.X中最新的版本。这就麻烦了，常常会出现同一个项目，有的同事是OK的，有的同事会由于安装的版本不一致出现bug。

* 安装的时候，包会在同一时间下载和安装，中途某个时候，一个包抛出了一个错误，但是npm会继续下载和安装包。因为npm会把所有的日志输出到终端，有关错误包的错误信息就会在一大堆npm打印的警告中丢失掉，并且你甚至永远不会注意到实际发生的错误。


## ➣ Yarn优点

### 速度快 。速度快主要来自以下两个方面：
* 并行安装：无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。而 Yarn 是异步执行所有任务，提高了性能。

* 离线模式：如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。

### 安装版本统一：
* 为了防止拉取到不同的版本，Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn 就会创建（或更新）yarn.lock 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。npm 其实也有办法实现处处使用相同版本的 packages，但需要开发者执行 npm shrinkwrap 命令。这个命令将会生成一个锁定文件，在执行 npm install 的时候，该锁定文件会先被读取，和 Yarn 读取 yarn.lock 文件一个道理。npm 和 Yarn 两者的不同之处在于，Yarn 默认会生成这样的锁定文件，而 npm 要通过 shrinkwrap 命令生成 npm-shrinkwrap.json 文件，只有当这个文件存在的时候，packages 版本信息才会被记录和更新。

### 更简洁的输出：
* npm 的输出信息比较冗长。在执行 npm install 的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn 简洁太多：默认情况下，结合了 emoji直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。

* 多注册来源处理：所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，只会从一个注册来源去装，要么是 npm 要么是 bower, 防止出现混乱不一致。

* 更好的语义化： yarn改变了一些npm命令的名称，比如 yarn add/remove，感觉上比 npm 原本的 install/uninstall 要更清晰。
### Yarn和npm命令对比
``` js{4}
npm install === yarn 
npm install taco --save === yarn add taco
npm uninstall taco --save === yarn remove taco
npm install taco --save-dev === yarn add taco --dev
npm update --save === yarn upgrade
npm run dev === yarn dev
```

### yarn 更换为淘宝镜像

下载yarn
``` js{4}
npm install yarn -g
```
查看下载源
``` js{4}
yarn config get registry
```
更换为淘宝源
``` js{4}
yarn config set registry https://registry.npm.taobao.org
```
初始化项目
``` js{4}
yarn init -y
```
更新模块：
``` js{4}
yarn upgrade xxx // 更新
```