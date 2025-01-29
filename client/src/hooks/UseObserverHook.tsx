import { useEffect, useRef, useState } from "react";

export const UseObserverHook = ({ hasNextPage }: { hasNextPage: boolean }) => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && hasNextPage) {
        setButtonVisible(true);
      } else {
        setButtonVisible(false);
      }
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage]);

  return { observerRef, buttonVisible };
};
