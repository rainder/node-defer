'use strict';

module.exports = defer;
defer.callback = callback;

/**
 *
 * @returns {{promise: Promise, resolve: Function, reject: Function}}
 */
function defer() {
  const result = {};

  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

/**
 *
 * @param fn
 * @returns {Promise}
 */
function callback(fn) {
  const dfd = defer();
  
  try {
    fn((err, result) => err ? dfd.reject(err) : dfd.resolve(result));
  } catch (err) {
    dfd.reject(err);
  }

  return dfd.promise;
};
