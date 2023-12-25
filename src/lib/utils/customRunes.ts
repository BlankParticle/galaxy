import random from "./random";

const cacheMap = new Map<string, unknown>();
/**
 * @param fn Function to be cached
 * @param cacheTime Time in milliseconds for which the result of the function will be cached
 */
export const $cached = <ReturnType, Args extends unknown[] = []>(
  fn: (...args: Args) => ReturnType,
  cacheTime: number,
  functionKey?: string,
): typeof fn => {
  functionKey ||= random.string(6);
  return (...args: Args) => {
    const cacheKey = functionKey + "_" + JSON.stringify(args);
    const cached = cacheMap.get(cacheKey);
    if (cached) {
      return cached as ReturnType;
    }
    const result = fn(...args);
    cacheMap.set(cacheKey, result);
    setTimeout(() => {
      cacheMap.delete(cacheKey);
    }, cacheTime);
    return result;
  };
};
