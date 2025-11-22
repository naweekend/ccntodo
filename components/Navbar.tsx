import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import logo from "@/app/logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="p-5 fixed top-0 left-0 bg-background w-full flex items-center justify-between border-b border-r border-l border-foreground/20 z-99 h-17">
      <Link href="/home">
        <Image src={logo} alt="logo" className="size-8" />
      </Link>
      <UserButton />
    </div>
  )
}