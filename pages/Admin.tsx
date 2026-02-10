
import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Project, ProjectStatus, ProjectType, Review, GalleryItem } from '../types';
import { generateProjectDescription } from '../services/geminiService';
import { 
  Trash2, Edit, Plus, Star, LogOut, Info, Settings, 
  Loader2, FolderKanban, FileText, AlertCircle, Sparkles, X, 
  Youtube, Upload, PlusCircle
} from 'lucide-react';

const Admin: React.FC = () => {
  const { 
    isAuthenticated, login, logout, projects, addProject, deleteProject, 
    reviews, budgetRequests, isLoading 
  } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'projects' | 'reviews' | 'requests' | 'settings'>('projects');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    type: ProjectType.RESIDENTIAL,
    status: ProjectStatus.IN_PROGRESS,
    progress: 10,
    imageUrl: '',
    videoUrl: '',
    gallery: []
  });

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja excluir permanentemente o projeto "${title}"?`)) {
      await deleteProject(id);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setNewProject(prev => ({ ...prev, imageUrl: base64 }));
    }
  };

  const handleGalleryImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newItems: GalleryItem[] = [];
      for (let i = 0; i < files.length; i++) {
        const base64 = await fileToBase64(files[i]);
        newItems.push({ url: base64, caption: 'Foto da Obra' });
      }
      setNewProject(prev => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...newItems]
      }));
    }
  };

  const removeGalleryItem = (index: number) => {
    setNewProject(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index)
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage('');
    const result = await login(email, password);
    if (!result.success && result.error) {
      setErrorMessage(result.error);
    }
    setIsLoggingIn(false);
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    
    const projectToAdd: Project = {
      id: Date.now().toString(),
      title: newProject.title as string,
      description: `Projeto de ${newProject.type} executado pela RF Construções.`,
      type: newProject.type as ProjectType,
      status: newProject.status as ProjectStatus,
      imageUrl: newProject.imageUrl || 'https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=1000',
      videoUrl: newProject.videoUrl as string,
      progress: newProject.progress as number,
      startDate: new Date().toISOString().split('T')[0],
      gallery: newProject.gallery || []
    };

    await addProject(projectToAdd);
    setShowAddModal(false);
    setNewProject({
      title: '',
      type: ProjectType.RESIDENTIAL,
      status: ProjectStatus.IN_PROGRESS,
      progress: 10,
      imageUrl: '',
      videoUrl: '',
      gallery: []
    });
  };

  const generateFictionalProject = async () => {
    setIsGenerating(true);
    const types = Object.values(ProjectType);
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomTitle = `${randomType} Premium ${Math.floor(Math.random() * 999)}`;
    const images = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'
    ];
    const randomImg = `${images[Math.floor(Math.random() * images.length)]}?q=80&w=1000&auto=format&fit=crop`;
    const description = await generateProjectDescription(randomTitle, randomType);
    
    const fictionalProject: Project = {
      id: Date.now().toString(),
      title: randomTitle,
      description: description,
      type: randomType,
      status: Math.random() > 0.5 ? ProjectStatus.COMPLETED : ProjectStatus.IN_PROGRESS,
      imageUrl: randomImg,
      progress: Math.floor(Math.random() * 100),
      startDate: '2024-01-01',
      completionDate: '2024-12-31',
      gallery: []
    };

    await addProject(fictionalProject);
    setIsGenerating(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-gray-900 animate-spin mb-4" />
          <p className="text-gray-500 font-medium font-['Montserrat']">Carregando RF Admin...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4 pt-28">
        <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex flex-col items-center mb-10 text-center">
              <span className="text-5xl font-['Playfair_Display'] font-bold text-gray-900 mb-2 tracking-tighter">RF</span>
              <span className="text-[10px] font-['Montserrat'] font-bold tracking-[0.2em] text-gray-400 uppercase">Gestão Construções</span>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-['Montserrat'] font-bold text-gray-400 uppercase mb-2">E-mail</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-100 rounded-sm outline-none focus:border-gray-900 transition-colors" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-['Montserrat'] font-bold text-gray-400 uppercase mb-2">Senha</label>
              <input type="password" className="w-full px-4 py-3 border border-gray-100 rounded-sm outline-none focus:border-gray-900 transition-colors" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {errorMessage && <div className="text-red-500 text-xs font-medium flex items-center"><AlertCircle size={14} className="mr-2" /> {errorMessage}</div>}
            <button type="submit" disabled={isLoggingIn} className="w-full bg-gray-900 text-white py-4 rounded-sm font-['Montserrat'] font-bold uppercase tracking-widest hover:bg-black transition-colors">Entrar no Painel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col md:flex-row font-['Open_Sans'] pt-28 lg:pt-32">
      <aside className="w-full md:w-72 bg-white text-gray-900 flex flex-col border-r border-gray-100">
        <div className="p-8 border-b border-gray-50 text-center">
             <div className="flex flex-col items-center">
                <span className="text-4xl font-['Playfair_Display'] font-bold text-gray-900 tracking-tighter">RF</span>
                <span className="text-[9px] font-['Montserrat'] font-bold tracking-[0.2em] text-gray-400 uppercase mt-1">Administração</span>
             </div>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center px-4 py-4 rounded-sm transition-all ${activeTab === 'projects' ? 'bg-gray-900 text-white shadow-lg' : 'hover:bg-gray-50'}`}><FolderKanban className="mr-4" size={20} /> Obras</button>
          <button onClick={() => setActiveTab('requests')} className={`w-full flex items-center px-4 py-4 rounded-sm transition-all ${activeTab === 'requests' ? 'bg-gray-900 text-white shadow-lg' : 'hover:bg-gray-50'}`}><FileText className="mr-4" size={20} /> Orçamentos</button>
          <button onClick={() => setActiveTab('reviews')} className={`w-full flex items-center px-4 py-4 rounded-sm transition-all ${activeTab === 'reviews' ? 'bg-gray-900 text-white shadow-lg' : 'hover:bg-gray-50'}`}><Star className="mr-4" size={20} /> Avaliações</button>
        </nav>
        <div className="p-6 border-t border-gray-50">
           <button onClick={() => logout()} className="w-full flex items-center justify-center px-4 py-3 text-red-500 hover:bg-red-50 transition-colors font-bold uppercase text-xs tracking-widest"><LogOut size={16} className="mr-2" /> Sair</button>
        </div>
      </aside>
      
      <main className="flex-1 p-8 md:p-12 overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-['Playfair_Display'] font-bold text-gray-900 capitalize">
            {activeTab.replace('projects', 'Obras').replace('requests', 'Orçamentos').replace('reviews', 'Avaliações')}
          </h2>
          
          {activeTab === 'projects' && (
            <div className="flex gap-3">
              <button onClick={generateFictionalProject} disabled={isGenerating} className="flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-900 text-[10px] font-['Montserrat'] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-50">
                {isGenerating ? <Loader2 size={14} className="animate-spin mr-2" /> : <Sparkles size={14} className="mr-2 text-yellow-500" />} Gerar Projeto Fictício
              </button>
              <button onClick={() => setShowAddModal(true)} className="flex items-center px-6 py-3 bg-gray-900 text-white text-[10px] font-['Montserrat'] font-bold uppercase tracking-widest hover:bg-black transition-all">
                <Plus size={14} className="mr-2" /> Nova Obra
              </button>
            </div>
          )}
        </div>

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 gap-4">
            {projects.map(project => (
              <div key={project.id} className="bg-white p-5 border border-gray-100 shadow-sm flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gray-50 overflow-hidden">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block">{project.type}</span>
                    <h4 className="text-lg font-['Playfair_Display'] font-bold text-gray-900">{project.title}</h4>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Edit size={18} /></button>
                  <button 
                    onClick={() => handleDelete(project.id, project.title)} 
                    className="p-2 text-red-300 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
            <div className="bg-white w-full max-w-xl p-8 shadow-2xl rounded-sm">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-gray-900">Nova Obra RF</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleManualAdd} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Título do Projeto</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 outline-none focus:border-gray-900"
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Categoria</label>
                      <select 
                        className="w-full p-3 bg-gray-50 border border-gray-200 outline-none"
                        value={newProject.type}
                        onChange={e => setNewProject({...newProject, type: e.target.value as ProjectType})}
                      >
                        {Object.values(ProjectType).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Progresso %</label>
                      <input 
                        type="number" min="0" max="100"
                        className="w-full p-3 bg-gray-50 border border-gray-200"
                        value={newProject.progress}
                        onChange={e => setNewProject({...newProject, progress: parseInt(e.target.value)})}
                      />
                    </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Link YouTube</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 border border-gray-200"
                    placeholder="Link do vídeo (Ex: XaelwkCMcYw)"
                    value={newProject.videoUrl}
                    onChange={e => setNewProject({...newProject, videoUrl: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Imagem Principal</label>
                  <input type="file" onChange={handleMainImageChange} className="text-xs" />
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-black mt-4">Salvar Projeto</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
