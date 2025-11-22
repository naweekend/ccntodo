import SectionTweets from "@/components/SectionTweets";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <>
      <main className="flex justify-center items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <SectionTweets />
        </Suspense>
      </main>
    </>
  )
}