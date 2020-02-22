import { when, assertTrue, assertFalse } from "./testing-fns.ts";
import { equals } from "../fp/logic.ts";

when("equals", ({test}) => {
  test("given two equals number values must return true", () => assertTrue(equals(1, 1)))
  test("given two equals strings values must return true", () => assertTrue(equals("a", "a")))
  test("given two equals objects must return true", () => assertTrue(equals({a: 1}, {a: 1})))
  test("given two equals arrays must return true", () => assertTrue(equals([1, 2, 3], [1, 2, 3])))
  
  test("given different types must return false", () => {
    assertFalse(equals(1, "a"))
    assertFalse(equals({}, "a"))
    assertFalse(equals([], "a"))
    assertFalse(equals("a", 1))
    assertFalse(equals("a", {}))
    assertFalse(equals("a", []))
  })
})
