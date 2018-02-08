# SSR Attentions

* Avoid to use `BOM objects`, such as `window`
> There is no `BOM objects` in server side, beidou framework created common BOM objects for compatibility

* Use `typeof` for `if-else`
> if(window && window.autoScroll) => if(typeof window !== "undefined" && window.autoScroll)

* Avoid setting timer to global variable, such as `window`
> May cause memory leak && out of memory.

* Avoid to use `random()`
> The result is unpredictable.

* Avoid to use non-react lib
> eg. JQuery rich text library packaged with React
