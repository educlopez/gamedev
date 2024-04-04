import Link from "next/link"
import clsx from "clsx"

export function Retrobutton({ className, children, ...props }) {
  const Component = props.href ? Link : "button"

  className = clsx("retro-btn flex flex-row gap-1", className)
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  )
}
