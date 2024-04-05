import Link from "next/link"
import { cn } from "@/utils/cn"

export function Retrobutton({ className, children, ...props }) {
  const Component = props.href ? Link : "button"

  className = cn("retro-btn flex flex-row gap-1", className)
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  )
}
