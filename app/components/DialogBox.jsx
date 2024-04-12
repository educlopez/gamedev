import React from "react"
import { cn } from "@/utils/cn"

const DialogBox = ({
  message,
  className,
  children,
  as: Component = "div",
  clean,
}) => {
  return (
    <Component
      className={cn("framed primary", className, clean ? "clean" : "")}
    >
      {message}
      {children}
    </Component>
  )
}

export default DialogBox
