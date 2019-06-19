const PENDING = 'PENDING', FULFILLED = 'FULFILLED', REJECTED = 'REJECTED';

class IPromise {
  constructor(exe) {
    // set initial state to 'PENDING'
    this.state = PENDING

    doResolve(this, exe)
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
  doesFulfill = (value) => {
    fulfill(promise, value)
  }

  doesReject = (reason) => {
    reject(promise, reason)
  }
  exe(doesFulfill, doesReject)
}

module.exports = IPromise;