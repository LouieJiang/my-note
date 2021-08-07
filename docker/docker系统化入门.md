# Docker系统化入门

## 命令

### 帮助命令

- docker --help [command] OR docker [command] --help
- 例如

```bash
[root@cjsx ~]# docker --help search

Usage:	docker search [OPTIONS] TERM

Search the Docker Hub for images

Options:
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print search using a Go template
      --limit int       Max number of search results (default 25)
      --no-trunc        Don't truncate output
[root@cjsx ~]# docker search --help
# 就可以查询出 search的所有选项
```



### 镜像命令
- **docker images [option]**

> 列出所有的本地镜像

- **docker search [option] [image name]**

> 查询某个镜像的消息
>
> 列出的选项是help中没有的选项
>
>  -s : 列出收藏数不小于指定值的镜像。
>  --automated : 只列出 automated build类型的镜像；

- **docker pull [image name:tag]**

> 拉取某个镜像

### 容器命令

- **docker run [OPTIONS] IMAGE [COMMAND] [ARG...]**

> OPTIONS说明（常用）：有些是一个减号，有些是两个减号
>
> --name="容器新名字": 为容器指定一个名称；
> **-d: 后台运行容器，并返回容器ID，也即启动守护式容器；**
> **-i：以交互模式运行容器，通常与 -t 同时使用；**
> **-t：为容器重新分配一个伪输入终端，通常与 -i 同时使用；**
> -P: 随机端口映射；
> **-p: **指定端口映射，有以下四种格式**
>       **ip:hostPort:containerPort**
>       **ip::containerPort**
>       **hostPort:containerPort**
>       **containerPort****

- **docker ps [OPTIONS]**

> OPTIONS说明（常用）：
>
> **-a :列出当前所有正在运行的容器+历史上运行过的**
> -l :显示最近创建的容器。
> -n：显示最近n个创建的容器。
> -q :静默模式，只显示容器编号。
> --no-trunc :不截断输出。

- **退出容器**

> docker stop  [containner name]  OR [containner ID]
>
> exit: 停止并退出
>
> ctrl+P+Q: 容器不停止退出

- **docker start [containner name]  OR [containner ID]** 

> 启动某个关闭了的容器

- **docker restart [containner name]  OR [containner ID]** 

> 重启容器

- **docker kill[containner name]  OR [containner ID]** 

> 强行停止容器

#### 守护容器模式(重要)

- **docker run -d [name]**

> 使用镜像centos:latest以后台模式启动一个容器
> docker run -d centos
>
> 问题：然后docker ps -a 进行查看, 会发现容器已经退出
> 很重要的要说明的一点: Docker容器后台运行,就必须有一个前台进程.
> 容器运行的命令如果不是那些一直挂起的命令（比如运行top，tail），就是会自动退出的。
>
> 这个是docker的机制问题,比如你的web容器,我们以nginx为例，正常情况下,我们配置启动服务只需要启动响应的service即可。例如
> service nginx start
> 但是,这样做,nginx为后台进程模式运行,就导致docker前台没有运行的应用,
> 这样的容器后台启动后,会立即自杀因为他觉得他没事可做了.
> 所以，**最佳的解决方案是,将你要运行的程序以前台进程的形式运行**

- **docker logs [option] [containner]**

> -t 是加入时间戳
> -f 跟随最新的日志打印
> --tail 数字 显示最后多少条

- **docker top [containner]**

> 查看容器内运行的进程

- **docker inspect [containner ID]**

> 查看容器内部细节,容器详细信息

#### 进入运行的容器

- **docker exec -it [containner ID] bashShell**

- **docker attach [containner ID]**

> 上述两种的区别
>
> exec 是进入容器并且开启一个新的命令行,并且可以启动新的进程
>
> attach 是直接进入容器的命令行终端, 不会开启新的进程

- **docker cp [containner ID]:path1 path2**

> 将容器中path1的文件 复制到宿主机的path2上

### 命令小总结

![](https://raw.githubusercontent.com/huwd5620125/my_pic_pool/master/img/20191215142254.png)

```bash

attach    Attach to a running container                 # 当前 shell 下 attach 连接指定运行镜像
build     Build an image from a Dockerfile              # 通过 Dockerfile 定制镜像
commit    Create a new image from a container changes   # 提交当前容器为新的镜像
cp        Copy files/folders from the containers filesystem to the host path   #从容器中拷贝指定文件或者目录到宿主机中
create    Create a new container                        # 创建一个新的容器，同 run，但不启动容器
diff      Inspect changes on a container's filesystem   # 查看 docker 容器变化
events    Get real time events from the server          # 从 docker 服务获取容器实时事件
exec      Run a command in an existing container        # 在已存在的容器上运行命令
export    Stream the contents of a container as a tar archive   # 导出容器的内容流作为一个 tar 归档文件[对应 import ]
history   Show the history of an image                  # 展示一个镜像形成历史
images    List images                                   # 列出系统当前镜像
import    Create a new filesystem image from the contents of a tarball # 从tar包中的内容创建一个新的文件系统映像[对应export]
info      Display system-wide information               # 显示系统相关信息
inspect   Return low-level information on a container   # 查看容器详细信息
kill      Kill a running container                      # kill 指定 docker 容器
load      Load an image from a tar archive              # 从一个 tar 包中加载一个镜像[对应 save]
login     Register or Login to the docker registry server    # 注册或者登陆一个 docker 源服务器
logout    Log out from a Docker registry server          # 从当前 Docker registry 退出
logs      Fetch the logs of a container                 # 输出当前容器日志信息
port      Lookup the public-facing port which is NAT-ed to PRIVATE_PORT    # 查看映射端口对应的容器内部源端口
pause     Pause all processes within a container        # 暂停容器
ps        List containers                               # 列出容器列表
pull      Pull an image or a repository from the docker registry server   # 从docker镜像源服务器拉取指定镜像或者库镜像
push      Push an image or a repository to the docker registry server    # 推送指定镜像或者库镜像至docker源服务器
restart   Restart a running container                   # 重启运行的容器
rm        Remove one or more containers                 # 移除一个或者多个容器
rmi       Remove one or more images             # 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除]
run       Run a command in a new container              # 创建一个新的容器并运行一个命令
save      Save an image to a tar archive                # 保存一个镜像为一个 tar 包[对应 load]
search    Search for an image on the Docker Hub         # 在 docker hub 中搜索镜像
start     Start a stopped containers                    # 启动容器
stop      Stop a running containers                     # 停止容器
tag       Tag an image into a repository                # 给源中镜像打标签
top       Lookup the running processes of a container   # 查看容器中运行的进程信息
unpause   Unpause a paused container                    # 取消暂停容器
version   Show the docker version information           # 查看 docker 版本号
wait      Block until a container stops, then print its exit code   # 截取容器停止时的退出状态值

```

## 镜像

> 镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。

### unionFS(联合文件系统)

> UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtual filesystem)。Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

### 特性

> 一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录。
>
> Docker镜像都是只读的
> 当容器启动时，一个新的可写层被加载到镜像的顶部。
> 这一层通常被称作“**容器层**”，“容器层”之下的都叫“**镜像层**”。

### 镜像加载原理

> docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFS。
> bootfs(boot file system)主要包含bootloader和kernel, bootloader主要是引导加载kernel, Linux刚启动时会加载bootfs文件系统，在Docker镜像的最底层是bootfs。这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已由bootfs转交给内核，此时系统也会卸载bootfs。
>
> rootfs (root file system) ，在bootfs之上。**包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标准目录和文件**。rootfs就是各种不同的操作系统发行版，比如Ubuntu，Centos等等。
>
> 只占用200M,因为一个精简的OS,rootfs可以很小只包含基本的命令,工具和程序库就可以了，因为底层直接用Host的kernel，自己只需要提供 rootfs 就行了。由此可见对于不同的linux发行版, bootfs基本是一致的, rootfs会有差别, 因此不同的发行版可以公用bootfs。

#### 镜像分层

> pull 镜像的时候可以看到
>
> 是一层一层的在下载

##### 镜像分层的好处?

> 比如：有多个镜像都从相同的 **base** 镜像构建而来，那么宿主机**只需在磁盘上保存一份base镜像**，
> 同时内存中也只需加载一份 base 镜像，就可以为所有容器服务了。而且镜像的每一层都可以被共享。

### commit命令补充

> ```bash
>  docker commit -a "caden" -m "my tomcat 9" [containId] [name]:[tag]
> ```

## 容器

### 容器数据卷

> 是什么?
>
> 持久化数据使用的功能。
>
> 先来看看Docker的理念：
> *  将运用与运行的环境打包形成容器运行 ，运行可以伴随着容器，但是我们对数据的要求希望是持久化的
> *  容器之间希望有可能共享数据
>
> Docker容器产生的数据，**如果不通过docker commit生成新的镜像**，使得数据做为镜像的一部分保存下来，
> 那么当容器删除后，数据自然也就没有了。
>
> 为了能保存数据在docker中我们使用卷。

#### 功能

> 卷就是**目录或文件**，存在于一个或多个**容器**中，由docker挂载到容器，但不属于联合文件系统，因此能够**绕过Union File System**提供一些用于持续存储或共享数据的特性：
>
>  卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此Docker**不会在容器删除时删除其挂载的数据卷**
>
> 特点：
> 1：数据卷可在容器之间共享或重用数据
> 2：卷中的更改可以直接生效
> 3：数据卷中的更改不会包含在镜像的更新中
> 4：数据卷的生命周期一直持续到没有容器使用它为止
>
> 持久化+共享数据,**不会在容器删除的时候删除数据卷**

#### 使用

> 默认情况下,容器内是有权限对挂载目录写入的

1. ##### 使用命令添加

```bash
run -it -v /usr/local/docker/data01[宿主机目录]:/usr/local/data[容器内目录] [imageId]
[root@cjsx data01]# docker inspect  [ContainId] #查看消息
#输出的是一串json
        "Mounts": [
            {
                "Type": "bind",
                "Source": "/usr/local/docker/data01",
                "Destination": "/usr/local/data",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
# 可以看到源目录和目标目录已经成功挂载
run -it -v /usr/local/docker/data01[宿主机目录]:/usr/local/data[容器内目录]:ro [imageId] #这种情况下容器对于目录的权限是只有只读
[root@7b01f2a8271f data]# mkdir test03
mkdir: cannot create directory 'test03': Read-only file system#容器内部无法对挂载目录修改

```

2. ##### 使用DockerFile添加

```dockerfile
# volume test
FROM centos 
VOLUME ["/usr/local/data01","/usr/local/data02"]
CMD echo "finished,--------success1"
CMD /bin/bash
```

使用上述DockerFile创建一个镜像,镜像中存在两个容器数据卷 ../data01和../data02,直接使用run命令后查看容器情况

```bash
[root@cjsx demo1]# docker inspect 452ab74a0f46
"Mounts": [
            {
                "Type": "volume",
                "Name": "1e2907c44637dad6345acd0079bbfb45e26ded303d0d3da68df5d63e5ecce1c8",
                "Source": "/var/lib/docker/volumes/1e2907c44637dad6345acd0079bbfb45e26ded303d0d3da68df5d63e5ecce1c8/_data",
                "Destination": "/usr/local/data01",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            },
            {
                "Type": "volume",
                "Name": "1ac47542655a1f66882e6d5bb3b278ba78d6ac14a08b1354720073c904946154",
                "Source": "/var/lib/docker/volumes/1ac47542655a1f66882e6d5bb3b278ba78d6ac14a08b1354720073c904946154/_data",
                "Destination": "/usr/local/data02",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
```

- 发现了docker默认创建了两个文件夹用于和我们设定的容器数据卷挂载进行了绑定也可以通过-v创建容器的时候设置

#### 注意

> Docker挂载主机目录Docker访问出现cannot open directory .: Permission denied
> 解决办法：在挂载目录后多加一个--privileged=true参数即可

### 数据卷容器

> 命名的容器挂载数据卷，其它容器通过挂载这个(父容器)实现数据共享，挂载数据卷的容器，称之为数据卷容器
>
> 容器之间可以有继承关系,子继承父的容器数据卷,挂载数据卷的容器称作数据卷容器

```bash
docker run -it --name dc01 cjsx/centos
[root@9de2b43d0612 /]# cd /usr/local/data01/
[root@9de2b43d0612 data01]# ls
[root@9de2b43d0612 data01]# mkdir cjs01
[root@9de2b43d0612 data01]# ls
cjs01
docker run -it --name dc02 --volumes-from dc01 cjsx/centos
[root@fb76e2ae7f31 /]# cd /usr/local/data01/
[root@fb76e2ae7f31 data01]# ls
cjs01
[root@fb76e2ae7f31 data01]# mkdir cjs02
docker run -it --volumes-from dc02 --name dc03 cjsx/cento
[root@b2b766330886 /]# cd /usr/local/data01/
[root@b2b766330886 data01]# ls
cjs01  cjs02
[root@b2b766330886 data01]# mkdir cjs03
[root@b2b766330886 data01]# ls
cjs01  cjs02  cjs03
```

> 之后将dc01 dc02删除后dc03的数据依旧正常,创建dc04后依旧正常
>
> 结论：容器之间配置信息的传递，数据卷的生命周期一直持续到**没有容器使用它**为止,
>
> 实际上容器数据卷是持久化在宿主机目录上,而通过继承得到的数据卷大家所获取的都是宿主机目录的数据

## DockerFile(重点)

> 是什么?
>
> Dockerfile是用来构建Docker镜像的构建文件，是由一系列命令和参数构成的**脚本**。
>
> 构建的三个步骤
>
> 1. 编写DockerFile
> 2. docker build
> 3. docker run

### Dockerfile内容基础知识

> 1. 每条保留字指令必须大写,并且至少有一个参数
> 2. 指令从上到下执行
> 3. #表示注释
> 4. 每条指令会创建一个新的镜像层,并对镜像进行提交

执行Dockerfile的大致流程

> 1. 从基础镜像运行一个容器
> 2. 执行一条指令并且对容器进行修改
> 3. 执行类似docker commit的操作提交一个新的镜像层
> 4. docker再基于刚提交的新的镜像层运行一个容器
> 5. 执行dockerfile的下一条指令直到所有指令完成

### 保留字

- FROM：基础镜像，当前新镜像基于哪个文件
- MAINTAINER： 镜像维护者的名称和邮件地址
- RUN：容器构建时需要运行的命令
- EXPOSE：当前容器对外暴露的端口
- WORKDIR：指定创建容器后，终端默认登陆进来的工作空间
- ENV：构建镜像时候设置环境变量
- ADD：将宿主机目录下的文件拷贝到镜像，ADD命令会自动处理URL和解压tar压缩包
- COPY：类似ADD，将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像内的 <目标路径> 位置，

> COPY ["src", "dest"]

- VOLUME：容器数据卷，用于数据保存和持久化的目录
- CMD：指定容器启动时要运行的命令

> Dockerfile 中可以有多个 CMD 指令，但只有最后一个生效，CMD 会被 docker run 之后的参数替换

- ENTRYPOINT ：指定一个容器启动时要运行的命令

> ENTRYPOINT 的目的和 CMD 一样，都是在指定容器启动程序及参数

- ONBUILD：当构建一个被继承的Dockerfile时运行命令，父镜像在**被子继承后父镜像的onbuild被触发**

![](https://raw.githubusercontent.com/huwd5620125/my_pic_pool/master/img/20191223172640.jpg)

### 小总结

> 1. Dockerfile，需要定义一个Dockerfile，Dockerfile定义了进程需要的一切东西。Dockerfile涉及的内容包括执行代码或者是文件、环境变量、依赖包、运行时环境、动态链接库、操作系统的发行版、服务进程和内核进程(当应用进程需要和系统服务和内核进程打交道，这时需要考虑如何设计namespace的权限控制)等等;
>
> 2. Docker镜像，在用Dockerfile定义一个文件之后，docker build时会产生一个Docker镜像，当运行 Docker镜像时，会真正开始提供服务;
>
> 3. Docker容器，容器是直接提供服务的。