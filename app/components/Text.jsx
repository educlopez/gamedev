"use client"

import { useEffect, useState } from "react"
import { gameFont } from "@/logic/fonts"
import clsx from "clsx"

const sizeStyles = {
  small: "text-[16px] leading-[18px]",
  medium: "text-[32px] leading-[40px]",
  h2: "md:text-[70px] md:leading-[80px] text-[32px] leading-[40px]",
  h1: "md:text-[132px] md:leading-[140px] text-[44px] leading-[52px]",
}

export function Text({
  size = "medium",
  title,
  as: Component = "div",
  className,
  ...props
}) {
  className = clsx(
    `${gameFont.className} relative uppercase text-[#5F8449]`,
    sizeStyles[size],
    className
  )
  const [id, setId] = useState("")

  useEffect(() => {
    setId("mask" + Math.floor(Math.random() * 10000))
  }, [])

  return (
    <div className={className} {...props}>
      <Component className={`mx-auto text-original w-max ${size}`}>
        {title}
      </Component>
      <svg height="100%" width="100%" className="pointer-events-none center">
        <defs>
          <mask height="100%" width="100%" x="0" y="0" id={id}>
            <rect fill="black" height="100%" width="100%" x="0" y="0"></rect>
            <text
              dominantBaseline="middle"
              fill="white"
              textAnchor="middle"
              x="50%"
              y="50%"
            >
              {title}
            </text>
          </mask>
        </defs>
        <text
          dominantBaseline="middle"
          fill="#D4D29B"
          textAnchor="middle"
          x="50%"
          y="47%"
          mask={`url(#${id})`}
        >
          {title}
        </text>
      </svg>
    </div>
  )
}
