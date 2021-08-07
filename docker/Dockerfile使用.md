# Dockerfile

1.制作jdk镜像

2.regi

3.将jdk镜像上传到私有仓库

```bash
/etc/sysconfig/docker
docker run -d -p 5000:5000  -v /root/my_docker_registry:/var/lib/registry --name=tensquareRegistry  registry:2.7.1
0af088da7861: Retrying in 1 second 
e987b9aaf5ea: Retrying in 1 second 
d69483a6face: Retrying in 1 second 
received unexpected HTTP status: 500 Internal Server Error #pushu一直失败,因为selinux防火墙阻塞了端口,
永久关闭selinux后 不知名原因导致docker无法启动镜像
临时关闭： 

[root@localhost ~]# getenforce
Enforcing

[root@localhost ~]# setenforce 0
[root@localhost ~]# getenforce
Permissive
# 最终尝试临时关闭或者将SELINUX永久设置成Permissive

# 关闭SELINUX
[root@localhost ~]# vim /etc/sysconfig/selinux

SELINUX=enforcing 改为 SELINUX=Permissive

重启服务reboot
```

OPTIONS=’–selinux-enabled --insecure-registry 192.168.64.120:5000’

4.部署项目

5.安装gogs

6.使用jenkins

