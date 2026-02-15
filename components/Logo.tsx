
import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  scale?: number;
  useImage?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', scale = 1, useImage = true }) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-black' : 'text-white';
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const borderColor = isDark ? 'border-black' : 'border-white';
  const taglineTextColor = isDark ? 'text-white' : 'text-black';

  // Se quisermos usar a imagem real do ficheiro
  if (useImage) {
    return (
      <div 
        className="flex items-center justify-center overflow-hidden"
        style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease' }}
      >
        <img 
          src="logo-rf.png" 
          alt="RF Construções" 
          className="max-h-full w-auto object-contain"
          style={{ height: '140px' }} 
          onError={(e) => {
            // Se a imagem falhar, mostra o fallback em código abaixo
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.classList.add('fallback-active');
          }}
        />
        
        {/* Fallback CSS/SVG idêntico à foto caso a imagem não exista no diretório */}
        <div className="hidden [.fallback-active_&]:flex flex-col items-center justify-center p-2">
           {/* Skyline exacto da foto */}
           <div className="mb-1">
             <svg width="80" height="40" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={textColor}>
               <path d="M45 55V20L55 12L65 20V55" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
               <path d="M65 55V30L80 38V55" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
               <path d="M30 55V40L45 32V55" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
               <path d="M20 55H100" stroke="currentColor" strokeWidth="1" />
             </svg>
           </div>

           {/* Letras RF */}
           <span className={`text-6xl font-['Playfair_Display'] font-serif font-bold leading-none tracking-tighter ${textColor}`}>
             RF
           </span>

           {/* Construções com as cantoneiras em L da foto */}
           <div className="relative px-8 py-2 mt-1">
             {/* Cantoneira Esquerda */}
             <div className={`absolute left-0 bottom-0 top-2 w-4 border-l-4 border-b-4 ${borderColor}`}></div>
             <span className={`text-3xl font-['Playfair_Display'] font-serif font-medium tracking-tight ${textColor}`}>
               Construções
             </span>
             {/* Cantoneira Direita */}
             <div className={`absolute right-0 top-0 bottom-2 w-4 border-r-4 border-t-4 ${borderColor}`}></div>
           </div>

           {/* Barra Preta com legenda */}
           <div className={`${bgColor} px-4 py-1 mt-1 flex items-center justify-center min-w-[200px]`}>
             <span className={`text-[10px] font-['Montserrat'] font-bold uppercase tracking-[0.1em] whitespace-nowrap ${taglineTextColor}`}>
               Arquitetura e Engenharia
             </span>
           </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Logo;
