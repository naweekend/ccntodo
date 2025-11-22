import { clerkClient } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MatrixRain from "@/components/MatrixRain";
import { formatUTCFromMS } from "@/lib/timeAgo";
import ButtonFollow from "@/components/ButtonFollow";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const client = await clerkClient();
  const user = await client.users.getUser(id);

  console.log("USER", user);

  return (
    <>
      <div className="p-4 border-b border-foreground/20 bg-card w-full flex justify-between items-center">
        <Link href="/home" className="flex items-center gap-1.5 rounded-md">
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>



      <section className="w-full border-b border-foreground/20">
        <div className="w-full flex flex-col justify-between items-center gap-2">
          <div className="w-full h-30">
            <MatrixRain />
          </div>

          <div className="flex flex-col w-full px-5 pb-5">
            <div className="flex w-full items-center justify-between">
              <Avatar className="size-30 -mt-6">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>K</AvatarFallback>
              </Avatar>

              <ButtonFollow userId={user.id} />
            </div>

            <div className="flex justify-between items-baseline w-full">
              <div className="flex flex-col mt-5">
                <h1 className="text-2xl font-bold">{user.fullName}</h1>
                <h2 className="opacity-80">@{user.username}</h2>
              </div>
              <div className="flex flex-col">
                <p className="text-sm opacity-80">Joined {formatUTCFromMS(user.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}