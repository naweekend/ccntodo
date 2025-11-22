import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="p-5 fixed top-0 left-0 bg-background w-full flex items-center justify-between border-b border-foreground/20 z-9999">
      <h1>K</h1>
      <UserButton />
    </div>
  )
}