/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Yaowen Liu
 * @Date: 2020-07-03 17:23:27
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2020-07-03 18:19:37
 */ 
const express = require("express");
const path = require("path");
const app = express();

// 日志
const logger = (req, res, next) => {
  console.log(
    `请求的ip地址是：${req.ip}, 请求的路径是：${
      req.url
    }, 请求的时间是：${new Date().getTime()}`
  );
  next();
};
app.use(logger);

// 配置静态资源文件夹
app.use(express.static(path.resolve(__dirname, './dist')));

app.get('/', (req, res) => {
  console.log(req.query);
  console.log(req.ip);
  console.log(req.hostname);
  res.send("express 搭建后台服务");
});

app.get('/index', (req, res) => {
  res.send("我是首页dawdwadwad");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});