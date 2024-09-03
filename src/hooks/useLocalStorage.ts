import { useState } from "react";

interface IUseLocalStorageProps<T> {
  key: string;
  initialValue: T;
}

export function useLocalStorage<T>({
  key,
  initialValue,
}: IUseLocalStorageProps<T>) {
  const getInitialValue = () => {
    if (typeof window === "undefined") return initialValue;
    const storedValue = localStorage.getItem(key) as T;
    return storedValue;
  };

  const [value, setValue] = useState<T>(getInitialValue());

  const setStorageValue = (value: T) => {
    setValue(value);
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value as string);
  };

  return [value, setStorageValue] as const;
}
