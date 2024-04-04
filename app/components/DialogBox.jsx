import React from "react"
import clsx from "clsx"

const DialogBox = ({ message, className }) => {
  return (
    <div className={clsx(className, "framed primary")}>
      <span>{message}</span>
    </div>
  )
}

export default DialogBox
