import React from 'react';

interface HoushranEmblemProps {
  className?: string;
  height?: number | string;
  alt?: string;
  invert?: boolean;
}

export const HoushranEmblem: React.FC<HoushranEmblemProps> = ({
  className = '',
  height = 44,
  alt = 'لوگوی رسمی هوشران',
  invert = false,
}) => {
  const heightStyle = typeof height === 'number' ? `${height}px` : height;
  const shouldInvert = invert || className.includes('text-white') || className.includes('invert');

  return (
    <img
      src="/houshran_logo_transparent.png"
      alt={alt}
      className={`object-contain shrink-0 transition-all duration-200 ${shouldInvert ? 'brightness-0 invert' : ''} ${className}`}
      style={{ height: heightStyle, maxHeight: '48px', width: 'auto' }}
      loading="eager"
    />
  );
};

export default HoushranEmblem;
