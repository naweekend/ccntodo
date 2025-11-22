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
      <SectionCreateTweet />
      <SectionTweets />
      <footer className="flex justify-center items-center gap-5 w-full pt-[0.1px]">
      </footer>
    </>
  )
}