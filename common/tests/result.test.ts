import { when, test, assertTrue, assertFalse, assertEquals, fail } from "./testing-fns.ts";
import { Result } from "../fp/result.ts";
import { Maybe } from "../fp/maybe.ts";

when("isOk", ({ test }) => {
  test("if is an Ok return true", () => assertTrue(Result.isOk(Result.ok(-3))));
  test("if is an Err return false", () => assertFalse(Result.isOk(Result.err("some error message"))));
})

when("isErr", ({ test }) => {
  test("if is an Ok return false", () => assertFalse(Result.isErr(Result.ok(-3))));
  test("if is an Err return true", () => assertTrue(Result.isErr(Result.err("some error message"))));
})

when("contains", ({ test }) => {
  test("gets an Ok with the same values return true", () => assertTrue(Result.contains(Result.ok(2), 2)));
  test("gets an Ok with a different value return false", () => assertFalse(Result.contains(Result.ok(3), 2)));
  test("gets an Err return false", () => assertFalse(Result.contains(Result.err("some error"), 2)));
})

when("containsErr", ({ test }) => {
  test("gets an Err with the same values return true", () => assertTrue(Result.containsErr(Result.err("some error"), "some error")));
  test("gets an Err with a different value return false", () => assertFalse(Result.containsErr(Result.err("some error"), "some other error")));
  test("gets an Ok return false", () => assertFalse(Result.containsErr(Result.ok(2), 2)));
})

when("okMaybe", ({ test }) => {
  test("gets an Ok return an Some with the value", () => {
    const okResult = Result.ok(3);
    const maybe = Result.okMaybe(okResult);

    assertTrue(Maybe.isSome(maybe));
    assertTrue(Maybe.contains(maybe, 3));
  })

  test("get an Err return an None", () => assertTrue(Maybe.isNone(Result.okMaybe(Result.err("some error")))))
})

when("errMaybe", ({ test }) => {
  test("gets an Err return an Some with the error", () => {
    const okResult = Result.err("some error");
    const maybe = Result.errMaybe(okResult);

    assertTrue(Maybe.isSome(maybe));
    assertTrue(Maybe.contains(maybe, "some error"));
  })

  test("get an Ok return an None", () => assertTrue(Maybe.isNone(Result.errMaybe(Result.ok(3)))))
})

when("unwrap", ({test}) => {
  test("with an Ok returns the value", () => assertEquals(Result.unwrap(Result.ok(2)), 2))
  test("with an Err panics with the Err value as message", () => {
    try {
      Result.unwrap(Result.err("some error"))
    } catch(e) {
      return assertEquals((e as Error).message, "some error")
    }

    fail("must panic")
  })
})

when("unwrapErr", ({test}) => {
  test("with an Err returns the error", () => assertEquals(Result.unwrapErr(Result.err("some error")), "some error"))
  test("with an Ok panics with the Ok value as message", () => {
    try {
      Result.unwrapErr(Result.ok(2))
    } catch(e) {
      return assertEquals((e as Error).message, "2")
    }

    fail("must panic")
  })
})

