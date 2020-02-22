import { when, test, assertEquals, assertTrue, assertFalse, fail } from "./testing-fns.ts";

import { Maybe, MaybeState } from "../fp/maybe.ts";

test("some must create a Maybe of the Some type", () => {
  const value = Maybe.some(4);

  assertEquals(value.state, MaybeState.Some);
  assertEquals(value.value, 4);
});

test("none must create a Maybe of the None type", () => {
  const value = Maybe.none();

  assertEquals(value.state, MaybeState.None);
  assertEquals(value.value, undefined);
})

when("isSome receives", ({ test }) => {
  test("a Some must return true", () => assertTrue(Maybe.isSome(Maybe.some(5))))
  test("a None must return false", () => assertFalse(Maybe.isSome(Maybe.none())))
});

when("isNone receives", ({test}) => {
  test("a Some must return false", () => assertFalse(Maybe.isNone(Maybe.some(5))))
  test("a None must return true", () => assertTrue(Maybe.isNone(Maybe.none())))
})

when("contains", ({test}) => {
  test("is a Some and is given the same value must return true", () => assertTrue(Maybe.contains(Maybe.some(5), 5)))
  test("is a Some and is given the different value must return false", () => assertFalse(Maybe.contains(Maybe.some(6), 5)))
  test("is a None must return false", () => assertFalse(Maybe.contains(Maybe.none(), 5)))
})

when("unwrap", ({test}) => {
  test("if None must panic", () => {
    try {
      Maybe.unwrap(Maybe.none());
    } catch(_) {
      return
    }

    fail("must panic");
  })

  test("if Some must return the value", () => assertEquals(Maybe.unwrap(Maybe.some(5)), 5))
})

when("unwrapOr", ({test}) => {
  test("if None must return default value", () => assertEquals(Maybe.unwrapOr(Maybe.none(), 5), 5))
  test("if Some must return wrapped value", () => assertEquals(Maybe.unwrapOr(Maybe.some(6), 5), 6))
});

when("unwrapOrElse", ({test}) => {
  let k = 10;

  test("if Some must return the wrapped value", () => assertEquals(Maybe.unwrapOrElse(Maybe.some(4), () => 2 * k), 4))
  test("if None must return the result of the passed function", () => assertEquals(Maybe.unwrapOrElse(Maybe.none(), () => 2 * k), 20))
});

when("map", ({test}) => {
  test("if Some must execute the closure and return a Maybe of the result", () => {
    let maybe_string = Maybe.some("hello, Jack");
    let maybe_len = Maybe.map(maybe_string, v => v.length);

    assertTrue(Maybe.contains(maybe_len, 11));
  })

  test("is None must return a Maybe of the new type also None", () => {
    assertTrue(Maybe.isNone(Maybe.map(Maybe.none<string>(), v => v.length)))
  })
});
