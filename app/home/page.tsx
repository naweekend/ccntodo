import Navbar from "@/components/Navbar";
import RightSide from "@/components/RightSide";
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
    </>
  )
}