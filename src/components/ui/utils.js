import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Hàm cn giúp kết hợp các class Tailwind CSS linh hoạt.
 * Nó tự động xử lý các class bị trùng lặp hoặc có điều kiện.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}