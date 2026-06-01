import React, { useState, useMemo } from 'react';
import { getTrailById } from '../../data/catalog';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from '@tanstack/react-router';
import { PerformanceDashboard } from './PerformanceDashboard';
import {
  X, ChevronDown, ChevronRight, ArrowLeft, CheckCircle2, Circle,
  Menu, BarChart3, FileText, ClipboardList,
  Award, Check, Download,
  SlidersHorizontal, Copy, FileSpreadsheet, File, Printer
} from 'lucide-react';
import { SidebarContentIndicator } from './SidebarContentIndicator';
import { generateCertificate } from './generateCertificate';

const STUDENT_NAME = 'Caio Gomes';
const CERT_ID = 'LEC-2026-' + Math.random().toString(36).slice(2, 8).toUpperCase();

// Converte texto em CAIXA ALTA para caixa normal, preservando siglas (IA, QA) e conectores
const CONNECTORS = ['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'para', 'com', 'no', 'na', 'a', 'o'];
const prettyCase = (s: string) =>
  s.toLowerCase().split(' ').filter(Boolean).map((w, i) => {
    if (i > 0 && CONNECTORS.includes(w)) return w;
    if (w.length <= 2) return w.toUpperCase();
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');

// ── Types ──────────────────────────────────────────────────────
interface ContentItem {
  id: string;
  type: string;
  title: string;
  completed: boolean;
}

interface Etapa {
  id: string;
  number: number;
  title: string;
  progress: number;
  items: ContentItem[];
}

// ── Mock data ──────────────────────────────────────────────────
const mockTrilha: Etapa[] = [
  {
    id: 'e1', number: 1, title: 'INTRODUÇÃO', progress: 100,
    items: [
      { id: 'c1', type: 'Vídeos', title: 'Vídeo de Boas-vindas', completed: true },
      { id: 'c2', type: 'Documentos', title: 'Guia do Aluno', completed: true },
    ]
  },
  {
    id: 'e2', number: 2, title: 'APROVAÇÃO DE TICKETS', progress: 85,
    items: [
      { id: 'c3', type: 'Scorm', title: 'Módulo Interativo', completed: true },
      { id: 't1', type: 'Treinamento', title: 'Treinamento de Fluxos', completed: false },
      { id: 'c4', type: 'Avaliação', title: 'Teste de Conhecimento', completed: false },
    ]
  },
  {
    id: 'e3', number: 3, title: 'BASE DE CONHECIMENTO', progress: 90,
    items: [
      { id: 'c5', type: 'Vídeos', title: 'Como pesquisar artigos', completed: true },
      { id: 'c6', type: 'Tópico', title: 'Fórum de Discussão', completed: true },
    ]
  },
  {
    id: 'e4', number: 4, title: 'CONTRATO DE HORAS', progress: 21,
    items: [
      { id: 'c7', type: 'Documentos', title: 'Leitura Obrigatória', completed: false },
      { id: 'c8', type: 'Vídeos', title: 'Aula Prática', completed: false },
    ]
  }
];

// ── Progress bar component ─────────────────────────────────────
const ProgressBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between text-[10px] font-bold mb-1.5 text-white/70">
      <span>{label}</span>
      <span className="text-white tracking-wider">{value.toFixed(2).replace('.00', '')}%</span>
    </div>
    <div className="h-1.5 bg-black/10 rounded-full overflow-hidden border border-white/10">
      <motion.div
        className="h-full bg-gradient-to-r from-white/90 via-white to-white/90 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  </div>
);

// ── Main component ─────────────────────────────────────────────
export const TrilhaView: React.FC<{ trailId?: string; finishVariant?: 'sidebar' | 'sideTab' }> = ({ trailId, finishVariant = 'sidebar' }) => {
  const navigate = useNavigate();
  const goHome = () => navigate({ to: '/' });

  const trailData = useMemo(() => getTrailById(trailId ?? ''), [trailId]);
  const trailTitle = trailData?.title ?? 'Trilha Completa Automação';
  const initialTrilha: Etapa[] = trailData?.etapas ?? mockTrilha;

  const [trilha, setTrilha] = useState<Etapa[]>(initialTrilha);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'descricao' | 'desempenho' | 'relatorios'>('descricao');
  const [expandedEtapas, setExpandedEtapas] = useState<Record<string, boolean>>({ e1: true });
  const [concluded, setConcluded] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Toggle item completed e recalcula progresso da etapa
  const toggleItem = (etapaId: string, itemId: string) => {
    setTrilha(prev => prev.map(etapa => {
      if (etapa.id !== etapaId) return etapa;
      const updatedItems = etapa.items.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      const etapaProgress = updatedItems.length > 0
        ? (updatedItems.filter(i => i.completed).length / updatedItems.length) * 100
        : 0;
      return { ...etapa, items: updatedItems, progress: etapaProgress };
    }));
  };

  // Compute overall progress & aproveitamento
  const allItems = trilha.flatMap(e => e.items);
  const completedCount = allItems.filter(i => i.completed).length;
  const progresso = allItems.length > 0 ? (completedCount / allItems.length) * 100 : 0;
  const aproveitamento = trilha.length > 0
    ? trilha.reduce((acc, e) => acc + e.progress, 0) / trilha.length
    : 0;

  const canConclude = progresso >= 100 && aproveitamento >= 100;

  const today = new Date().toLocaleDateString('pt-BR');
  const handleDownloadCertificate = () => {
    generateCertificate({ studentName: STUDENT_NAME, trailTitle, date: today, hours: '02:00', certId: CERT_ID });
    setConcluded(true);
  };

  const toggleEtapa = (id: string) =>
    setExpandedEtapas(prev => ({ ...prev, [id]: !prev[id] }));

  // Lista de etapas (reutilizada no sidebar desktop e inline no mobile)
  const renderEtapas = () => trilha.map(etapa => {
    const isOpen = !!expandedEtapas[etapa.id];
    const etapaCompleted = etapa.items.every(i => i.completed);
    return (
      <div key={etapa.id} className="border-b border-gray-100 last:border-0">
        <button
          onClick={() => toggleEtapa(etapa.id)}
          className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50/60 hover:bg-gray-100/70 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded border flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
              etapaCompleted ? 'bg-brand border-brand text-white' : 'bg-white border-gray-200 text-gray-500'
            }`}>
              {etapaCompleted ? <CheckCircle2 size={13} /> : etapa.number}
            </div>
            <span className="text-[12px] font-bold text-[#003366] text-left leading-snug">
              {prettyCase(etapa.title)}
            </span>
          </div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={13} className="text-gray-400" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden bg-white"
            >
              {etapa.items.map(item => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <button
                    onClick={() => toggleItem(etapa.id, item.id)}
                    className={`flex-shrink-0 transition-colors hover:scale-110 active:scale-95 ${item.completed ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}
                    title={item.completed ? 'Marcar como pendente' : 'Marcar como concluído'}
                  >
                    {item.completed ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-semibold truncate ${item.completed ? 'text-gray-500 line-through' : 'text-[#003366]'}`}>
                      {item.title}
                    </p>
                    <div className="mt-0.5">
                      <SidebarContentIndicator type={item.type as any} />
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold flex-shrink-0 px-2 py-1 rounded-full ${
                    item.completed ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {item.completed ? 'Concluído' : 'Pendente'}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  });

  // Conteúdos reutilizados em tabs (desktop) e seções inline (mobile)
  const renderDescricao = () => (
    <p className="text-sm text-gray-500 leading-relaxed font-normal max-w-3xl">
      Nesta trilha você desenvolverá as competências fundamentais para o domínio completo dos fluxos de automação corporativa.
      Cada etapa foi estruturada para construir o conhecimento de forma progressiva, do básico ao avançado.
    </p>
  );

  const renderDesempenho = () => (
    <PerformanceDashboard
      type="trilha"
      status="andamento"
      data={trilha.map(e => ({ name: prettyCase(e.title), value: e.progress }))}
    />
  );

  const renderRelatorios = () => (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="text-base font-bold text-[#003366] mb-4">Relatório de Progresso</h3>
      <div className="space-y-3">
        {trilha.map(etapa => (
          <div key={etapa.id} className="flex items-center gap-4">
            <span className="text-[12px] font-semibold text-gray-600 w-32 sm:w-40 truncate flex-shrink-0">
              {prettyCase(etapa.title)}
            </span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${etapa.progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <span className="text-[11px] font-bold text-brand w-10 text-right flex-shrink-0">
              {etapa.progress}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Relatórios em tabela (versão desktop)
  const renderRelatoriosTable = () => {
    const rows = trilha.flatMap(etapa =>
      etapa.items.map(item => ({
        id: item.id,
        label: item.title,
        aproveitamento: item.completed ? '100,00%' : '0,00%',
        carga: item.type === 'Treinamento' ? '01:30:00' : '-',
        data: item.completed ? today : '-',
        done: item.completed,
      }))
    );
    const toolbar = [SlidersHorizontal, Copy, FileSpreadsheet, FileText, File, Printer];

    return (
      <div>
        {/* Toolbar de ações */}
        <div className="flex items-center gap-2.5 mb-6">
          {toolbar.map((Icon, i) => (
            <button
              key={i}
              className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shadow-sm hover:brightness-110 hover:-translate-y-0.5 transition-all"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[12px] font-bold text-gray-500">
                <th className="py-3 pr-4">
                  <span className="inline-flex items-center gap-1">Conteúdo <ChevronDown size={12} className="text-brand" /></span>
                </th>
                <th className="py-3 px-4 font-bold">Aproveitamento</th>
                <th className="py-3 px-4 font-bold">Carga horária</th>
                <th className="py-3 px-4 font-bold">Data de conclusão</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors group">
                  <td className="py-4 pr-4">
                    <button className="text-[13px] text-blue-600 font-medium hover:underline text-left">{row.label}</button>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-[13px] font-bold ${row.done ? 'text-[#003366]' : 'text-gray-400'}`}>{row.aproveitamento}</span>
                  </td>
                  <td className="py-4 px-4 text-[13px] text-gray-500 font-medium">{row.carga}</td>
                  <td className="py-4 px-4 text-[13px] text-gray-500 font-medium">{row.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Etapas em cards (versão mobile — maior, mais espaçada)
  const renderEtapasMobile = () => (
    <div className="space-y-3">
      {trilha.map(etapa => {
        const isOpen = !!expandedEtapas[etapa.id];
        const etapaCompleted = etapa.items.every(i => i.completed);
        const doneCount = etapa.items.filter(i => i.completed).length;
        return (
          <div key={etapa.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button onClick={() => toggleEtapa(etapa.id)} className="w-full flex items-center gap-3.5 px-4 py-4 text-left">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 transition-colors ${
                etapaCompleted ? 'bg-brand text-white' : 'bg-brand/10 text-brand'
              }`}>
                {etapaCompleted ? <CheckCircle2 size={20} /> : etapa.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-[#003366] leading-snug">{prettyCase(etapa.title)}</p>
                <p className="text-[11px] text-gray-400 font-semibold mt-1">{doneCount}/{etapa.items.length} concluídos</p>
              </div>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                <ChevronDown size={18} className="text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 space-y-2">
                    {etapa.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80">
                        <button
                          onClick={() => toggleItem(etapa.id, item.id)}
                          className={`flex-shrink-0 transition-all hover:scale-110 active:scale-90 ${item.completed ? 'text-green-500' : 'text-gray-300'}`}
                        >
                          {item.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] font-semibold leading-snug ${item.completed ? 'text-gray-400 line-through' : 'text-[#003366]'}`}>
                            {item.title}
                          </p>
                          <div className="mt-1">
                            <SidebarContentIndicator type={item.type as any} />
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold flex-shrink-0 px-2.5 py-1.5 rounded-full ${
                          item.completed ? 'bg-green-50 text-green-600' : 'bg-gray-200/70 text-gray-400'
                        }`}>
                          {item.completed ? 'Feito' : 'Pendente'}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  const tabs = [
    { id: 'descricao' as const, label: 'Descrição', icon: <FileText size={13} /> },
    { id: 'desempenho' as const, label: 'Desempenho', icon: <BarChart3 size={13} /> },
    { id: 'relatorios' as const, label: 'Relatórios', icon: <ClipboardList size={13} /> },
  ];

  // ── Sidebar content (shared desktop + mobile) ──────────────
  const SidebarContent = () => (
    <>
      {/* Orange header */}
      <div className="bg-brand text-white p-5 border-b border-white/10 flex-shrink-0">
        <div className="flex items-start gap-3 mb-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all flex-shrink-0 mt-0.5"
          >
            <X size={15} />
          </button>
          <h2 className="text-[13px] font-bold tracking-tight leading-snug">{trailTitle}</h2>
        </div>

        <div className="space-y-3">
          <ProgressBar label="Progresso" value={progresso} />
          <ProgressBar label="Aproveitamento" value={aproveitamento} />
        </div>

        {/* CTA Finalizar — só quando 100%/100% e ainda não concluída */}
        <AnimatePresence>
          {finishVariant === 'sidebar' && canConclude && !concluded && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={() => setShowCelebration(true)}
              className="group relative mt-4 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white/12 backdrop-blur-md border border-white/25 text-white font-bold text-[13px] tracking-tight overflow-hidden transition-all hover:bg-white/20 hover:border-white/40"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 16px rgba(0,0,0,0.12)' }}
            >
              {/* shimmer */}
              <motion.span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
              />
              <span className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-white/20">
                <Award size={13} />
              </span>
              <span className="relative">Finalizar trilha</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Selo concluída — discreto, navy/âmbar */}
        <AnimatePresence>
          {concluded && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 w-full flex items-center gap-2.5 py-2.5 px-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25"
            >
              <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                <Check size={13} className="text-brand" strokeWidth={3} />
              </div>
              <div className="leading-tight">
                <p className="text-[12px] font-bold text-white">Trilha concluída</p>
                <button onClick={() => setShowCelebration(true)} className="text-[9px] font-bold text-white/80 hover:text-white hover:underline">Ver certificado</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Etapas list */}
      <div className="flex-1 overflow-y-auto">
        {renderEtapas()}
      </div>
    </>
  );

  return (
    <div className="flex h-[100dvh] bg-[#F7F9FC] overflow-hidden font-sans">

      {/* ── Desktop Sidebar ───────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden lg:flex flex-col flex-none border-r border-gray-100 bg-white overflow-hidden z-10"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main area ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden">

        {/* Mobile orange header */}
        <div className="lg:hidden bg-brand text-white flex-shrink-0">
          <div className="flex items-start gap-3 px-4 pt-12 pb-4">
            <button onClick={goHome} className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ArrowLeft size={16} />
            </button>
            <h2 className="text-[14px] font-bold tracking-tight leading-snug flex-1">{trailTitle}</h2>
          </div>
          <div className="px-4 pb-9 space-y-3">
            <ProgressBar label="Progresso" value={progresso} />
            <ProgressBar label="Aproveitamento" value={aproveitamento} />
            <AnimatePresence>
              {finishVariant === 'sidebar' && canConclude && !concluded && (
                <motion.button
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  onClick={() => setShowCelebration(true)}
                  className="group relative w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white/12 backdrop-blur-md border border-white/25 text-white font-bold text-[13px] tracking-tight overflow-hidden transition-all active:bg-white/20"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 16px rgba(0,0,0,0.12)' }}
                >
                  <motion.span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
                  />
                  <span className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-white/20">
                    <Award size={13} />
                  </span>
                  <span className="relative">Finalizar trilha</span>
                </motion.button>
              )}
              {concluded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="w-full flex items-center gap-2.5 py-2.5 px-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25"
                >
                  <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                    <Check size={13} className="text-brand" strokeWidth={3} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[12px] font-bold text-white">Trilha concluída</p>
                    <button onClick={() => setShowCelebration(true)} className="text-[9px] font-bold text-white/80 hover:text-white hover:underline">Ver certificado</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop topbar */}
        <div className="hidden lg:flex flex-shrink-0 items-center gap-4 px-6 py-3 bg-white border-b border-gray-100">
          {!isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(true)} className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 text-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Menu size={18} />
            </button>
          )}
          <button onClick={goHome} className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center hover:opacity-90 transition-opacity">
            <ArrowLeft size={16} />
          </button>
          <nav className="text-[12px] flex items-center gap-1.5 text-gray-400 font-semibold">
            <span className="hover:text-gray-600 cursor-pointer">Vitrine</span>
            <span className="text-gray-200">›</span>
            <span className="hover:text-gray-600 cursor-pointer">Minha Área</span>
            <span className="text-gray-200">›</span>
            <span className="hover:text-gray-600 cursor-pointer">Minhas Trilhas</span>
            <span className="text-gray-200">›</span>
            <span className="text-brand">{trailTitle}</span>
          </nav>
        </div>

        {/* Tabs */}
        <div className="hidden lg:block flex-shrink-0 bg-white border-b border-gray-100 px-4 lg:px-8">
          <div className="flex items-center gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3.5 text-[12px] font-bold transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'text-brand' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="trilha-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="hidden lg:block lg:flex-1 lg:overflow-y-auto p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >

              {activeTab === 'descricao' && renderDescricao()}
              {activeTab === 'desempenho' && renderDesempenho()}
              {activeTab === 'relatorios' && renderRelatoriosTable()}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Mobile: landing page (sheet sobre o hero) ── */}
        <div className="lg:hidden relative z-10 -mt-4 rounded-t-[28px] bg-[#F7F9FC] px-5 pt-6 pb-12 space-y-9 shadow-[0_-8px_24px_rgba(4,20,51,0.06)]">

          {/* Conteúdo da trilha */}
          <section>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-5 rounded-full bg-brand" />
              <h3 className="text-[15px] font-bold text-[#041433] tracking-tight">Conteúdo da trilha</h3>
            </div>
            {renderEtapasMobile()}
          </section>

          {/* Descrição */}
          <section>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-5 rounded-full bg-brand" />
              <h3 className="text-[15px] font-bold text-[#041433] tracking-tight">Descrição</h3>
            </div>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Nesta trilha você desenvolverá as competências fundamentais para o domínio completo dos fluxos de automação corporativa.
              Cada etapa foi estruturada para construir o conhecimento de forma progressiva, do básico ao avançado.
            </p>
          </section>

          {/* Desempenho */}
          <section>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-5 rounded-full bg-brand" />
              <h3 className="text-[15px] font-bold text-[#041433] tracking-tight">Desempenho</h3>
            </div>
            {renderDesempenho()}
          </section>

          {/* Relatórios */}
          <section>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-5 rounded-full bg-brand" />
              <h3 className="text-[15px] font-bold text-[#041433] tracking-tight">Relatórios</h3>
            </div>
            {renderRelatorios()}
          </section>

        </div>
      </div>

      {/* ── Botão lateral direito (variante sideTab) ─────────── */}
      <AnimatePresence>
        {finishVariant === 'sideTab' && canConclude && !concluded && (
          <motion.button
            initial={{ x: 160, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 160, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 240 }}
            onClick={() => setShowCelebration(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] group flex items-center gap-3 pl-4 pr-5 py-4 rounded-l-2xl text-white overflow-hidden hover:pr-7 transition-all"
            style={{ background: 'linear-gradient(135deg, #FF7A1A 0%, #F2680D 100%)', boxShadow: '0 12px 36px rgba(255,122,26,0.5)' }}
          >
            {/* halo pulsante */}
            <motion.span
              className="absolute -left-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 pointer-events-none"
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 flex-shrink-0">
              <Award size={20} />
            </span>
            <span className="relative text-left leading-tight hidden sm:block">
              <span className="block text-[10px] font-semibold text-white/75">Parabéns!</span>
              <span className="block text-[14px] font-bold">Finalizar Trilha</span>
            </span>
            <ChevronRight size={18} className="relative opacity-80 group-hover:translate-x-1 transition-transform hidden sm:block" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Modal de celebração ──────────────────────────────── */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCelebration(false)}
              className="absolute inset-0 bg-[#041433]/70 backdrop-blur-md"
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-brand" />
                  <h3 className="text-base font-bold text-[#041433]">Seu certificado</h3>
                </div>
                <button onClick={() => setShowCelebration(false)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Preview do certificado */}
              <div className="p-5 bg-gray-50">
                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="relative bg-white rounded-xl overflow-hidden shadow-lg"
                  style={{ aspectRatio: '297 / 210' }}
                >
                  {/* Faixa lateral */}
                  <div className="absolute left-0 top-0 bottom-0 w-2.5" style={{ background: '#041433' }} />
                  <div className="absolute left-2.5 top-0 bottom-0 w-1" style={{ background: '#FF7A1A' }} />

                  {/* Moldura */}
                  <div className="absolute inset-3 border border-[#041433]/80 rounded-sm" />
                  <div className="absolute inset-[14px] border border-brand/40 rounded-sm" />

                  {/* Selo */}
                  <div className="absolute top-5 right-6 w-12 h-12 rounded-full bg-brand flex flex-col items-center justify-center text-white shadow-md">
                    <span className="text-[10px] font-black leading-none">100%</span>
                    <span className="text-[5px] font-bold tracking-wider mt-0.5">CONCLUÍDO</span>
                  </div>

                  {/* Conteúdo */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
                    <p className="text-[11px] font-black text-[#041433] tracking-[0.2em]">LECTOR</p>
                    <p className="text-[5.5px] font-bold text-brand tracking-[0.15em] mt-0.5">PLATAFORMA DE APRENDIZADO CORPORATIVO</p>

                    <h2 className="text-lg font-black text-[#041433] tracking-[0.15em] mt-3" style={{ fontFamily: 'Outfit, sans-serif' }}>CERTIFICADO</h2>
                    <p className="text-[7px] font-bold text-gray-400 tracking-[0.25em]">DE CONCLUSÃO</p>
                    <div className="w-10 h-0.5 bg-brand rounded-full my-2" />

                    <p className="text-[7px] text-gray-400">Certificamos que</p>
                    <p className="text-base font-black text-[#041433] mt-1 leading-none">{STUDENT_NAME}</p>
                    <p className="text-[7px] text-gray-400 mt-2 max-w-[80%] leading-relaxed">concluiu com aproveitamento a trilha</p>
                    <p className="text-[10px] font-black text-brand uppercase mt-1 leading-tight max-w-[85%]">{trailTitle}</p>

                    <div className="flex gap-10 mt-4">
                      <div className="text-center">
                        <div className="w-16 border-t border-[#041433]/40 pt-1">
                          <p className="text-[6px] font-black text-[#041433]">{today}</p>
                          <p className="text-[4.5px] text-gray-400 tracking-wider">DATA</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="w-16 border-t border-[#041433]/40 pt-1">
                          <p className="text-[6px] font-black text-[#041433]">Equipe Lector</p>
                          <p className="text-[4.5px] text-gray-400 tracking-wider">COORDENAÇÃO</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Ações */}
              <div className="p-5 pt-2 space-y-2.5">
                <button
                  onClick={handleDownloadCertificate}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-[14px] transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #FF7A1A 0%, #F2680D 100%)', boxShadow: '0 8px 24px rgba(255,122,26,0.4)' }}
                >
                  <Download size={16} />
                  Baixar certificado (PDF)
                </button>
                <button
                  onClick={() => setShowCelebration(false)}
                  className="w-full py-2.5 rounded-xl text-gray-400 hover:text-gray-600 font-semibold text-[13px] hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
