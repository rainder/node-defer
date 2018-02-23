'use strict';

import { expect } from 'chai';
import { callback, defer } from './index';

describe('all-tests', function () {
  it('should return a proper object', async function () {
    const dfd = defer();
    expect(dfd).to.have.keys([
      'promise',
      'resolve',
      'reject',
    ]);

    expect(dfd.promise).to.be.an.instanceOf(Promise);
    expect(dfd.resolve).to.be.a('function');
    expect(dfd.reject).to.be.a('function');
  });

  it('should resolve', async function () {
    const dfd = defer();

    dfd.resolve(1);

    const result = await dfd.promise;
    expect(result).to.equals(1);
  });

  it('should resolve', async function () {
    const dfd = defer();

    dfd.reject(1);

    try {
      await dfd.promise;
      expect(false).to.equals(true);
    } catch (e) {
      expect(e).to.equals(1);
    }
  });

  it('should resolve a callback', async function () {
    const fn = (cb: Function) => {
      setTimeout(() => cb(null, 1), 1);
    };

    const result = await callback(function (cb: Function) {
      fn(cb);
    });

    expect(result).to.equals(1);
  });

  it('should reject a callback', async function () {
    const fn = (cb: Function) => {
      setTimeout(() => cb(1, null), 1);
    };

    try {
      await callback(function (cb: Function) {
        fn(cb);
      });
      expect(false).to.equals(true);
    } catch (e) {
      expect(e).to.equals(1);
    }
  });

  it('should reject a callback 2', async function () {
    const fn = (cb: Function) => {
      throw 1;
    };

    try {
      await callback(function (cb: Function) {
        fn(cb);
      });
      expect(false).to.equals(true);
    } catch (e) {
      expect(e).to.equals(1);
    }
  });

});
