import React, { useState } from 'react';

// Chuỗi Base64 của ảnh SVG hiển thị lỗi (icon hình ảnh bị hỏng)
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback({ src, alt, style, className, ...rest }) {
  const [didError, setDidError] = useState(false);

  // Hàm xử lý khi ảnh gốc không tải được
  const handleError = () => {
    setDidError(true);
  };

  // Nếu xảy ra lỗi, hiển thị thẻ div chứa ảnh placeholder mặc định
  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle overflow-hidden ${className || ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full min-h-[40px]">
          <img 
            src={ERROR_IMG_SRC} 
            alt="Error loading image" 
            className="opacity-40"
            {...rest} 
            data-original-url={src} 
          />
        </div>
      </div>
    );
  }

  // Nếu ảnh bình thường, hiển thị thẻ img như bình thường kèm theo sự kiện onError
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError} 
    />
  );
}