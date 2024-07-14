import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { throttle } from "../throttle";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it("함수를 실행하면 1000ms 이후에 콜백 함수가 실행된다", () => {
  const callback = vi.fn();
  const throttled = throttle(callback, 1000);

  throttled();
  expect(callback).toHaveBeenCalledTimes(0);
  vi.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalledTimes(1);
});

it("함수를 실행하면 1000ms 이전에 함수를 2번 실행하여도 콜백함수는 1번만 실행된다", () => {
  const callback = vi.fn();
  const throttled = throttle(callback, 1000);

  throttled();
  vi.advanceTimersByTime(500);
  throttled();
  vi.advanceTimersByTime(500);

  expect(callback).toHaveBeenCalledTimes(1);
});

it("함수를 실행하면 1000ms 이후에 함수를 한번 더 실행하면 콜백함수는 총 2번 실행된다", () => {
  const callback = vi.fn();
  const throttled = throttle(callback, 1000);

  throttled();
  vi.advanceTimersByTime(1000);
  throttled();
  vi.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalledTimes(2);
});
