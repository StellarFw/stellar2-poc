export const isolate = async (fn: Function, ...args: Array<any>): Promise<any> => {
  try {
    return await Promise.resolve(fn(...args));
  } catch(e) {
    return e;
  }
};
