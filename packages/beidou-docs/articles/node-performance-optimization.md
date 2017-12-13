# Node.js 性能优化方法论与实战

> 本文首次发表于[北斗同构github](https://github.com/alibaba/beidou/blob/master/packages/beidou-docs/articles/node-performance-optimization.md), 转载请注明出处

## 前言
很多前端工程师在做页面性能调优的过程中，极少关注代码本身的执行效率，更多关注的是网络消耗，比如资源合并减少请求数、压缩降低资源大小、缓存等。我并不是反对这种方式，相反，在很大程度上这是足够正确的做法，举个例子， JS本身的执行时间是30ms(毫秒)，在和动辄三五秒的页面加载时间中的占比实在太低了，就算拼了命把性能提升10倍，执行时间降到3ms，整体性能提升也微不足道，甚至在用户层面都无法感知。因此去优化其它性能消耗的大头更加明智。

但从Node.js(服务端)的角度来看，JS本身的执行时间却变得至关重要，还是之前的例子，如果执行时间从30ms降到3ms, 理论上QPS就能提升10倍，换句话说，以前要10台服务器才能扛住的流量现在1台服务器就能扛住，而且响应时间更短。

那到底Node端如何做性能优化呢？

## 方法

有两种方法，一种是通过[Node/V8自带的profile能力](https://nodejs.org/uk/docs/guides/simple-profiling/) , 另一种是通过[alinode](http://alinode.alibaba-inc.com/)的 CPU profile功能. 前者只列出了各函数的执行占比, 后者包括更加完整的调用栈，可读性更强，更加容易定位问题，建议采用后者。

### 方法1: Node 自带 profile

* 第1步： 以--prof参数启动Node应用

```
$ node --prof index.js
```

* 第2步： 通过压测工具[loadtest](https://github.com/alexfernandez/loadtest)向服务施压

```
$ loadtest  http://127.0.0.1:6001 --rps 10
```

* 第3步： 处理生成的log文件

```
$ node --prof-process isolate-0XXXXXXXXXXX-v8-XXXX.log > profile.txt 
```

* 第4步： 分析profile.txt文件

***profile.txt***文件如下图，包括JS和C++代码各消耗多少ticks, 具体分析方法详见[node profile文档](https://nodejs.org/uk/docs/guides/simple-profiling/)

![](https://img.alicdn.com/tfs/TB1GCXbilfH8KJjy1XbXXbLdXXa-742-470.png)

### 方法2: alinode的CPU profile

* 第1步： 安装alinode

alinode是与 Node 社区版完全兼容的二进制运行时环境, 推荐使用tnvm工具进行安装

```
$ wget -O- https://raw.githubusercontent.com/aliyun-node/tnvm/master/install.sh | bash

```

完成安装后，需要将tnvm添加为命令行程序。根据平台的不同，可能是~/.bashrc，~/.profile 或 ~/.zshrc等

```
$ source ~/.zshrc
```

以alinode-v3.8.0为例, 对应node-v8.9.0, 下载该版本并启用它

```
$ tnvm install alinode-v3.8.0
$ tnvm use alinode-v3.8.0

```

* 第2步： 用安装的alinode运行时启动应用

```
$ node --perf-basic-prof-only-functions index.js
```

* 第3步： 通过压测工具[loadtest](https://github.com/alexfernandez/loadtest)向服务施压

```
$ loadtest  http://127.0.0.1:6001 --rps 10
```

* 第4步： cpu profile

假设启动的worker进程号为6989, 执行以下脚本, 三分钟后将在/tmp/目录下生成一个cpuprofile文件`/tmp/cpu-profile-6989-XXX.cpuprofile`
脚本详见[take_cpu_profile.sh](https://github.com/alibaba/beidou/blob/master/scripts/take_cpu_profile.sh)

```
$ sh take_cpu_profile.sh 6989
```

* 第5步： 将生成的cpuprofile文件导入到Chrome Developer Tools进行分析

![cpu profile img](https://img.alicdn.com/tfs/TB1GwBRilTH8KJjy0FiXXcRsXXa-968-484.png)

## 实战

下面通过一个真实的案例展示如何一步步地做性能调优。

通过loadtest请求1000次，统计平均RT, 初始RT为15.8ms

![origin](https://img.alicdn.com/tfs/TB1Qpmnih6I8KJjy0FgXXXXzVXa-828-394.png)

剔除program和GC消耗，性能消耗的前三位分别是`get`,`J`和`_eval`三个方法

![](https://img.alicdn.com/tfs/TB1K1t3igvD8KJjy0FlXXagBFXa-1048-570.png)

展开最耗性能的`get`方法调用栈，可以定位到`get`方法所在的位置，具体代码如下

```javascript
{
    key: 'get',
    value: function get(propName) {
      if (!this.state[propName]) {
        return null;
      }
      return JSON.parse(JSON.stringify(this.state[propName]));
    }
  }
```

方法体中，`JSON.parse(JSON.stringify(obj))`虽然使用便捷，但却是CPU密集型操作。做一次验证，去除该操作, 直接返回`this.state[propName]`。RT时间降为12.3ms了

![](https://img.alicdn.com/tfs/TB17HVOicrI8KJjy0FhXXbfnpXa-810-375.png)

这仅仅是一次试验，肯定不能直接移除`JSON.parse(JSON.stringify(obj))`, 不然会影响业务逻辑的。需要找一个替代的深拷贝库。这是常用拷贝方法的[性能对比](http://jsben.ch/bWfk9), 自配梯子。 截图如下：

![](https://img.alicdn.com/tfs/TB1bgXqilfH8KJjy1XbXXbLdXXa-2794-1376.png)

其中性能最优的是lodash deep clone，采用该库替换，再验证一遍， RT降为12.8ms

![](https://img.alicdn.com/tfs/TB18FXtilfH8KJjy1XbXXbLdXXa-810-378.png)

第二耗性能是的`J`方法，里面大部分是各个组件的render时间，暂时略过，以同样的方式`_eval`方法进行一次优化, RT降为10.1ms

![](https://img.alicdn.com/tfs/TB1Ne2DfOqAXuNjy1XdXXaYcVXa-810-378.png)

以此类推，根据CPU profile找出性能消耗的点，逐个去优化