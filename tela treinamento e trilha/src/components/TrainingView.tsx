import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ArrowLeft,
  FileText,
  BarChart3,
  BookOpen,
  Paperclip,
  User,
  Users,
  Info,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SidebarContentIndicator, ContentTypeLabel } from './SidebarContentIndicator';
import { PerformanceDashboard } from './PerformanceDashboard';
import { MaterialExplorer } from './MaterialExplorer';
import { TutorList } from './TutorList';

interface Lesson {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'locked';
  type: ContentTypeLabel;
  duration: string;
}

const lessons: Lesson[] = [
  { id: 1, title: 'Boas-vindas', status: 'completed', type: 'Vídeos', duration: '02:30' },
  { id: 2, title: 'Visão Geral', status: 'current', type: 'Vídeos', duration: '12:00' },
  { id: 3, title: 'Manual de Trilhas', status: 'locked', type: 'Documentos', duration: '15 min' },
  { id: 4, title: 'Treinamento de Fluxos', status: 'locked', type: 'Vídeos', duration: '45:00' },
  { id: 5, title: 'Criando Artigos', status: 'locked', type: 'Scorm', duration: '20:00' },
  { id: 6, title: 'Contrato Presencial', status: 'locked', type: 'Aula presencial', duration: '01:30h' },
  { id: 7, title: 'Avaliação de Desempenho', status: 'locked', type: 'Avaliação', duration: '30:00' },
  { id: 8, title: 'Gravação da Mentoria', status: 'locked', type: 'Vídeos', duration: '02:00h' },
];

const MiniCircularProgress = ({ percentage, label, color = "var(--brand-color)" }: { percentage: number, label: string, color?: string }) => {
  const size = 18;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  return (
    <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-brand/70">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-brand/10"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[7.5px] font-black uppercase">{label}</span>
        </div>
      </div>
      <span className="tabular-nums">{percentage}%</span>
    </div>
  );
};

export default function TrainingView() {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(2);
  const [activeTab, setActiveTab] = useState('descricao');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileFocusMode, setIsMobileFocusMode] = useState(false);
  const [lessonList, setLessonList] = useState(lessons);

  const handleToggleLesson = (id: number) => {
    setActiveLessonId(prev => prev === id ? null : id);
  };

  const handleToggleComplete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLessonList(prev => prev.map(lesson => {
      if (lesson.id === id) {
        const newStatus = lesson.status === 'completed' ? 'current' : 'completed';
        return { ...lesson, status: newStatus };
      }
      return lesson;
    }));
  };

  const activeLesson = lessonList.find(l => l.id === activeLessonId) || lessonList[0];

  const tabs = [
    { id: 'descricao', label: 'Descrição', icon: <Info size={14} /> },
    { id: 'desempenho', label: 'Desempenho', icon: <BarChart3 size={14} /> },
    { id: 'resumo', label: 'Resumo', icon: <BookOpen size={14} /> },
    { id: 'material', label: 'Material Complementar', icon: <Paperclip size={14} /> },
    { id: 'tutores', label: 'Tutores', icon: <Users size={14} /> },
    { id: 'autor', label: 'Autor', icon: <User size={14} /> },
  ];

  const renderLessonList = (isMobile = false) => (
    <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
      {lessonList.map((lesson) => {
        const isActive = lesson.id === activeLessonId;
        const isCompleted = lesson.status === 'completed';
        
        return (
          <div
            key={lesson.id}
            onClick={() => {
              handleToggleLesson(lesson.id);
              if (isMobile) {
                setTimeout(() => setIsMobileSidebarOpen(false), 300);
              }
            }}
            className={`w-full text-left p-4 border-b border-gray-100/50 transition-all relative group cursor-pointer ${
              isActive ? 'bg-brand/5' : isCompleted ? 'bg-green-50/50' : 'hover:bg-gray-100/50'
            }`}
          >
            {isActive && (
              <motion.div 
                layoutId={isMobile ? "activeLessonIndicatorMobile" : "activeLessonIndicator"}
                className="absolute left-0 top-0 bottom-0 w-1 bg-brand" 
              />
            )}
            
            <div className="flex items-start gap-3">
              <button 
                onClick={(e) => handleToggleComplete(e, lesson.id)}
                className={`mt-1 flex-none transition-all hover:scale-110 active:scale-90 cursor-pointer ${
                  isCompleted ? 'text-green-500' : isActive ? 'text-brand' : 'text-gray-400'
                }`}
                title="Marcar como visualizado"
              >
                {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              </button>
              
              <div className="flex-1 min-w-0 relative h-full flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className={`text-[11.5px] font-bold leading-tight break-words line-clamp-2 ${
                    isActive ? 'text-brand' : 'text-[#003366]'
                  }`}>
                    {lesson.title}
                  </h3>
                  <ChevronDown 
                    size={14} 
                    strokeWidth={3}
                    className={`flex-none mt-0.5 transition-transform duration-300 ${isActive ? 'rotate-180 text-brand' : 'text-gray-400'}`} 
                  />
                </div>

                <div className="flex items-end justify-between gap-2 mt-1">
                  <div className="flex items-center gap-1 opacity-60">
                    <SidebarContentIndicator type={lesson.type} />
                  </div>
                  
                  <span className={`text-[8.5px] font-black uppercase tracking-tight ${
                    isCompleted ? 'text-green-600' : 
                    isActive ? 'text-brand' : 
                    'text-gray-400'
                  }`}>
                    {isCompleted ? 'Concluído' : isActive ? 'Em andamento' : 'Não visualizado'}
                  </span>
                </div>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      key="progress-stats"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-4">
                        <MiniCircularProgress percentage={isCompleted ? 100 : 0} label="P" />
                        <MiniCircularProgress percentage={isCompleted ? 100 : 0} label="A" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex h-full bg-ice overflow-hidden font-sans relative">
      {/* Desktop Sidebar */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden lg:flex flex-none flex-col border-r border-gray-100 bg-gray-50/30 overflow-hidden"
          >
            {/* Sidebar Header */}
            <div className="p-5 bg-brand text-white relative border-b border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer text-white"
                >
                  <X size={18} />
                </button>
                <h2 className="text-[11.5px] font-bold uppercase tracking-tight">Configurando o seu Movidesk</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[9.5px] font-bold uppercase mb-1.5 text-white/70">
                    <span>Progresso</span>
                    <span className="text-white tracking-wider">21.43%</span>
                  </div>
                  <div className="h-1.5 bg-black/10 rounded-full overflow-hidden relative border border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]">
                    <div 
                      className="h-full bg-gradient-to-r from-white/90 via-white to-white/90 rounded-full transition-all duration-1000" 
                      style={{ width: '21.43%' }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-[9.5px] font-bold uppercase mb-1.5 text-white/70">
                    <span>Aproveitamento</span>
                    <span className="text-white tracking-wider">100%</span>
                  </div>
                  <div className="h-1.5 bg-black/10 rounded-full overflow-hidden relative border border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]">
                    <div 
                      className="h-full bg-gradient-to-r from-white/90 via-white to-white/90 rounded-full transition-all duration-1000" 
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson List */}
            {renderLessonList(false)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative bg-ice w-full lg:w-auto">
        {/* Mobile Fixed Top Header Area */}
        <div className="flex-none flex flex-col w-full lg:hidden bg-white shadow-sm z-20 relative">
          <AnimatePresence>
            {!isMobileFocusMode && (
              <motion.div 
                key="mobile-red-header"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-brand text-white flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 pt-12 pb-4 relative">
                  <button className="relative z-10 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors backdrop-blur-sm">
                    <LogOut size={18} className="rotate-180" />
                  </button>
                  <h2 className="absolute inset-x-0 bottom-6 text-[13px] font-black uppercase tracking-widest text-center px-16 truncate">
                    Configurando o seu Movidesk
                  </h2>
                  <button 
                    onClick={() => setIsMobileFocusMode(true)}
                    className="relative z-10 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="px-6 pb-6 space-y-4">
                  <div>
                    <div className="flex justify-between text-[9px] font-bold uppercase mb-1 text-white/80">
                      <span>Progresso</span>
                      <span className="text-white">21.43%</span>
                    </div>
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden relative">
                      <div className="h-full bg-white rounded-full" style={{ width: '21.43%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-[9px] font-bold uppercase mb-1 text-white/80">
                      <span>Aproveitamento</span>
                      <span className="text-white">100%</span>
                    </div>
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden relative">
                      <div className="h-full bg-white rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fixed Sticky Breadcrumbs Bar (Moves depending on Mode) */}
          <div className={`flex flex-col border-b border-gray-100 bg-white transition-all duration-300 ${isMobileFocusMode ? 'pt-12 pb-4 px-5 shadow-sm' : 'py-3 px-5'}`}>
            <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#7E92A2] flex items-center overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap">
              <span>Início</span>
              <span className="text-gray-200 mx-1.5">/</span>
              <span>Sala de Aula</span>
              <span className="text-gray-200 mx-1.5">/</span>
              <span>Liderança do Futuro</span>
              <span className="text-gray-200 mx-1.5">/</span>
              <span className="text-[#cc0000] truncate max-w-[150px]">Treinamento de Fluxos</span>
            </div>

            <AnimatePresence>
              {isMobileFocusMode && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="flex items-center gap-3 overflow-hidden"
                >
                  <button 
                    onClick={() => setIsMobileFocusMode(false)}
                    className="w-[42px] h-[42px] bg-white border border-gray-200 rounded-[14px] flex items-center justify-center text-[#7E92A2] shadow-sm cursor-pointer hover:bg-gray-50 transition-colors flex-shrink-0"
                  >
                    <Menu size={20} className="stroke-[2.5px]" />
                  </button>
                  <button 
                    className="w-[42px] h-[42px] bg-[#cc0000] text-white rounded-[14px] shadow-[0_4px_12px_rgba(204,0,0,0.3)] flex items-center justify-center cursor-pointer hover:bg-[#b30000] transition-colors flex-shrink-0"
                  >
                    <LogOut size={20} className="rotate-180 stroke-[2.5px]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Top Navigation Desktop */}
        <div className="hidden lg:flex px-8 py-4 items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm cursor-pointer"
                >
                  <Menu size={20} />
                </button>
                <button className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 cursor-pointer">
                  <ArrowLeft size={20} />
                </button>
              </div>
            )}
            
            {isSidebarOpen && (
              <button className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 cursor-pointer">
                <ArrowLeft size={16} />
              </button>
            )}
            
            <nav className="text-[10.5px] flex items-center gap-2 text-gray-400 uppercase tracking-widest font-bold">
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Início</span>
              <span className="text-gray-200">/</span>
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Sala de Aula</span>
              <span className="text-gray-200">/</span>
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Configurando o seu Movidesk</span>
              <span className="text-gray-200">/</span>
              <span className="text-brand">{activeLesson.title}</span>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative">

          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col lg:p-6 pb-32">
            {/* Video Player Container */}
            <div className="relative lg:mb-4 flex-1 flex items-center justify-center min-h-0 bg-black lg:bg-transparent">
              {/* Navigation Arrows - Outside the video container */}
              <AnimatePresence>
                {!isSidebarOpen && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="absolute left-[-60px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                    >
                      <button 
                        onClick={() => activeLessonId && activeLessonId > 1 && setActiveLessonId(activeLessonId - 1)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transition-all active:scale-95 ${
                          activeLessonId && activeLessonId > 1 
                            ? 'bg-brand text-white shadow-brand/20 hover:scale-110 cursor-pointer' 
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter">Anterior</span>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="absolute right-[-60px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                    >
                      <button 
                        onClick={() => activeLessonId && activeLessonId < lessons.length && setActiveLessonId(activeLessonId + 1)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transition-all active:scale-95 ${
                          activeLessonId && activeLessonId < lessons.length 
                            ? 'bg-brand text-white shadow-brand/20 hover:scale-110 cursor-pointer' 
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        <ChevronRight size={24} />
                      </button>
                      <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter">Próximo</span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Video Placeholder */}
              <div className="w-full max-h-full aspect-video bg-black rounded-none lg:rounded-xl overflow-hidden shadow-none lg:shadow-2xl relative flex items-center justify-center mx-auto">
                <img 
                  src="https://picsum.photos/seed/training/1920/1080" 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-brand/90 text-white flex items-center justify-center hover:scale-110 transition-all shadow-2xl shadow-brand/40">
                    <Play size={28} fill="currentColor" />
                  </button>
                </div>
                
                {/* Video Controls Mockup */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4">
                  <div className="text-white text-[9.5px] font-mono">0:00 / 0:12</div>
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-brand w-[30%]" />
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-1 h-3 bg-white/40 rounded-full" />
                    <div className="w-1 h-4 bg-white/40 rounded-full" />
                    <div className="w-1 h-2 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Info */}
            <div className="flex-none p-4 lg:p-0">
              {/* Title and Nav - Modernized Option A for Mobile */}
              <div className="mb-4">
                <h1 className="text-xl lg:text-2xl font-bold text-[#003366] mb-0 lg:mb-4">{activeLesson.title}</h1>
                
                {/* Mobile Next/Prev Navigation */}
                <div className="flex items-center justify-between mt-3 lg:hidden border-b border-gray-100 pb-4 w-full">
                  <button 
                    onClick={() => activeLessonId && activeLessonId > 1 && setActiveLessonId(activeLessonId - 1)}
                    disabled={activeLessonId === 1}
                    className={`flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-widest ${activeLessonId === 1 ? 'text-gray-300' : 'text-gray-500 active:text-brand'}`}
                  >
                    <ChevronLeft size={14} /> Anterior
                  </button>
                  <button 
                    onClick={() => activeLessonId && activeLessonId < lessons.length && setActiveLessonId(activeLessonId + 1)}
                    disabled={activeLessonId === lessons.length}
                    className={`flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-widest ${activeLessonId === lessons.length ? 'text-gray-300' : 'text-brand active:text-[#003366]'}`}
                  >
                    Próximo <ChevronRight size={14} />
                  </button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex items-center border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id 
                        ? 'text-brand' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabIndicatorTraining"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px] overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {activeTab === 'descricao' && (
                          <div className="prose prose-sm max-w-none text-gray-600 italic text-xs">
                            <p>Uma visão geral de todas as funcionalidades que vamos cobrir.</p>
                          </div>
                        )}
                        {activeTab === 'desempenho' && (
                          <PerformanceDashboard 
                            type="content" 
                            status="reprovado"
                            data={[
                              { name: 'Módulo 1', value: 100 },
                              { name: 'Módulo 2', value: 85 },
                              { name: 'Módulo 3', value: 90 },
                              { name: 'Módulo 4', value: 21, isAlt: true },
                              { name: 'Módulo 5', value: 0 },
                            ]}
                          />
                        )}
                        {activeTab === 'resumo' && (
                          <div className="prose prose-sm max-w-none text-gray-600 italic text-xs">
                            <p>Resumo dos pontos principais abordados nesta lição.</p>
                          </div>
                        )}
                        {activeTab === 'material' && (
                          <MaterialExplorer />
                        )}
                        {activeTab === 'tutores' && (
                          <TutorList />
                        )}
                        {activeTab === 'autor' && (
                          <div className="prose prose-sm max-w-none text-gray-600 italic text-xs">
                            <p>Informações sobre o instrutor responsável por este conteúdo.</p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        {/* FAB (Floating Action Button) for Mobile */}
        <AnimatePresence>
          {!isMobileFocusMode && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="lg:hidden fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
            >
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="bg-brand text-white px-6 py-3.5 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-[0_8px_30px_rgba(204,0,0,0.35)] border border-brand-light active:scale-95 transition-transform cursor-pointer"
              >
                <Menu size={16} /> Conteúdo
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Mobile Bottom Sheet Modal */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl pt-2 pb-6 max-h-[85vh] flex flex-col lg:hidden shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3" />
              <div className="px-6 py-2 flex items-center justify-between border-b border-gray-100">
                <div className="flex-1 text-brand"></div>
                <h3 className="text-xs font-black text-[#003366] uppercase tracking-widest text-center flex-[2]">Conteúdo do Treinamento</h3>
                <div className="flex-1 flex justify-end">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer" onClick={() => setIsMobileSidebarOpen(false)}>
                    Fechar
                  </span>
                </div>
              </div>
              {renderLessonList(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
