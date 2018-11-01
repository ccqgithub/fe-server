# MongoDB

## Install

- https://docs.mongodb.com/manual/administration/install-community/

## 工具

- 客户端：Studio 3T
- node： mongoosejs

## 文档

- https://docs.mongodb.com/master/tutorial/install-mongodb-on-red-hat/  
- http://www.cnblogs.com/roam/p/5762459.html  
- http://www.open-open.com/lib/view/open1452062470464.html  
- http://www.cnblogs.com/jifeng/p/5906171.html  

## 安装

- https://docs.mongodb.com/master/tutorial/install-mongodb-on-amazon/?_ga=1.11482420.1870988711.1492002580  

## 创建db目录：

```sh
mkdir -p /usr/local/var/mongodb   
chmod -R 777 /usr/local/var/mongodb
```

## 配置：

```yaml
processManagement:
   fork: true
security:
   authorization: enabled
net:
   bindIp: 127.0.0.1
   port: 27017
systemLog:
   destination: file
   path: "/usr/local/var/log/mongodb/mongo.log"
   logAppend: true
storage:
   dbPath: "/usr/local/var/mongodb"
   journal:
      enabled: true
```

## 重启动服务：

```sh
sudo lsof -i :27017  
ps -ef | grep mongo  
kill 12749  
sudo mongod --config /usr/local/etc/mongod.conf --fork  
sudo chmod -R 777 /data
```

## 命令：

### 帮助：  

help

### 创建数据库：

use dbName

### 创建root用户：

```js
use admin;
db.createUser({
  user: "root", 
  pwd: "root", 
  roles:[
    {role: "root", db: "admin" }
  ]
})
```

### start:  

- `sudo service mongod start`