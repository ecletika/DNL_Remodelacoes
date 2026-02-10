
import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterLogo: React.FC = () => (
  <div className="flex flex-col items-start p-1 mb-8">
    <div className="mb-[-6px]">
      <svg width="40" height="25" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <path d="M42 55V15L50 8L58 15V55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M58 55V25L75 32V55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M25 55V35L42 28V55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 55H85" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
    <span className="text-4xl font-['Playfair_Display'] font-bold text-white leading-none tracking-tighter">
      RF
    </span>
    <div className="relative px-4 py-0.5 mt-1">
      <div className="absolute left-0 top-0 bottom-0 w-2 border-l border-t border-b border-white"></div>
      <span className="text-sm font-['Playfair_Display'] font-medium text-white tracking-tight uppercase">
        Construções
      </span>
      <div className="absolute right-0 top-0 bottom-0 w-2 border-r border-t border-b border-white"></div>
    </div>
    <div className="bg-white px-2 py-0.5 mt-1">
      <span className="text-[6px] font-['Montserrat'] font-bold text-black uppercase tracking-[0.2em] whitespace-nowrap">
        Arquitetura e Engenharia
      </span>
    </div>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <FooterLogo />
            <p className="text-sm font-['Open_Sans'] leading-relaxed mb-6 text-gray-400 max-w-xs italic">
              Excelência técnica em arquitetura e engenharia. Construindo o futuro com o rigor do presente.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-['Montserrat'] font-bold uppercase tracking-widest text-gray-500 mb-6">Contacto e Localização</h3>
            <ul className="space-y-4 font-['Open_Sans'] text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                <span className="text-sm">Lisboa / Sintra<br/>Portugal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-sm">+351 933 318 169</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-sm">contacto@rfconstrucoes.pt</span>
              </li>
              <li className="flex items-center space-x-3">
                <FileText size={16} className="text-gray-500 flex-shrink-0" />
                <span className="text-sm font-['Montserrat'] font-bold text-[10px] tracking-widest uppercase">Arquitetura & Engenharia</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-['Montserrat'] font-bold uppercase tracking-widest text-gray-500 mb-6">Navegação</h3>
            <ul className="space-y-3 font-['Open_Sans']">
              <li><Link to="/portfolio" className="text-sm text-gray-400 hover:text-white transition-colors">Portfólio</Link></li>
              <li><Link to="/orcamento" className="text-sm text-gray-400 hover:text-white transition-colors">Pedir Orçamento</Link></li>
              <li><Link to="/sobre" className="text-sm text-gray-400 hover:text-white transition-colors">A Empresa</Link></li>
              <li><Link to="/admin" className="text-sm text-gray-400 hover:text-white transition-colors">Área Admin</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-[10px] font-['Montserrat'] font-bold uppercase tracking-[0.2em] text-gray-600">
          <p>&copy; {new Date().getFullYear()} RF Construções. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
