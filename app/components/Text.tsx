"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { useEffect, useState } from "react";
import { gameFont } from "@/logic/fonts";
import { cn } from "@/utils/cn";

const sizeStyles = {
  small: "text-[12px] leading-[14px] md:text-[16px] md:leading-[18px]",
  medium: "text-[32px] leading-[40px]",
  h2: "md:text-[70px] md:leading-[80px] text-[32px] leading-[40px]",
  h1: "md:text-[132px] md:leading-[140px] text-[44px] leading-[52px]",
} as const;

type TextProps = {
  size?: keyof typeof sizeStyles;
  title: ReactNode;
  as?: ElementType;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

export function Text({
  size = "medium",
  title,
  as: Component = "div",
  className,
  ...props
}: TextProps) {
  className = cn(
    `${gameFont.className} relative uppercase text-gameboy-700`,
    sizeStyles[size],
    className
  );
  const [id, setId] = useState("");

  useEffect(() => {
    setId(`mask${Math.floor(Math.random() * 10_000)}`);
  }, []);

  return (
    <div className={className} {...props}>
      <Component className={`mx-auto w-max text-original ${size}`}>
        {title}
      </Component>
      <svg
        className="pointer-events-none absolute top-0"
        height="100%"
        width="100%"
      >
        <defs>
          <mask height="100%" id={id} width="100%" x="0" y="0">
            <rect fill="black" height="100%" width="100%" x="0" y="0" />
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
          className="fill-gameboy-100"
          dominantBaseline="middle"
          mask={`url(#${id})`}
          textAnchor="middle"
          x="50%"
          y="47%"
        >
          {title}
        </text>
      </svg>
    </div>
  );
}
