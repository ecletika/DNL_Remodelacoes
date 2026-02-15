
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Logo from '../components/Logo';

const Home: React.FC = () => {
  const { reviews } = useApp();
  const approvedReviews = reviews.filter(r => r.approved);
  
  return (
    <div className="flex flex-col min-h-screen animate-fade-in bg-[#fcfcfc]">
      <section 
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
          
          <div className="mb-12 transform scale-125 md:scale-150">
             <Logo variant="light" scale={1} />
          </div>

          <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-white mb-8 leading-tight max-w-4xl">
            Excelência Técnica em <br/>
            <span className="italic text-gray-300">Construção e Design</span>
          </h1>
          
          <p className="text-lg md:text-xl font-['Lora'] text-gray-200 mb-12 max-w-2xl mx-auto italic leading-relaxed">
            Soluções completas de engenharia e arquitetura para transformar a sua visão em realidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/orcamento" className="px-10 py-5 bg-white text-gray-900 font-['Montserrat'] font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-all shadow-2xl">Pedir Orçamento</Link>
            <Link to="/portfolio" className="px-10 py-5 bg-transparent border border-white/40 text-white font-['Montserrat'] font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-gray-900 transition-all">Nossos Projetos</Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-gray-50 text-center">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Star, title: "Rigor Técnico", desc: "Acabamentos precisos com materiais de primeira linha." },
              { icon: Clock, title: "Prazos Reais", desc: "Cronograma rigoroso e entrega garantida RF." },
              { icon: ShieldCheck, title: "Confiança", desc: "Transparência total em cada etapa da sua obra." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-gray-50 hover:border-gray-900 transition-all group">
                <item.icon className="mx-auto mb-6 text-gray-300 group-hover:text-gray-900 transition-colors" size={32} />
                <h3 className="text-xl font-['Playfair_Display'] font-bold mb-4 uppercase tracking-wider">{item.title}</h3>
                <p className="text-sm text-gray-500 uppercase tracking-tighter leading-relaxed">{item.desc}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 mb-16">O que dizem os Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {approvedReviews.map((review) => (
              <div key={review.id} className="bg-white p-12 border border-gray-100 relative group text-center shadow-sm">
                <p className="text-gray-600 font-['Lora'] italic text-lg leading-relaxed mb-8 italic">"{review.comment}"</p>
                <h4 className="text-sm font-['Montserrat'] font-bold uppercase tracking-widest text-gray-900">{review.clientName}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
