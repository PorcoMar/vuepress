(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{54:function(s,a,t){"use strict";t.r(a);var e=t(0),r=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"content"},[t("h2",{attrs:{id:"➣-简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#➣-简介","aria-hidden":"true"}},[s._v("#")]),s._v(" ➣ 简介")]),t("div",{staticClass:"tip custom-block"},[t("p",{staticClass:"custom-block-title"},[s._v("常用Linux命令")]),t("p",[s._v("内容主要包括:查看IP地址、ssh相关操作、scp相关操作、进程相关操作、端口相关操作、冻结终端、释放/获取IP地址、密匙相关操作、使用密匙进行免密登陆、不通过配置文件实现免密登陆、config配置文件拓展")])]),t("h3",{attrs:{id:"ip-地址相关操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ip-地址相关操作","aria-hidden":"true"}},[s._v("#")]),s._v(" IP 地址相关操作")]),t("p",[s._v("查看 IP 地址可以使用 ip 命令或 ifconfig 命令，推荐使用 ip 命令：")]),t("p",[s._v("1）使用 ip 命令查看 IP 地址：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ip addr\n")])]),t("p",[s._v("或")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ip addr "),t("span",{attrs:{class:"token operator"}},[s._v("|")]),s._v(" grep inet（展示更为简单）\n")])]),t("p",[s._v("2）使用 ifconfig 查看 IP 地址：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ifconfig\n")])]),t("p",[s._v("或")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ifconfig "),t("span",{attrs:{class:"token operator"}},[s._v("|")]),s._v(" grep inet（展示更为简单）\n")])]),t("h3",{attrs:{id:"ssh-相关操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ssh-相关操作","aria-hidden":"true"}},[s._v("#")]),s._v(" SSH 相关操作")]),t("p",[s._v("SSH 协议可以让我们登陆远程服务器，在使用 SSH 协议之前，需要确保：")]),t("p",[s._v("客户机和服务器都安装了 SSH 协议\n服务器的 SSH 处于开启状态\n1）安装 SSH 协议\nUbuntu 上默认是没有安装 SSH 服务的，需要我们进行手动安装：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("sudo apt"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),t("span",{attrs:{class:"token keyword"}},[s._v("get")]),s._v(" install openssh"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("client openssh"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("server\n")])]),t("p",[s._v("2）查看 SSH 服务是否处于开启状态\n安装好 SSH 服务后会就会默认开启，我们也可以通过 systemctl 命令进行查看：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("systemctl status sshd\n")])]),t("p",[s._v("如果服务没有开启，可以手动开启：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("systemctl start sshd\n")])]),t("p",[s._v("有时候 SSH 服务可能是禁用的，需要先解除禁用：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("systemctl enable sshd\n")])]),t("p",[s._v("解除禁用后就可以使用 systemctl start sshd 开启 SSH 服务了。\n也可以停止 SSH 服务：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("systemctl stop sshd\n")])]),t("p",[s._v("当我们安装并开启 SSH 服务后，就可以使用 ssh 命令进行远程登录了，该命令的使用方式为：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ssh user@address\n")])]),t("p",[s._v("如：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ssh charley@"),t("span",{attrs:{class:"token number"}},[s._v("192.168")]),t("span",{attrs:{class:"token number"}},[s._v(".47")]),t("span",{attrs:{class:"token number"}},[s._v(".133")]),s._v("\n")])]),t("h3",{attrs:{id:"scp-相关操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#scp-相关操作","aria-hidden":"true"}},[s._v("#")]),s._v(" SCP 相关操作")]),t("p",[s._v("SCP 是基于 SSH 的协议，可以用来上传资源至服务器或者从服务器下载资源。\n1）上传文件")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("scp path user@address"),t("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v("path\n")])]),t("p",[s._v("上面第一个 path 是本地要上传到服务器的文件路径，第二个 path 是要上传到服务器的目标地址。注意不要遗忘服务器 IP 地址和目标路径之间的冒号。\n如：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("scp "),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("test"),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("txt charley@"),t("span",{attrs:{class:"token number"}},[s._v("192.168")]),t("span",{attrs:{class:"token number"}},[s._v(".47")]),t("span",{attrs:{class:"token number"}},[s._v(".133")]),t("span",{attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("home"),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("charley\n")])]),t("p",[s._v("也可以上传目录：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("scp "),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("r "),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("mysite charley@"),t("span",{attrs:{class:"token number"}},[s._v("192.168")]),t("span",{attrs:{class:"token number"}},[s._v(".47")]),t("span",{attrs:{class:"token number"}},[s._v(".133")]),t("span",{attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("home"),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("charley\n")])]),t("p",[s._v("2）下载文件")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("scp charley@"),t("span",{attrs:{class:"token number"}},[s._v("192.168")]),t("span",{attrs:{class:"token number"}},[s._v(".47")]),t("span",{attrs:{class:"token number"}},[s._v(".133")]),t("span",{attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("home"),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("charley"),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("helloworld"),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("js "),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n")])]),t("p",[s._v("也可以下载目录：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("scp "),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("r charley@"),t("span",{attrs:{class:"token number"}},[s._v("192.168")]),t("span",{attrs:{class:"token number"}},[s._v(".47")]),t("span",{attrs:{class:"token number"}},[s._v(".133")]),t("span",{attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("home"),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("charley"),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("mysite2 "),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n")])]),t("p",[s._v("总结一下，scp 命令前面的参数是上传或下载的源地址，后面的参数是上传或下载的目标地址，如果需要上传或下载目录，需要在 scp 命令后加上短参数 -r。")]),t("h3",{attrs:{id:"进程相关操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#进程相关操作","aria-hidden":"true"}},[s._v("#")]),s._v(" 进程相关操作")]),t("p",[s._v("1）查看当前的进程")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ps aux\n")])]),t("p",[s._v("或")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ps aux "),t("span",{attrs:{class:"token operator"}},[s._v("|")]),s._v(" greo xxx（查看某一个进程）\n")])]),t("p",[s._v("2）杀死进程")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("kill "),t("span",{attrs:{class:"token constant"}},[s._v("PID")]),s._v("（进程号）\n")])]),t("p",[s._v("3）强制杀死进程")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("kill "),t("span",{attrs:{class:"token operator"}},[s._v("-")]),t("span",{attrs:{class:"token number"}},[s._v("9")]),s._v(" "),t("span",{attrs:{class:"token constant"}},[s._v("PID")]),s._v("\n")])]),t("h3",{attrs:{id:"端口相关操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#端口相关操作","aria-hidden":"true"}},[s._v("#")]),s._v(" 端口相关操作")]),t("p",[s._v("使用 netstat 命令可以查看端口信息：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("netstat\n")])]),t("p",[s._v("或")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("netstat "),t("span",{attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("anp"),t("span",{attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),t("p",[s._v("或")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("netstat "),t("span",{attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("anp"),t("span",{attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("|")]),s._v(" grep "),t("span",{attrs:{class:"token constant"}},[s._v("PORT")]),s._v("（端口）\n")])]),t("p",[s._v("也可以使用 lsof 命令查看端口信息：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("lsof "),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("i tcp"),t("span",{attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{attrs:{class:"token number"}},[s._v("8080")]),s._v("\n")])]),t("h3",{attrs:{id:"冻结终端"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#冻结终端","aria-hidden":"true"}},[s._v("#")]),s._v(" 冻结终端")]),t("p",[s._v("在终端按下 Ctrl + S 组合键，终端就会被冻结。如果想解冻的话，按下 Ctrl + Q 组合键即可。")]),t("h3",{attrs:{id:"释放-获取-ip-地址"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#释放-获取-ip-地址","aria-hidden":"true"}},[s._v("#")]),s._v(" 释放/获取 IP 地址")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("dhclient 命令可以释放或者获取本机的 "),t("span",{attrs:{class:"token constant"}},[s._v("IP")]),s._v(" 地址。\n")])]),t("p",[s._v("1）释放操作")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("dhclient "),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("r\n")])]),t("p",[s._v("2）获取操作")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("dhclient\n")])]),t("p",[s._v("当局域网的 IP 地址冲突时，可以用此方法解决。")]),t("h3",{attrs:{id:"密钥相关操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#密钥相关操作","aria-hidden":"true"}},[s._v("#")]),s._v(" 密钥相关操作")]),t("p",[s._v("可以使用 ssh-keygen （Key Generator）生成公钥和私钥，需要先安装 SSH 服务。")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ssh"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("keygen 的使用：\n")])]),t("ul",[t("li",[s._v("-t：选择的加密算法，一般选择 RSA 算法")]),t("li",[s._v("-C：加密的特征码")]),t("li",[s._v("-f：生成的密钥文件的文件名\n用法如下：")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ssh"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("keygen "),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("t rsa "),t("span",{attrs:{class:"token operator"}},[s._v("-")]),t("span",{attrs:{class:"token constant"}},[s._v("C")]),s._v(" "),t("span",{attrs:{class:"token string"}},[s._v('"Charley"')]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("f "),t("span",{attrs:{class:"token string"}},[s._v('"charley_rsa"')]),s._v("\n")])]),t("p",[s._v("命令执行完成后，会在执行命令的目录中生成一个 charley_rsa 和 charley_rsa.pub 文件，其中前一个是私钥，后一个是公钥。切记私钥一定不要泄露。")]),t("h3",{attrs:{id:"使用密钥进行免密登陆"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用密钥进行免密登陆","aria-hidden":"true"}},[s._v("#")]),s._v(" 使用密钥进行免密登陆")]),t("p",[s._v("有了公钥和私钥后，就可以在服务器进行免密登陆了。首先，需要将我们的公钥传递到服务器用户主目录的 .ssh 目录下。如 /home/charley/.ssh 或 /root/.ssh，传到前一个目录就可以免密登陆到 charley 这个用户，传到后一个目录就可以免密登陆到 ROOT 用户，以此类推。\n服务器接受到公钥文件后，需要将公钥文件的内容追加到 authorized_keys 文件中，如果服务器还没有该文件，需要先创建一个。")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("cat charley_rsa"),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("pub "),t("span",{attrs:{class:"token operator"}},[s._v(">>")]),s._v(" authorized_keys\n")])]),t("p",[s._v("建议在生成密钥时需要将私钥放在用户主目录的 .ssh 文件夹下以方便管理，并且需要确认私钥的操作权限为 600，即只能私钥的所有者进行操作，其他用户不能操作私钥。\n接下来，我们需要在客户机配置一个 config 文件，以实现免密登陆，如果客户机上还没有该文件，需要先创建一个。\nconfig 文件配置的模板如下：")]),t("ul",[t("li",[s._v("要登录的用户名")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("User charley\n")])]),t("ul",[t("li",[s._v("登陆的别名")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("Host charley"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("server\n")])]),t("ul",[t("li",[s._v("登陆的地址，可以是一个 IP 地址或者域名")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("HostName "),t("span",{attrs:{class:"token number"}},[s._v("192.168")]),t("span",{attrs:{class:"token number"}},[s._v(".1")]),t("span",{attrs:{class:"token number"}},[s._v(".109")]),s._v("\n")])]),t("ul",[t("li",[s._v("登陆的端口")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("Port "),t("span",{attrs:{class:"token number"}},[s._v("22")]),s._v("\n")])]),t("ul",[t("li",[s._v("第一次连接服务器时，自动接受新的公钥")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("StrictHostKeyChecking no\n")])]),t("ul",[t("li",[s._v("私钥文件的路径")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("IdentityFile "),t("span",{attrs:{class:"token operator"}},[s._v("~")]),t("span",{attrs:{class:"token operator"}},[s._v("/")]),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ssh"),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("charley_rsa\n")])]),t("ul",[t("li",[s._v("维持 SSH 连接，防止长时间不做操作被踢")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("IdentitiesOnly yes\n")])]),t("ul",[t("li",[s._v("其他配置项，照搬即可")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("Protocol "),t("span",{attrs:{class:"token number"}},[s._v("2")]),s._v("\nCompression yes\nServerAliveInterval "),t("span",{attrs:{class:"token number"}},[s._v("60")]),s._v("\n"),t("span",{attrs:{class:"highlighted-line"}},[s._v("ServerAliveCountMax "),t("span",{attrs:{class:"token number"}},[s._v("20")])]),s._v("LogLevel "),t("span",{attrs:{class:"token constant"}},[s._v("INFO")]),s._v("\n")])]),t("p",[s._v("写好配置文件后，我们输入 ssh charley-server 就可以实现免密登陆了。")]),t("h3",{attrs:{id:"不通过配置文件实现免密登陆"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#不通过配置文件实现免密登陆","aria-hidden":"true"}},[s._v("#")]),s._v(" 不通过配置文件实现免密登陆")]),t("p",[s._v("前面是介绍了通过 config 配置文件的方式实现免密登陆，但在某些情况下我们可能没有权限操作配置文件，这就要手动指定秘钥进行登陆了。手动指定秘钥进行登陆也很简单：")]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("ssh "),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("i charley_rsa charley@"),t("span",{attrs:{class:"token number"}},[s._v("192.168")]),t("span",{attrs:{class:"token number"}},[s._v(".1")]),t("span",{attrs:{class:"token number"}},[s._v(".109")]),s._v("\n")])]),t("p",[s._v("通过 -i 短参数指定了客户机的私钥地址，同样可以实现服务器的免密登陆。")]),t("h3",{attrs:{id:"config-配置文件的扩展"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#config-配置文件的扩展","aria-hidden":"true"}},[s._v("#")]),s._v(" config 配置文件的扩展")]),t("p",[s._v("在 config 配置文件中，不仅可以配置单台主机的免密登陆，还可以配置多台主机的免密登陆，同时还可以对多台主机共用一个公钥或不同的公钥进行配置。以下提供一个简单的配置模板。\n1）多台主机共用一个公钥")]),t("ul",[t("li",[s._v("第一台主机")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("Host charley"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("first"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("server\nHostName xxx\nPort "),t("span",{attrs:{class:"token number"}},[s._v("22")]),s._v("\n"),t("span",{attrs:{class:"highlighted-line"}})])]),t("ul",[t("li",[s._v("第二台主机")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("Host charley"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("second"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("server\nHostName xxx\nPort "),t("span",{attrs:{class:"token number"}},[s._v("22")]),s._v("\n"),t("span",{attrs:{class:"highlighted-line"}}),s._v("Host "),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("server\nUser charley\nIdentityFile "),t("span",{attrs:{class:"token operator"}},[s._v("~")]),t("span",{attrs:{class:"token operator"}},[s._v("/")]),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ssh"),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("charley_rsa\nProtocol "),t("span",{attrs:{class:"token number"}},[s._v("2")]),s._v("\nCompression yes\nServerAliveInterval "),t("span",{attrs:{class:"token number"}},[s._v("60")]),s._v("\nServerAliveCountMax "),t("span",{attrs:{class:"token number"}},[s._v("20")]),s._v("\nLogLevel "),t("span",{attrs:{class:"token constant"}},[s._v("INFO")]),s._v("\n")])]),t("p",[s._v("2）多台主机使用不同的公钥")]),t("ul",[t("li",[s._v("第一台主机")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("User charley\nHost charley"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("first"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("server\nHostName xxx\n"),t("span",{attrs:{class:"highlighted-line"}},[s._v("Port "),t("span",{attrs:{class:"token number"}},[s._v("22")])]),s._v("StrictHostKeyChecking no\nIdentityFile "),t("span",{attrs:{class:"token operator"}},[s._v("~")]),t("span",{attrs:{class:"token operator"}},[s._v("/")]),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ssh"),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("charley_first_rsa\nIdentitiesOnly yes\nProtocol "),t("span",{attrs:{class:"token number"}},[s._v("2")]),s._v("\nCompression yes\nServerAliveInterval "),t("span",{attrs:{class:"token number"}},[s._v("60")]),s._v("\nServerAliveCountMax "),t("span",{attrs:{class:"token number"}},[s._v("20")]),s._v("\nLogLevel "),t("span",{attrs:{class:"token constant"}},[s._v("INFO")]),s._v("\n")])]),t("ul",[t("li",[s._v("第二台主机")])]),t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("User charley\nHost charley"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("second"),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("server\nHostName xxx\n"),t("span",{attrs:{class:"highlighted-line"}},[s._v("Port "),t("span",{attrs:{class:"token number"}},[s._v("22")])]),s._v("StrictHostKeyChecking no\nIdentityFile "),t("span",{attrs:{class:"token operator"}},[s._v("~")]),t("span",{attrs:{class:"token operator"}},[s._v("/")]),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ssh"),t("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("charley_second_rsa\nIdentitiesOnly yes\nProtocol "),t("span",{attrs:{class:"token number"}},[s._v("2")]),s._v("\nCompression yes\nServerAliveInterval "),t("span",{attrs:{class:"token number"}},[s._v("60")]),s._v("\nServerAliveCountMax "),t("span",{attrs:{class:"token number"}},[s._v("20")]),s._v("\nLogLevel "),t("span",{attrs:{class:"token constant"}},[s._v("INFO")]),s._v("\n")])]),t("h2",{attrs:{id:"➣-总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#➣-总结","aria-hidden":"true"}},[s._v("#")]),s._v(" ➣ 总结")]),t("p",[s._v("本文介绍了一些和 Linux 远程操作相关的命令，这些命令都是基于 SSH 协议的，包括用来远程登陆的 ssh 命令和用来上传或下载文件的 scp 命令。\n文章的后半部分，介绍了如何使用 ssh-keygen 命令生成密钥文件，以及通过配置文件和手动指定密钥文件两种实现免密登陆的方式。\n需要注意的是，要实现免密登陆，需要在服务器上保存客户机的公钥文件，同时需要将该公钥文件的内容追加到 authorized_keys 文件中。")])])}],!1,null,null,null);a.default=r.exports}}]);