同构注意事项
---

* 尽量避免使用 window 等客户端变量
> server端没有window对象，如果使用需要从window开始逐级判断是否存在

* 客户端端对象的判断用typeof
> if(window && window.autoScroll) => if(typeof window != undefined && window.autoScroll)

* 避免往window等全局对象挂载定时器
> 可能内存泄漏

* 避免random()等不确定性输出(输出结果可预期，不依赖于环境等)
> 可能会造成server端和web端 dom 匹配校验不成功

* 避免使用第三方非react库
> 如: 用react包装一个JQuery写的富文本编辑器