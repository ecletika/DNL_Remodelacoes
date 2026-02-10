
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectStatus, Project } from '../types';
import { Calendar, X, ChevronLeft, ChevronRight, Youtube, Play, ExternalLink } from 'lucide-react';

const Ongoing: React.FC = () => {
  const { projects } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const ongoingProjects = projects.filter(p => p.status === ProjectStatus.IN_PROGRESS);

  useEffect(() => {
    if (selectedProject) setCurrentSlide(0);
  }, [selectedProject]);

  // Função otimizada contra Erro 153 (Configuração de Player)
  const formatYoutubeUrl = (url: string) => {
    if (!url) return "";
    
    // Captura o ID do vídeo ignorando parâmetros de tracking (como o ?si=...)
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;

    if (videoId) {
      // SOLUÇÃO DEFINITIVA ERRO 153:
      // 1. youtube-nocookie.com: Evita bloqueios de cookies de terceiros
      // 2. enablejsapi=0: Remove a tentativa de controle via script que causa o erro 153
      // 3. origin: Especificamos a origem para validar o domínio
      const origin = window.location.origin;
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1&enablejsapi=0&origin=${encodeURIComponent(origin)}`;
    }
    
    return url;
  };

  const getDirectYoutubeLink = (url: string) => {
    if (!url) return "#";
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/watch?v=${match[1]}` : url;
  };

  const slides = selectedProject ? [
    ...(selectedProject.videoUrl ? [{ 
      url: formatYoutubeUrl(selectedProject.videoUrl), 
      directUrl: getDirectYoutubeLink(selectedProject.videoUrl),
      caption: 'Vídeo da Obra', 
      type: 'video' 
    }] : []),
    { url: selectedProject.imageUrl, caption: 'Estado Atual', type: 'image' },
    ...(selectedProject.gallery || []).map(item => ({ url: item.url, caption: item.caption, type: 'image' }))
  ] : [];

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-48 pb-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-gray-400 font-['Montserrat'] font-bold uppercase text-[10px] tracking-[0.4em]">Em Construção</span>
          <h1 className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 mt-4 mb-6">Projetos Atuais</h1>
          <div className="h-px w-20 bg-gray-200 mx-auto mb-6"></div>
          <p className="text-gray-500 font-['Lora'] italic max-w-xl mx-auto text-lg">
            Acompanhe a evolução rigorosa das nossas obras em curso. Transparência técnica em cada etapa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {ongoingProjects.map((project) => (
            <div key={project.id} className="bg-white border border-gray-50 shadow-sm flex flex-col md:flex-row overflow-hidden group">
              
              <div className="md:w-1/2 h-80 md:h-auto relative cursor-pointer overflow-hidden" onClick={() => setSelectedProject(project)}>
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                   {project.videoUrl && (
                     <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                        <Play fill="currentColor" size={24} />
                     </div>
                   )}
                </div>
                <div className="absolute top-6 left-6 bg-gray-900 text-white text-[9px] font-['Montserrat'] font-bold px-3 py-1 uppercase tracking-widest shadow-xl flex items-center gap-2">
                  {project.videoUrl && <Youtube size={12} className="text-red-500" />}
                  Em Andamento
                </div>
              </div>

              <div className="p-10 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">{project.title}</h3>
                  <p className="text-gray-500 font-['Open_Sans'] text-sm mb-8 leading-relaxed line-clamp-3">{project.description}</p>
                  
                  <div className="space-y-3 mb-10 text-xs font-['Montserrat'] font-bold uppercase tracking-wider text-gray-400">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-3" />
                      <span>Início: <span className="text-gray-900">{project.startDate ? new Date(project.startDate).toLocaleDateString() : '--/--/--'}</span></span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] font-['Montserrat'] font-bold uppercase tracking-widest text-gray-400">Progresso Técnico</span>
                    <span className="text-lg font-['Playfair_Display'] font-bold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-50 h-1.5 overflow-hidden">
                    <div className="bg-gray-900 h-full transition-all duration-1000 ease-in-out" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Galeria - PLAYER TOTALMENTE COMPATÍVEL ANTI-ERRO 153 */}
        {selectedProject && slides.length > 0 && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in" onClick={() => setSelectedProject(null)}>
            <div className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden flex flex-col rounded-sm" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                   <h2 className="text-xl font-['Playfair_Display'] font-bold text-gray-900">{selectedProject.title}</h2>
                   {slides[currentSlide].type === 'video' && (
                     <span className="bg-red-600 text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm flex items-center gap-2">
                       <Youtube size={12} /> Vídeo de Alta Qualidade
                     </span>
                   )}
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-50 rounded-full transition-colors"><X size={24} /></button>
              </div>
              
              <div className="relative h-[65vh] bg-black flex items-center justify-center">
                {slides[currentSlide].type === 'video' ? (
                  <div className="w-full h-full flex flex-col">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={slides[currentSlide].url} 
                      title="RF Construções Video Player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full shadow-inner"
                    ></iframe>
                    <div className="absolute bottom-4 right-4 z-10">
                       <a 
                         href={slides[currentSlide].directUrl} 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase px-4 py-2 rounded-full transition-all border border-white/20"
                       >
                         <ExternalLink size={12} /> Abrir no YouTube
                       </a>
                    </div>
                  </div>
                ) : (
                  <img src={slides[currentSlide].url} alt="Slide" className="max-w-full max-h-full object-contain" />
                )}
                
                {slides.length > 1 && (
                  <>
                    <button onClick={prevSlide} className="absolute left-4 text-white/40 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"><ChevronLeft size={40} /></button>
                    <button onClick={nextSlide} className="absolute right-4 text-white/40 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"><ChevronRight size={40} /></button>
                  </>
                )}
              </div>
              
              <div className="p-5 bg-white border-t border-gray-100 text-center flex justify-between items-center px-8">
                <p className="text-[10px] font-['Montserrat'] font-bold uppercase tracking-widest text-gray-400">
                  Slide {currentSlide + 1} de {slides.length} — {slides[currentSlide].caption}
                </p>
                <div className="flex gap-1.5">
                   {slides.map((_, i) => (
                     <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-gray-900 w-4' : 'bg-gray-200'}`} />
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ongoing;
