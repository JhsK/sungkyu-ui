/* eslint-disable @typescript-eslint/no-explicit-any */
type Callback<T extends any[]> = (...args: T) => void;

export const throttle = <T extends any[]>(
  callback: Callback<T>,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<Callback<T>>, ...args: T) {
    if (!timer) {
      timer = setTimeout(() => {
        callback.apply(this, args);
        timer = undefined;
      }, delay);
    }
  };
};
