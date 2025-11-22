import SectionCreateTweet from "@/components/SectionCreateTweet";
import SectionTweets from "@/components/SectionTweets";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <>
      <main className="flex flex-col py-12 gap-5 justify-center items-center">
        <SectionCreateTweet />
        <SectionTweets />
      </main>
    </>
  )
}