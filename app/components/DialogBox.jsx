import React from "react"
import clsx from "clsx"

const DialogBox = ({ message, className, children }) => {
  return (
    <div className={clsx(className, "framed primary")}>
      {message}
      {children}
    </div>
  )
}

export default DialogBox
