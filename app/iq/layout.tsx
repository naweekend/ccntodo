import { Suspense } from "react";

export default function IQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        {children}
      </Suspense>
    </>
  );
}
