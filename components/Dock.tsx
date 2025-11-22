"use client";

import { useUser } from "@clerk/nextjs";
import { Home, PlusCircle, User } from "lucide-react";
import Link from "next/link";

export default function Dock() {
  const { user } = useUser();

  return (
    <div className="p-5 fixed bottom-0 left-0 bg-background border-t border-r border-l border-foreground/20 z-99 h-17 w-full flex justify-center">
      <div className="max-w-2xl w-full flex items-center justify-around gap-5 ">
        <Link scroll={true} href="/home" className="active:scale-90 size-7 transition-all duration-250">
          <Home className="size-full" />
        </Link>

        <Link scroll={true} href="/home?focus=true" className="active:scale-90 size-7 transition-all duration-250">
          <PlusCircle className="size-full" stroke="var(--primary)" />
        </Link>

        <Link scroll={true} href={`/profile/${user?.id}`} className="active:scale-90 size-7 transition-all duration-250">
          <User className="size-full" />
        </Link>
      </div>
    </div>
  )
}