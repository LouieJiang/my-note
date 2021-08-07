# 记录Docker各种镜像的启动特点

## 0. 配置参数

[run](https://www.runoob.com/docker/docker-run-command.html)

```bash
docker run
-d ：后台运行容器，返回容器ID
-i : 交互模式运行
-p : 设置对外端口映射, 格式 [宿主机port]:[容器端口]
--volume , -v:	绑定一个卷  ‐v /usr/share/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
-e : 格式:JAVA_HOME="xxx" 为容器设置一个环境变量
-t : 为容器重新分配一个终端输入,常与i同时使用
--name="xxxxx" : 为容器设置一个名称xxxxx
--dns=8.8.8.8 : 为容器设置一个dns,默认和宿主一样
--dns-search=xxx.com : 为容器设置一个dns搜索域名,默认和宿主一样
-h : 格式:"sss" 设置容器的hostname
-m : 设置容器可用内存大小
--net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；
--cpuset="0-2" or --cpuset="0,1,2": 绑定容器到指定CPU运行；
--link=[]: 添加链接到另一个容器；
--expose=[]: 开放一个端口或一组端口；

```

### 0.1. -v可能出现的问题

> 当需要挂载文件时,可能会出现挂载的文件无法访问
>
>  原因是CentOS7中的安全模块selinux把权限禁掉了，至少有以下三种方式解决挂载的目录没有权限的问题：  
>
>  1.在运行容器的时候，给容器加特权，及加上 --privileged=true 参数：   docker run -i -t -v /soft:/soft --privileged=true 686672a1d0cc /bin/bash  
>
> 2.临时关闭selinux：   setenforce 0    :目前使用这个方法
>
> 3.添加selinux规则，改变要挂载的目录的安全性文本。

## 1. mongo

```bash
docker run -di --name my-mongo -p 27017:27017 mongo:4.3
# 对外的端口27017

docker run --name some-mongo -e MONGO_INITDB_ROOT_PASSWORD_FILE=/run/secrets/mongo-root -d mongo

docker run -di -v /usr/local/docker/mongo/data:/data/db --name my-mongo -p 8081:8081 -p 27017:27017 \
>  -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
> -e MONGO_INITDB_ROOT_PASSWORD=cjsadmin \
> mongo:4.2
```

## 2. redis

```bash
  docker run -p 6379:6379 --name tensquareRedis -d redis:4.0 
  # 对外端口6379
  
  
   docker run -di -p 6380:6379 --net redis-net -v /app/config/redis/master:/data --name redis-master redis redis-server /data/redis.conf
   #指定网络以及指定名称和挂载目录
```

## 3. mysql

```bash
docker run -p 3336:3306 --name mysql02 -e MYSQL_ROOT_PASSWORD=AyAt9blyoj4Pqic2 -d mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
# 设置对外端口3306,设置root的密码admin123,设置默认字符集utf8


#自定义配置文件以及映射数据,配置目录
docker run --name blog-caden-mysql \
-p 3306:3306 -e MYSQL_ROOT_PASSWORD=VnK1t2jVdNOElBTk \
--mount type=bind,src=/opt/docker/mysql/conf/my.cnf,dst=/etc/mysql/my.cnf \
--mount type=bind,src=/opt/docker/mysql/data,dst=/var/lib/mysql \
--restart=on-failure:3 \
-d hypriot/rpi-mysql:5.5
```

## 4.ElasticSearch

```bash
# 映射文件 jvm.options 和配置
docker run -di --name="tensquareESOpts" -p 9200:9200 -p 9300:9300 -v /docker_config/elastic/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v /docker_config/elastic/jvm.options:/usr/share/elasticsearch/config/jvm.options elasticsearch:6.8.1

# 配置环境变量解决内存问题
docker run -di --name="tensquareES" -p 9200:9200 -p 9300:9300 -v /docker_config/elastic/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml  -e ES_JAVA_OPTS="-Xms256m -Xmx256m" elasticsearch:6.8.1
```

## 5.RabbitMQ

```bash
docker run -di --name=testRabbitmq -p 5671:5617 -p 5672:5672 -p 4369:4369 -p 15671:15671 -p 15672:15672 -p 25672:25672 -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=huwdR5620125B rabbitmq:3.8.4-management
```

### 5.1 RabbitMq 集群

```bash
#1. 启动3个容器
docker run -di --name rabbitCluster1 --name myrabbitmq1 myrabbitmq1  -p 15672:15672 -p 5672:5672 -e RABBITMQ_ERLANG_COOKIE='rabbitClusterCookie' -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=huwdR5620125B rabbitmq:3.8.4-management

docker run -di --name rabbitCluster2 --name myrabbitmq1  -p --link myrabbitmq1:myrabbitmq1 15673:15673 -p 5673:5673 -e RABBITMQ_ERLANG_COOKIE='rabbitClusterCookie' -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=huwdR5620125B rabbitmq:3.8.4-management

docker run -di --name rabbitCluster3 --name myrabbitmq1  -p 15674:15674 -p 5674:5674 --link myrabbitmq1:myrabbitmq1 -e 
RABBITMQ_ERLANG_COOKIE='rabbitClusterCookie' -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=huwdR5620125B rabbitmq:3.8.4-management
#2. 进入3个容器 并设置
# 1)进入容器1
docker exec -it rabbitmqCluster01 bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app
exit
# 2)进入容器2
docker exec -it rabbitmqCluster02 bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster --ram rabbit@rabbitmq01
rabbitmqctl start_app
exit
# 3)进入容器3
docker exec -it rabbitmqCluster03 bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster --ram rabbit@rabbitmq01
rabbitmqctl start_app
exit
#因为rabbitmq并没有负载均衡,可以使用nginx

```



## 6.gogs

```bash
docker run --name=gogs -di -p 10022:22 -p 10080:3000 gogs/gogs::0.11.86
```

## 7.registry

```bash
docker run -di -p 5000:5000 --name blog-registry d9e2ed039be0
```

## 8.network

```bash
#查看所有容器的网络信息
docker inspect --format='{{.Name}} - {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
```

