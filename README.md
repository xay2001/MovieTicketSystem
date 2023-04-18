# MovieTicketingSystem
基于SpringBoot的前后端分离的电影购票系统

## 1. 介绍

​	SpringBoot+SpringSecurity+MyBatis-Plus 框架的前后端电影项目，前端使用vue+element ui，后端SpringBoot。
​	前台主要有根据类型和地区进行电影的筛选、电影的搜索、热门榜单、活动的发布、留言的发布、电影的购票、电影的在线选座位、我的购物车、我的订单等功能。
后台主要有影片的增删查改、电影的拍片、海报的管理、用户和员工的管理等等功能。

## 2. 演示视频

[基于SpringBoot和Redis的电影订票系统的演示视频-毕业设计答辩展示](https://www.bilibili.com/video/BV1Av4y1n7gC/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=8cdbc354c506ada0f88ae56dc7594e0a)

## 3. 软件架构

前后端分离项目

##  4. 数据库

movie.sql

## 5. 关于

- api 目录下为Spring boot项目代码
- vue-admin 目录下为网站管理后台代码
- vue-app 目录下为网站前台代码

## 6. 快速搭建项目

### 6.1 导入数据库文件

将 [movie.sql](movie.sql) 文件导入数据库

### 6.2 修改配置文件

```properties
server:
  port: 8888
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/movie?characterEncoding=utf8&serverTimezone=UTC
    username: 数据库用户名
    password: 数据库密码
  cache:
    redis:
      #使用前缀
      use-key-prefix: true
      #redis过期时间
      time-to-live: 60s
  mail:
    username: 邮件账户名
    password: 邮件授权码
    host: smtp.163.com（改成邮箱host）
mybatis-plus:
  global-config:
    db-config:
      id-type: uuid
      #schema: classpath:/sql/schema.sql
  type-aliases-package: com.movie.api.model.entity
```

### 6.3 配置Node.js

1. 打开vue-app文件夹

2. 删除 node_nodules文件夹和package-lock.json文件

3. 打开终端 输入以下命令

   ```bash
   npm install
   npm run serve
   ```

4. vue-admin同样操作

### 6.4 运行

打开api文件夹下 src/main/java/ApiApplication.java 运行

### 6.5 测试

前端运行地址：localhost:8080

管理员端运行地址：localhost:8081

### 6.6 备注

- 管理员账号：@admin
- 密码：123456

- 用户账号：xay2001
- 密码：123456
