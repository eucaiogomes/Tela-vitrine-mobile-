import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown, CheckCircle2, Folder, PlaySquare, FileText, Video, Users, MonitorPlay, Box, UploadCloud, CheckSquare, Star, Award, Calendar, AlertCircle, RefreshCw, CreditCard, Check, Clock, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomFieldsModal } from './CustomFieldsModal';
import { PaymentModalV2 } from './PaymentModalV2';
import { PaymentModal } from './PaymentModal';
import { BoletoModal } from './BoletoModal';

interface CourseCatalogProps {
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

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ 
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

  const turmas = [
    {
      id: 1,
      title: "1° GRATUITA COM APROVAÇÃO DO GESTOR",
      period: "01/05/2026 até 30/06/2026",
      price: "Gratuito",
      vagas: "50 vagas"
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
      period: "10/05/2026 até 15/07/2026",
      price: "R$ 150,00",
      vagas: "20 vagas"
    },
    {
      id: 4,
      title: "4°PAGA SEM APROV. GESTOR + CAMPOS PERSON.",
      period: "05/04/2026 até 31/12/2026",
      price: "R$ 320,00",
      vagas: "100 vagas"
    },
    {
      id: 5,
      title: "5° GRATUIITA COM APROV. GESTOR + CAMPOS PERSON.",
      period: "15/06/2026 até 15/08/2026",
      price: "Gratuito",
      vagas: "10 vagas"
    },
    {
      id: 6,
      title: "6° GRATUITA SEM APROV. GESTOR + CAMPOS PERSON.",
      period: "01/04/2026 até 01/10/2026",
      price: "Gratuito",
      vagas: "Ilimitadas"
    },
    {
      id: 7,
      title: "7° PAGA COM APROVAÇÃO GESTOR",
      period: "20/05/2026 até 20/06/2026",
      price: "R$ 450,00",
      vagas: "5 vagas"
    },
    {
      id: 8,
      title: "8° PAGA SEM APROVAÇÃO GESTOR",
      period: "Indeterminado",
      price: "R$ 290,00",
      vagas: "Ilimitadas"
    },
    {
      id: 9,
      title: "9° ALUNO APLICANDO CUPOM",
      period: "Indeterminado",
      price: "R$ 49,90",
      vagas: "Ilimitadas"
    }
  ];

  const conteudosList = [
    { type: 'Tópico', title: 'Módulo 1: Fundamentos', icon: <Folder size={14} /> },
    { type: 'Vídeos', title: 'Introdução ao Pensamento Jurídico Brasileiro', icon: <PlaySquare size={14} /> },
    { type: 'Documentos', title: 'Material de Apoio (PDF)', icon: <FileText size={14} /> },
    { type: 'Gravado', title: 'Aula Magna Gravada', icon: <Video size={14} /> },
    { type: 'Aula presencial', title: 'Encontro Presencial - Polo SP', icon: <Users size={14} /> },
    { type: 'Webconferência', title: 'Tira-dúvidas ao vivo', icon: <MonitorPlay size={14} /> },
    { type: 'Scorm', title: 'Módulo Interativo SCORM', icon: <Box size={14} /> },
    { type: 'Entrega de atividade', title: 'Trabalho de Conclusão de Módulo', icon: <UploadCloud size={14} /> },
    { type: 'Avaliação', title: 'Prova de Conhecimentos', icon: <CheckSquare size={14} /> },
    { type: 'Avaliação de reação/pesquisa', title: 'Pesquisa de Satisfação', icon: <Star size={14} /> },
    { type: 'Certificado', title: 'Emissão do Certificado', icon: <Award size={14} /> }
  ];

  const selectedTurma = selectedTurmaId ? turmas.find(t => t.id === selectedTurmaId) : null;
  const mainButtonText = selectedTurma?.price === "Gratuito" ? "Fazer inscrição" : `Comprar ${selectedTurma?.price}`;

  const handleMainAction = () => {
    if (!selectedTurmaId) return;
    if (selectedTurmaId === 2) {
      onNavigate('view');
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
      <div className="flex flex-col">
        {/* Desktop Table Header */}
        <div className="hidden lg:flex items-center justify-between pb-2 mb-1 border-b border-gray-200 pr-2">
          <div className="w-[260px] flex-shrink-0 pl-1">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Tipo</span>
          </div>
          <div className="flex-1 text-left pl-4">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Conteúdo</span>
          </div>
        </div>
        
        {/* Table Body / Mobile List */}
        <div className="flex flex-col pb-4 gap-2 lg:gap-0">
          {conteudosList.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3 px-4 lg:px-0 border lg:border-0 border-gray-100 rounded-xl lg:rounded-none lg:border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/50 group"
            >
              {/* Type - Desktop: Fixed Width, Mobile: Part of the card header */}
              <div className="flex items-center gap-3 lg:w-[260px] lg:flex-shrink-0 mb-1 lg:mb-0">
                <div className="w-6 h-6 rounded bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-[10px] lg:text-[11px] font-black lg:font-bold text-brand uppercase tracking-widest lg:tracking-wide truncate">
                  {item.type}
                </span>
              </div>
              
              {/* Title - Mobile: Larger font, Desktop: Part of table */}
              <div className="flex-1 text-left lg:pl-4">
                <span className="text-sm lg:text-xs font-semibold lg:font-medium text-gray-700 lg:text-gray-600 group-hover:text-gray-900 transition-colors line-clamp-2 lg:line-clamp-1">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    resumo: (
      <div className="px-1 py-2">
        <p className="text-sm lg:text-xs text-gray-500 leading-relaxed italic">
          "Uma jornada intelectual que conecta o passado jurídico do Brasil com os desafios do presente, focando na construção de uma consciência crítica sobre nossas instituições."
        </p>
      </div>
    ),
    autor: (
      <div className="flex items-center gap-4 px-1 py-2">
        <div className="w-14 h-14 lg:w-12 lg:h-12 rounded-full bg-gray-200 overflow-hidden shadow-sm border border-white">
          <img src="https://picsum.photos/seed/professor/100/100" alt="Autor" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h4 className="text-sm lg:text-xs font-bold text-[#003366]">Dr. Roberto Silva</h4>
          <p className="text-[11px] lg:text-[10.5px] text-gray-500">Doutor em Teoria do Direito e Pesquisador Sênior.</p>
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
        <span className="hover:text-gray-600 cursor-pointer transition-colors">Treinamentos</span>
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
              <span className="text-[13px] font-medium text-gray-500 mb-1 block">Curso de Extensão</span>
              <h3 className="text-[22px] font-bold text-[#003366] leading-tight">
                Teoria Geral do Direito
              </h3>
            </div>

            {/* Banner/Thumbnail */}
            <div className="relative w-full h-[220px] lg:h-auto lg:aspect-square overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/law/600/400" 
                alt="Course Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay with Title on Desktop (Hidden on Mobile) */}
              <div className="hidden lg:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex-col items-center justify-end p-4 text-center">
                <span className="text-[9.5px] text-white/70 uppercase tracking-[0.2em] mb-1 font-black">Curso de Extensão</span>
                <h3 className="text-sm font-bold text-white leading-tight uppercase tracking-tight">
                  Teoria Geral do Direito
                </h3>
              </div>
            </div>

            <div className="p-6 lg:p-0 flex flex-col gap-6">
              <div className="flex flex-col gap-1 pb-4 border-b border-gray-100">
                <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Carga Horária</span>
                <span className="text-xs font-semibold text-[#003366]">36 horas e 00 minuto</span>
              </div>

              {/* Selection Turmas - Horizontal Carousel on Mobile */}
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
              2º CURSO DE EXTENSÃO EM TEORIA GERAL DO DIREITO: FORMAÇÃO DO PENSAMENTO INTELECTUAL BRASILEIRO
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
                    Este curso propõe uma análise profunda das bases do pensamento intelectual brasileiro através da Teoria Geral do Direito. 
                    Exploramos as conexões entre a formação jurídica e o desenvolvimento social do país, abordando temas fundamentais 
                    para a compreensão da nossa estrutura institucional contemporânea.
                  </p>
                  <p className="leading-relaxed text-sm lg:text-[13px] mb-4">
                    Durante os encontros, debateremos as obras dos principais juristas e sociólogos que moldaram a compreensão do Estado brasileiro. A metodologia inclui análise de jurisprudência histórica, debates guiados e seminários de pesquisa, exigindo do aluno uma postura ativa e crítica em relação ao material bibliográfico.
                  </p>
                  <p className="leading-relaxed text-sm lg:text-[13px] mb-4">
                    Além disso, o programa aborda a evolução do pensamento constitucional e as transformações nas relações entre o poder público e a sociedade civil. Serão analisados documentos históricos inéditos e textos clássicos sob uma nova ótica, permitindo que os participantes desenvolvam competências de interpretação sistêmica e argumentação jurídica sofisticada.
                  </p>
                  <p className="leading-relaxed text-sm lg:text-[13px] mb-4">
                    O curso também se propõe a ser um espaço de troca de experiências entre profissionais de diferentes áreas, enriquecendo o debate com perspectivas multidisciplinares sobre a eficácia das normas e o papel do jurista na contemporaneidade brasileira.
                  </p>
                  <img src="https://picsum.photos/seed/law/800/400" alt="Biblioteca jurídica" className="w-full rounded-2xl my-6 object-cover max-h-[240px] lg:max-h-[300px] shadow-lg" referrerPolicy="no-referrer" />
                  <p className="leading-relaxed text-sm lg:text-[13px]">
                    O objetivo central é fornecer um arcabouço teórico robusto que permita aos profissionais do direito não apenas aplicar a norma, mas compreender sua gênese, sua função social e suas limitações dentro do contexto histórico e cultural do Brasil.
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
                      layoutId="activeTabIndicator"
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
        itemName="TEORIA GERAL DO DIREITO"
        itemPrice={parseFloat(selectedTurma?.price.replace('R$ ', '').replace('.', '').replace(',', '.') || '1000')}
        onSuccess={() => {
          setIsPaymentModalOpen(false);
          setEnrollmentStatus('payment');
          setIsBoletoModalOpen(true);
        }}
      />

      <BoletoModal 
        isOpen={isBoletoModalOpen}
        onClose={() => setIsBoletoModalOpen(false)}
        price={parseFloat(selectedTurma?.price.replace('R$ ', '').replace('.', '').replace(',', '.') || '1000')}
      />

      <PaymentModal 
        isOpen={isOldPaymentModalOpen}
        onClose={() => setIsOldPaymentModalOpen(false)}
        itemName={selectedTurma?.title || "TEORIA GERAL DO DIREITO"}
        itemPrice={parseFloat(selectedTurma?.price.replace('R$ ', '').replace('.', '').replace(',', '.') || '1000')}
        onSuccess={() => {
          setIsOldPaymentModalOpen(false);
          onNavigate('view');
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
                Efetuar Pagamento
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
