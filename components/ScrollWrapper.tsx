// ScrollWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, ReactNode } from "react";

export default function ScrollWrapper({ children }: { children: ReactNode }) {
  const centerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {children}
    </>
  );
}
