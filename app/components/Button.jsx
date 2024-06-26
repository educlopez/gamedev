import Link from "next/link"
import { cn } from "@/utils/cn"

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  )
}

const variantStyles = {
  primary:
    "rounded-sm bg-gameboy-700 py-1 px-3 text-gameboy-100 hover:bg-gameboy-900",
  secondary:
    "rounded-sm bg-gameboy-700 py-1 px-3 text-gameboy-100 hover:bg-gameboy-400",
}

export function Button({
  variant = "primary",
  className,
  children,
  arrow,
  ...props
}) {
  let Component = props.href ? Link : "button"

  className = cn(
    "inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition",
    variantStyles[variant],
    className
  )

  let arrowIcon = (
    <ArrowIcon
      className={cn(
        "mt-0.5 h-5 w-5",
        variant === "text" && "relative top-px",
        arrow === "left" && "-ml-1 rotate-180",
        arrow === "right" && "-mr-1"
      )}
    />
  )

  return (
    <Component className={className} {...props}>
      {arrow === "left" && arrowIcon}
      {children}
      {arrow === "right" && arrowIcon}
    </Component>
  )
}
