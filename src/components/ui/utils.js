import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Hàm cn (class name) giúp kết hợp các class CSS.
 * clsx: Gom các class lại thành một chuỗi, xử lý được cả điều kiện (true/false).
 * twMerge: Giải quyết xung đột giữa các class Tailwind (ví dụ: 'px-2 px-4' sẽ giữ lại 'px-4').
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}