import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

type DialogBoxProps = {
  message?: ReactNode;
  className?: string;
  children?: ReactNode;
  as?: ElementType;
  clean?: boolean;
};

const DialogBox = ({
  message,
  className,
  children,
  as: Component = "div",
  clean,
}: DialogBoxProps) => {
  return (
    <Component
      className={cn("framed primary", className, clean ? "clean" : "")}
    >
      {message}
      {children}
    </Component>
  );
};

export default DialogBox;
