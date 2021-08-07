# 初识Docker

## 一、基本操作

> 设置代理:
>
> ```bash
> # vim /etc/systemd/system/docker.service.d/http-proxy.conf
> [Service]
> Environment="HTTP_PROXY=http://username:password@192.168.23.52:80"
> Environment="NO_PROXY=localhost,127.0.0.0/8,docker-registry.somecorporation.com,11.11.225.50"
> ```
>
> 

### 1.安装Docker

- CentOs7
- uanme -r //查看内核版本,docker需要内核超过3.1,若不高于3.1,则使用yum update 更新内核
- systemctl daemon-reload //重新加载配置
- yum -y install docker//安装docker
- systemctl start docker //启动docker
- systemctl stop docker //停止docker
- systemclt enable docker//设置开机自启

### 2. 安装docker容器

- 搜索docker容器 docker search [name]//搜索和name相关的容器
  - 例如:搜索mysql
  - ![](https://mypic-1252529543.cos.ap-shanghai.myqcloud.com/20190521100529.png)

- 使用国内的docker加速器

  - <https://www.daocloud.io/mirror>

    1)、curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://f1361db2.m.daocloud.io

    2)、 /etc/docker/daemon.json文件中的格式修改一下 修改成如下

    ```shell
    {
    "registry-mirrors": ["https://f1361db2.m.daocloud.io"]
    }
    
    ```

### 3.下载docker镜像

- docker pull [name] # 名称可以通过docker search查询到
- docker pull [name]:[tag] #tag标签一般是版本号 如果不加则会下载默认的版本,版本号可以通过<https://hub.docker.com/>查看到

### 4.查看和删除docker镜像

- docker images #查看当前系统所有docker镜像

- docker rmi [id] #删除指定id的镜像
- ![](https://mypic-1252529543.cos.ap-shanghai.myqcloud.com/20190521102923.png)



## 二、启动容器

### 1.安装运行tomcat

```shell
# 1.安装tomcat
# 查询tomcat
[root@localhost ~]# docker search tomcat
# 拉取tomcat
[root@localhost ~]# docker pull tomcat
# 运行tomcat
# --name 定义的名称
# -d 表示的是后台运行
# tomcat:latest 表示要运行的容器名称以及版本
[root@localhost ~]# docker run --name mytomcat -d tomcat:latest
#运行成功后可以通过 docker ps查看
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
a614ebd3b844        tomcat:latest       "catalina.sh run"   3 seconds ago       Up 2 seconds        8080/tcp            mytomcat
# 停止运行中的容器
[root@localhost ~]# docker stop mytomcat
[root@localhost ~]# docker stop a614ebd3b844 #参数是我们定义的名字或者自动生成的CONTAINER ID 都可以
# 查看所有容器
[root@localhost ~]# docker ps -a # 查看所有的 包括已经停止的容器
#启动容器
[root@localhost ~]# docker start a614ebd3b844 [通过生成的ID启动对应的容器]
# 删除容器 
[root@localhost ~]# docker rm a614ebd3b844
Error response from daemon: You cannot remove a running container a614ebd3b84412248d17038b5edf27147c437a4c81d37a658bdd2a5bc36fb131. Stop the container before attempting removal or use -f
# 删除容器的时候,需要容器已经关闭


```

### 2. 创建一个可以被访问的docker容器

- 上面的方法只是可以成功创建,可容器并没有映射到实际机器的地址上

- ```shell
   docker run -d -p 8888:8080 #-p 是增加机器和容器的端口映射,表示将实际机器的8888和容器中8080的端口做映射
  示例:
  docker run -p 3306:3306 --name mysql02 -e MYSQL_ROOT_PASSWORD=admin123 -d mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
  
  ```

### 3.查看容器日志

- ```shell
  [root@localhost ~]# docker logs 78d7cbbf2334[容器id]
  ```
###  4.进入容器内部:

- ```shell
  docker exec -it mysql01[name] bash
  可以进入容器内部执行容器命令
  ```


### 5.修改内部配置

- mysql为例

- ```shell
  在本地准备好配置文件,如下,
  将对应需要修改的实例先关闭
  通过docker cp 命令 可以将本地的文件拷贝到对应实例的对应目录下,再重启服务即可
  docker cp /app/config/mysql/my.cnf 57c9950a911b:/etc/mysql/mysql.conf.d/mysqld.cnf
  
  /etc/mysql/my.cnf		
  
  ```




  ```shell


[mysqld]
pid-file	= /var/run/mysqld/mysqld.pid
socket		= /var/run/mysqld/mysqld.sock
datadir		= /var/lib/mysql
lower_case_table_names=1

symbolic-links=0
# disable_ssl
skip_ssl





  ```



## 三、设置容器维护的服务自启

​    Docker容器的重启策略如下：

- - no，默认策略，在容器退出时不重启容器

  - on-failure，在容器非正常退出时（退出状态非0），才会重启容器

  - - on-failure:3，在容器非正常退出时重启容器，最多重启3次

  - always，在容器退出时总是重启容器

  - unless-stopped，在容器退出时总是重启容器，但是不考虑在Docker守护进程启动时就已经停止了的容器

```bash
例子:
docker run --restart=no 884da3fa8da5
docker update --restart=always 884da3fa8da5[CONTAINER ID](run是创建时使用,update是更新容器使用)
```

