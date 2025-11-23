import Quiz from "@/components/Quiz";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function IQPage() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="py-20 px-5 mt-17 flex flex-col justify-center items-center">
      <Link href="/home" className="fixed top-22 active:scale-95 transition-all duration-250 left-5 max-sm:hidden flex items-center gap-1.5"><ArrowLeft className="opacity-80" size={16} />Back</Link>
      <Quiz />
    </div>
  )
}