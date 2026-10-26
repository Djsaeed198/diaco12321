import React, { useState } from 'react';
import logoImg from '../assets/images/diaco-small.png';

interface Props {
  className?: string;
  size?: number;
}

export const DiacoLogo: React.FC<Props> = ({
  className = 'h-11 w-11',
  size = 44,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !logoImg) {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#fed871] via-[#f5a623] to-[#c56b04] p-[2px] shadow-glow flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
        aria-label="هلدینگ مهاجرتی دیاکو"
      >
        <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#082833] p-1.5 overflow-hidden">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <defs>
              <linearGradient id="diacoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fed871" />
                <stop offset="50%" stopColor="#f5a623" />
                <stop offset="100%" stopColor="#c56b04" />
              </linearGradient>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0e3846" />
                <stop offset="100%" stopColor="#081e26" />
              </linearGradient>
            </defs>
            {/* Shield Outline */}
            <path
              d="M50 5 L88 18 C88 56 68 85 50 95 C32 85 12 56 12 18 Z"
              fill="url(#shieldGrad)"
              stroke="url(#diacoGold)"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Inner D Monogram */}
            <path
              d="M36 28 L52 28 C64 28 72 36 72 50 C72 64 64 72 52 72 L36 72 Z"
              stroke="url(#diacoGold)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Inner detail vertical stem */}
            <path
              d="M44 38 L44 62"
              stroke="url(#diacoGold)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Little Crown / Star on top */}
            <polygon
              points="50,14 53,21 60,21 54,25 57,32 50,28 43,32 46,25 40,21 47,21"
              fill="url(#diacoGold)"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <img
      src={logoImg}
      alt="لوگوی هلدینگ مهاجرتی دیاکو"
      width={size}
      height={size}
      onError={() => setHasError(true)}
      className={`object-contain flex-shrink-0 ${className}`}
    />
  );
};

export default DiacoLogo;
