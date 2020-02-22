import { Maybe } from "./maybe.ts"
import { equals } from "./logic.ts"
import { panic } from "./execution.ts"

export enum ResultState {
  Ok = "Ok",
  Err = "Err"
}

/**
 * Result is a type that represents either success (Ok) or failure (Err).
 */
export interface Result<T, E> {
  state: ResultState,
  value?: T,
  error?: E
}

export namespace Result {
  /**
   * Contains the success value
   */
  export const ok = <T, E>(value: T): Result<T, E> => ({
    state: ResultState.Ok, 
    value
  })

  /**
   * Contains the error value
   */
  export const err = <T, E>(error: E): Result<T, E> => ({
    state: ResultState.Err,
    error
  })

  /**
   * Returns true if the result is Ok.
   */
  export const isOk = <T, E>(r: Result<T, E>): boolean => equals(r.state, ResultState.Ok)

  /**
   * Returns true if the result is Err.
   */
  export const isErr = <T, E>(r: Result<T, E>): boolean => equals(r.state, ResultState.Err)

  /**
   * Returns true if the result is an Ok value containing the given value.
   */
  export const contains = <T, E>(r: Result<T, E>, value: T): boolean => isOk(r) && equals(r.value, value);
  
  /**
   * Returns true if the result is an Err value containing the given value.
   */
  export const containsErr = <T, E>(r: Result<T, E>, value: E): boolean => isErr(r) && equals(r.error, value);

  /**
   * Converts from Result<T, E> to Maybe<T>.
   * 
   * Converts into an Maybe<T>, consuming the value, and discarding the error, if any.
   */
  export const okMaybe = <T, E>(r: Result<T, E>): Maybe<T> => isOk(r) ? Maybe.some(r.value!) : Maybe.none();
  
  /**
   * Converts from Result<T, E> to Maybe<E>.
   * 
   * Converts into an Maybe<E>, consuming error, and discarding the success value, if any.
   */
  export const errMaybe = <T, E>(r: Result<T, E>): Maybe<E> => isErr(r) ? Maybe.some(r.error!) : Maybe.none();

  /**
   * Unwraps a result, yielding the content of an Ok.
   * 
   * Panics if the value is an Err, with a panic message provided by the Err's value.
   */
  export const unwrap = <T, E>(r: Result<T, E>): T => isOk(r) ? r.value! : panic(r.error as any);

  /**
   * Unwraps a result, yielding the content of an Err.
   * 
   * Panics if the value is an Ok, with a panic message including the passed message, and the content of the Ok.
   */
  export const unwrapErr = <T, E>(r: Result<T, E>): E => isErr(r) ? r.error! : panic(r.value as any);

  /**
   * Check if the given object is an Result.
   */
  export const isResult = (r: any): boolean => !!r.state && [ResultState.Ok, ResultState.Err].includes(r.state);
}
