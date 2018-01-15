插件  
---

### 默认开启的插件  
- [beidou-plugin-react](https://github.com/alibaba/beidou/tree/master/packages/beidou-plugin-react): React同构视图插件 
- [beidou-plugin-webpack](https://github.com/alibaba/beidou/tree/master/packages/beidou-plugin-webpack): 在本地开发环境（local）下的 webpack dev server 插件。
- [beidou-plugin-isomorphic](https://github.com/alibaba/beidou/tree/master/packages/beidou-plugin-isomorphic): 同构插件，使得服务端可以识别less等资源文件，同时能够构造window等客户端对象
- [egg-onerror](https://github.com/eggjs/egg-onerror): egg 的请求全局错误处理插件，返回友好的错误信息，并记录所有的异常。
- [egg-session](https://github.com/eggjs/egg-session): egg 的 session 插件，支持 cookie session 和 tair session 两种模式。基于[koa-session](https://github.com/koajs/session). 
- [egg-i18n](https://github.com/eggjs/egg-i18n): 多语言插件
- [egg-watcher](https://github.com/eggjs/egg-watcher): 文件监听插件
- [egg-multipart](https://github.com/eggjs/egg-multipart): 通过内置的 [co-busboy](https://github.com/cojs/busboy) 实现了文件流式上传， 能做到请求文件数据不落地本地磁盘即可完成处理
- [egg-security](https://github.com/eggjs/egg-security): 安全插件
- [egg-logrotater](https://github.com/eggjs/egg-logrotater): 日志切割插件，默认会按照时间切割 config.logger.rotateLogDirs 目录下的日志文件。
- [egg-schedule](https://github.com/eggjs/egg-schedule): 定时任务插件，支持进程级别和服务器级别的定时任务，并支持自定义扩展定时任务类型。
- [egg-static](https://github.com/eggjs/egg-static): 静态服务插件，基于[koa-static-cache](https://github.com/koajs/static-cache).
- [egg-jsonp](https://github.com/eggjs/egg-jsonp): jsonp插件, 内含安全校验
- [egg-view](https://github.com/eggjs/egg-view): 视图插件
- [egg-development](https://github.com/eggjs/egg-development): 开发插件， 默认只在local环境下开启，其它环境关闭 

## 常用插件
- [egg-userservice](https://github.com/eggjs/egg-userservice): 根据 sid 获取用户信息。
- [egg-userrole](https://github.com/eggjs/egg-userrole): 根据用户信息判断用户角色，默认会的角色判断处理逻辑是 status 403 禁止访问。 基于 [koa-roles](https://github.com/koajs/koa-roles).  
- [egg-validate](https://github.com/eggjs/egg-validate): 基于 parameter 提供数据校验方法的插件 
- [egg-tracer](https://github.com/eggjs/egg-tracer): tracer 插件.  
- [egg-alinode](https://github.com/eggjs/egg-alinode): alinode 插件，提供性能、内存泄漏排查等工具.
- [egg-mysql](https://github.com/eggjs/egg-mysql): mysql数据库插件.
- [egg-oss](https://github.com/eggjs/egg-oss): [OSS](https://cn.aliyun.com/product/oss) 插件, OSS既对象存储服务.
- [egg-instrument](https://github.com/eggjs/egg-instrument): 记录执行时间的插件, 仅用于local环境.  
- [egg-cors](https://github.com/eggjs/egg-cors): 支持跨域资源共享插件.  
- [egg-rest](https://github.com/eggjs/egg-rest): Restful API 插件. 
- [egg-watcher](https://github.com/eggjs/egg-watcher): 文件侦听插件.   
- [egg-sequelize](https://github.com/eggjs/egg-sequelize): Sequelize 插件.   
- [egg-mongoose](https://github.com/eggjs/egg-mongoose): Mongoose数据库插件.   
- [egg-graphql](https://github.com/eggjs/egg-graphql): Graphql 插件.   
- [egg-socket.io](https://github.com/eggjs/egg-socket.io): Socket.io 插件.   
- [egg-redis](https://github.com/eggjs/egg-redis): Redis 客户端插件(支持redis 协议) 基于[ioredis](https://github.com/luin/ioredis).   
- [egg-oauth2-server](https://github.com/Azard/egg-oauth2-server): 提供 oauth2 授权插件
- [egg-passport](https://github.com/eggjs/egg-passport): 鉴权插件，基于[passportjs](http://www.passportjs.org/).
- [egg-mongo-native](https://github.com/brickyang/egg-mongo-native): 基于[node-mongodb-native](https://github.com/mongodb/node-mongodb-native), 提供官方 MongoDB 驱动和API接口
- [egg-grpc](https://github.com/eggjs/egg-grpc): [Grpc](http://www.grpc.io/) 插件.
- [egg-knex](https://github.com/eggjs/egg-knex): Knex 插件. 详见[Knex](https://github.com/tgriesser/knex)
- [egg-dingtalk-robot](https://github.com/eggjs/egg-dingtalk-robot): 钉钉机器人插件
- [egg-session-redis](https://github.com/eggjs/egg-session-redis): 可存储会话(session)到redis的插件
- [egg-websocket](https://github.com/eggjs/egg-websocket): Websocket插件
- [egg-dingtalk](https://github.com/eggjs/egg-dingtalk): 钉钉API插件
- [egg-cookies](https://github.com/eggjs/egg-cookies): 基于[pillarjs/cookies](https://github.com/pillarjs/cookies) 适配koa和egg的cookies插件，并提供若干扩展功能
- [egg-wechat-api](https://github.com/eggjs/egg-wechat-api): 微信API插件
- [egg-leancloud](https://github.com/eggjs/egg-leancloud): [Leancloud](https://leancloud.cn/) 插件
- [egg-passport-github](https://github.com/eggjs/egg-passport-github): Github登录插件
- [egg-aliyun-api-gateway](https://github.com/eggjs/egg-aliyun-api-gateway): [aliyun-api-gateway](https://www.aliyun.com/product/apigateway)插件
- [egg-logview](https://github.com/eggjs/egg-logview): 日志视图插件，用于开发调试
- [egg-passport-weibo](https://github.com/eggjs/egg-passport-weibo): 微博登录插件
- [egg-rpc](https://github.com/eggjs/egg-rpc): 远程调用服务插件，请参考[JSON-RPC 2.0 Specification](http://www.jsonrpc.org/specification)
- [egg-view-handlebars](https://github.com/eggjs/egg-view-handlebars): Handlebars插件.
- [egg-host](https://github.com/eggjs/egg-host): Host配置插件. 支持更改host配置, 类似于修改/etc/hosts文件.
- [egg-async-validator](https://github.com/eggjs/egg-async-validator): Async校验插件
- [egg-watcher-chokidar](https://github.com/eggjs/egg-watcher-chokidar): 增强egg-watcher插件.
- [egg-passport-twitter](https://github.com/eggjs/egg-passport-twitter): Twitter登录插件
- [egg-passport-bitbucket](https://github.com/eggjs/egg-passport-bitbucket): Bitbucket登录插件


更多插件请参考 [plugin-gallery](https://github.com/search?q=topic%3Aegg-plugin&type=Repositories)。