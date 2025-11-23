import Quiz from "@/components/Quiz";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function IQPage() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="py-20 px-5 mt-17 flex flex-col justify-center items-center">
      <Quiz />
    </div>
  )
}