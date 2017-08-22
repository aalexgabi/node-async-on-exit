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

console.log('calling asyncOnExit.dispose() in 1s')
setTimeout(function () {
    console.log('asyncOnExit.dispose()')
    asyncOnExit.dispose();

    process.exit(42)
}, 1000)
