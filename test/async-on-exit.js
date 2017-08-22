var asyncOnExit = require('..')

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
