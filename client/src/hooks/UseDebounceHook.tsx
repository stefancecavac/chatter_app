import { useEffect, useState } from "react";

export const UseDebounceHook = <T,>(cb: T, timer: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(cb);
  const [debounceLoading, setDebounceLoading] = useState<boolean>(false);
  useEffect(() => {
    setDebounceLoading(true);
    const timeout = setTimeout(() => {
      setDebouncedValue(cb);
      setDebounceLoading(false);
    }, timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [cb, timer]);

  return { debouncedValue, debounceLoading };
};
