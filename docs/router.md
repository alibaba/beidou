## Router

### Auto router

Every page in /client folder will be routed automatically. 
For example, visit `http://localhost:6001/page-a`, `/client/page-a.jsx` will be rendered.


| Client source          | Router | Memo           |
| ---------------------- | ------ | -------------- |
| client/index.jsx       | /      | Default router |
| client/index/index.jsx | /      | Default router |
| client/a.jsx           | /a     | Auto router    |
| client/a/index.jsx     | /a     | Auto router    |
| client/a/b.jsx         | /a/b   | Auto router    |
| client/a/b/index.jsx   | /a/b   | Auto router    |

### Custom router

if we want to map `/a` to `/client/b.jsx`, follow the next steps

step 1: create a new router

```javascript
//  /app/router.js
module.exports = (app) => {
  app.get('/a', app.controller.a);
};

```

step 2: create a new controller, and render `/client/b.jsx`


```javascript
//  /app/controller/a.js
module.exports = function* aController() {
  yield this.render('b');
};

```