
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Logo: React.FC = () => (
  <div className="flex flex-col items-center justify-center relative z-20 p-2">
    <div className="flex items-end space-x-0.5 mb-1 h-6">
      <div className="w-1.5 h-3 border-t border-x border-gray-900"></div>
      <div className="w-1.5 h-5 border-t border-x border-gray-900"></div>
      <div className="w-1.5 h-4 border-t border-x border-gray-900"></div>
    </div>
    <div className="w-14 h-px bg-gray-900 mb-1"></div>
    <span className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 leading-none tracking-tighter">
      DNL
    </span>
    <div className="relative mt-1 px-8 py-1.5 border-y border-gray-900/10">
      <span className="text-xl font-['Playfair_Display'] font-medium text-gray-900 tracking-tight">
        Remodelações
      </span>
    </div>
    <div className="mt-1 bg-gray-900 px-4 py-0.5">
      <span className="text-[8px] font-['Montserrat'] font-bold text-white uppercase tracking-[0.3em] whitespace-nowrap">
        Engenharia e Construção
      </span>
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useApp();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Portfólio', path: '/portfolio' },
    { name: 'Em Andamento', path: '/em-andamento' },
    { name: 'Orçamentos', path: '/orcamento' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-gray-200 bg-white/95 backdrop-blur-sm ${
      scrolled ? 'shadow-md py-0' : 'py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-32 transition-all duration-300"> 
          <Link to="/" className="flex items-center">
            {settings?.logo_url ? (
               <img src={settings.logo_url} alt="DNL Logo" className="h-16 lg:h-20 object-contain" />
            ) : (
                <Logo />
            )}
          </Link>

          <div className="hidden lg:block">
            <div className="flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-[11px] font-['Montserrat'] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group/link ${
                    isActive(link.path) ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900' 
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100'}`}></span>
                </Link>
              ))}
              <Link 
                to="/admin" 
                className="p-3 text-gray-300 hover:text-gray-900 transition-colors ml-4 border border-transparent hover:border-gray-100 rounded-sm"
              >
                <Lock size={16} />
              </Link>
            </div>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-900">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 h-screen animate-fade-in z-50">
          <div className="px-8 pt-12 space-y-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-3xl font-['Playfair_Display'] font-bold ${
                  isActive(link.path) ? 'text-gray-900' : 'text-gray-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
