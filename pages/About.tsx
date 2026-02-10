
import React from 'react';
import { 
  Users, Briefcase, Award, Clock, Gem, UserCheck, Gavel, 
  BarChart3, LayoutGrid, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen py-16 animate-fade-in pt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <span className="text-gray-400 font-['Montserrat'] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Excelência em Remodelações</span>
          <h1 className="text-6xl font-['Playfair_Display'] font-bold text-gray-900 mb-6">DNL Remodelações</h1>
          <div className="h-0.5 w-24 bg-gray-900 mx-auto mb-8"></div>
          <p className="text-xl font-['Lora'] text-gray-600 max-w-3xl mx-auto italic leading-relaxed">
            Especialistas em transformar visões em realidade através de engenharia rigorosa e arquitetura sofisticada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="bg-white p-20 border border-gray-100 shadow-sm flex flex-col items-center justify-center">
             <span className="text-9xl font-['Playfair_Display'] font-bold text-gray-900">DNL</span>
             <span className="text-sm font-['Montserrat'] font-bold tracking-[0.5em] uppercase mt-4">Remodelações</span>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-gray-900">Nossa Filosofia</h2>
            <p className="text-gray-700 font-['Open_Sans'] leading-relaxed text-lg">
              A <strong>DNL Remodelações</strong> surgiu da necessidade de oferecer ao mercado português um serviço de construção que privilegia o detalhe e a transparência. Atuamos em projetos residenciais e comerciais com o compromisso de entregar não apenas uma obra, mas um investimento valorizado.
            </p>
            <p className="text-gray-600 font-['Lora'] leading-relaxed text-xl italic border-l-4 border-gray-900 pl-8 bg-gray-50 py-6 pr-6">
              "A nossa marca é o selo de garantia de que cada etapa da sua remodelação foi pensada com precisão absoluta e rigor técnico."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           {[
             { title: "Gestão Integrada", icon: LayoutGrid, text: "Gerimos todas as fases, desde o licenciamento até aos acabamentos finais." },
             { title: "Rigor no Prazo", icon: Clock, text: "O cumprimento de datas é um pilar inegociável na DNL Remodelações." },
             { title: "Qualidade Superior", icon: Gem, text: "Seleção rigorosa de materiais certificados e mão de obra especializada." }
           ].map((item, i) => (
             <div key={i} className="bg-white p-10 border border-gray-100 text-center">
               <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center mx-auto mb-6 rounded-sm">
                 <item.icon size={24} />
               </div>
               <h3 className="text-xl font-['Playfair_Display'] font-bold mb-4">{item.title}</h3>
               <p className="text-gray-500 text-sm">{item.text}</p>
             </div>
           ))}
        </div>

        <section className="py-24 border-t border-gray-100 flex flex-col items-center text-center">
          <h2 className="text-4xl font-['Playfair_Display'] font-bold text-gray-900 mb-8">Deseja iniciar a sua transformação?</h2>
          <Link 
            to="/orcamento" 
            className="inline-flex items-center px-12 py-6 bg-gray-900 text-white font-['Montserrat'] font-bold uppercase tracking-[0.3em] text-xs hover:bg-black transition-all shadow-xl"
          >
            Solicitar Orçamento Gratuito <ArrowRight className="ml-3 h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
