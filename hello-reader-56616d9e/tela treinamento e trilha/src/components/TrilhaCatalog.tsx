import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ChevronRight, Folder, PlaySquare, FileText, Video, Users, MonitorPlay, Box, UploadCloud, CheckSquare, Star, Award, Layers, Calendar, AlertCircle, RefreshCw, CreditCard, Check, Clock, Info } from 'lucide-react';
import { CustomFieldsModal } from './CustomFieldsModal';
import { PaymentModalV2 } from './PaymentModalV2';
import { PaymentModal } from './PaymentModal';
import { BoletoModal } from './BoletoModal';

interface TrilhaCatalogProps {
  onNavigate: (screen: 'catalog' | 'view' | 'design' | 'trilha' | 'trilhaView' | 'treinamentoTrilha') => void;
  enrollmentStatus: 'default' | 'payment' | 'rejected' | 'pending';
  setEnrollmentStatus: (status: 'default' | 'payment' | 'rejected' | 'pending') => void;
  selectedTurmaId: number | null;
  setSelectedTurmaId: (id: number | null) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  isBoletoModalOpen: boolean;
  setIsBoletoModalOpen: (open: boolean) => void;
  isOldPaymentModalOpen: boolean;
  setIsOldPaymentModalOpen: (open: boolean) => void;
}

export const TrilhaCatalog: React.FC<TrilhaCatalogProps> = ({ 
  onNavigate, 
  enrollmentStatus, 
  setEnrollmentStatus,
  selectedTurmaId,
  setSelectedTurmaId,
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  isBoletoModalOpen,
  setIsBoletoModalOpen,
  isOldPaymentModalOpen,
  setIsOldPaymentModalOpen
}) => {
  const [activeTab, setActiveTab] = useState<string>('conteudos');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Accordion state: expanded by default for all stages on first load
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'etapa-1': true,
    'etapa-2': true,
    'etapa-3': true
  });
  
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleItem = (id: string, isEtapa: boolean = false) => {
    setHasInteracted(true);
    setExpandedItems(prev => {
      const newState = { ...prev };
      
      // If we are opening this item and we've already started the "focus" logic
      if (!prev[id] && hasInteracted) {
        Object.keys(newState).forEach(key => {
          if (isEtapa && key.startsWith('etapa-')) {
            newState[key] = false;
          } else if (!isEtapa && !key.startsWith('etapa-')) {
            newState[key] = false;
          }
        });
      }
      
      newState[id] = !prev[id];
      return newState;
    });
  };

  const turmas = [
    {
      id: 1,
      title: "1° GRATUITA COM APROVAÇÃO DO GESTOR",
      period: "15/05/2026 até 30/11/2026",
      price: "Gratuito",
      vagas: "80 vagas"
    },
    {
      id: 2,
      title: "2°GRATUITA SEM APROVAÇÃO DO GESTOR",
      period: "Indeterminado",
      price: "Gratuito",
      vagas: "Ilimitadas"
    },
    {
      id: 3,
      title: "3° PAGA COM APROV. GESTOR + CAMPOS PERSON.",
      period: "01/06/2026 até 01/12/2026",
      price: "R$ 850,00",
      vagas: "30 vagas"
    },
    {
      id: 4,
      title: "4°PAGA SEM APROV. GESTOR + CAMPOS PERSON.",
      period: "Indeterminado",
      price: "R$ 980,00",
      vagas: "50 vagas"
    },
    {
      id: 5,
      title: "5° GRATUIITA COM APROV. GESTOR + CAMPOS PERSON.",
      period: "10/05/2026 até 20/08/2026",
      price: "Gratuito",
      vagas: "15 vagas"
    },
    {
      id: 6,
      title: "6° GRATUITA SEM APROV. GESTOR + CAMPOS PERSON.",
      period: "Indeterminado",
      price: "Gratuito",
      vagas: "Ilimitadas"
    },
    {
      id: 7,
      title: "7° PAGA COM APROVAÇÃO GESTOR",
      period: "05/06/2026 até 05/10/2026",
      price: "R$ 1.100,00",
      vagas: "10 vagas"
    },
    {
      id: 8,
      title: "8° PAGA SEM APROVAÇÃO GESTOR",
      period: "Indeterminado",
      price: "R$ 1.050,00",
      vagas: "25 vagas"
    },
    {
      id: 9,
      title: "9° ALUNO APLICANDO CUPOM",
      period: "Indeterminado",
      price: "R$ 49,90",
      vagas: "Ilimitadas"
    }
  ];

  const etapas = [
    {
      id: 'etapa-1',
      title: 'Etapa 1: Fundamentos da Liderança',
      contents: [
        { id: 'c1', type: 'Documento', title: 'Guia da Trilha (PDF)', icon: <FileText size={14} /> },
        { id: 'c2', type: 'Vídeo', title: 'Boas-vindas com a Diretoria', icon: <PlaySquare size={14} /> },
        { 
          id: 't1', 
          type: 'Treinamento', 
          title: 'Treinamento: O Papel do Líder', 
          icon: <Layers size={14} />,
          subContents: [
            { id: 'sc1', type: 'Material de apoio', title: 'Módulo 1: Autoconhecimento', icon: <Folder size={14} /> },
            { id: 'sc2', type: 'Vídeo', title: 'Estilos de Liderança', icon: <PlaySquare size={14} /> },
            { id: 'sc3', type: 'Avaliação', title: 'Teste de Perfil Comportamental', icon: <CheckSquare size={14} /> }
          ]
        },
        { id: 'c3', type: 'Material de apoio', title: 'Artigo Complementar', icon: <Folder size={14} /> }
      ]
    },
    {
      id: 'etapa-2',
      title: 'Etapa 2: Gestão de Equipes',
      contents: [
        { id: 'c4', type: 'Scorm', title: 'Módulo Interativo: Feedback Efetivo', icon: <Box size={14} /> },
        { 
          id: 't2', 
          type: 'Treinamento', 
          title: 'Treinamento: Comunicação Não Violenta', 
          icon: <Layers size={14} />,
          subContents: [
            { id: 'sc4', type: 'Aula presencial', title: 'Workshop de CNV', icon: <Users size={14} /> },
            { id: 'sc5', type: 'Documento', title: 'Material de Apoio', icon: <FileText size={14} /> }
          ]
        },
        { id: 'c5', type: 'Avaliação de reação/pesquisa', title: 'Pesquisa de Clima Simulado', icon: <Star size={14} /> },
        { id: 'c6', type: 'Webconferência', title: 'Mentoria em Grupo', icon: <MonitorPlay size={14} /> }
      ]
    },
    {
      id: 'etapa-3',
      title: 'Etapa 3: Prática e Encerramento',
      contents: [
        { id: 'c7', type: 'Webinar', title: 'Webinar Gravado: Resolução de Conflitos', icon: <Video size={14} /> },
        { id: 'c8', type: 'Entrega de atividade', title: 'Projeto Final: Plano de Ação', icon: <UploadCloud size={14} /> },
        { id: 'c9', type: 'Avaliação', title: 'Avaliação Final da Trilha', icon: <CheckSquare size={14} /> },
        { id: 'c10', type: 'Certificado', title: 'Emissão do Certificado', icon: <Award size={14} /> }
      ]
    }
  ];

  const selectedTurma = selectedTurmaId ? turmas.find(t => t.id === selectedTurmaId) : null;
  const mainButtonText = selectedTurma?.price === "Gratuito" ? "Fazer inscrição" : `Comprar ${selectedTurma?.price}`;

  const handleMainAction = () => {
    if (!selectedTurmaId) return;
    if (selectedTurmaId === 2) {
      onNavigate('trilhaView');
    } else if (selectedTurmaId === 9) {
      setIsOldPaymentModalOpen(true);
    } else if (selectedTurmaId === 1 || selectedTurmaId === 7) {
      setEnrollmentStatus('pending');
    } else if ([3, 4, 5, 6].includes(selectedTurmaId)) {
      setIsModalOpen(true);
    } else {
      setEnrollmentStatus('payment');
    }
  };

  const tabContent: Record<string, React.ReactNode> = {
    conteudos: (
      <div className="flex flex-col gap-3 pb-4">
        {etapas.map(etapa => (
          <div key={etapa.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
            <button 
              onClick={() => toggleItem(etapa.id, true)}
              className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-100 cursor-pointer z-10"
            >
              <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                {expandedItems[etapa.id] ? <ChevronUp size={12} className="text-gray-500" /> : <ChevronDown size={12} className="text-gray-500" />}
              </div>
              <span className="text-[11px] lg:text-xs font-bold text-[#003366] tracking-tight">{etapa.title}</span>
            </button>
            
            <AnimatePresence initial={false}>
              {expandedItems[etapa.id] && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col overflow-hidden"
                >
                  {/* Desktop Table Header */}
                  <div className="hidden lg:flex items-center px-4 py-2.5 bg-gray-50/50 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[240px]">Tipo</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4">Conteúdos</span>
                  </div>
                  
                  <div className="flex flex-col divide-y divide-gray-100">
                    {etapa.contents.map(content => (
                      <div key={content.id} className="flex flex-col">
                        {content.type === 'Treinamento' ? (
                          // Treinamento Accordion
                          <div className="flex flex-col bg-brand/5">
                            <button 
                              onClick={() => toggleItem(content.id, false)}
                              className="w-full flex flex-col lg:flex-row lg:items-center px-4 py-4 lg:py-3 hover:bg-brand/10 transition-colors group cursor-pointer"
                            >
                              <div className="flex items-center gap-3 lg:w-[240px] lg:flex-shrink-0 mb-1 lg:mb-0">
                                <div className="w-6 h-6 rounded bg-brand flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                                  {content.icon}
                                </div>
                                <span className="text-[10px] lg:text-[11px] font-black lg:font-bold text-brand uppercase tracking-widest lg:tracking-wide truncate">{content.type}</span>
                              </div>
                              <div className="flex-1 flex items-center gap-2 lg:pl-4">
                                <div className="hidden lg:flex w-5 h-5 rounded-full bg-white/50 items-center justify-center text-brand flex-shrink-0">
                                  {expandedItems[content.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </div>
                                <span className="text-[13px] lg:text-xs font-bold text-gray-800 group-hover:text-brand transition-colors text-left line-clamp-1">{content.title}</span>
                                <div className="lg:hidden ml-auto">
                                  {expandedItems[content.id] ? <ChevronUp size={14} className="text-brand" /> : <ChevronDown size={14} className="text-brand" />}
                                </div>
                              </div>
                            </button>
                            
                            <AnimatePresence initial={false}>
                              {expandedItems[content.id] && content.subContents && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: "easeInOut" }}
                                  className="flex flex-col divide-y divide-gray-100/50 bg-white/50 overflow-hidden"
                                >
                                  {content.subContents.map(sub => (
                                    <div key={sub.id} className="flex flex-col lg:flex-row lg:items-center px-5 lg:px-4 py-3 lg:py-2.5 hover:bg-white transition-colors group">
                                      <div className="flex items-center gap-3 lg:w-[240px] lg:flex-shrink-0 lg:pl-6 mb-1 lg:mb-0">
                                        <div className="w-5 h-5 rounded bg-gray-200/70 flex items-center justify-center text-gray-500 flex-shrink-0">
                                          {sub.icon}
                                        </div>
                                        <span className="text-[9px] lg:text-[10px] font-black lg:font-bold text-gray-500 uppercase tracking-widest truncate">{sub.type}</span>
                                      </div>
                                      <div className="flex-1 text-left lg:pl-4">
                                        <span className="text-xs lg:text-[11.5px] font-medium text-gray-600 group-hover:text-gray-900 line-clamp-2 lg:line-clamp-1">{sub.title}</span>
                                      </div>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          // Regular Content (Card style on mobile)
                          <div className="flex flex-col lg:flex-row lg:items-center px-4 py-4 lg:py-3 hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-3 lg:w-[240px] lg:flex-shrink-0 mb-1 lg:mb-0">
                              <div className="w-6 h-6 rounded bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                                {content.icon}
                              </div>
                              <span className="text-[10px] lg:text-[11px] font-black lg:font-bold text-brand uppercase tracking-widest lg:tracking-wide truncate">{content.type}</span>
                            </div>
                            <div className="flex-1 text-left lg:pl-4">
                              <span className="text-[13px] lg:text-xs font-semibold lg:font-medium text-gray-600 group-hover:text-gray-900 transition-colors line-clamp-2 lg:line-clamp-1">{content.title}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    ),
    resumo: (
      <div className="px-1 py-2">
        <p className="text-sm lg:text-xs text-gray-500 leading-relaxed italic">
          "Uma jornada completa de desenvolvimento para formar os líderes do futuro, combinando teoria, prática e autoconhecimento em uma trilha estruturada e imersiva."
        </p>
      </div>
    ),
    autor: (
      <div className="flex items-center gap-4 px-1 py-2">
        <div className="w-14 h-14 lg:w-12 lg:h-12 rounded-full bg-gray-200 overflow-hidden shadow-sm border border-white">
          <img src="https://picsum.photos/seed/leader/100/100" alt="Autor" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h4 className="text-sm lg:text-xs font-bold text-[#003366]">Equipe de Desenvolvimento Humano</h4>
          <p className="text-[11px] lg:text-[10.5px] text-gray-500">Especialistas em Liderança e Gestão de Pessoas.</p>
        </div>
      </div>
    )
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 font-sans pb-32 lg:pb-4"
    >
      {/* Breadcrumbs */}
      <nav className="text-[10.5px] mb-6 flex items-center gap-2 text-gray-400 uppercase tracking-[0.15em] font-bold">
        <span className="hover:text-gray-600 cursor-pointer transition-colors">Trilhas</span>
        <span className="text-gray-300">/</span>
        <span className="text-brand">Todos</span>
      </nav>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl p-0 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-6 transition-all duration-300 overflow-hidden lg:overflow-visible">
        <div className="flex flex-col lg:flex-row lg:flex-nowrap lg:gap-12">
          {/* Left Sidebar / Top Hero on Mobile */}
          <div className="flex-none w-full lg:w-64 flex flex-col lg:gap-6">
            {/* Mobile Title Header (Above Image) */}
            <div className="lg:hidden p-6 pb-2">
              <span className="text-[13px] font-medium text-gray-500 mb-1 block">Trilha de Formação</span>
              <h3 className="text-[22px] font-bold text-[#003366] leading-tight">
                Liderança do Futuro
              </h3>
            </div>

            {/* Banner/Thumbnail */}
            <div className="relative w-full h-[220px] lg:h-auto lg:aspect-square overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/leadership/600/400" 
                alt="Trilha Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="hidden lg:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex-col items-center justify-end p-4 text-center">
                <span className="text-[9.5px] text-white/70 uppercase tracking-[0.2em] mb-1 font-black">Trilha de Formação</span>
                <h3 className="text-sm font-bold text-white leading-tight uppercase tracking-tight">Liderança do Futuro</h3>
              </div>
            </div>

            <div className="p-6 lg:p-0 flex flex-col gap-6">
              <div className="flex flex-col gap-1 pb-4 border-b border-gray-100">
                <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Carga Horária</span>
                <span className="text-xs font-semibold text-[#003366]">120 horas e 00 minuto</span>
              </div>
  
              {/* Scrollable Turmas Area - Vertical List on Mobile & Desktop */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-[#003366] uppercase tracking-widest">
                    {enrollmentStatus === 'default' ? 'Selecionar Turma' : 'Turma Selecionada'}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="lg:hidden flex justify-center py-1 absolute -top-4 w-full text-gray-300 z-10 pointer-events-none">
                    <ChevronUp size={16} />
                  </div>
                  {/* Container: Flex col with scroll on mobile (max 300px for explicit hard cut of 3rd item) and desktop */}
                  <div className="flex flex-col max-h-[300px] lg:max-h-[320px] overflow-y-auto pr-2 custom-scrollbar gap-3 lg:gap-2 pb-2 lg:pb-0">
                    {turmas.length === 0 ? (
                      <div className="w-full text-center p-8 border border-dashed border-gray-200 rounded-lg text-gray-400 text-xs font-medium">
                        Nenhuma turma cadastrada
                      </div>
                    ) : (
                      turmas
                        .filter(t => enrollmentStatus === 'default' || t.id === selectedTurmaId)
                        .map((turma) => (
                        <button
                          key={turma.id}
                          onClick={(e) => {
                            if (enrollmentStatus === 'default') {
                              const isCurrentlySelected = selectedTurmaId === turma.id;
                              setSelectedTurmaId(isCurrentlySelected ? null : turma.id);
                              if (!isCurrentlySelected) {
                                e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                              }
                            }
                          }}
                          className={`w-full text-left p-4 lg:p-3 rounded-2xl lg:rounded-lg transition-all duration-200 cursor-pointer shadow-sm ${
                            selectedTurmaId === turma.id 
                              ? 'border-2 border-brand bg-brand/5 shadow-md scale-[0.98] lg:scale-100' 
                              : 'border border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                          } ${enrollmentStatus !== 'default' ? 'cursor-default opacity-90' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 w-[18px] h-[18px] rounded-full flex-shrink-0 border-[1.5px] flex items-center justify-center transition-all duration-300 ${
                              selectedTurmaId === turma.id ? 'border-brand bg-brand' : 'border-gray-300 bg-white'
                            }`}>
                              <motion.div
                                initial={false}
                                animate={{ scale: selectedTurmaId === turma.id ? 1 : 0 }}
                                className="w-2 h-2 rounded-full bg-white"
                              />
                            </div>
                            <div className="flex-1">
                              <div className={`text-[12px] lg:text-[11px] font-black lg:font-bold leading-tight uppercase tracking-tight mb-3 ${
                                selectedTurmaId === turma.id ? 'text-brand' : 'text-[#003366]'
                              }`}>
                                {turma.title}
                              </div>
                              
                              <div className="flex items-start gap-1.5 mb-4 lg:mb-3">
                                <Calendar size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                <div className="flex flex-col">
                                  <span className="text-[9px] lg:text-[8.5px] font-bold text-gray-400 uppercase tracking-[0.1em] leading-none mb-1">Prazo de inscrição</span>
                                  <span className="text-[11px] lg:text-[10px] text-gray-600 font-medium leading-none">{turma.period}</span>
                                </div>
                              </div>
  
                              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <span className="text-[10px] lg:text-[9.5px] font-black text-brand bg-brand/10 px-2 py-0.5 rounded uppercase tracking-tighter">{turma.vagas}</span>
                                <span className="text-sm lg:text-[11px] font-black text-gray-700">{turma.price}</span>
                              </div>
                            </div>
                          </div>
                          
                          {enrollmentStatus === 'pending' && selectedTurmaId === turma.id && (
                            <div className="mt-4 border-t border-brand/10 bg-brand/5 -mx-4 lg:-mx-3 -mb-4 lg:-mb-3 p-4 lg:p-3 rounded-b-2xl lg:rounded-b-lg flex items-start gap-3 text-left">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand shadow-sm flex-shrink-0">
                                <Clock size={16} />
                              </div>
                              <div className="flex flex-col gap-1 mt-0.5">
                                <span className="text-[10px] font-black text-brand uppercase tracking-widest">Aguardando aprovação</span>
                                <p className="text-[10.5px] text-brand/80 leading-relaxed font-medium pr-2">
                                  Sua solicitação de vaga foi enviada. Agora, basta aguardar a liberação do responsável.
                                </p>
                              </div>
                            </div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                  <div className="lg:hidden flex justify-center py-1 absolute -bottom-4 w-full text-gray-300 z-10 pointer-events-none">
                    <ChevronDown size={16} />
                  </div>
                  {/* Visual fade effect for scrolling (Hidden on mobile for a hard cut indicator, visible on Desktop) */}
                  <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none rounded-b-2xl" />
                </div>
  
                {/* Desktop Action Buttons */}
                <div className="hidden lg:flex flex-col gap-2 pt-2 border-t border-gray-100">
                {enrollmentStatus === 'default' && (
                  <>
                    <button 
                      onClick={handleMainAction}
                      disabled={selectedTurmaId === null}
                      className={`w-full py-3.5 rounded-xl text-[11.5px] font-bold tracking-[0.15em] transition-all flex items-center justify-center gap-2 ${selectedTurmaId === null ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/10 active:scale-95 cursor-pointer'}`}
                    >
                      {selectedTurmaId === null ? "SELECIONE UMA TURMA" : mainButtonText.toUpperCase()}
                    </button>
                    <button 
                      disabled={selectedTurmaId === null}
                      className={`w-full py-3.5 rounded-xl text-[11.5px] font-bold transition-all flex items-center justify-center gap-2 tracking-[0.1em] ${selectedTurmaId === null ? 'bg-white text-gray-300 border border-gray-100 cursor-not-allowed' : 'bg-white text-brand border border-brand/20 hover:bg-brand/5 active:scale-95 cursor-pointer'}`}
                    >
                      Registrar interesse
                    </button>
                  </>
                )}

                {enrollmentStatus === 'payment' && (
                  <button 
                    onClick={() => setIsBoletoModalOpen(true)}
                    className="w-full bg-brand text-white py-3.5 rounded-xl text-[11.5px] font-bold tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard size={14} />
                    Efetuar pagamento
                  </button>
                )}

                <AnimatePresence mode="wait">
                  {enrollmentStatus === 'rejected' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-3 overflow-hidden"
                    >
                      <div className="bg-red-50 border border-red-100 p-3.5 rounded-xl flex items-start gap-3">
                        <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-red-700 tracking-wide uppercase">Matrícula Recusada</span>
                          <span className="text-[11px] text-red-600 leading-relaxed font-medium">
                            Sua matrícula não foi aprovada pelo gestor. Verifique os dados e tente novamente.
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-brand text-white py-3.5 rounded-xl text-[11.5px] font-bold tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <RefreshCw size={14} />
                        Reenviar campos
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                  {/* Removed separate pending block */}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content / Bottom Content on Mobile */}
          <div className="flex-1 flex flex-col p-6 lg:p-0">
            <h1 className="hidden lg:block text-2xl font-bold text-brand uppercase mb-6 leading-tight tracking-tight">
              TRILHA DE FORMAÇÃO: LIDERANÇA DO FUTURO
            </h1>

            <div className="mb-4 lg:hidden">
              <span className="text-[13px] font-bold text-[#003366] uppercase tracking-widest block border-b border-gray-100 pb-2">
                Descrição
              </span>
            </div>

            <div className="relative">
              <motion.div 
                initial={false}
                animate={{ height: isExpanded ? 'auto' : '13.5em' }}
                className="overflow-hidden relative"
              >
                <div className="prose prose-sm text-gray-600 max-w-none">
                  <p className="leading-relaxed text-sm lg:text-[13px] mb-4">
                    Esta trilha foi desenhada para desenvolver as competências essenciais dos líderes da nossa organização. 
                    Através de uma jornada estruturada em etapas, você passará por fundamentos teóricos, práticas de gestão 
                    de equipes e resolução de conflitos, combinando diversos formatos de conteúdo e treinamentos imersivos.
                  </p>
                  <p className="leading-relaxed text-sm lg:text-[13px] mb-4">
                    A liderança contemporânea exige mais do que apenas conhecimento técnico; exige empatia, visão estratégica e a capacidade de inspirar pessoas. Neste programa, mergulharemos profundamente nas metodologias ágeis de gestão de pessoas, explorando casos reais e simulando cenários desafiadores que os gestores enfrentam no dia a dia corporativo.
                  </p>
                  <p className="leading-relaxed text-sm lg:text-[13px] mb-4">
                    A trilha também foca no desenvolvimento da inteligência emocional e na capacidade de adaptação a mudanças constantes. Discutiremos como construir redes de confiança dentro das equipes e como promover uma cultura de inovação e aprendizado contínuo, elementos vitais para a sustentabilidade organizacional a longo prazo.
                  </p>
                  <p className="leading-relaxed text-sm lg:text-[13px] mb-4">
                    Através de dinâmicas de grupo e sessões de mentoria, os participantes serão incentivados a refletir sobre seu próprio estilo de liderança, identificando pontos de melhoria e fortalecendo suas habilidades de comunicação e influência.
                  </p>
                  <img src="https://picsum.photos/seed/teamwork/800/400" alt="Equipe colaborando" className="w-full rounded-2xl my-6 object-cover max-h-[240px] lg:max-h-[300px] shadow-lg" referrerPolicy="no-referrer" />
                  <p className="leading-relaxed text-sm lg:text-[13px]">
                    Ao final desta trilha, espera-se que o participante esteja apto a conduzir reuniões de feedback de alto impacto, mediar conflitos complexos e estruturar planos de desenvolvimento individual (PDI) para seus liderados, alinhando os objetivos pessoais aos objetivos estratégicos da empresa.
                  </p>
                </div>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
              </motion.div>
              
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 flex items-center gap-1 text-[11px] font-black text-brand uppercase tracking-widest hover:text-brand-dark transition-colors cursor-pointer"
              >
                {isExpanded ? (
                  <>Ver menos <ChevronUp size={16} /></>
                ) : (
                  <>Ler descrição completa <ChevronDown size={16} /></>
                )}
              </button>
            </div>

            {/* Responsive interactive tabs */}
            <div className="relative flex items-center mt-10 mb-6 border-b border-gray-100 w-full overflow-x-auto no-scrollbar scroll-smooth">
              {[
                { id: 'conteudos', label: 'Conteúdos' },
                { id: 'resumo', label: 'Resumo' },
                { id: 'autor', label: 'Sobre o Autor' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 lg:flex-none px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap min-w-[120px] lg:min-w-0 ${
                    activeTab === tab.id ? 'text-brand' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicatorTrilha"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand rounded-t-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content Area */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[160px] pb-10"
            >
              {tabContent[activeTab]}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Fields Modal */}
      <CustomFieldsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={() => {
          setIsModalOpen(false);
          setEnrollmentStatus('pending');
        }} 
      />

      <PaymentModalV2 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        itemName="TRILHA DE FORMAÇÃO: LIDERANÇA DO FUTURO"
        itemPrice={parseFloat(selectedTurma?.price.replace('R$ ', '').replace('.', '').replace(',', '.') || '1200')}
        onSuccess={() => {
          setIsPaymentModalOpen(false);
          setEnrollmentStatus('payment');
          setIsBoletoModalOpen(true);
        }}
      />

      <BoletoModal 
        isOpen={isBoletoModalOpen}
        onClose={() => setIsBoletoModalOpen(false)}
        price={parseFloat(selectedTurma?.price.replace('R$ ', '').replace('.', '').replace(',', '.') || '1200')}
      />

      <PaymentModal 
        isOpen={isOldPaymentModalOpen}
        onClose={() => setIsOldPaymentModalOpen(false)}
        itemName={selectedTurma?.title || "TRILHA DE FORMAÇÃO"}
        itemPrice={parseFloat(selectedTurma?.price.replace('R$ ', '').replace('.', '').replace(',', '.') || '1200')}
        onSuccess={() => {
          setIsOldPaymentModalOpen(false);
          onNavigate('trilhaView');
        }}
      />

      {/* Mobile Sticky Action Bar */}
      <AnimatePresence>
        {(selectedTurmaId !== null || enrollmentStatus !== 'default') && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pb-8 bg-white border-t border-gray-100 flex gap-3 shadow-[0_-12px_40px_rgba(0,0,0,0.08)]"
          >
            {enrollmentStatus === 'default' && (
              <button 
                onClick={handleMainAction}
                className="flex-1 bg-brand text-white h-[56px] rounded-xl text-[16px] font-bold shadow-lg shadow-brand/20 active:scale-95 flex items-center justify-center gap-2 transition-transform"
              >
                {mainButtonText}
              </button>
            )}

            {enrollmentStatus === 'payment' && (
              <button 
                onClick={() => setIsBoletoModalOpen(true)}
                className="flex-1 bg-brand text-white h-[56px] rounded-xl text-[15px] font-bold shadow-lg shadow-brand/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <CreditCard size={18} />
                Pagamento
              </button>
            )}

            {enrollmentStatus === 'pending' && (
              <div className="flex-1 bg-white border border-brand/20 text-brand h-[56px] rounded-xl text-[13px] font-bold uppercase tracking-wide flex items-center justify-center gap-2">
                <Clock size={16} className="animate-spin-slow" />
                Em Análise
              </div>
            )}

            {enrollmentStatus === 'rejected' && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-red-600 text-white h-[56px] rounded-xl text-[15px] font-bold shadow-lg shadow-red-500/10 active:scale-95 flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Reenviar Dados
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
