import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function IQPage() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="py-20 px-5 flex justify-center items-center">
      <h1 className="text-5xl font-bold">The Real IQ Test</h1>
    </div>
  )
}