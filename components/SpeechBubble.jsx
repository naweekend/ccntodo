"use client";

import { useState, useEffect, useRef } from "react";

export function SpeechBubble({ text, speed = 50, className, breakTime = 500 }) {
  const [displayText, setDisplayText] = useState("");

  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const pausedRef = useRef(false);

  //
  // 1️⃣ Reset when the text changes (microtask avoids strict-mode warnings)
  //
  useEffect(() => {
    indexRef.current = 0;
    pausedRef.current = false;

    // 🔥 IMPORTANT FIX — async microtask avoids "setState synchronously" error
    queueMicrotask(() => {
      setDisplayText("");
    });
  }, [text]);

  //
  // 2️⃣ Typewriter loop
  //
  useEffect(() => {
    if (!text) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const i = indexRef.current;
      if (i >= text.length) return;

      const char = text[i];

      if (char === "|") {
        pausedRef.current = true;
        indexRef.current++;
        setTimeout(() => {
          pausedRef.current = false;
        }, breakTime);
        return;
      }

      if (!pausedRef.current) {
        setDisplayText((prev) => prev + char);
        indexRef.current++;
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, breakTime]);

  return (
    <div
      className={`pt-mono bg-card border border-foreground/20 rounded-2xl shadow-lg max-w-md w-full leading-relaxed relative ${className} overflow-auto p-4 whitespace-pre-wrap`}
    >
      {displayText}
    </div>
  );
}
