import { useEffect, useRef } from "react";

function useScrollIntoView<T extends HTMLElement>() {
  const inToViewRef = useRef<T | null>(null);

  useEffect(() => {
    if (inToViewRef.current) {
      inToViewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [inToViewRef]);

  return inToViewRef;
}

export default useScrollIntoView;
