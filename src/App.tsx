import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from '@tanstack/react-router';
import { 
  Search, 
  Bell, 
  Globe, 
  Book, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Star, 
  Users,
  LayoutDashboard,
  MessageSquare,
  LogOut,
  User,
  Menu,
  X,
  ThumbsUp,
  Eye,
  EyeOff,
  Code,
  BookOpen,
  Presentation,
  Play,
  TrendingUp,
  Brain,
  Compass,
  Award,
  Download,
  Calendar,
  Filter,
  Video,
  Briefcase,
  CheckCircle,
  Check,
  AlertCircle,
  Shield,
  Lightbulb,
  Palette,
  Type,
  LayoutTemplate,
  Layers,
  MousePointer2,
  Component,
  Heart,
  Camera,
  Paperclip,
  Gift,
  MoreHorizontal,
  Send,
  ShoppingBag,
  ChevronDown
} from 'lucide-react';
import heroYoungProfessional from './assets/hero-young-professional.jpg';
import logoLector from './assets/logo-lector.svg';
import course01 from './assets/lector/courses/c01-ai-business.jpg';
import course02 from './assets/lector/courses/c02-chatgpt-productivity.jpg';
import course03 from './assets/lector/courses/c03-automation-ai.jpg';
import course04 from './assets/lector/courses/c04-time-management.jpg';
import course05 from './assets/lector/courses/c05-content-creation.jpg';
import course06 from './assets/lector/courses/c06-excel-ai.jpg';
import course07 from './assets/lector/courses/c07-notion.jpg';
import course08 from './assets/lector/courses/c08-prompt-engineering.jpg';
import course09 from './assets/lector/courses/c09-virtual-assistants.jpg';
import course10 from './assets/lector/courses/c10-dashboards.jpg';
import course11 from './assets/lector/courses/c11-personal-productivity.jpg';
import trail01 from './assets/lector/trails/t01-time.jpg';
import trail02 from './assets/lector/trails/t02-communication.jpg';
import trail03 from './assets/lector/trails/t03-digital-org.jpg';
import trail04 from './assets/lector/trails/t04-processes.jpg';
import trail05 from './assets/lector/trails/t05-meetings.jpg';
import trail06 from './assets/lector/trails/t06-collaboration.jpg';
import trail07 from './assets/lector/trails/t07-projects.jpg';
import trail08 from './assets/lector/trails/t08-workflows.jpg';
import trail09 from './assets/lector/trails/t09-leadership.jpg';
import trail10 from './assets/lector/trails/t10-service.jpg';
import trail11 from './assets/lector/trails/t11-accountability.jpg';

// --- Types ---
interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'COURSE' | 'TRAIL' | 'RECORD';
  thumb: string;
  duration?: string;
  rating?: number;
  students?: number;
  progress?: number;
  grade?: number;
  price?: string;
  authors?: string;
}

interface Section {
  id: string;
  title: string;
  variant?: string;
  items: ContentItem[];
}

// --- Mock Data ---
const BANNERS = [
  {
    id: '1',
    url: 'https://picsum.photos/seed/banner1/1200/200',
    leftColor: '#324F7F',
    rightColor: '#FFFFFF'
  },
  {
    id: '2',
    url: 'https://picsum.photos/seed/banner2/1200/200',
    leftColor: '#324F7F',
    rightColor: '#324F7F'
  }
];

const generateItems = (count: number, prefix: string): ContentItem[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-${i}`,
    title: `Lorem ipsum dolor sit amet consectetur adipiscing elit ${i + 1}`,
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis cumque inventore doloremque sit labore incidunt...',
    type: 'COURSE',
    thumb: `https://picsum.photos/seed/${prefix}-${i}/400/225`,
    authors: 'John Doe',
    duration: '32h00m',
    price: 'R$ 20,00',
    progress: 70,
    grade: 50,
  }));
};

const SECTIONS: Section[] = [
  { id: 's1', title: 'Simples 1 (Básico)', variant: 'simples-1', items: generateItems(11, 's1') },
  { id: 's2', title: 'Simples 2 (Duração)', variant: 'simples-2', items: generateItems(11, 's2') },
  { id: 's3', title: 'Simples 3 (Barras)', variant: 'simples-3', items: generateItems(11, 's3') },
  { id: 's4', title: 'Simples 4 (Circular)', variant: 'simples-4', items: generateItems(11, 's4') },
  { id: 's5', title: 'Simples 5 (Preço)', variant: 'simples-5', items: generateItems(11, 's5') },
  
  { id: 'c1', title: 'Completo 1 (Básico)', variant: 'completo-1', items: generateItems(11, 'c1') },
  { id: 'c2', title: 'Completo 2 (Duração)', variant: 'completo-2', items: generateItems(11, 'c2') },
  { id: 'c3', title: 'Completo 3 (Barras)', variant: 'completo-3', items: generateItems(11, 'c3') },
  { id: 'c4', title: 'Completo 4 (Circular)', variant: 'completo-4', items: generateItems(11, 'c4') },
  { id: 'c5', title: 'Completo 5 (Preço)', variant: 'completo-5', items: generateItems(11, 'c5') },

  { id: 'a1', title: 'Cursos em Alta', variant: 'avancado-1', items: [
    { id: 'a1-0', type: 'COURSE', thumb: course01, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Fundamentos de Inteligência Artificial para Negócios',
      description: 'Introdução prática aos conceitos de IA, aplicações empresariais e oportunidades de automação.',
      duration: '3h 20min', price: 'R$ 89,90' },
    { id: 'a1-1', type: 'COURSE', thumb: course02, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'ChatGPT para Produtividade no Trabalho',
      description: 'Aprenda a usar prompts e fluxos de trabalho para acelerar tarefas diárias com IA.',
      duration: '2h 45min', price: 'R$ 79,90' },
    { id: 'a1-2', type: 'COURSE', thumb: course03, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Automação de Processos com Inteligência Artificial',
      description: 'Crie rotinas automatizadas para reduzir tarefas manuais e ganhar escala operacional.',
      duration: '4h 10min', price: 'R$ 119,90' },
    { id: 'a1-3', type: 'COURSE', thumb: course04, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Gestão do Tempo com Ferramentas de IA',
      description: 'Técnicas e ferramentas inteligentes para organização pessoal e priorização.',
      duration: '2h 10min', price: 'R$ 69,90' },
    { id: 'a1-4', type: 'COURSE', thumb: course05, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'IA Aplicada à Criação de Conteúdo',
      description: 'Produza textos, apresentações e materiais visuais com auxílio de IA generativa.',
      duration: '3h 00min', price: 'R$ 84,90' },
    { id: 'a1-5', type: 'COURSE', thumb: course06, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Excel Inteligente com IA',
      description: 'Use inteligência artificial para análise de dados, fórmulas e dashboards rápidos.',
      duration: '2h 30min', price: 'R$ 74,90' },
    { id: 'a1-6', type: 'COURSE', thumb: course07, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Notion e Organização Inteligente',
      description: 'Estruture conhecimento, tarefas e projetos com sistemas digitais otimizados.',
      duration: '1h 55min', price: 'R$ 59,90' },
    { id: 'a1-7', type: 'COURSE', thumb: course08, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Prompt Engineering para Profissionais',
      description: 'Técnicas avançadas para criar prompts eficientes e obter melhores respostas de IA.',
      duration: '3h 40min', price: 'R$ 99,90' },
    { id: 'a1-8', type: 'COURSE', thumb: course09, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Assistentes Virtuais para Atendimento e Suporte',
      description: 'Configure fluxos e assistentes inteligentes para melhorar suporte e experiência.',
      duration: '2h 50min', price: 'R$ 79,90' },
    { id: 'a1-9', type: 'COURSE', thumb: course10, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Dashboards e Relatórios com IA',
      description: 'Transforme dados em insights visuais usando ferramentas analíticas inteligentes.',
      duration: '3h 15min', price: 'R$ 94,90' },
    { id: 'a1-10', type: 'COURSE', thumb: course11, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Produtividade Pessoal com Sistemas Inteligentes',
      description: 'Metodologias e ferramentas para foco, execução e alta performance no trabalho.',
      duration: '2h 20min', price: 'R$ 64,90' },
  ] },

  { id: 't1', title: 'Trilhas em Destaque', variant: 'avancado-1', items: [
    { id: 't1-0', type: 'TRAIL', thumb: trail01, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Gestão do Tempo e Prioridades',
      description: 'Estruture sua rotina, organize demandas e aumente eficiência na execução diária.',
      duration: '8h 20min', price: 'R$ 169,90' },
    { id: 't1-1', type: 'TRAIL', thumb: trail02, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Comunicação Corporativa de Alta Performance',
      description: 'Desenvolva comunicação clara, objetiva e estratégica para ambientes corporativos.',
      duration: '7h 45min', price: 'R$ 159,90' },
    { id: 't1-2', type: 'TRAIL', thumb: trail03, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Produtividade e Organização Digital',
      description: 'Implemente sistemas, ferramentas e métodos para organizar tarefas, arquivos e projetos.',
      duration: '9h 10min', price: 'R$ 179,90' },
    { id: 't1-3', type: 'TRAIL', thumb: trail04, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Eficiência Operacional e Processos',
      description: 'Aprenda boas práticas para padronização, melhoria contínua e otimização de rotinas.',
      duration: '10h 30min', price: 'R$ 199,90' },
    { id: 't1-4', type: 'TRAIL', thumb: trail05, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Reuniões Produtivas e Gestão de Follow-up',
      description: 'Conduza reuniões mais objetivas e mantenha alinhamento entre times e projetos.',
      duration: '5h 50min', price: 'R$ 129,90' },
    { id: 't1-5', type: 'TRAIL', thumb: trail06, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Colaboração e Trabalho em Equipe',
      description: 'Fortaleça alinhamento, colaboração entre áreas e execução conjunta de metas.',
      duration: '8h 00min', price: 'R$ 164,90' },
    { id: 't1-6', type: 'TRAIL', thumb: trail07, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Gestão de Projetos para Times Corporativos',
      description: 'Planejamento, acompanhamento e entrega de projetos com maior previsibilidade.',
      duration: '11h 15min', price: 'R$ 219,90' },
    { id: 't1-7', type: 'TRAIL', thumb: trail08, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Organização de Demandas e Fluxos de Trabalho',
      description: 'Estruture processos internos, priorização e acompanhamento de atividades.',
      duration: '7h 35min', price: 'R$ 149,90' },
    { id: 't1-8', type: 'TRAIL', thumb: trail09, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Liderança e Performance de Equipes',
      description: 'Desenvolva habilidades para acompanhamento de resultados e gestão de pessoas.',
      duration: '10h 40min', price: 'R$ 209,90' },
    { id: 't1-9', type: 'TRAIL', thumb: trail10, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Atendimento, Relacionamento e Excelência Operacional',
      description: 'Melhore experiência interna e externa com processos e comunicação eficientes.',
      duration: '8h 25min', price: 'R$ 169,90' },
    { id: 't1-10', type: 'TRAIL', thumb: trail11, authors: 'Equipe Lector', progress: 70, grade: 50,
      title: 'Trilha Cultura de Resultado e Accountability',
      description: 'Desenvolva disciplina operacional, ownership e foco em metas organizacionais.',
      duration: '6h 55min', price: 'R$ 139,90' },
  ] },
  { id: 'a2', title: 'Avançado 2', variant: 'avancado-2', items: generateItems(11, 'a2') },
  { id: 'a3', title: 'Avançado 3', variant: 'avancado-3', items: generateItems(11, 'a3') },
  { id: 'a4', title: 'Avançado 4', variant: 'avancado-4', items: generateItems(11, 'a4') },
  { id: 'a5', title: 'Avançado 5', variant: 'avancado-5', items: generateItems(11, 'a5') },
  { id: 'a6', title: 'Avançado 6', variant: 'avancado-6', items: generateItems(11, 'a6') },
  { id: 'a7', title: 'Avançado 7 (Pôster)', variant: 'avancado-7', items: generateItems(11, 'a7') },
];

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMinhaAreaOpen, setIsMinhaAreaOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ContentItem[]>([]);

  const navItems = ['Minha Área', 'Social'];

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const allItems = SECTIONS.flatMap(section => section.items);
      const filtered = allItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex justify-between h-16 items-center w-full">
          {/* LOGO - Left aligned */}
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => setActiveTab('Conteúdo')}>
              <img src={logoLector} alt="Lector" className="h-10 w-auto group-hover:scale-105 transition-transform duration-200" />
            </div>
          </div>
          
          {/* MENU TABS - Center aligned */}
          <div className="hidden md:flex flex-none items-center justify-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 relative ${
                  activeTab === item 
                    ? 'text-brand-primary' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item}
                {activeTab === item && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-primary/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* SEARCH & ACTIONS - Right aligned */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary rounded-full text-sm transition-all duration-300 w-48 lg:w-64"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
              
              {/* Search Suggestions Dropdown */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      {suggestions.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSearchQuery('');
                            setSuggestions([]);
                            // Here you could navigate to the item
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.thumb} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-1">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                              {item.type === 'COURSE' ? 'Treinamento' : item.type}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Tooltip content="Notificações">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative group">
                <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </Tooltip>
            
            <Tooltip content="Idioma">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <Globe className="h-5 w-5" />
              </button>
            </Tooltip>
            
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pr-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary overflow-hidden">
                  <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden lg:block">Caio Gomes</span>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 mb-2 bg-gray-50/50">
                      <div className="text-sm font-bold text-gray-900">Caio Gomes</div>
                      <div className="text-xs text-gray-500 truncate">suporte2@lectortec.com.br</div>
                    </div>
                    
                    <button 
                      onClick={() => setIsMinhaAreaOpen(!isMinhaAreaOpen)}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <LayoutDashboard className="h-4 w-4" /> Minha Area
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMinhaAreaOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isMinhaAreaOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gray-50/30"
                        >
                          <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors">
                            <Play className="h-3.5 w-3.5" /> Meus Treinamentos
                          </button>
                          <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors">
                            <Compass className="h-3.5 w-3.5" /> Minhas Trilhas
                          </button>
                          <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors">
                            <Star className="h-3.5 w-3.5" /> Minhas Habilidades
                          </button>
                          <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors">
                            <Award className="h-3.5 w-3.5" /> Meus Certificados
                          </button>
                          <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors">
                            <Calendar className="h-3.5 w-3.5" /> Meu Calendário
                          </button>
                          <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors">
                            <ShoppingBag className="h-3.5 w-3.5" /> Minhas Compras
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 transition-colors">
                      <Users className="h-4 w-4" /> Selecionar perfil
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 transition-colors">
                      <Globe className="h-4 w-4" /> Alterar idioma
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 transition-colors">
                      <Download className="h-4 w-4" /> Instalar
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 transition-colors">
                      <CheckCircle className="h-4 w-4" /> Validar termos de Aceite
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 transition-colors">
                      <BookOpen className="h-4 w-4" /> Ver glossário
                    </button>
                    
                    <div className="h-px bg-gray-100 my-2"></div>
                    
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium">
                      <LogOut className="h-4 w-4" /> Sair
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <Tooltip content="Menu" direction="left">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveTab(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeTab === item ? 'bg-brand-primary/10 text-brand-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary overflow-hidden">
                    <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-800">Caio Gomes</div>
                    <div className="text-sm text-gray-500">suporte2@lectortec.com.br</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SocialView = () => {
  const [activeProfile, setActiveProfile] = useState<any | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  const toggleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(pId => pId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const toggleComments = (id: number) => {
    setExpandedComments(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const users = [
    { id: 1, name: 'Lia do RH', role: 'Recursos Humanos', avatar: 'https://ui-avatars.com/api/?name=Lia+RH&background=F3E8FF&color=9333EA' },
    { id: 2, name: 'Patrick', role: 'Engenharia de Software', avatar: 'https://ui-avatars.com/api/?name=Patrick&background=DBEAFE&color=2563EB' },
    { id: 3, name: 'Carla', role: 'Marketing', avatar: 'https://ui-avatars.com/api/?name=Carla&background=FCE7F3&color=DB2777' },
    { id: 4, name: 'Serginho', role: 'Vendas', avatar: 'https://ui-avatars.com/api/?name=Serginho&background=FEF3C7&color=D97706' },
  ];

  const initialPosts = [
    {
      id: 1,
      user: users[0],
      time: '1 hora atrás',
      content: 'Não esqueça de preencher nossa pesquisa do GPTW! Sua opinião é fundamental para construirmos um ambiente cada vez melhor.',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=400',
      likes: 45,
      commentsList: [
        { id: 101, user: users[2], text: 'Já respondi a minha! 🚀', time: '45 m' }
      ]
    },
    {
      id: 2,
      user: users[1],
      time: '3 horas atrás',
      content: 'Acabamos de liberar a nova versão do aplicativo com foco em acessibilidade e melhorias no leitor de tela! 🎉 Confiram lá.',
      likes: 128,
      commentsList: [
        { id: 102, user: users[0], text: 'Ficou incrível, time! O pessoal aqui do RH amou a novidade.', time: '2 h' },
        { id: 103, user: users[3], text: 'Isso aí, baita entrega.', time: '1 h' }
      ]
    },
    {
      id: 3,
      user: users[2],
      time: 'Ontem',
      content: 'A campanha de Marketing de Q3 foi um absoluto sucesso! Muito obrigada a todos os times envolvidos, principalmente ao pessoal de Dados por fornecer os insumos.',
      likes: 89,
      commentsList: []
    }
  ];

  const [posts, setPosts] = useState(initialPosts);

  const handleAddComment = (postId: number) => {
    const text = commentInputs[postId];
    if (!text || text.trim() === '') return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsList: [
            ...post.commentsList,
            {
              id: Date.now(),
              user: users[0],
              text: text.trim(),
              time: 'agora'
            }
          ]
        };
      }
      return post;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const birthdays = [
    { name: 'Abrahão Soares', role: 'MDR ACCOUNT', avatar: 'https://ui-avatars.com/api/?name=Abrahão+Soares&background=E0E7FF&color=4338CA' },
    { name: 'Ana Barbosa de Lima', role: 'RECURSOS HUMANOS', avatar: 'https://ui-avatars.com/api/?name=Ana+Barbosa&background=ECFCCB&color=4D7C0F' },
  ];

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-64px)] py-8 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: WIDGETS */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
            
            {/* Widget: Destaques */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-100">
                <button className="flex-1 py-3 text-sm font-bold text-brand-primary border-b-2 border-brand-primary">Destaques</button>
                <button className="flex-1 py-3 text-sm font-medium text-gray-400 hover:text-gray-600">Grupos</button>
              </div>
              <div className="p-4 space-y-4">
                {users.map(user => (
                  <div 
                    key={user.id} 
                    className="flex items-center gap-3 cursor-pointer p-2 -mx-2 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setActiveProfile(user)}
                  >
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full shadow-sm" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{user.name}</h4>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget: Aniversariantes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-brand-primary/5 p-4 border-b border-brand-primary/10 flex items-center gap-2">
                <Gift className="text-brand-primary w-5 h-5" />
                <h3 className="font-bold text-brand-primary">Aniversariantes do mês</h3>
              </div>
              <div className="p-4 space-y-4">
                {birthdays.map((bday, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={bday.avatar} alt={bday.name} className="w-10 h-10 rounded-full shadow-sm" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">{bday.name}</h4>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider limit-lines-1">{bday.role}</p>
                      </div>
                    </div>
                    <Tooltip content="Enviar Mensagem">
                      <button className="text-gray-400 hover:text-brand-primary p-2 hover:bg-brand-primary/10 rounded-full transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* CENTER COLUMN: FEED */}
          <div className="flex-grow max-w-2xl w-full mx-auto space-y-6">
            
            {/* CRIAR POST BOX */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
               <div className="flex gap-4 mb-4">
                 <img src={users[0].avatar} alt="Seu Perfil" className="w-10 h-10 rounded-full shadow-sm" />
                 <input 
                   type="text" 
                   placeholder="Compartilhe algo com a rede..." 
                   className="flex-grow bg-gray-50 border border-gray-200 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                 />
               </div>
               <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-1">
                    <Tooltip content="Anexar Imagem" direction="top">
                      <button className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-full transition-colors">
                        <Camera className="w-5 h-5" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Anexar Arquivo" direction="top">
                      <button className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-full transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                    </Tooltip>
                  </div>
                  <button className="bg-brand-primary text-white font-medium text-sm px-5 py-1.5 rounded-full hover:opacity-90 shadow-sm transition-opacity">
                    Publicar
                  </button>
               </div>
            </div>

            {/* FEED DE POSTS */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Feed Recente</h3>
                <button className="text-sm text-brand-primary font-medium hover:underline flex items-center gap-1">
                  Filtrar timeline 
                </button>
              </div>

              {posts.map((post) => {
                const isLiked = likedPosts.includes(post.id);
                return (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    {/* Cabeçalho do Post */}
                    <div className="p-5 pb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.user.avatar} 
                          alt={post.user.name} 
                          className="w-12 h-12 rounded-full shadow-sm cursor-pointer hover:ring-2 hover:ring-brand-primary hover:ring-offset-2 transition-all" 
                          onClick={() => setActiveProfile(post.user)}
                        />
                        <div>
                          <h4 
                            className="font-bold text-gray-900 cursor-pointer hover:text-brand-primary transition-colors"
                            onClick={() => setActiveProfile(post.user)}
                          >
                            {post.user.name}
                          </h4>
                          <p className="text-xs text-gray-400">{post.time} • {post.user.role}</p>
                        </div>
                      </div>
                      <Tooltip content="Mais Opções">
                        <button className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </Tooltip>
                    </div>

                    {/* Corpo do Post */}
                    <div className="p-5 pt-2">
                      <p className="text-gray-700 leading-relaxed text-[15px] mb-4">
                        {post.content}
                      </p>
                      {post.image && (
                        <div className="rounded-xl overflow-hidden mb-2 border border-gray-100">
                          <img src={post.image} alt="Conteúdo da publicação" className="w-full h-auto object-cover max-h-80" />
                        </div>
                      )}
                    </div>

                    {/* Rodapé - Action Bar */}
                    <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50 flex items-center gap-6">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 font-medium text-sm transition-colors ${
                          isLiked ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        <motion.div
                          animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
                        </motion.div>
                        {post.likes + (isLiked ? 1 : 0)}
                      </button>

                      <button 
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-2 font-medium text-sm text-gray-500 hover:text-gray-800 transition-colors"
                      >
                        <MessageSquare className="w-5 h-5" />
                        {post.commentsList.length} Comentários
                      </button>
                    </div>

                    {/* Comentários */}
                    <AnimatePresence>
                      {expandedComments.includes(post.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-5 border-t border-gray-100 bg-gray-50/30 overflow-hidden"
                        >
                          <div className="py-4 space-y-4">
                            {post.commentsList.map(comment => (
                              <div key={comment.id} className="flex gap-3 text-sm">
                                <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full shadow-sm" />
                                <div className="bg-white border border-gray-100 rounded-xl rounded-tl-sm p-3 flex-grow shadow-sm">
                                  <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-gray-900">{comment.user.name}</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{comment.time}</span>
                                  </div>
                                  <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                                </div>
                              </div>
                            ))}
                            
                            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                              <img src={users[0].avatar} alt="Seu Perfil" className="w-8 h-8 rounded-full shadow-sm" />
                              <div className="flex-grow flex relative">
                                <input 
                                  type="text" 
                                  placeholder="Escreva um comentário..." 
                                  className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary shadow-sm transition-all"
                                  value={commentInputs[post.id] || ''}
                                  onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})}
                                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                />
                                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                                  <Tooltip content="Enviar" direction="left">
                                    <button 
                                      onClick={() => handleAddComment(post.id)}
                                      className={`p-1.5 rounded-full transition-colors ${
                                        commentInputs[post.id]?.trim() ? 'bg-brand-primary text-white hover:bg-brand-primary/90' : 'text-gray-400 bg-gray-100 hover:bg-gray-200'
                                      }`}
                                      disabled={!commentInputs[post.id]?.trim()}
                                    >
                                      <Send className="w-4 h-4" />
                                    </button>
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
            
          </div>

        </div>
      </div>

      {/* OVERLAY E MODAL DE PERFIL */}
      <AnimatePresence>
        {activeProfile && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60]"
              onClick={() => setActiveProfile(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="relative h-32 bg-brand-primary/10">
                <div className="absolute top-4 right-4">
                  <Tooltip content="Fechar perfil" direction="left">
                    <button 
                      onClick={() => setActiveProfile(null)}
                      className="p-2 bg-white/50 hover:bg-white rounded-full text-gray-700 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </Tooltip>
                </div>
              </div>

              <div className="px-8 -mt-12 mb-6">
                <img 
                  src={activeProfile.avatar} 
                  alt={activeProfile.name} 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4 bg-white" 
                />
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{activeProfile.name}</h2>
                <p className="text-brand-primary font-medium">{activeProfile.role}</p>
              </div>

              <div className="px-8 flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                 <div className="text-center">
                   <span className="block text-2xl font-bold text-gray-900">45</span>
                   <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Posts</span>
                 </div>
                 <div className="text-center">
                   <span className="block text-2xl font-bold text-gray-900">12</span>
                   <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Grupos</span>
                 </div>
                 <div className="text-center">
                   <span className="block text-2xl font-bold text-gray-900">2.4k</span>
                   <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Likes</span>
                 </div>
              </div>

              <div className="flex-grow overflow-y-auto px-8 pb-8">
                <h3 className="font-bold text-gray-900 mb-4">Últimas Publicações</h3>
                <div className="space-y-4">
                   <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                     <p className="text-sm text-gray-600 line-clamp-3">Estou muito feliz de anunciar a nova turma do treinamento de liderança!</p>
                     <span className="text-xs text-gray-400 mt-2 block">Há 2 dias</span>
                   </div>
                   <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                     <p className="text-sm text-gray-600 line-clamp-3">Agradecimentos ao time pelo empenho na entrega de sexta-feira.</p>
                     <span className="text-xs text-gray-400 mt-2 block">Semana passada</span>
                   </div>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

const MyAreaTreinamentos = () => {
  const [isSituacaoOpen, setIsSituacaoOpen] = useState(false);
  const situacaoOptions = ['Qualquer', 'Concluído', 'Cancelado', 'Expirado', 'Em andamento', 'Bloqueado', 'Evadido'];
  const [selectedSituacao, setSelectedSituacao] = useState('Qualquer');

  const [isExportOpen, setIsExportOpen] = useState(false);
  const exportOptions = ['CSV', 'Excel', 'PDF'];

  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  const treinamentosData = [
    {
      id: '1',
      nome: 'treinamento teste documentos 19/01',
      cargaHoraria: '-',
      inscricao: '19/01/2026',
      termino: '-',
      expiracao: '-',
      situacao: 'Em andamento',
      progresso: 100,
      aproveitamento: 100,
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: '2',
      nome: 'Teste Scorm',
      cargaHoraria: '01:00:00',
      inscricao: '06/01/2026',
      termino: '-',
      expiracao: '-',
      situacao: 'Em andamento',
      progresso: 28.57,
      aproveitamento: 28.57,
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: '3',
      nome: 'coe coe',
      cargaHoraria: '-',
      inscricao: '22/12/2025',
      termino: '27/02/2026',
      expiracao: '-',
      situacao: 'Aguardando correção de avaliações',
      progresso: 100,
      aproveitamento: 50,
      badgeColor: 'bg-amber-100 text-amber-700'
    },
    {
      id: '4',
      nome: 'Treinamento 5',
      cargaHoraria: '01:00:00',
      inscricao: '15/12/2025',
      termino: '15/12/2025',
      expiracao: '-',
      situacao: 'Evadido',
      progresso: 100,
      aproveitamento: 0,
      badgeColor: 'bg-gray-100 text-gray-700'
    },
    {
      id: '5',
      nome: 'Treinamento gravações travanado 11227',
      cargaHoraria: '-',
      inscricao: '10/04/2026',
      termino: '10/04/2026',
      expiracao: '-',
      situacao: 'Concluído - Aprovado',
      progresso: 100,
      aproveitamento: 100,
      badgeColor: 'bg-green-100 text-green-700'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Search and Filters Bar - Expanded */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col gap-4">
        
        {/* Top Row: Search and Quick Actions */}
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
          <div className="relative flex-grow w-full max-w-2xl">
            <input 
              type="text" 
              placeholder="Pesquisar treinamentos por nome..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] rounded-lg text-sm transition-all text-gray-700"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex gap-2 w-full xl:w-auto overflow-x-visible pb-2 xl:pb-0 scrollbar-hide shrink-0 relative">
             <div className="relative">
               <button 
                 onClick={() => setIsSituacaoOpen(!isSituacaoOpen)}
                 className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-between gap-2 transition-colors whitespace-nowrap min-w-[140px]"
               >
                  <span>{selectedSituacao === 'Qualquer' ? 'Situação' : selectedSituacao}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isSituacaoOpen ? 'rotate-180' : ''}`} />
               </button>

               <AnimatePresence>
                 {isSituacaoOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     transition={{ duration: 0.2 }}
                     className="absolute z-20 top-full mt-2 left-0 w-full min-w-[160px] bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 focus:outline-none overflow-hidden"
                   >
                     {situacaoOptions.map((opcao) => (
                       <button
                         key={opcao}
                         onClick={() => {
                           setSelectedSituacao(opcao);
                           setIsSituacaoOpen(false);
                         }}
                         className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedSituacao === opcao ? 'bg-[#F58220]/10 text-[#F58220] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
                       >
                         {opcao}
                       </button>
                     ))}
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>

             <button 
               onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
               className={`px-5 py-2.5 border rounded-lg text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${isAdvancedFiltersOpen ? 'bg-[#F58220] border-[#F58220] text-white' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'}`}
             >
                <Filter className={`w-4 h-4 ${isAdvancedFiltersOpen ? 'text-white' : 'text-gray-400'}`} />
                <span>Filtros</span>
             </button>

             <div className="relative">
               <button 
                 onClick={() => setIsExportOpen(!isExportOpen)}
                 className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 transition-colors whitespace-nowrap min-w-[150px] justify-center"
               >
                  <Download className="w-4 h-4 text-gray-400" />
                  <span>Exportar Dados</span>
               </button>

               <AnimatePresence>
                 {isExportOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     transition={{ duration: 0.2 }}
                     className="absolute z-20 top-full mt-2 right-0 w-full min-w-[150px] bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 focus:outline-none overflow-hidden"
                   >
                     {exportOptions.map((opcao) => (
                       <button
                         key={opcao}
                         onClick={() => setIsExportOpen(false)}
                         className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#F58220] transition-colors font-medium"
                       >
                         {opcao}
                       </button>
                     ))}
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
        </div>

        {/* Bottom Row: Advanced Date Filters */}
        <AnimatePresence>
          {isAdvancedFiltersOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row gap-4 pt-4 border-t border-gray-100">
                
                {/* Data Inscricao Filter */}
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Filtrar por Inscrição</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input type="text" placeholder="Data inicial" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-[#F58220] focus:ring-1 focus:ring-[#F58220]" />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <span className="text-gray-400 text-sm">até</span>
                    <div className="relative flex-1">
                      <input type="text" placeholder="Data final" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-[#F58220] focus:ring-1 focus:ring-[#F58220]" />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Divisor */}
                <div className="hidden lg:block w-px bg-gray-100 mx-2"></div>

                {/* Data Conclusao Filter */}
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Filtrar por Término</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input type="text" placeholder="Data inicial" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-[#F58220] focus:ring-1 focus:ring-[#F58220]" />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <span className="text-gray-400 text-sm">até</span>
                    <div className="relative flex-1">
                      <input type="text" placeholder="Data final" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-[#F58220] focus:ring-1 focus:ring-[#F58220]" />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {treinamentosData.map((curso) => (
        <div key={curso.id} className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col xl:flex-row gap-6 hover:shadow-md hover:border-gray-300 hover:bg-white transition-all relative overflow-hidden group">
          {curso.situacao.includes('Concluído') && (
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500/80"></div>
          )}
          
          {/* Esquerda: Informações do Curso */}
          <div className="flex-grow xl:w-1/2">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${curso.badgeColor}`}>
                {curso.situacao}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-4 pr-4">
              {curso.nome}
            </h3>
            
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-gray-500">
              {curso.cargaHoraria !== '-' && (
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gray-400"/> {curso.cargaHoraria}</span>
              )}
              {curso.inscricao !== '-' && (
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-400"/> Inscrito em: {curso.inscricao}</span>
              )}
              {curso.termino !== '-' && (
                <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-600/60"/> Término: {curso.termino}</span>
              )}
            </div>
          </div>

          {/* Direita: Progresso e Ações */}
          <div className="flex flex-col sm:flex-row xl:w-1/2 items-start xl:items-center justify-between gap-6 pt-5 xl:pt-0 border-t xl:border-t-0 xl:border-l border-gray-100 xl:pl-8">
            
            {/* Medidores */}
            <div className="flex flex-col gap-3 w-full xl:w-48 shrink-0">
              {/* Barra de Progresso */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Progresso</span>
                <div className="flex items-center gap-2">
                  <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${curso.situacao.includes('Concluído') ? 'bg-green-500' : 'bg-[#F58220]'}`} 
                      style={{ width: `${curso.progresso}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-12 text-right">{curso.progresso.toFixed(2)}%</span>
                </div>
              </div>
              
              {/* Barra de Aproveitamento */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Aproveitamento</span>
                <div className="flex items-center gap-2">
                  <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${curso.situacao.includes('Concluído') ? 'bg-green-500' : 'bg-[#F58220]'}`} 
                      style={{ width: `${curso.aproveitamento}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-12 text-right">{curso.aproveitamento.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            {/* Ação Button Dinâmica */}
            <div className="flex-shrink-0 w-full sm:w-auto flex flex-col gap-2">
              {curso.situacao === 'Em andamento' && (
                <button className="w-full sm:w-auto bg-[#F58220] hover:bg-[#E07010] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Play size={16} fill="currentColor" /> Estudar
                </button>
              )}
              
              {curso.situacao === 'Aguardando correção de avaliações' && (
                <button disabled className="w-full sm:w-auto bg-gray-100/50 text-gray-400 cursor-not-allowed px-6 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2">
                  <Clock size={16} /> Em Correção
                </button>
              )}

              {curso.situacao.includes('Concluído') && (
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <TrendingUp size={15} /> Desempenho
                  </button>
                  <button className="w-full sm:w-auto bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Award size={15} /> Certificado
                  </button>
                </div>
              )}
            </div>
            
          </div>
        </div>
      ))}
      
      {/* Paginação */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">Mostrando de 1 até 5 de 78 registros</span>
        <div className="flex gap-1">
           <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50">Anterior</button>
           <button className="px-3 py-1 bg-brand-primary text-white rounded-md text-sm font-medium">1</button>
           <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50">2</button>
           <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50">3</button>
           <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50">Próximo</button>
        </div>
      </div>
      
    </div>
  );
};

const MyAreaHabilidades = () => {
  const roles = ['Todos', 'Analista de Testes JR', 'Analista SR', 'Líder Técnico'];
  const [activeRole, setActiveRole] = useState('Analista de Testes JR');

  const trainings = [
    { id: 1, name: 'Treinamento Lector', type: 'Treinamento online', weight: 1, progress: 100, validation: 100, validated: true },
    { id: 2, name: 'Novo Amazon Teste', type: 'Treinamento presencial', weight: 2, progress: 75, validation: 50, validated: false },
    { id: 3, name: 'Treinamento REDE-2362', type: 'Avaliação prática', weight: 1, progress: 30, validation: 0, validated: false },
  ];

  return (
    <div className="space-y-8">
      {/* Tabs Internas (Navegação de Cargos) */}
      <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeRole === role
                ? 'bg-[#F58220] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {activeRole === role && role !== 'Todos' ? <span className="mr-2">✓</span> : null}
            {role}
          </button>
        ))}
      </div>

      {/* Banner do Cargo Selecionado */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="flex-grow w-full text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
             <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
               <Briefcase size={20} />
             </div>
             <h3 className="text-2xl font-bold text-gray-900">{activeRole}</h3>
           </div>
           <p className="text-gray-500 max-w-2xl text-sm leading-relaxed mx-auto md:mx-0">
             Base de conhecimento, treinamentos e avaliações necessárias para o exercício e capacitação rápida na função de {activeRole}.
           </p>
        </div>
        
        <div className="flex-shrink-0 flex items-center gap-5 bg-gray-50 px-6 py-4 rounded-xl border border-gray-100 w-full md:w-auto justify-center">
           <div className="text-right">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Prontidão para o Cargo</p>
             <span className="text-3xl font-display font-bold text-[#F58220]">33%</span>
           </div>
           <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-[#F58220]" strokeWidth="4" strokeDasharray="33, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
           </div>
        </div>
      </div>

      {/* Lista de Conhecimentos */}
      <div>
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
           Conhecimentos Obrigatórios <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-bold">{trainings.length}</span>
        </h4>
        
        <div className="space-y-3">
          {trainings.map(train => (
            <div key={train.id} className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 flex flex-col lg:flex-row items-center gap-6 hover:shadow-md transition-all">
              
              {/* Info Esquerda */}
              <div className="flex items-start gap-4 w-full lg:w-5/12 flex-shrink-0">
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 text-gray-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 leading-tight mb-2 pr-4">{train.name}</h5>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">{train.type}</span>
                    <span className="text-[11px] font-medium text-gray-500">Peso: {train.weight}</span>
                  </div>
                </div>
              </div>

              {/* Barras Centrais */}
              <div className="w-full lg:w-4/12 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold uppercase text-gray-400 w-20 tracking-wider">Progresso</span>
                  <div className="h-1.5 flex-grow bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${train.progress}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-8 text-right">{train.progress}%</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold uppercase text-gray-400 w-20 tracking-wider">Validação</span>
                  <div className="h-1.5 flex-grow bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${train.validation === 100 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${train.validation}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-8 text-right">{train.validation}%</span>
                </div>
              </div>

              {/* Status & Action direita */}
              <div className="w-full lg:w-3/12 flex items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 mt-2 lg:mt-0">
                <div className="flex justify-start">
                   {train.validated ? (
                     <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                       <CheckCircle size={14} /> Validado
                     </span>
                   ) : (
                     <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                       <AlertCircle size={14} /> Pendente
                     </span>
                   )}
                </div>
                <button className="text-gray-400 border border-gray-200 hover:border-blue-200 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0" title="Ver detalhes da habilidade">
                  <Eye size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MyAreaTrilhas = () => (
  <div className="space-y-6">
    <div className="bg-white border flex flex-col text-left border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
       <div className="p-5 border-b border-gray-100 flex items-start gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Compass size={24} />
          </div>
          <div className="flex-grow w-full">
            <h3 className="text-lg font-bold text-gray-900">Liderança do Futuro</h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex-grow">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <span className="text-xs font-bold text-gray-700 w-8">20%</span>
            </div>
          </div>
       </div>
       <div className="p-5 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Próximo Passo</p>
            <p className="font-bold text-gray-800">Aula 4: Como dar feedbacks assertivos</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
             <Play size={16} fill="currentColor" /> Continuar Trilha
          </button>
       </div>
    </div>
  </div>
);

const MyAreaCertificados = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between hover:border-gray-300 transition h-48">
       <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center border border-amber-100">
             <Award size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">Comunicação Assertiva no Trabalho</h3>
            <p className="text-xs text-gray-500 mt-1">Concluído em: 10/03/2026</p>
          </div>
       </div>
       <button className="w-full mt-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg py-2.5 font-medium transition flex justify-center items-center gap-2">
          <Download size={18} /> Baixar PDF
       </button>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between hover:border-gray-300 transition h-48">
       <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center border border-amber-100">
             <Award size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">Gestão de Equipes Híbridas</h3>
            <p className="text-xs text-gray-500 mt-1">Concluído em: 22/02/2026</p>
          </div>
       </div>
       <button className="w-full mt-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg py-2.5 font-medium transition flex justify-center items-center gap-2">
          <Download size={18} /> Baixar PDF
       </button>
    </div>
  </div>
);

const MyAreaCalendario = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
      Hoje <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">Urgente</span>
    </h3>
    <div className="space-y-4 mb-8">
      <div className="flex gap-4 items-start relative pb-4">
         <div className="absolute top-8 bottom-0 left-[11px] w-px bg-gray-200"></div>
         <div className="w-6 h-6 rounded-full bg-red-100 border-2 border-red-500 z-10 flex-shrink-0"></div>
         <div>
            <span className="text-sm font-bold text-gray-900">14:00</span>
            <p className="font-medium text-gray-800">Aula ao vivo: Liderança em Momentos Críticos</p>
         </div>
      </div>
      <div className="flex gap-4 items-start relative pb-4">
         <div className="w-6 h-6 rounded-full bg-red-100 border-2 border-red-500 z-10 flex-shrink-0"></div>
         <div>
            <span className="text-sm font-bold text-gray-900">16:30</span>
            <p className="font-medium text-gray-800">Prazo final: Entrega do trabalho Módulo 2</p>
         </div>
      </div>
    </div>
    
    <h3 className="text-lg font-bold text-gray-900 mb-6 border-t border-gray-100 pt-6">
      Próximos Dias
    </h3>
    <div className="space-y-4">
      <div className="flex gap-4 items-start relative pb-4">
         <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-300 z-10 flex-shrink-0"></div>
         <div>
            <span className="text-sm font-bold text-gray-600">Terça, 25/04</span>
            <p className="text-gray-800">Nova trilha disponível: Comunicação Avançada</p>
         </div>
      </div>
    </div>
  </div>
);

const MyAreaView = () => {
  const tabs = ['Meus Treinamentos', 'Minhas Trilhas', 'Minhas Habilidades', 'Meus Certificados', 'Meu Calendário', 'Minhas Compras'];
  const [activeSubTab, setActiveSubTab] = useState('Meus Treinamentos');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-12">
      {/* Welcome & Rescue Hero */}
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 tracking-tight">
          Olá, Caio!
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 mb-8 mt-2 pb-[1px]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-6 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-[3px] ${
              activeSubTab === tab 
                ? 'border-[#F58220] text-[#F58220]' 
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Content area */}
      <div className="min-h-[400px]">
        {activeSubTab === 'Meus Treinamentos' && <MyAreaTreinamentos />}
        {activeSubTab === 'Minhas Trilhas' && <MyAreaTrilhas />}
        {activeSubTab === 'Minhas Habilidades' && <MyAreaHabilidades />}
        {activeSubTab === 'Meus Certificados' && <MyAreaCertificados />}
        {activeSubTab === 'Meu Calendário' && <MyAreaCalendario />}
        {activeSubTab === 'Minhas Compras' && (
          <div className="text-center py-20 text-gray-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="font-medium text-gray-600">Nenhuma compra recente.</p>
            <p className="text-sm mt-1">Quando você realizar uma compra ou upgrade, ela aparecerá aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Hero = ({ layoutVersion = 1 }: { layoutVersion?: number }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (layoutVersion === 2) {
    return (
      <div className="bg-white">
        {/* Full width banner */}
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gray-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img 
                src={BANNERS[currentBanner].url} 
                alt="Banner" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/40 to-transparent"></div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentBanner === i ? 'w-8 bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Blue Bar */}
        <div className="w-full h-4 bg-[#4299e1]"></div>

        {/* Search Section */}
        <div className="w-full bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl font-display font-medium text-gray-800">
                Encontre seu conteúdo
              </h1>
              <p className="mt-3 text-[15px] text-gray-500 max-w-3xl leading-relaxed">
                Procure por conhecimento feito para te ajudar na sua área ou na sua carreira. 
                Você pode aprender escolhendo um treinamento, uma trilha, documento, evento gravado ou vídeo.
              </p>
              
              <div className="mt-6 relative max-w-full">
                <input 
                  type="text" 
                  placeholder="Procure por treinamento, trilha, documento, evento gravado ou vídeo" 
                  className="w-full pl-10 pr-24 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 text-sm"
                />
                <Search className="absolute left-3.5 top-4 h-4 w-4 text-gray-400" />
                <button className="absolute right-2 top-2 bottom-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-8 rounded-lg font-medium transition-colors text-sm">
                  Buscar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const slides = [
    {
      id: 'slide-1',
      badge: 'Plataforma Lector • Educação Corporativa',
      title: (
        <>
          Diagnóstico do<br />
          ambiente de trabalho<br />
          <span className="text-gradient-orange">que transforma resultados.</span>
        </>
      ),
      description:
        'Desenvolva habilidades práticas e certificações alinhadas às necessidades da empresa. Um único ecossistema para conteúdo, trilhas e evolução contínua.',
      card: (
        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] glass-dark">
          <img
            src={heroYoungProfessional}
            alt="Profissional jovem"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent pointer-events-none" />
        </div>
      ),
    },
    {
      id: 'slide-2',
      badge: 'Novidade • Avaliação Copsoq',
      title: (
        <>
          Avaliação <span className="text-gradient-orange">Copsoq</span><br />
          já disponível
        </>
      ),
      description:
        'Mensure os fatores psicossociais do ambiente de trabalho com o instrumento Copsoq e gere planos de ação baseados em evidências.',
      card: (
        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] p-6 flex flex-col justify-between"
             style={{ background: 'linear-gradient(135deg, #08204D 0%, #0F2D6B 60%, #FF7A1A 140%)' }}>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[10px] font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              DISPONÍVEL AGORA
            </span>
            <Shield className="w-5 h-5 text-white/70" />
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">Avaliação</p>
            <h3 className="mt-2 text-3xl font-display font-bold text-white leading-tight">
              Copsoq
            </h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Riscos psicossociais, clima e bem-estar em uma única jornada de aplicação.
            </p>
            <button className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-semibold">
              Iniciar avaliação <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
    },
  ];

  const slide = slides[currentBanner % slides.length];

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Orbital decorative pattern */}
      <div className="absolute inset-0 orbit-pattern opacity-60 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 65%)' }} />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(255,122,26,0.10) 0%, transparent 65%)' }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium tracking-wide backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                {slide.badge}
              </span>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-[1.05] tracking-tight">
                {slide.title}
              </h1>

              <p className="mt-5 text-base lg:text-lg text-white/70 leading-relaxed max-w-xl">
                {slide.description}
              </p>
            </div>

            {/* Right: card */}
            <div className="lg:col-span-5 max-w-sm w-full mx-auto lg:max-w-none">
              {slide.card}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentBanner % slides.length === i ? 'w-8 bg-orange-500' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade transition into content section */}
      <div className="h-8 bg-gradient-to-b from-transparent to-[#F7F9FC]" />
    </div>
  );
};

const HeroV2 = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white flex flex-col">
      {/* Full width banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img 
              src={BANNERS[currentBanner].url} 
              alt="Banner" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentBanner === i ? 'w-8 bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Blue Bar */}
      <div className="w-full h-4 bg-[#4A90E2]"></div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-gray-800">
            Encontre seu conteúdo
          </h1>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Procure por conhecimento feito para te ajudar na sua área ou na sua carreira. Você pode aprender escolhendo um treinamento, uma trilha, documento, evento gravado ou vídeo.
          </p>
          
          <div className="mt-8 relative w-full">
            <input 
              type="text" 
              placeholder="Procure por treinamento, trilha, documento, evento gravado ou vídeo" 
              className="w-full pl-12 pr-32 py-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 text-sm"
            />
            <Search className="absolute left-4 top-[18px] h-5 w-5 text-gray-400" />
            <button className="absolute right-2 top-2 bottom-2 bg-[#F58220] hover:bg-[#E07010] text-white px-8 rounded-lg font-medium transition-colors">
              Buscar
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const HeroV3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-brand-primary/[0.03] rounded-3xl overflow-hidden relative border border-brand-primary/10">
        {/* Decorative background dots/pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-brand-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute left-0 top-0 w-24 h-full opacity-20" 
               style={{ backgroundImage: 'radial-gradient(var(--color-brand-primary) 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}>
          </div>
        </div>

        <div className="px-8 md:px-16 py-12 md:py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="py-4"
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
                Diagnóstico do ambiente<br />de trabalho
              </h1>
              <p className="mt-6 text-base text-gray-500 leading-relaxed max-w-lg">
                Estamos realizando uma avaliação para entender melhor as condições de trabalho e melhorar o ambiente da empresa
              </p>
              
              <ul className="mt-6 space-y-3">
                {[
                  "Suas respostas são anônimas",
                  "Os resultados serão analisados coletivamente",
                  "Tempo estimado entre 8-15 minutos"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right Column: Assessment Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="bg-white rounded-xl py-12 px-6 shadow-xl shadow-brand-primary/5 w-[260px] min-h-[340px] border border-gray-100 flex flex-col items-center text-center justify-between">
                <div className="w-full flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center">
                      <div className="relative">
                        <Shield className="w-16 h-16 text-brand-primary" strokeWidth={1.5} />
                        <div className="absolute inset-0 flex items-center justify-center pt-1">
                          <Lightbulb className="w-6 h-6 text-brand-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-base font-bold text-gray-800 mb-2 px-2 leading-snug">
                    Avaliação COPSOG II - Abril/2026
                  </h2>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-brand-primary hover:opacity-90 text-white text-sm font-bold py-3.5 rounded-xl shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  Iniciar avaliação
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/30 backdrop-blur-[2px]"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              className="relative bg-white rounded-[32px] w-full max-w-[420px] shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-gray-50">
                <h3 className="text-xl font-bold text-[#003B71] text-left">Avaliação NR-1</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                <p className="text-gray-600 text-sm font-medium mb-6 text-left">
                  Para prosseguir você precisa aceitar nossos termos:
                </p>

                <div 
                  className="flex items-center gap-3 mb-8 cursor-pointer group"
                  onClick={() => setTermsAccepted(!termsAccepted)}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 border ${
                    termsAccepted ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-300 group-hover:border-brand-primary'
                  }`}>
                    {termsAccepted && <Check className="w-3.5 h-3.5 text-brand-primary" strokeWidth={3} />}
                  </div>
                  <span className="text-gray-700 text-sm font-medium">Li e aceito os termos de uso</span>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    disabled={!termsAccepted}
                    className={`flex-1 text-sm font-bold py-4 rounded-full transition-all duration-300 shadow-lg ${
                      termsAccepted 
                        ? 'bg-brand-primary text-white hover:opacity-95 shadow-brand-primary/20 hover:scale-[1.02] active:scale-95' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Confirmar
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-[#F0F0F0] text-gray-600 text-sm font-bold py-4 rounded-full hover:bg-gray-200 transition-all duration-300 active:scale-95"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tooltip = ({ content, children, direction = "bottom" }: { content: string, children: React.ReactNode, direction?: "top" | "bottom" | "left" | "right" }) => {
  return (
    <div className="group/tooltip relative flex items-center justify-center">
      {children}
      <div className={`absolute scale-95 group-hover/tooltip:scale-100 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 pointer-events-none z-[100] whitespace-nowrap bg-gray-900 text-white text-[11px] font-bold tracking-wide py-1.5 px-2.5 rounded shadow-lg ${
        direction === "bottom" ? "top-full mt-2 left-1/2 -translate-x-1/2" :
        direction === "top" ? "bottom-full mb-2 left-1/2 -translate-x-1/2" :
        direction === "left" ? "right-full mr-2 top-1/2 -translate-y-1/2" :
        "left-full ml-2 top-1/2 -translate-y-1/2"
      }`}>
        {content}
      </div>
    </div>
  );
};

const ContentCard: React.FC<{ item: ContentItem, variant?: string }> = ({ item, variant = 'simples-1' }) => {
  const category = variant.split('-')[0]; // 'simples', 'completo', 'avancado'
  const subVariant = variant.split('-')[1]; // '1', '2', '3', '4', '5', '6', '7'
  
  const isSimples = category === 'simples';
  const isCompleto = category === 'completo';
  const isAvancado = category === 'avancado';

  const navigate = useNavigate();
  const handleOpen = () => {
    if (item.type === 'TRAIL') {
      navigate({ to: '/trilha/$id', params: { id: item.id } });
      return;
    }

    navigate({ to: '/treinamento/$id', params: { id: item.id } });
  };

  // --- Avançado 7 (Poster) Edge Case ---
  if (isAvancado && subVariant === '7') {
    return (
      <div className="group/card flex-shrink-0 w-[280px] h-[340px] relative rounded-2xl border border-slate-200/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
           style={{ boxShadow: 'var(--shadow-subtle)' }}
           onClick={handleOpen}
           onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-hover)')}
           onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-subtle)')}>
        <div className="absolute inset-0 bg-[#08204D]">
          <img
            src={item.thumb}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#041433] via-[#041433]/70 to-transparent"></div>
        <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-white bg-orange-500 px-2.5 py-1 rounded-full">
          Pôster
        </span>
        <div className="absolute bottom-0 w-full p-5 flex flex-col gap-1.5">
          <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight" title={item.title}>{item.title}</h3>
          <p className="text-[12px] text-white/70">por {item.authors}</p>
          <div className="text-orange-400 font-semibold mt-2 text-right">{item.price}</div>
        </div>
      </div>
    );
  }

  const hasBars = (isSimples && subVariant === '3') || (isCompleto && subVariant === '3') || (isAvancado && ['1', '2', '3'].includes(subVariant));
  const hasCircular = (isSimples && subVariant === '4') || (isCompleto && subVariant === '4') || (isAvancado && subVariant === '4');

  return (
    <div
      className="group/card flex-shrink-0 w-[280px] h-full bg-white rounded-2xl border border-slate-200/60 overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: 'var(--shadow-subtle)' }}
      onClick={handleOpen}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-subtle)')}
    >

      {/* Cover Image (Completo/Avançado) */}
      {(isCompleto || isAvancado) && (
        <div className="relative h-36 bg-[#08204D] flex-shrink-0 overflow-hidden">
          <img
            src={item.thumb}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041433]/40 to-transparent" />
        </div>
      )}

      {/* Body Container */}
      <div className="flex flex-col flex-grow p-4">

        {/* Header specifically for Simples */}
        {isSimples && (
          <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                 style={{ background: 'linear-gradient(135deg, #08204D 0%, #0F2D6B 100%)' }}>
              <Code size={16} />
            </div>
            <span className="text-[10px] font-semibold text-[#08204D] bg-blue-50 border border-blue-100 px-2 py-1 rounded-full flex items-center gap-1">
              <BookOpen size={10} /> {item.type === 'TRAIL' ? 'Trilha' : 'Treinamentos'}
            </span>
          </div>
        )}

        <div className="flex-grow flex flex-col" title={item.title}>
          <h3 className="text-[15px] font-semibold text-[#041433] line-clamp-2 leading-snug group-hover/card:text-orange-600 transition-colors">{item.title}</h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-none flex-shrink-0">por {item.authors}</p>

          {/* Description (Advanced 1, 4, 5, 6) */}
          {isAvancado && ['1', '4', '5', '6'].includes(subVariant) && (
            <p className="text-[12px] text-slate-600 line-clamp-3 leading-snug mt-3 flex-shrink-0" title={item.description}>
              {item.description}
            </p>
          )}

          <div className="mt-auto pt-3 flex justify-between items-end">
            <div className="flex flex-col gap-1.5 items-start">

              {/* Duration */}
              {(((isSimples || isCompleto) && subVariant === '2') || (isAvancado && ['1','2','4','5','6'].includes(subVariant))) && (
                <div className="flex items-center text-[11px] text-slate-500 gap-1 font-medium">
                  <Clock size={12} /> {item.duration}
                </div>
              )}

              {/* Badges */}
              {((isCompleto && ['1', '3'].includes(subVariant)) || (isAvancado && ['1', '2', '4', '5', '6'].includes(subVariant))) && (
                <span className="text-[10px] font-semibold text-[#08204D] bg-blue-50 border border-blue-100 px-2 py-1 rounded-full flex items-center gap-1 mt-0.5">
                  <BookOpen size={10} /> {item.type === 'TRAIL' ? 'Trilha' : 'Treinamentos'}
                </span>
              )}

              {/* Price */}
              {isAvancado && ['1', '2', '3', '4', '5'].includes(subVariant) && (
                <div className="text-sm font-bold text-orange-600 mt-0.5">
                  {item.price}
                </div>
              )}
            </div>

            {/* Right side elements */}
            <div className="flex flex-col items-end gap-1.5">
              {hasCircular && (
                <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-orange-500" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${item.progress}, 100`} stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute text-[9px] font-bold text-orange-600">{item.progress}%</span>
                </div>
              )}

              {(isSimples || isCompleto) && subVariant === '5' && (
                <div className="text-sm font-bold text-orange-600">
                  {item.price}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer for Bars */}
        {hasBars && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex-shrink-0">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                <span>Progresso</span>
                <span className="font-bold text-[#041433]">{item.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${item.progress}%`, background: 'var(--gradient-orange)' }}></div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium mt-1">
                <span>Aproveitamento</span>
                <span className="font-bold text-[#041433]">{item.grade}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#2563EB] h-1.5 rounded-full transition-all duration-500" style={{ width: `${item.grade}%` }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SocialSidebar = ({ onSeeAll }: { onSeeAll: () => void }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-brand-secondary">Social</h2>
        <button 
          onClick={onSeeAll}
          className="text-xs font-medium text-brand-primary hover:text-brand-secondary transition-colors border border-brand-primary/20 hover:bg-brand-primary/5 px-3 py-1.5 rounded-lg"
        >
          Exibir todos os posts
        </button>
      </div>
      
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="text-[11px] text-gray-500 mb-3">
              09/09/2025 às 15:08:27
            </div>
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <img src={`https://picsum.photos/seed/post${i}/400/225`} alt="Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">
              Conheça nossos cursos para Mercado!
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Clique aqui e aproveite!
            </p>
            
            <div className="flex items-center gap-2 mb-4 text-xs text-brand-primary font-medium">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3 fill-brand-primary" /> 6
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-brand-primary transition-colors">
                <ThumbsUp className="h-4 w-4" /> Curtir
              </button>
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-brand-primary transition-colors">
                <MessageSquare className="h-4 w-4" /> Comentar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContentSection: React.FC<{ section: Section }> = ({ section }) => {
  const [expanded, setExpanded] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${section.id}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 border-b border-slate-200/70 last:border-0">
      <div className="flex justify-between items-end mb-7">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500">
            Vitrine Lector
          </span>
          <h2 className="mt-1.5 text-2xl md:text-[28px] font-display font-semibold text-[#041433] tracking-tight leading-tight">
            {section.title}
          </h2>
          <div className="mt-3 h-[3px] w-14 rounded-full" style={{ background: 'var(--gradient-orange)' }} />
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-sm font-semibold text-[#08204D] hover:text-orange-600 transition-colors flex items-center gap-1 group"
        >
          {expanded ? 'Recolher' : 'Ver tudo'}
          <ChevronRight
            className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : 'group-hover:translate-x-1'}`}
          />
        </button>
      </div>

      {expanded ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch"
        >
          {section.items.map((item) => (
            <div key={item.id} className="flex items-stretch">
              <ContentCard item={item} variant={section.variant} />
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="relative group">
          <div
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-6 w-16 bg-gradient-to-r from-[#041433]/40 to-transparent z-10 flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-l-2xl"
          >
            <ChevronLeft className="text-white ml-2" strokeWidth={3} size={28} />
          </div>

          <div
            id={`scroll-${section.id}`}
            className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory pr-[20vw] sm:pr-[10vw] items-stretch"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {section.items.map((item) => (
              <div key={item.id} className="snap-start shrink-0 flex items-stretch">
                <ContentCard item={item} variant={section.variant} />
              </div>
            ))}
          </div>

          <div
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-[#041433]/40 to-transparent z-10 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-r-2xl"
          >
            <ChevronRight className="text-white mr-2" strokeWidth={3} size={28} />
          </div>
        </div>
      )}
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="text-white pt-20 pb-10 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #041433 0%, #08204D 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-secondary font-bold text-xl">L</div>
              <span className="font-display font-bold text-xl tracking-wider">LECTOR</span>
            </div>
            <p className="mt-6 text-gray-400 text-sm leading-relaxed">
              Transformando o aprendizado através da tecnologia e inovação. 
              Sua plataforma completa de desenvolvimento profissional.
            </p>
            <div className="mt-8 flex gap-4">
              {['youtube', 'twitter', 'facebook', 'instagram'].map((social) => (
                <button key={social} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors group">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-gray-400 group-hover:bg-white transition-colors rounded-sm"></div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Trabalhe aqui</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fale Conosco</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quem somos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Aviso de privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Fique por dentro das novidades.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-white/5 border-transparent focus:ring-1 focus:ring-white/20 rounded-lg px-4 py-2 text-sm w-full"
              />
              <button className="bg-brand-primary hover:bg-brand-primary/80 px-4 py-2 rounded-lg transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <p>© Lector Tecnologia, 2006 - 2025. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
              <Globe className="h-3 w-3" />
              Português (Brasil)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const THEMES = [
  { id: 'blue', primary: '#324F7F', secondary: '#062365', accent: '#3b82f6' },
  { id: 'green', primary: '#8dc63f', secondary: '#5c8a22', accent: '#a3e635' },
  { id: 'red', primary: '#b91c1c', secondary: '#7f1d1d', accent: '#ef4444' },
  { id: 'pink', primary: '#db2777', secondary: '#9d174d', accent: '#f472b6' },
  { id: 'orange', primary: '#ea580c', secondary: '#9a3412', accent: '#fb923c' },
];

const DesignSystemView = () => {
  const mockItem: ContentItem = {
    id: 'ds-1', title: 'Design Estratégico e Inovação', description: 'Entenda como os princípios de design podem moldar o sucesso e as inovações dentro de um ambiente corporativo focado em pessoas.',
    authors: 'Prof. Lector', duration: '08h30m', price: 'R$ 149,00', progress: 65, grade: 90, type: 'COURSE', thumb: ''
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
      <div className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4 tracking-tight flex items-center gap-3">
          <Palette className="text-brand-primary" size={36}/> Lector Design System
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl">A fonte da verdade viva da nossa arquitetura visual. Documentação interativa dos componentes, tipografia e engrenagens de UX.</p>
      </div>
      
      <div className="space-y-24">
        {/* A. IDENTIDADE E FUNDAMENTOS */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
              <Palette size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">A. Identidade & Cores</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
               <div className="h-24 rounded-lg bg-brand-primary mb-3 shadow-inner"></div>
               <p className="font-bold text-gray-900">Brand Primary</p>
               <p className="text-xs text-gray-500 font-mono">var(--theme-primary)</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
               <div className="h-24 rounded-lg bg-brand-secondary mb-3 shadow-inner"></div>
               <p className="font-bold text-gray-900">Brand Secondary</p>
               <p className="text-xs text-gray-500 font-mono">var(--theme-secondary)</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
               <div className="h-24 rounded-lg bg-brand-accent mb-3 shadow-inner"></div>
               <p className="font-bold text-gray-900">Brand Accent</p>
               <p className="text-xs text-gray-500 font-mono">var(--theme-accent)</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
               <div className="h-24 rounded-lg bg-gray-50 mb-3 shadow-inner border border-gray-200"></div>
               <p className="font-bold text-gray-900">Surface Gray</p>
               <p className="text-xs text-gray-500 font-mono">bg-gray-50</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-wrap">
             <div className="border border-green-200 bg-green-50 rounded-xl p-5">
               <h4 className="font-bold text-green-800 mb-1 flex items-center gap-2"><CheckCircle size={16}/> Sucesso & Conclusão</h4>
               <p className="text-sm text-green-700">Usado para exibir itens completados, aprovação ou "Em andamento" saudável.</p>
             </div>
             <div className="border border-amber-200 bg-amber-50 rounded-xl p-5">
               <h4 className="font-bold text-amber-800 mb-1 flex items-center gap-2"><AlertCircle size={16}/> Atenção & Pendências</h4>
               <p className="text-sm text-amber-700">Usado para fluxos que aguardam interação, aprovações pendentes ou notificações ausentes.</p>
             </div>
             <div className="border border-red-200 bg-red-50 rounded-xl p-5">
               <h4 className="font-bold text-red-800 mb-1 flex items-center gap-2"><AlertCircle size={16}/> Urgência & Prazos</h4>
               <p className="text-sm text-red-700">Restrito exclusivamente ao "Hoje" no calendário e vencimentos muito curtos.</p>
             </div>
          </div>
        </section>

        {/* B. ATOMIC UI */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
              <Component size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">B. Elementos Core (Atomic UI)</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="font-bold text-gray-700 uppercase tracking-widest text-xs">Botões & Ações</h3>
              <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">Primário de Conversão</span>
                  <button className="bg-brand-primary hover:opacity-90 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <Play size={16} fill="currentColor" /> Retomar Treinamento
                  </button>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500 font-medium">Secundário Outline</span>
                  <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-xl font-medium transition-colors">
                    Começar Agora
                  </button>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500 font-medium">Pill de Filtro (Ativo)</span>
                  <button className="bg-brand-primary text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
                    <span className="mr-2">✓</span> Analista JR
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-gray-700 uppercase tracking-widest text-xs">Indicadores Visuais</h3>
              <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-5">
                <div className="space-y-2">
                  <span className="text-sm text-gray-500 font-medium">Barra Linear Clássica (70%)</span>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex items-center">
                    <div className="h-full bg-brand-primary rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-5">
                  <span className="text-sm text-gray-500 font-medium mb-2 block">Leveling de Habilidades (4 de 5)</span>
                  <div className="flex gap-1 h-3">
                    <div className="flex-1 bg-purple-600 rounded-l-full"></div>
                    <div className="flex-1 bg-purple-600"></div>
                    <div className="flex-1 bg-purple-600"></div>
                    <div className="flex-1 bg-purple-600"></div>
                    <div className="flex-1 bg-gray-100 rounded-r-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm text-gray-500 font-medium">Progresso Circular SVG</span>
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-brand-primary" strokeWidth="4" strokeDasharray="65, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-900">65%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* C. ENGENHARIA DA VITRINE */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
              <LayoutTemplate size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">C. Engenharia da Vitrine (Cards)</h2>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 lg:p-10 mb-6">
            <p className="text-gray-600 mb-8 max-w-4xl">
              Nossa vitrine principal utiliza uma função modular unificada (<code className="text-brand-primary font-mono bg-white px-2 py-1 rounded border border-gray-200">ContentCard</code>). Ela intercepta a variante (ex: <code className="text-brand-primary font-mono">avancado-1</code>) e reconstrói o layout interno dinamicamente. O uso estrito de <code className="bg-gray-200 px-1 rounded font-mono">h-full</code> e <code className="bg-gray-200 px-1 rounded font-mono">items-stretch</code> garante alinhamento horizontal perfeito.
            </p>

            <div className="flex overflow-x-auto gap-6 pb-6 items-stretch w-full scrollbar-hide snap-x">
              <div className="flex flex-col gap-2 shrink-0 snap-center">
                 <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Code size={12}/> Simples 3</span>
                 <div className="pointer-events-none"><ContentCard item={mockItem} variant="simples-3" /></div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 snap-center">
                 <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Code size={12}/> Completo 5</span>
                 <div className="pointer-events-none"><ContentCard item={mockItem} variant="completo-5" /></div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 snap-center">
                 <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Code size={12}/> Avançado 1</span>
                 <div className="pointer-events-none"><ContentCard item={mockItem} variant="avancado-1" /></div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 snap-center">
                 <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Code size={12}/> Pôster</span>
                 <div className="pointer-events-none"><ContentCard item={mockItem} variant="avancado-7" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* D. PADRÕES DE COMPORTAMENTO */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
              <MousePointer2 size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">D. UX e Comportamento ("A Alma")</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-md transition">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex justify-center items-center mb-3">
                    <Type size={24}/>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">Truncamento & Hint Nativo</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Evitamos modais intrusivos para leitura de texto longo. Se um título ou descrição estourar nossa trava de 2 ou 3 linhas (<code className="text-blue-500 font-mono">line-clamp-3</code>), injetamos automaticamente o conteúdo total na prop <code className="text-blue-500 font-mono">title=""</code>.
                </p>
                <div className="bg-gray-50 p-4 rounded border border-gray-100 text-xs text-gray-500 italic">
                  Passe o mouse por 1 segundo nas descrições longas dos cards acima para ver o texto original transbordar no hint do navegador.
                </div>
             </div>

             <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-md transition">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex justify-center items-center mb-3">
                    <Layers size={24}/>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">Overlays e Gradientes Seguros</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Textos legíveis sobre banners (como no Card Pôster ou Hero) dependem da técnica do Gradiente Base. Injetamos sempre <code className="text-orange-500 font-mono">bg-gradient-to-t</code> escurecido (do gray-900 ao transparent) para resguardo em qualquer capa.
                </p>
             </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const CardBuilderView = () => {
  const [config, setConfig] = useState({
    showImage: false,
    showDescription: true,
    showDuration: true,
    showAuthor: true,
    showValue: false,
    showProgress: true,
    showScore: true,
  });

  const [descriptionTitle, setDescriptionTitle] = useState('Somente teste');

  const toggleConfig = (key: keyof typeof config) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const CheckboxRow = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div className="flex items-center gap-3 py-2 cursor-pointer" onClick={onChange}>
      <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${checked ? 'bg-[#00D09C] border-[#00D09C]' : 'border-2 border-gray-200 bg-white'}`}>
        {checked && <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
      </div>
      <span className="text-gray-600 text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative">
      
      {/* Top Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 border-2 border-gray-200 rounded-sm bg-gray-50"></div>
          <span className="text-[#1E3A8A] font-bold text-sm tracking-wide">DESCRIÇÃO</span>
        </div>
        <input 
          type="text" 
          value={descriptionTitle}
          onChange={(e) => setDescriptionTitle(e.target.value)}
          placeholder="Somente teste" 
          className="w-full bg-[#E5E5E5] text-gray-500 rounded-lg px-4 py-3 text-sm border-none focus:ring-2 focus:ring-[#1E3A8A]/20"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left: Card Preview */}
        <div className="w-full md:w-[350px] shrink-0">
          <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
            
            <AnimatePresence>
              {config.showImage && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 200, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-50 flex items-center justify-center border-b border-gray-100 overflow-hidden"
                >
                  <Presentation className="w-32 h-32 text-gray-400 stroke-1" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-6 flex flex-col gap-4">
              
              {!config.showImage && (
                <div className="h-40 flex items-center justify-center pb-4">
                   <Presentation className="w-32 h-32 text-gray-700 stroke-1" />
                </div>
              )}

              <div>
                <h3 className="text-xl text-gray-800 font-medium leading-tight text-left">
                  Lorem ipsum dolor sit amet...
                </h3>
                <AnimatePresence>
                  {config.showAuthor && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <p className="text-xs text-gray-500 mt-1 text-left">por John Doe</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {config.showDescription && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <p className="text-sm text-gray-600 leading-snug text-left">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis cumque inventore doloremque sit labore incidu...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {config.showDuration && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>32h00m</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                <Presentation className="w-3.5 h-3.5" />
                Treinamentos
              </div>

              <AnimatePresence>
                {config.showValue && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                     <div className="text-xl font-medium text-gray-800 text-left pt-2">
                       R$20,00
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {(config.showProgress || config.showScore) && (
                <div className="pt-4 border-t border-gray-200 mt-1 flex flex-col gap-3">
                  <AnimatePresence>
                    {config.showProgress && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center justify-between">
                        <div className="flex-grow">
                          <div className="text-sm text-gray-600 font-medium mb-1">Progresso</div>
                          <div className="h-1 bg-gray-200 w-full rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[70%]"></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-800 ml-4 mt-5">70%</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {config.showScore && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center justify-between">
                        <div className="flex-grow">
                          <div className="text-sm text-gray-600 font-medium mb-1">Aproveitamento</div>
                          <div className="h-1 bg-gray-200 w-full rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[50%]"></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-800 ml-4 mt-5">50%</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex-grow md:pl-10 relative">
          {/* Subtle separator line on desktop */}
          <div className="hidden md:block absolute left-0 top-0 w-px h-full bg-gray-200"></div>

          <h2 className="text-[#1E3A8A] font-bold text-sm tracking-wide mb-6">COMPONENTES DO CARD</h2>
          
          <div className="flex flex-col gap-2">
            <CheckboxRow label="Apresentar imagem do card" checked={config.showImage} onChange={() => toggleConfig('showImage')} />
            <CheckboxRow label="Apresentar Descrição" checked={config.showDescription} onChange={() => toggleConfig('showDescription')} />
            <CheckboxRow label="Apresentar Carga Horária" checked={config.showDuration} onChange={() => toggleConfig('showDuration')} />
            <CheckboxRow label="Apresentar Autor" checked={config.showAuthor} onChange={() => toggleConfig('showAuthor')} />
            <CheckboxRow label="Apresentar Valor no card" checked={config.showValue} onChange={() => toggleConfig('showValue')} />
            <CheckboxRow label="Apresentar progresso" checked={config.showProgress} onChange={() => toggleConfig('showProgress')} />
            <CheckboxRow label="Apresentar Aproveitamento" checked={config.showScore} onChange={() => toggleConfig('showScore')} />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-12 flex items-center gap-0 border border-gray-300 rounded-lg bg-[#FAF7F2] p-1 shadow-sm max-w-3xl">
        <div className="flex items-center bg-white border border-gray-200 rounded-md">
          <div className="px-4 py-2 text-sm text-gray-600 border-r border-gray-200 font-medium">Trilha</div>
          <button className="px-3 py-2 text-gray-400 hover:text-gray-600">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <input 
          type="text" 
          placeholder="Escolha uma trilha" 
          className="flex-grow bg-transparent px-4 py-2 text-sm text-gray-500 outline-none placeholder:text-gray-400"
        />
      </div>

    </div>
  );
};

const ThemeSwitcher = ({    
  showSocial, 
  onToggleSocial,
  layoutVersion,
  onToggleLayout,
  activeTab,
  setActiveTab
}: { 
  showSocial: boolean, 
  onToggleSocial: () => void,
  layoutVersion: number,
  onToggleLayout: (version: number) => void,
  activeTab: string,
  setActiveTab: (tab: string) => void
}) => {
  const [activeTheme, setActiveTheme] = useState('blue');

  const applyTheme = (theme: typeof THEMES[0]) => {
    setActiveTheme(theme.id);
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    document.documentElement.style.setProperty('--theme-accent', theme.accent);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 bg-white p-3 rounded-full shadow-2xl border border-gray-100 flex items-center gap-3 z-50"
    >
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          onClick={() => applyTheme(theme)}
          className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
            activeTheme === theme.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
          }`}
          style={{ backgroundColor: theme.primary }}
          aria-label={`Mudar para tema ${theme.id}`}
        />
      ))}
      
      <div className="w-px h-5 bg-gray-200 mx-1" />
      
      <button
        onClick={() => { onToggleLayout(1); setActiveTab('Conteúdo'); }}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
          layoutVersion === 1 && activeTab !== 'Design System'
            ? 'border-brand-primary text-brand-primary bg-brand-primary/10' 
            : 'border-gray-300 text-gray-400 hover:border-gray-400'
        }`}
        title="Layout Vitrine 1"
      >
        1
      </button>

      <button
        onClick={() => { onToggleLayout(2); setActiveTab('Conteúdo'); }}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
          layoutVersion === 2 && activeTab !== 'Design System'
            ? 'border-brand-primary text-brand-primary bg-brand-primary/10' 
            : 'border-gray-300 text-gray-400 hover:border-gray-400'
        }`}
        title="Layout Vitrine 2"
      >
        2
      </button>

      <button
        onClick={() => setActiveTab('Design System')}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
          activeTab === 'Design System'
            ? 'border-brand-primary text-brand-primary bg-brand-primary/10' 
            : 'border-gray-300 text-gray-400 hover:border-gray-400'
        }`}
        title="Tela 3: Design System Docs"
      >
        3
      </button>

      <button
        onClick={() => setActiveTab('Construtor de Cards')}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
          activeTab === 'Construtor de Cards'
            ? 'border-brand-primary text-brand-primary bg-brand-primary/10' 
            : 'border-gray-300 text-gray-400 hover:border-gray-400'
        }`}
        title="Tela 4: Construtor de Cards"
      >
        4
      </button>

      <button
        onClick={() => { onToggleLayout(3); setActiveTab('Conteúdo'); }}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
          layoutVersion === 3 && activeTab === 'Conteúdo'
            ? 'border-brand-primary text-brand-primary bg-brand-primary/10' 
            : 'border-gray-300 text-gray-400 hover:border-gray-400'
        }`}
        title="Layout Vitrine 3"
      >
        5
      </button>

      <div className="w-px h-5 bg-gray-200 mx-1" />
      
      <button
        onClick={onToggleSocial}
        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
        title={showSocial ? "Ocultar Posts" : "Exibir Posts"}
      >
        {showSocial ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
      </button>
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Conteúdo');
  const [showSocialSidebar] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'Conteúdo' && (
            <motion.div
              key="conteudo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <div className="bg-[#F7F9FC] py-12 border-t border-slate-200/70">
                <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                  <div className="flex-1 overflow-hidden">
                    {SECTIONS.filter((section) => section.variant === 'avancado-1').map((section) => (
                      <ContentSection key={section.id} section={section} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SocialView />
            </motion.div>
          )}

          {activeTab === 'Minha Área' && (
            <motion.div
              key="minha-area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MyAreaView />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
