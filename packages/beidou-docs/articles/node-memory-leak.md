> 本文发表于[北斗同构github](https://github.com/alibaba/beidou/blob/master/packages/beidou-docs/articles/node-memory-leak.md), 转载请注明出处

注： 本文为[D2《打造高可靠与高性能的React同构解决方案》](http://d2forum.alibaba-inc.com/#/index?_k=43090s)分享配套文章，已经过数据脱敏处理。

## 前言

[菜鸟物流大市场](https://56.cainiao.com/)是菜鸟旗下的一条业务线，可以简单地理解为物流领域的淘宝，是为撮合物流需求方和物流提供方搭建的一个平台。其中[搜索页](https://market.c.cainiao.com/search/?q=c&pm=1)、[详情页](https://market.c.cainiao.com/detail/ckzl?id=736&mid=4398106812406)、买家中心等页面是基于[beidou](https://github.com/alibaba/beidou/)同构框架开发的。随着node、react同构等技术越来越广泛地使用, 内存泄漏的事情时有发生，应当引起足够的重视。最近在做菜鸟物流市场的技术支持，就“中奖”了，把实践过程中的经验和心得整理了下，供大家参考。

先介绍几个基本术语: 
* SSR: 服务端渲染, 简而言之就是把页面在服务端渲染好直接返回给浏览器以提升展示性能
* 同构: 在SSR的基础上, 应用既可以在服务端渲染又可以在浏览器渲染，既一套代码两端运行。
* [Beidou(北斗)](https://github.com/alibaba/beidou/): 基于[eggjs](https://github.com/eggjs/egg)的react同构框架, [开源地址](https://github.com/alibaba/beidou)
* 内存泄漏: 是指程序中己动态分配的堆内存由于某种原因未释放或无法释放，通常是应用层不合理的逻辑代码引起的。
* OOM: Out Of Memory, 简单地说就是内存消耗完了，分配不出内存了。内存泄漏是导致OOM的最常见的因素。OOM导致的直接后果就是进程Crash掉。
* RSS: Resident Set Size 实际使用物理内存（包含共享库占用的内存）

## 案例分析

回到之前说到的菜鸟物流大市场

### 发现问题

菜鸟物流大市场上线之后，经常收到alimonitor的告警通知，如下图

![](https://img.alicdn.com/tfs/TB1qBdDa3oQMeJjy0FnXXb8gFXa-1532-1126.png)

于是打开了alinode查看慢日志, 果然有不少慢日志记录

![](https://img.alicdn.com/tfs/TB13dJza3oQMeJjy0FnXXb8gFXa-2526-1114.png)

### 分析&验证&排查

#### 分析
当时主要有以下几个现象：

* 详情页面有时打开很快，有时打开需要4 - 5 秒
* 重启之后会明显变好, 响应速度很快，
* 机器负载采样： CPU消耗很低、 内存消耗高达 53.5%

根据当时的现象做了简单的分析并制定了具体的action：

* 响应很慢 --> 1) 可能HSF接口慢 2) 可能渲染慢 --> action: 分别打点记录日志
* 时快时慢 --> 可能不同的机器当前状况不一样导致响应速度差别很大--> action: 对比各机器负载情况
* 重启后速度很快 --> 可能发生了某事件导致了性能变差，重点排查内存泄漏 --> action: 通过alinode堆快照分析
* CPU低、内存消耗高 --> 极有可能是内存泄漏 --> action: 通过alinode堆快照分析

从上面的推断来看，发生内存泄漏的可能性非常大，但仍然需要通过实际数据进行验证，于是根据制定的action进行数据采集


#### 验证

再次发布之后，采集到了数据:

![](https://img.alicdn.com/tfs/TB19ndFa3MPMeJjy1XbXXcwxVXa-1393-651.png)

从上图中可以看出, 随着时间的推移，进程1694的hsf调用耗时始终稳定，但是服务端渲染的时间却逐步飙升到3700多毫秒，然后在某个临界值之后瞬间降低到50毫秒左右。可能是由于某某事件( 猜测是内存泄漏引起OOM )导致了进程崩溃，接下来[beidou框架](https://github.com/alibaba/beidou/)会自动重启进程又恢复良好的状态。打开sandbox一看进程生命周期，果然如此, 进程1694挂了，然后重新启动了一个29649进程。

![](https://img.alicdn.com/tfs/TB1tFRHa3oQMeJjy0FnXXb8gFXa-1122-720.png)

从上图中也可以看到RSS(实际使用物理内存)高达1880.93MB，至此基本上可以确定是内存泄漏了。查看内存占用曲线，内存呈现锯齿状，先一路飙升，到达零界点之后瞬间下降，如此周而复始。和我们的推断完全一致，这是典型的内存泄漏曲线。

![](https://img.alicdn.com/tfs/TB1SiVDa.gQMeJjy0FjXXaExFXa-1166-726.png)

最终结论： 访问速度慢是因为内存泄漏消耗了过多的资源

#### 排查

定位到是内存泄漏之后，还需要进一步排查具体是什么代码导致了内存泄漏。这时候就要用到排查神器 - alinode了。

先创建堆快照:

![](https://img.alicdn.com/tfs/TB1Op0Ea3MPMeJjy1XdXXasrXXa-2088-204.png)

在分析页面打开`对象簇视图`, 可以看到里面有大量的Window对象, 搜索下竟然高达390个

![](https://img.alicdn.com/tfs/TB1_vlGa3MPMeJjy1XdXXasrXXa-1265-724.png)

采样了几个Window对象，通过`GC Root`展开，发现挂载了无数个定时器。
![](https://img.alicdn.com/tfs/TB1ehura3sSMeJjSspeXXa77VXa-506-686.png)

分析代码找到了两处定时器的设置，看代码逻辑，该定时器在服务端根本不会被释放。

```
componentWillMount(){
        let _this = this;
        window.handler = window.setInterval(function(){
            if(typeof AMap){
                _this.renderMap('', AMap);
                window.clearInterval(window.handler);
            }
        }, 300);
    }
```

注释掉之后在预发验证没有再出现window相关的内存泄漏。

PS.

后来的验证发现，除了定时器的问题，还有另外两处内存泄漏，不再赘述， 贴上其中一处(高德地图)内存泄漏的代码供读者参考

```
componentWillMount(){
        this.createAmapScript();
    }
    
createAmapScript(){
        let script = document.createElement('script'),
            body = document.getElementsByTagName('body')[0];
        script.type = 'text/javascript';
        script.src = 'https://webapi.amap.com/maps?v=1.3&key=59699a8cfee7c52f58390357cbdbf27d';
        body.appendChild(script);
    }

```


### 解决问题

从上述两处代码可以看出，定时器无需在服务端执行， 而高德地图本身就不支持服务端渲染，因此可将二者放到客服端渲染即可。根据react的特性，componentDidMount生命周期函数在服务端不会执行，因此将上述代码从componentWillMount移到componentDidMount中即可。具体修复如下：

![](https://img.alicdn.com/tfs/TB1t0VTa3MPMeJjy1XcXXXpppXa-820-476.png)

通过[loadtest](https://github.com/alexfernandez/loadtest)在本地压测验证下：

![](https://img.alicdn.com/tfs/TB19lxKa3MPMeJjy1XdXXasrXXa-847-603.png)

单个进程同样以10个QPS进行施压，对比下可以看出，修复前RT时间一路上升，而修复后RT始终稳定在200毫秒左右。

再看看线上数据， 内存占用率始终稳定，没有出现飙升现象。

![](https://img.alicdn.com/tfs/TB1SOhLa3MPMeJjy1XdXXasrXXa-1329-594.png)

至此，打完收工。


## 方法论

看完了案例，是时候系统化地总结下方法论了。

### 现象

从刚才的案例中可以看出来，内存泄漏最典型的现象就是内存占用率会随着时间的推移而逐步上升，就算没有流量了，内存占用率也不会下降。而健康的应用是流量上升内存占用会上升，而流量下降之后内存占用率就会回到原水平。
![](https://img.alicdn.com/tfs/TB1_idMa3MPMeJjy1XdXXasrXXa-1358-803.png)

### 原因

通常造成内存泄漏的有以下几个因素
* 缓存
* 队列消费不及时
* 作用域未释放

本文中的案例就属于作用域未释放


### 解决方案
* 本地
  * 通过loadtest压测，观察应用是否健康
  * 如若出现异常，通过node-heapdump对v8堆内存抓取快照, 并通过chrome开发者工具profiles来导入快照进行分析。
* 线上
  * 通过alimonitor、eagleeye等监控平台监控应用健康度
  * 如若出现异常，通过alinode堆快照排查问题
  * 如若异常难以复现，可以在预发 或者隔离某台线上机器进行压测，压测能够有效放大问题
  * 在压测过程中，通过alinode堆快照排查问题


### 建议
* 最重要的一条：开发阶段就压测、开发阶段就压测、开发阶段就压测，重要的事情说三遍。古语云：`上医治未病，中医治欲病，下医治已病`,说的是医术最高明的医生并不是擅长治病的人，而是能够预防疾病的人。让问题在开发阶段就暴露出来, 而不是等到线上告警了再抢救。
* 避免在`constructor`中做事件绑定，建议放到componentDidMount生命周期中
* 不支持SSR的组件放到componentDidMount中，同理，createElement、appendChild等dom原生操作也放到componentDidMount中
* 其它详见[同构注意事项](https://github.com/alibaba/beidou/blob/master/packages/beidou-docs/advanced/attentions.md)


