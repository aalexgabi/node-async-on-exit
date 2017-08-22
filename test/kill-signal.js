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


// Keep process open
setTimeout(function () { }, 10000000)

console.log('You can send kill signal now')