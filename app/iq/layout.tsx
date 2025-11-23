import { Suspense } from "react";

export default function IQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        {children}
        <footer className="py-10">
          <p className="opacity-0">yo</p>
        </footer>
      </Suspense>
    </>
  );
}
