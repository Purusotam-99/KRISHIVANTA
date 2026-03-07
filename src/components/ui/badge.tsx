import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.ComponentProps<"div"> {
  variant?: "default" | "secondary" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-[#2E7D32] text-white hover:bg-[#1B5E20]": variant === "default",
          "border-transparent bg-[#FFC107] text-black hover:bg-[#FFB300]": variant === "secondary",
          "text-[#2E7D32] border-[#C8E6C9]": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
