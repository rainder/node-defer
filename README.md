# Defer

Simple Native node.js promise wrapper.

## defer(): dfd

```js
const defer = require('@rainder/defer');

const dfd = defer();

dfd.promise.then(...);
dfd.resolve(...);
dfd.reject(...);
```

## defer.callback(fn: Function): Promise
```js
const defer = require('@rainder/defer');

defer.callback((cb) => {
	socket.write(data, cb);
}).then(...);
```

That's it.