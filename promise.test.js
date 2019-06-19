// I Promise
const IPromise = require('./promise')
// A Promise in Javascript
const value = '😂';
const reason = 'Broek! ☠️';

describe('handling promise errors with REJECTED', () => {
  it('it transitions to REJECTED state on error/fail ⁉️', () => {
    const error = new Error('I failed! 💔');
    const doesReject = jest.fn();
    const promise = new IPromise((fulfill, reject) => {
      throw error;
    })

    promise.then(null, doesReject);
    expect(doesReject.mock.calls.length).toBe(1);
    expect(doesReject.mock.calls[0][0]).toBe(error);
    expect(promise.state === 'REJECTED');
  })
})

it('it should not be FULFILLED once a promise has been REJECTED', () => {
  const doesFulfill = jest.fn();
  const doesReject = jest.fn();
  const promise = new IPromise((fulfill, reject) => {
    reject(reason);
    fulfill(value);
  });
  promise.then(doesFulfill, doesReject);

  expect(doesReject.mock.calls.length).toBe(1);
  expect(doesReject.mock.calls[0][0]).toBe(reason);
  expect(doesFulfill.mock.calls.length).toBe(0);
  expect(promise.state === 'REJECTED');
})

it('it should not be REJECTED once a promise has FULFILLED', () => {
  const doesFulfill = jest.fn();
  const doesReject = jest.fn();
  const promise = new IPromise((fulfill, reject) => {
    fulfill(value);
    reject(reason)
  });
  promise.then(doesFulfill, doesReject);

  expect(doesFulfill.mock.calls.length).toBe(1);
  expect(doesFulfill.mock.calls[0][0]).toBe(value);
  expect(doesReject.mock.calls.length).toBe(0);
  expect(promise.state === 'FULFILLED');
})

it('it should have .then method', () => {
  const promise = new IPromise(()=>{});

  expect(typeof promise.then).toBe('function')
})

it('it should call the doesFulfill 😉 method when promise is FULFILLED', () => {
  const doesFulfill = jest.fn();
  const promise = new IPromise((fulfill, reject) => {
    fulfill(value);
  })
  .then(doesFulfill);

  expect(doesFulfill.mock.calls.length).toBe(1);
  expect(doesFulfill.mock.calls[0][0]).toBe(value);
})

it('it transitions to REJECTED ☠️ with reason', () => {
  const doesReject = jest.fn();
  const promise = new IPromise((fulfill, reject) => {
    reject(reason);
  })
  .then(null, doesReject);

  expect(doesReject.mock.calls.length).toBe(1);
  expect(doesReject.mock.calls[0][0]).toBe(reason);
})

it('it calls execute fn() immediately when constructed', () => {
  const exe = jest.fn(); // mock execute fn() passed inside the promise
  const promise = new IPromise(exe);

  expect(exe.mock.calls.length).toBe(1);
  expect(typeof exe.mock.calls[0][0]).toBe('function'); // promises execute function arguments are fn()s as well
  expect(typeof exe.mock.calls[0][1]).toBe('function');
})

it('it enters a PENDING state', () => {
  const promise = new IPromise(function exe(fulfill, reject) { /* empty */ })
  // for testing sake, IPromise state is public
  expect(promise.state).toBe('PENDING');
})

it('it transitions to a FULFILLED 🏁 state with a resolved value', () => {
  const promise = new IPromise((fulfill, reject)=> {
    fulfill(value);
  })
  expect(promise.state).toBe('FULFILLED');
})

it('it transitions to a REJECTED state with a reason', () => {
  const promise = new IPromise((fulfill, reject) => {
    reject(reason);
  })
  expect(promise.state).toBe('REJECTED');
})