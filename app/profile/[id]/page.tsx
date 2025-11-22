import UserDetails from "@/components/ButtonFollow";
import UserTweets from "@/components/UserTweets";
import { clerkClient } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const client = await clerkClient();
  const user = await client.users.getUser(id);
  return (
    <>
      <div className="p-4 border-b border-foreground/20 bg-card w-full flex justify-between items-center">
        <Link scroll={true} href="/home" className="flex items-center gap-1.5 rounded-md active:scale-90 transition-all duration-250">
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      <UserDetails userId={user.id} userImage={user.imageUrl} userName={user.username} userFullname={user.fullName} userCreatedAt={user.createdAt} />

      <UserTweets userId={user.id} />
    </>
  )
}