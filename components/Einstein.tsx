"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Einstein1 from "@/app/einstein-1.png";
import Einstein2 from "@/app/einstein-2.png";

// export function staticEinstein() {
//   return (
//     <Image className="w-auto h-60" src={Einstein1} alt="einstein cartoon" />
//   )
// }

export function TalkingEinstein({ speed = 100, stopAt = 5000, className }: { speed?: number, stopAt?: number, className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpen(prev => !prev);
    }, speed);

    const timeout = setTimeout(() => {
      clearInterval(interval);     // ⛔ stop animation
      setOpen(false);              // 🧹 reset to closed mouth (optional)
    }, stopAt);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [speed, stopAt]);

  return (
    <Image
      draggable={false}
      className={className}
      src={open ? Einstein2 : Einstein1}
      alt="einstein cartoon"
      priority
    />
  );
}
