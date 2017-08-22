'use strict';

var attachedSignalListeners = false;
var originalProcessExit = process.exit;

function callCurrentProcessExit() {
  process.exit();
}

function asyncOnExit(listener, attachSignalListeners) {
  // Ensures that process.exit is called in case of SIGINT and SIGTERM
  // Because we proxyfy process.exit we need to ensure that signals call it
  // By default signals do not call process.exit()
  if (attachSignalListeners && !attachedSignalListeners) {
    // Not attaching process.exit directly because we need the reference
    // to process.exit at the time of signal and not when attaching listener
    process.on('SIGINT', callCurrentProcessExit);
    process.on('SIGTERM', callCurrentProcessExit);

    attachedSignalListeners = true;
  }

  var previousProcessExit = process.exit;

  // Overwrite process.exit()
  process.exit = function (code) {
    listener().then(function () {
      previousProcessExit(code);
    }).catch(function () {
      previousProcessExit(code);
    })
  }
}

asyncOnExit.dispose = function () {
  process.exit = originalProcessExit;
  process.removeListener('SIGINT', callCurrentProcessExit)
  process.removeListener('SIGTERM', callCurrentProcessExit)
  attachedSignalListeners = false;
}

module.exports = asyncOnExit;
