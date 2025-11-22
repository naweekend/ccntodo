import ButtonSignIn from "@/components/ButtonSignIn";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/home");
  }

  return (
    <>
      <ButtonSignIn />
    </>
  )
}