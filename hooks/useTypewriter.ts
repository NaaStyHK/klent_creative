"use client";

import { useEffect, useState } from "react";

export function useTypewriter(
  text: string,
  speed = 45,
  inView = false,
  delay = 0
) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;

    const timeout = setTimeout(() => {
      setStarted(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [inView, text, speed, delay, started]);

  return displayed;
}