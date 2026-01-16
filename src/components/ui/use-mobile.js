import * as React from "react";

// Ngưỡng 768px là tiêu chuẩn của Tailwind (md:)
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    // Sử dụng matchMedia để theo dõi sự thay đổi kích thước màn hình
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Lắng nghe sự kiện thay đổi kích thước
    mql.addEventListener("change", onChange);
    
    // Kiểm tra ngay lần đầu tiên load trang
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Dọn dẹp event listener khi component unmount
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}