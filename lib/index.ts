export interface Defer<T> {
  promise: Promise<T>;
  resolve: Function;
  reject: Function;
}

export function defer<T>(): Defer<T> {
  const result: Defer<T> = <any>{};

  result.promise = new Promise<T>((resolve, reject) => {
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
export function callback<T>(fn: Function): Promise<T> {
  const dfd = defer<T>();

  try {
    fn((err: any, result: any) => err ? dfd.reject(err) : dfd.resolve(result));
  } catch (err) {
    dfd.reject(err);
  }

  return dfd.promise;
}
