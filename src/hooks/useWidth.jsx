import { useLayoutEffect, useState } from "react";

/* Get window width hook */
export const useWindow = () => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return () => null;
    }

    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  
  return width;
};