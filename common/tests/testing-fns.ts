import { assertEquals, fail } from "https://deno.land/std/testing/asserts.ts";
export { assertEquals, fail };

type testFn = () => void;

interface WhenFns {
  test: (name: string, fn: testFn) => void;
};

/**
 * Util function to declare a test case.
 * 
 * @param name test name
 * @param fn test function
 */
export const test = (name: string, fn: testFn) => (Deno as any).test({
  name,
  fn
})

/**
 * Check if the value is true.
 * 
 * @param value value to be tested
 */
export const assertTrue = (value: any) => assertEquals(value, true);

/**
 * Check if the value is false.
 * 
 * @param value value to be tested
 */
export const assertFalse = (value: any) => assertEquals(value, false);

export const when = (str: string, fn: (fns: WhenFns) => void) => {
  const testWithStr = (name: string, fn: testFn) => test(`when ${str} ${name}`, fn);

  fn({
    test: testWithStr
  });
}
