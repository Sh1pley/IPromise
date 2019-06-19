const PENDING = 'PENDING', FULFILLED = 'FULFILLED', REJECTED = 'REJECTED';

class IPromise {
  constructor(exe) {
    // set initial state to 'PENDING'
    this.state = PENDING

    doResolve(this, exe);
  }

  then(doesFulfill, doesReject) {
    handleResolved(this, doesFulfill, doesReject);
  }
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

handleResolved = (promise, doesFulfill, doesReject) => {
  const callback = promise.state == FULFILLED ? doesFulfill : doesReject;
  callback(promise.value)
}

module.exports = IPromise;