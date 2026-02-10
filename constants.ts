
import { Project, ProjectStatus, ProjectType, Review } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Renovação Apartamento Premium',
    description: 'Reforma completa de apartamento, incluindo demolição de paredes, novo piso e iluminação moderna pela equipa DNL Remodelações.',
    type: ProjectType.RESIDENTIAL,
    status: ProjectStatus.COMPLETED,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    progress: 100,
    completionDate: '2023-11-15',
    gallery: []
  },
  {
    id: '3',
    title: 'Reabilitação Moradia Cascais',
    description: 'Projeto de reestruturação total de moradia unifamiliar. Execução de novas redes de águas, eletricidade e acabamentos de luxo.',
    type: ProjectType.RESIDENTIAL,
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/XaelwkCMcYw',
    progress: 45,
    startDate: '2024-01-10',
    completionDate: '2024-08-15',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800', caption: 'Fase de Alvenaria' },
      { url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800', caption: 'Estrutura de Betão' }
    ]
  },
  {
    id: '4',
    title: 'Escritório Moderno DNL',
    description: 'Adaptação de espaço comercial para escritório open-space com divisórias em pladur e iluminação técnica.',
    type: ProjectType.COMMERCIAL,
    status: ProjectStatus.IN_PROGRESS,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    progress: 72,
    startDate: '2023-12-05',
    completionDate: '2024-06-20',
    gallery: []
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    clientName: 'Ana Pereira',
    rating: 5,
    comment: 'Serviço impecável! A DNL Remodelações foi pontual e entregou um acabamento superior.',
    avatarUrl: 'https://picsum.photos/id/64/100/100',
    date: '2024-01-25',
    approved: true
  }
];
