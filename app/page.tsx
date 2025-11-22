import SectionCreateTweet from "@/components/SectionCreateTweet";
import SectionTweets from "@/components/SectionTweets";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/home");
  }

  return (
    <>
      <SignInButton />
    </>
  )
}