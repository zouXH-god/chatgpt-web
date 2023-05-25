# 源码搭建方法
### 1、配置python环境，python版本要求在3.8以上
- 需安装库：requests，flask，openai,具体版本无要求
### 2、将代码拉取到本地
### 3、运行代码

# docker版一键部署方法
### 1、安装docker，具体方法请自行百度
### 2、执行安装指令
```
docker run -p 80:80 -id shiran2488/openai_web:1
```

## 接口使用
在搭建好站点后，默认有三个可以调用的接口
```
接口名称：
- 描述：发送ChatGPT信息
- URL：http://IP/sendChatGPT

请求：
- 方法：POST
- 参数：
  - key：字符串，非必填
  - messages：上下文及消息，必填，
  - messages示例：
  	[
		{"role":"user","content":"你好"},
		{"role":"assistant","content":"你好! 有什么可以帮助您的吗？"},
	]
```
```
接口名称：
- 描述：查询key余额
- URL：http://IP/open_fill?key=

请求：
- 方法：GET
- 参数：
  - key：字符串，必填
```
```
接口名称：
- 描述：设置共享key
- URL：http://IP/setKey?key=

请求：
- 方法：GET
- 参数：
  - key：字符串，必填
```
更具体的方法请查看我的博客：[chatGPT机器人，保姆级搭建教程](http://blog.xin-hao.top/index.php/2023/04/12/51/ "chatGPT机器人，保姆级搭建教程")
欢迎加Q群交流：614702246
