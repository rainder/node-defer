# Defer

Simple Native node.js promise wrapper.

## defer(): dfd

```ts
import { defer } from '@rainder/defer';

const dfd = defer<number>();

dfd.promise.then(...);
dfd.resolve(...);
dfd.reject(...);
```

## defer.callback(fn: Function): Promise
```ts
import { callback } from '@rainder/defer';

callback<Socket>((cb) => {
  socket.write(data, cb);
}).then(...);
```

That's it.
