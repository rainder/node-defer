'use strict';

require('co-mocha');
const defer = require('./..');
const chai = require('chai');

chai.should();

describe('all-tests', function () {
  it('should return a proper object', function *() {
    const dfd = defer();
    dfd.should.have.keys([
      'promise',
      'resolve',
      'reject'
    ]);

    dfd.promise.should.be.an.instanceOf(Promise);
    dfd.resolve.should.be.a('function');
    dfd.reject.should.be.a('function');
  });

  it('should resolve', function *() {
    const dfd = defer();

    dfd.resolve(1);

    const result = yield dfd.promise;
    result.should.equals(1);
  });

  it('should resolve', function *() {
    const dfd = defer();

    dfd.reject(1);

    try {
      yield dfd.promise;
      false.should.equals(true);
    } catch(e) {
      e.should.equals(1);
    }
  });

  it('should resolve a callback', function *() {
    const fn = (cb) => {
      setTimeout(() => cb(null, 1), 1);
    };

    const result = yield defer.callback(function (cb) {
      fn(cb);
    });

    result.should.equals(1);
  });

  it('should reject a callback', function *() {
    const fn = (cb) => {
      setTimeout(() => cb(1, null), 1);
    };

    try {
      yield defer.callback(function (cb) {
        fn(cb);
      });
      false.should.equals(true);
    } catch (e) {
      e.should.equals(1);
    }
  });

  it('should reject a callback 2', function *() {
    const fn = (cb) => {
      throw 1;
    };

    try {
      yield defer.callback(function (cb) {
        fn(cb);
      });
      false.should.equals(true);
    } catch (e) {
      e.should.equals(1);
    }
  });


});
