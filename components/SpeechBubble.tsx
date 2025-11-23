"use client";
import { useState, useEffect } from "react";

interface SpeechBubbleProps {
  text: string;
  speed?: number;
  className: string;
  breakTime?: number; // duration to pause at '|', in ms
}

export function SpeechBubble({ text, speed = 50, className, breakTime = 500 }: SpeechBubbleProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;

    function typeNext() {
      if (i >= text.length) return;

      const char = text[i];

      if (char === "|") {
        i++; // skip the break symbol
        setTimeout(typeNext, breakTime);
      } else {
        setDisplayText((prev) => prev + char);
        i++;
        setTimeout(typeNext, speed);
      }
    }

    typeNext();
  }, [text, speed, breakTime]);

  return (
    <div
      id="speech-bubble"
      className={`bg-card border border-foreground/20 rounded-2xl shadow-lg max-w-md w-full leading-relaxed relative ${className} overflow-auto p-4 whitespace-pre-wrap`}
    >
      {displayText}
    </div>
  );
}
