# async-on-exit

## Description

Provides a way to execute asynchronous operations before exiting.

## How it works

It works by **overwriting and proxyfying `process.exit()`** method. You can always call `.dispose` method to clean up everything this module does.

## Reference

### asyncOnExit(Function listener, Boolean attachSignalListeners)
* listener: function to execute when `process.exit()` is called. If function returns a promise, the process exit will be delayed until the promise is fulfilled
* attachSignalListeners: whether to also handle SIGINT and SIGTERM signals

  **NOTE: This will attach an event listener on SIGINT and SIGTERM that will delay exiting process until promise returned by listener fails or succeeds and exits node afterward. There is no way to cancel process exit unless you never resolve or reject the listener promise. In a future version a mechanism for cancelling exit will be added**

### asyncOnExit.dispose()
Restores original process.exit and remove attached signal listeners in case you used `attachSignalListeners`.

## Examples

Usage:
```
var asyncOnExit = require('async-on-exit')

asyncOnExit(function () {
  console.log('asyncOnExit()');

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('resolve()');
      resolve();
    }, 1000);
  });
}, true);

asyncOnExit(function () {
  console.log('asyncOnExit() 2');

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('resolve() 2');
      resolve();
    }, 1000);
  });
}, true);

console.log('calling process.exit() in 1s')
setTimeout(function () {
  console.log('process.exit()')
  process.exit(22);
}, 1000)
```

Disposing:
```
var asyncOnExit = require('async-on-exit')

asyncOnExit(function () {
    console.log('asyncOnExit()');

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('resolve()');
            resolve();
        }, 1000);
    });
}, true);

console.log('calling asyncOnExit.dispose() in 1s')
setTimeout(function () {
    console.log('asyncOnExit.dispose()')
    asyncOnExit.dispose();

    process.exit(42)
}, 1000)
```
