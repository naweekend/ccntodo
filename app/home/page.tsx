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
      <main className="flex flex-col justify-center items-center">
        <Navbar />

        <div className="mt-17 w-full flex justify-center items-start gap-4 h-[calc(100vh-64px)]">
          {/* Left side */}
          <RightSide className="max-md:hidden flex-[1_1_0] min-w-[200px] sticky top-17 self-start" />

          {/* Center */}
          <div className="flex flex-col justify-start items-center grow max-w-2xl w-full overflow-y-scroll scrollbar-none border-r border-l border-foreground/20">
            <SectionCreateTweet />
            <SectionTweets />
          </div>

          {/* Right side */}
          <RightSide className="max-md:hidden flex-[1_1_0] min-w-[200px] sticky top-17 self-start" />
        </div>
      </main>
    </>
  )
}