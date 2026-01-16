"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";

import { cn } from "./utils";

// Định nghĩa các kiểu dáng cho Toggle
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-[#EE4D2D]/20 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-gray-100",
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-100",
      },
      size: {
        default: "h-9 px-3 min-w-9",
        sm: "h-8 px-2 min-w-8",
        lg: "h-10 px-4 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        toggleVariants({ variant, size }),
        // Màu sắc khi nút ở trạng thái "On"
        "data-[state=on]:bg-[#EE4D2D] data-[state=on]:text-white data-[state=on]:hover:bg-[#d73a1e]",
        className
      )}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };