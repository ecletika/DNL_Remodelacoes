
import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  scale?: number;
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', scale = 1 }) => {
  const isDark = variant === 'dark';
  
  const textColor = isDark ? 'text-gray-900' : 'text-white';
  const subTextColor = isDark ? 'text-gray-800' : 'text-white';
  const borderColor = isDark ? 'border-gray-900' : 'border-white';
  const barBg = isDark ? 'bg-gray-900' : 'bg-white';
  const barTextColor = isDark ? 'text-white' : 'text-black';
  const lineBg = isDark ? 'bg-gray-200' : 'bg-white/20';

  return (
    <div 
      className={`flex flex-col items-center justify-center p-1 transition-transform duration-300`}
      style={{ transform: `scale(${scale})` }}
    >
      {/* Ícone do Prédio (Skyline) */}
      <div className="mb-[-8px]">
        <svg width="60" height="35" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={textColor}>
          <path d="M42 55V15L50 8L58 15V55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M58 55V25L75 32V55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25 55V35L42 28V55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 55H85" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* RF Principal */}
      <span className={`text-5xl lg:text-6xl font-['Playfair_Display'] font-bold leading-none tracking-tighter ${textColor}`}>
        RF
      </span>

      {/* Construções com Moldura */}
      <div className="relative px-6 py-1 mt-1">
        <div className={`absolute left-0 top-0 bottom-0 w-3 border-l-2 border-t-2 border-b-2 ${borderColor}`}></div>
        <span className={`text-xl lg:text-2xl font-['Playfair_Display'] font-medium tracking-tight ${subTextColor}`}>
          Construções
        </span>
        <div className={`absolute right-0 top-0 bottom-0 w-3 border-r-2 border-t-2 border-b-2 ${borderColor}`}></div>
      </div>

      {/* Legenda Engenharia */}
      <div className={`${barBg} px-3 py-0.5 mt-0.5`}>
        <span className={`text-[7px] lg:text-[8px] font-['Montserrat'] font-bold uppercase tracking-[0.25em] whitespace-nowrap ${barTextColor}`}>
          Arquitetura e Engenharia
        </span>
      </div>
    </div>
  );
};

export default Logo;
