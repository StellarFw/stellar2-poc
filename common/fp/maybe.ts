import { equals } from "./logic.ts";
import { panic } from "./execution.ts";

/**
 * Possible types for the maybe format.
 */
export enum MaybeState {
  Some = "Some",
  None = "None"
}

/**
 * The maybe type is a special type in computation that allows to always return
 * a value that can contain something of nothing.
 * 
 * This way we can prevent ending into undefined or null values.
 */
export interface Maybe<T> {
  readonly state: MaybeState,
  readonly value?: T,
}

/**
 * Put all functions inside a namespace to isolate and prevent collisions.
 */
export namespace Maybe {
  /**
   * Internal function to create a new Maybe object.
   * 
   * @param val possible value to be included on the Maybe monad.
   */
  const createMaybe = <T>(val?: T): Maybe<T> => ({
    state: val === undefined ? MaybeState.None : MaybeState.Some,
    value: val
  } as Maybe<T>);

  /**
   * Wrap a value inside a Maybe.
   * 
   * @param val value to be wrapped by the Maybe
   */
  export const some = <T>(val: T): Maybe<T> => createMaybe(val);

  /**
   * Create a None Maybe.
   */
  export const none = <T>(): Maybe<T> => createMaybe();

  /**
   * Returns true if the Maybe is a Some value.
   */
  export const isSome = (val: Maybe<any>): boolean => equals(val.state, MaybeState.Some);

  /**
   * Returns true if the Maybe is a None value.
   */
  export const isNone = (val: Maybe<any>): boolean => equals(val.state, MaybeState.None);

  /**
   * Returns true if the maybe is a Some value containing the given value.
   */
  export const contains = (a: Maybe<any>, val: any): boolean => isNone(a) ? false : equals(a.value, val);

  /**
   * Moves the value v out of the Maybe<T> if it is some(v).
   * 
   * In general, because this function may panic, its use is discouraged. Instead, prefer to use pattern matching and 
   * handle the None case explicitly.
   */
  export const unwrap = <T>(a: Maybe<T>): T => isNone(a) ? panic("trying unwrap a None value") : a.value;

  /**
   * Returns the wrapped value or a default.
   * 
   * Arguments passed are eagerly evaluated; if you are passing the result of a function call, it is recommended to use 
   * `unwrapOrElse`, which is lazily evaluated.
   */
  export const unwrapOr = <T>(a: Maybe<T>, def: T): T => isNone(a) ? def : a.value;

  /**
   * Returns the contained value or computes it from a closure.
   */
  export const unwrapOrElse = <T>(a: Maybe<T>, fn: () => T): T => isNone(a) ? fn() : a.value;

  /**
   * Maps a `Maybe<T>` to `Maybe<U>` by applying a function to a contained value.
   */
  export const map = <T, U>(a: Maybe<T>, fn: (v: T) => U): Maybe<U> => isNone(a) ? none<U>() : createMaybe<U>(fn(unwrap(a)));
}
