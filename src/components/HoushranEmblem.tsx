import React from 'react';

interface HoushranEmblemProps {
  className?: string;
  height?: number | string;
  alt?: string;
}

export const HoushranEmblem: React.FC<HoushranEmblemProps> = ({
  className = '',
  height = 44,
  alt = 'لوگوی رسمی هوشران',
}) => {
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <img
      src="/houshran_logo_transparent.png"
      alt={alt}
      className={`object-contain shrink-0 transition-transform duration-200 ${className}`}
      style={{ height: heightStyle, maxHeight: '48px', width: 'auto' }}
      loading="eager"
    />
  );
};

export default HoushranEmblem;
