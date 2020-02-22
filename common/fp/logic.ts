/**
 * Check if the two values are equal.
 * 
 * @param a first value
 * @param b second value
 */
export const equals = (a: any, b: any) => {
  if (typeof a === "object" || typeof b === "object") {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
}
