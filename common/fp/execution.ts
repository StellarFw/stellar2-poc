import { Result } from "./result.ts";

/**
 * Panic with an error.
 * 
 * The use of this functions isn't recommenced since this can lead to the program to die. Instead it's recommended to 
 * use a Result monad to return an error.
 */
export const panic = (error: string | Error) => {
  const errorObj = error instanceof Error ? error : Error(error);
  throw errorObj;
}

/**
 * Executes an function into a safe context that will cath any unhandled exception and converts the return/exception 
 * into a Result.
 * 
 * @param fn function to be executed
 * @param args arguments to be passed to the function
 */
export const isolate = async <T>(fn: Function, ...args: Array<any>): Promise<Result<T, Error>> => {
  try {
    const value = await Promise.resolve(fn(...args));
    return Result.ok(value);
  } catch(e) {
    const message = e instanceof Error ? e.message : e;
    return Result.err(message);
  }
};
