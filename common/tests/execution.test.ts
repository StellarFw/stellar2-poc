import { when, assertEquals, fail } from "./testing-fns.ts";
import { panic } from "../fp/execution.ts";

when("panic", ({test}) => {
  test("must throw an exception", () => {
    try {
      panic("end of world")
    } catch(_) {
      return
    }

    fail("must throw an error");
  })

  test("given a string must convert to an error", () => {
    try {
      panic("end of world")
    } catch(e) {
      assertEquals((e as Error).message, "end of world")
      return
    }

    fail("must throw an error");
  })
})
