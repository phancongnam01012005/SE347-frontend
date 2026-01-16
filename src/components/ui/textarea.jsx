import * as React from "react";
import { cn } from "./utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Cơ bản: border, độ bo góc, padding và không cho phép kéo dãn thủ công (resize-none)
        "flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base transition-shadow placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
        // Trạng thái focus (khi nhấn vào)
        "outline-none focus-visible:ring-2 focus-visible:ring-[#EE4D2D]/20 focus-visible:border-[#EE4D2D]",
        // Trạng thái lỗi (invalid)
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };