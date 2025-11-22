import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-6 animate-spin", className)}
      color="var(--primary)"
      {...props}
    />
  )
}

export { Spinner }
