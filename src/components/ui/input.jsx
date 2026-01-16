import * as React from "react";
import { cn } from "./utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Cơ bản: border, độ bo góc, padding
        "flex h-9 w-full min-w-0 rounded-md border border-gray-200 bg-white px-3 py-1 text-base transition-shadow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // Trạng thái focus (khi nhấn vào ô nhập)
        "outline-none focus-visible:ring-2 focus-visible:ring-[#EE4D2D]/20 focus-visible:border-[#EE4D2D]",
        // Trạng thái lỗi (invalid)
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };