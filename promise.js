const PENDING = 'PENDING', FULFILLED = 'FULFILLED', REJECTED = 'REJECTED';

class IPromise {
  constructor(exe) {
    // set initial state to 'PENDING'
    this.state = PENDING;
    // queue
    this.queue = [];
    doResolve(this, exe);
  }

  then(doesFulfill, doesReject) {
    willHandle(this, { doesFulfill, doesReject });
  }
}

willHandle = (promise, willDo) => {
  if (promise.state === PENDING) {
    promise.queue.push(willDo)
  } else handleResolved(promise, willDo)
}

fulfill = (promise, value) => {
  promise.state = FULFILLED;
  promise.value = value;
}

reject = (promise, reason) => {
  promise.state = REJECTED;
  promise.value = reason;
}

doResolve = (promise, exe) => {
  let called = false;

  doesFulfill = (value) => {
    if (called) {return}
    called = true;
    fulfill(promise, value)
  }

  doesReject = (reason) => {
    if (called) {return}
    called = true;
    reject(promise, reason)
  }
  try {
    exe(doesFulfill, doesReject);
  } catch (e) {
    doesReject(e);
  }
}

handleResolved = (promise, willDo) => {
  const callback = promise.state === FULFILLED ? willDo.doesFulfill : willDo.doesReject;
  callback(promise.value)
}

module.exports = IPromise;