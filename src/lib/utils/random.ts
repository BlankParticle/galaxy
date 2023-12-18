export const int = (min = 0, max = 1) => Math.floor(Math.random() * (max - min)) + min;
export const float = (min = 0, max = 1) => Math.random() * (max - min) + min;
export const choice = <T>(arr: T[]) => arr[int(0, arr.length)];
export const string = ({ length, chars } = { length: 6, chars: "abcdefghijklmnopqrstuvwxyz0123456789" }) =>
  new Array(length)
    .fill(0)
    .map(() => chars.charAt(int(0, chars.length - 1)))
    .join("");

const random = { int, float, choice, string };
export default random;
