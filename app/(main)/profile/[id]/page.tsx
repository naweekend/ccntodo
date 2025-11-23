import UserDetails from "@/components/ButtonFollow";
import UserTweets from "@/components/UserTweets";
import { clerkClient } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  let user = null;

  try {
    const client = await clerkClient();
    user = await client.users.getUser(id);
  } catch (_err) {
    redirect("/home");
  }

  if (!user) {
    return <div>
      <h1>User not found</h1>
      <Link href="/home">Go back</Link>
    </div>
  }
  return (
    <>
      <div className="p-4 border-b border-foreground/20 bg-card/20 w-full flex justify-between items-center">
        <Link scroll={true} href="/home" className="flex items-center gap-1.5 rounded-md active:scale-90 transition-all duration-250">
          <ArrowLeft size={16} className="opacity-80" />
          Back
        </Link>
      </div>

      <UserDetails userId={user.id} userImage={user.imageUrl} userName={user.username} userFullname={user.fullName} userCreatedAt={user.createdAt} />

      <UserTweets userId={user.id} />

      <footer className="flex justify-center items-center gap-5 w-full pt-50 max-sm:pt-17">
        <span className="opacity-0">yo</span>
      </footer>
    </>
  )
}