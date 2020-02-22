import { when, assertEquals, fail, assertTrue } from "./testing-fns.ts";
import { panic, isolate } from "../fp/execution.ts";
import { Result } from "../fp/result.ts";

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


when("isolate", ({test}) => {
  test("if is thrown an exception returns a Err", async () => {
    const result = await isolate(() => {
      throw new Error("unhandled error");
    });

    assertTrue(Result.isErr(result));
    assertEquals(Result.unwrapErr(result), "unhandled error")
  })

  test("if all goes right returns an Ok with the function return value", async () => {
    const result = await isolate(() => 50);

    assertTrue(Result.isOk(result));
    assertEquals(Result.unwrap(result), 50);
  })
})
