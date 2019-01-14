# egg-beidou

[![TNPM version][tnpm-image]][tnpm-url]
[![TNPM downloads][tnpm-downloads-image]][tnpm-url]

[tnpm-image]: http://web.npm.alibaba-inc.com/badge/v/egg-beidou/egg-beidou.svg?style=flat-square
[tnpm-url]: http://web.npm.alibaba-inc.com/package/egg-beidou/egg-beidou
[tnpm-downloads-image]: http://web.npm.alibaba-inc.com/badge/d/egg-beidou/egg-beidou.svg?style=flat-square

[一句话介绍(解决啥问题)]

默认开启/不开启

## **注意**

注意事项写这里！(如果有)

## 功能特性

### middleware

提供了一个 development middleware

- 静态文件托管 staticMiddleware；
- 开发环境的请求日志在 STDOUT 输出，并统计各个关键部位耗时并输出；
- 监视应用文件变动，实现 Reload 重新加载新的代码；

### extends

- helper.xx 说明
- app.xx 说明
- ctx.xx 说明

## 配置

```js
exports.siteFile = {
  '/favicon.ico': 'https://www.alibaba.com/favicon.ico',
};
```

| 配置项           | 类型   | 默认值 | 说明                                |
| ---------------- | ------ | ------ | ----------------------------------- |
| /favicon.ico     | String | Buffer | https://www.alibaba.com/favicon.ico | 说明说明说明 |
| /crossdomain.xml | String | Buffer | 无，需要时才配置                    |  |
| /robots.txt      | String | Buffer | 无，需要时才配置                    |  |

## Examples
