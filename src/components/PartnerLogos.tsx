import React from 'react';

interface PartnerLogosProps {
  className?: string;
}

export const PartnerLogos: React.FC<PartnerLogosProps> = ({ className = '' }) => {
  return (
    <div
      id="partner-brand-logos"
      className={`inline-flex items-center justify-center bg-transparent border-0 rounded-none p-0 select-none shrink-0 ${className}`}
      title="هوشران (Houshran)"
    >
      <img
        src="/houshran_logo_transparent.png"
        alt="هوشران - Houshran"
        className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[520px] object-contain block"
        loading="eager"
      />
    </div>
  );
};

