---
title: "➹ 一些常用的 Linux 远程操作命令记录"
lang: en-US
---
➣ 简介
---
:::tip 常用Linux命令
内容主要包括:查看IP地址、ssh相关操作、scp相关操作、进程相关操作、端口相关操作、冻结终端、释放/获取IP地址、密匙相关操作、使用密匙进行免密登陆、不通过配置文件实现免密登陆、config配置文件拓展
:::
### IP 地址相关操作

查看 IP 地址可以使用 ip 命令或 ifconfig 命令，推荐使用 ip 命令：

1）使用 ip 命令查看 IP 地址：
``` js{4}
ip addr
```
或
``` js{4}
ip addr | grep inet（展示更为简单）
```

2）使用 ifconfig 查看 IP 地址：
``` js{4}
ifconfig
```
或
``` js{4}
ifconfig | grep inet（展示更为简单）
```

### SSH 相关操作

SSH 协议可以让我们登陆远程服务器，在使用 SSH 协议之前，需要确保：

客户机和服务器都安装了 SSH 协议
服务器的 SSH 处于开启状态
1）安装 SSH 协议
Ubuntu 上默认是没有安装 SSH 服务的，需要我们进行手动安装：
``` js{4}
sudo apt-get install openssh-client openssh-server
```
2）查看 SSH 服务是否处于开启状态
安装好 SSH 服务后会就会默认开启，我们也可以通过 systemctl 命令进行查看：
``` js{4}
systemctl status sshd
```
如果服务没有开启，可以手动开启：
``` js{4}
systemctl start sshd
```
有时候 SSH 服务可能是禁用的，需要先解除禁用：
``` js{4}
systemctl enable sshd
```
解除禁用后就可以使用 systemctl start sshd 开启 SSH 服务了。
也可以停止 SSH 服务：
``` js{4}
systemctl stop sshd
```
当我们安装并开启 SSH 服务后，就可以使用 ssh 命令进行远程登录了，该命令的使用方式为：
``` js{4}
ssh user@address
```
如：
``` js{4}
ssh charley@192.168.47.133
```
### SCP 相关操作

SCP 是基于 SSH 的协议，可以用来上传资源至服务器或者从服务器下载资源。
1）上传文件
``` js{4}
scp path user@address:path
```
上面第一个 path 是本地要上传到服务器的文件路径，第二个 path 是要上传到服务器的目标地址。注意不要遗忘服务器 IP 地址和目标路径之间的冒号。
如：
``` js{4}
scp ./test.txt charley@192.168.47.133:/home/charley
```
也可以上传目录：
``` js{4}
scp -r ./mysite charley@192.168.47.133:/home/charley
```
2）下载文件
``` js{4}
scp charley@192.168.47.133:/home/charley/helloworld.js .
```
也可以下载目录：
``` js{4}
scp -r charley@192.168.47.133:/home/charley/mysite2 .
```
总结一下，scp 命令前面的参数是上传或下载的源地址，后面的参数是上传或下载的目标地址，如果需要上传或下载目录，需要在 scp 命令后加上短参数 -r。

### 进程相关操作

1）查看当前的进程
``` js{4}
ps aux
```
或
``` js{4}
ps aux | greo xxx（查看某一个进程）
```
2）杀死进程
``` js{4}
kill PID（进程号）
```
3）强制杀死进程
``` js{4}
kill -9 PID
```
### 端口相关操作

使用 netstat 命令可以查看端口信息：
``` js{4}
netstat
```
或
``` js{4}
netstat [-anp]
```
或
``` js{4}
netstat [-anp] | grep PORT（端口）
```
也可以使用 lsof 命令查看端口信息：
``` js{4}
lsof -i tcp:8080
```
### 冻结终端

在终端按下 Ctrl + S 组合键，终端就会被冻结。如果想解冻的话，按下 Ctrl + Q 组合键即可。

### 释放/获取 IP 地址
``` js{4}
dhclient 命令可以释放或者获取本机的 IP 地址。
```
1）释放操作
``` js{4}
dhclient -r
```
2）获取操作
``` js{4}
dhclient
```
当局域网的 IP 地址冲突时，可以用此方法解决。

### 密钥相关操作

可以使用 ssh-keygen （Key Generator）生成公钥和私钥，需要先安装 SSH 服务。
``` js{4}
ssh-keygen 的使用：
```
* -t：选择的加密算法，一般选择 RSA 算法
* -C：加密的特征码
* -f：生成的密钥文件的文件名
用法如下：
``` js{4}
ssh-keygen -t rsa -C "Charley" -f "charley_rsa"
```
命令执行完成后，会在执行命令的目录中生成一个 charley_rsa 和 charley_rsa.pub 文件，其中前一个是私钥，后一个是公钥。切记私钥一定不要泄露。

### 使用密钥进行免密登陆

有了公钥和私钥后，就可以在服务器进行免密登陆了。首先，需要将我们的公钥传递到服务器用户主目录的 .ssh 目录下。如 /home/charley/.ssh 或 /root/.ssh，传到前一个目录就可以免密登陆到 charley 这个用户，传到后一个目录就可以免密登陆到 ROOT 用户，以此类推。
服务器接受到公钥文件后，需要将公钥文件的内容追加到 authorized_keys 文件中，如果服务器还没有该文件，需要先创建一个。
``` js{4}
cat charley_rsa.pub >> authorized_keys
```
建议在生成密钥时需要将私钥放在用户主目录的 .ssh 文件夹下以方便管理，并且需要确认私钥的操作权限为 600，即只能私钥的所有者进行操作，其他用户不能操作私钥。
接下来，我们需要在客户机配置一个 config 文件，以实现免密登陆，如果客户机上还没有该文件，需要先创建一个。
config 文件配置的模板如下：

* 要登录的用户名
``` js{4}
User charley
```
* 登陆的别名
``` js{4}
Host charley-server
```
* 登陆的地址，可以是一个 IP 地址或者域名
``` js{4}
HostName 192.168.1.109
```
* 登陆的端口
``` js{4}
Port 22
```
* 第一次连接服务器时，自动接受新的公钥
``` js{4}
StrictHostKeyChecking no
```
* 私钥文件的路径
``` js{4}
IdentityFile ~/.ssh/charley_rsa
```
* 维持 SSH 连接，防止长时间不做操作被踢
``` js{4}
IdentitiesOnly yes
```
* 其他配置项，照搬即可
``` js{4}
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO
```
写好配置文件后，我们输入 ssh charley-server 就可以实现免密登陆了。

### 不通过配置文件实现免密登陆

前面是介绍了通过 config 配置文件的方式实现免密登陆，但在某些情况下我们可能没有权限操作配置文件，这就要手动指定秘钥进行登陆了。手动指定秘钥进行登陆也很简单：
``` js{4}
ssh -i charley_rsa charley@192.168.1.109
```
通过 -i 短参数指定了客户机的私钥地址，同样可以实现服务器的免密登陆。

### config 配置文件的扩展

在 config 配置文件中，不仅可以配置单台主机的免密登陆，还可以配置多台主机的免密登陆，同时还可以对多台主机共用一个公钥或不同的公钥进行配置。以下提供一个简单的配置模板。
1）多台主机共用一个公钥

* 第一台主机
``` js{4}
Host charley-first-server
HostName xxx
Port 22

```
* 第二台主机
``` js{4}
Host charley-second-server
HostName xxx
Port 22

Host *-server
User charley
IdentityFile ~/.ssh/charley_rsa
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO
```
2）多台主机使用不同的公钥

* 第一台主机
``` js{4}
User charley
Host charley-first-server
HostName xxx
Port 22
StrictHostKeyChecking no
IdentityFile ~/.ssh/charley_first_rsa
IdentitiesOnly yes
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO
```
* 第二台主机
``` js{4}
User charley
Host charley-second-server
HostName xxx
Port 22
StrictHostKeyChecking no
IdentityFile ~/.ssh/charley_second_rsa
IdentitiesOnly yes
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO
```
➣ 总结
---
本文介绍了一些和 Linux 远程操作相关的命令，这些命令都是基于 SSH 协议的，包括用来远程登陆的 ssh 命令和用来上传或下载文件的 scp 命令。
文章的后半部分，介绍了如何使用 ssh-keygen 命令生成密钥文件，以及通过配置文件和手动指定密钥文件两种实现免密登陆的方式。
需要注意的是，要实现免密登陆，需要在服务器上保存客户机的公钥文件，同时需要将该公钥文件的内容追加到 authorized_keys 文件中。


