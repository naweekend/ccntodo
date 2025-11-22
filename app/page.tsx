import MatrixRainBlue from "@/components/MatrixRainBlue";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import logo from "@/app/logo.png";

export default async function Home() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/home");
  }

  return (
    <main className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <Image src={logo} alt="logo" className="size-50" />
      <SignInButton>
        <button className="bg-background border border-foreground/20 text-xl py-4 px-8 rounded-md cursor-pointer hover:bg-card active:scale-95 transition-all duration-250">Sign in to K</button>
      </SignInButton>
    </main>
  )
}