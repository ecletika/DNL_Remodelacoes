
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Logo: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-1">
    <div className="flex items-center space-x-2 mb-1">
      <div className="w-1 h-4 bg-gray-900"></div>
      <span className="text-3xl lg:text-4xl font-['Playfair_Display'] font-bold text-gray-900 leading-none tracking-tighter">
        RF
      </span>
      <div className="w-1 h-4 bg-gray-900"></div>
    </div>
    <div className="h-px w-full bg-gray-200 mb-1"></div>
    <span className="text-[9px] lg:text-[10px] font-['Montserrat'] font-bold text-gray-500 uppercase tracking-[0.3em] whitespace-nowrap">
      Construções
    </span>
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

  // Fechar menu mobile ao mudar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-white border-b border-gray-100 ${
      scrolled ? 'shadow-md py-1' : 'py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24 transition-all duration-300"> 
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            {settings?.logo_url ? (
               <img src={settings.logo_url} alt="RF Logo" className="h-12 lg:h-16 object-contain" />
            ) : (
                <Logo />
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-[12px] font-['Montserrat'] font-bold uppercase tracking-[0.1em] transition-all duration-200 relative group ${
                    isActive(link.path) ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900' 
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
              <Link 
                to="/admin" 
                className="p-2 text-gray-300 hover:text-gray-900 transition-colors ml-4"
                title="Administração"
              >
                <Lock size={16} />
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-900 focus:outline-none"
              aria-label="Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-[81px] bg-white z-[99] transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-8 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block text-2xl font-['Playfair_Display'] font-bold border-b border-gray-50 pb-4 ${
                isActive(link.path) ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/admin" 
            className="flex items-center text-xs font-['Montserrat'] font-bold uppercase tracking-widest text-gray-400 pt-4"
          >
            <Lock size={14} className="mr-2" /> Área de Gestão
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
