import { clerkClient } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MatrixRain from "@/components/MatrixRain";
import { Button } from "@/components/ui/button";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const client = await clerkClient();
  const user = await client.users.getUser(id);
  console.log("USER", user);

  return (
    <>
      <div className="p-4 border-b border-foreground/20 bg-card w-full flex justify-between items-center">
        <Link href="/home" className="flex items-center gap-1 py-1 px-2 bg-background rounded-md">
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

              <button className="py-2 hover:opacity-90 cursor-pointer transition-all duration-250 active:scale-95 px-6 bg-foreground text-background rounded-full">Follow</button>
            </div>

            <div className="flex flex-col mt-5">
              <h1 className="text-2xl font-bold">{user.fullName}</h1>
              <h2 className="opacity-80">@{user.username}</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}