import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  ChevronDown,
  Plus
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
  { id: 'qa1', title: 'Treinamentos QA em Alta', variant: 'avancado-1', items: [
    { id: 'qa1-0', type: 'COURSE', thumb: course01, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Introdução ao QA na Lector Live',
      description: 'Visão geral do papel do QA, responsabilidades do time e como o trabalho se integra ao ciclo de desenvolvimento.',
      duration: '1h 30min', price: '' },
    { id: 'qa1-1', type: 'COURSE', thumb: course02, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Tipos de Tarefas: Correções e Implementações',
      description: 'Entenda a diferença entre validar um bug corrigido e testar uma funcionalidade nova do início ao fim.',
      duration: '1h 15min', price: '' },
    { id: 'qa1-2', type: 'COURSE', thumb: course03, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Fluxo de Liberação: HML e Produção',
      description: 'Passo a passo do processo de liberação: como o QA atua em cada etapa desde o recebimento até a aprovação em produção.',
      duration: '1h 45min', price: '' },
    { id: 'qa1-3', type: 'COURSE', thumb: course04, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Gerenciando o Painel de Liberações',
      description: 'Como usar e manter o painel atualizado: colunas, status das tarefas e consistência com os grupos de comunicação.',
      duration: '1h 00min', price: '' },
    { id: 'qa1-4', type: 'COURSE', thumb: course05, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Executando o Checklist Completo do Sistema',
      description: 'Como distribuir e executar o checklist após cada liberação, com foco em Trilhas, Treinamentos e Vitrines.',
      duration: '2h 00min', price: '' },
    { id: 'qa1-5', type: 'COURSE', thumb: course06, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Documentando Chamados Corretamente',
      description: 'Estrutura completa de um chamado: descrição, passo a passo, evidências, ambiente, versão e campos do painel lateral.',
      duration: '1h 30min', price: '' },
    { id: 'qa1-6', type: 'COURSE', thumb: course07, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Regras de Reprovação e Aprovação em HML',
      description: 'Critérios claros para reprovar ou aprovar tarefas, o que fazer com bugs adicionais e como documentar cada decisão.',
      duration: '1h 20min', price: '' },
    { id: 'qa1-7', type: 'COURSE', thumb: course08, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Comunicação no Time: Grupos e Alinhamento',
      description: 'Como usar o Grupo Liberações e o Grupo Suporte Interno para manter informações alinhadas entre painel e canais.',
      duration: '0h 45min', price: '' },
    { id: 'qa1-8', type: 'COURSE', thumb: course09, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Boas Práticas e Critérios de Qualidade',
      description: 'Como priorizar testes, avaliar impacto, testar fluxos relacionados e garantir que nenhuma tarefa seja aprovada sem certeza.',
      duration: '2h 10min', price: '' },
    { id: 'qa1-9', type: 'COURSE', thumb: course10, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Automação de Testes: Fundamentos e Boas Práticas',
      description: 'Quando e o que automatizar, como estruturar testes independentes e manter a suíte atualizada a cada liberação.',
      duration: '3h 00min', price: '' },
    { id: 'qa1-10', type: 'COURSE', thumb: course11, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Criação e Manutenção de Manuais da Plataforma',
      description: 'Como revisar, atualizar e garantir que os manuais reflitam o comportamento atual do sistema após cada liberação.',
      duration: '1h 40min', price: '' },
  ] },

  { id: 'qt1', title: 'Trilhas QA em Destaque', variant: 'avancado-1', items: [
    { id: 'qt1-0', type: 'TRAIL', thumb: trail01, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Onboarding QA Lector',
      description: 'Percurso completo de entrada no time de QA: cultura, processos, ferramentas e primeiros testes.',
      duration: '6h 30min', price: '' },
    { id: 'qt1-1', type: 'TRAIL', thumb: trail02, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Validação de Fluxos Críticos',
      description: 'Aprenda a testar os fluxos de maior impacto: login, matrícula, pagamento, trilhas e progresso do usuário.',
      duration: '8h 00min', price: '' },
    { id: 'qt1-2', type: 'TRAIL', thumb: trail03, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Gestão do Painel e Chamados',
      description: 'Domine o painel de liberações e a documentação de chamados para manter o processo sem gargalos.',
      duration: '5h 00min', price: '' },
    { id: 'qt1-3', type: 'TRAIL', thumb: trail04, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Checklist Completo do Sistema',
      description: 'Construa e execute o checklist de todas as abas do sistema com foco em Trilhas, Treinamentos e Vitrines.',
      duration: '7h 30min', price: '' },
    { id: 'qt1-4', type: 'TRAIL', thumb: trail05, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Automação de Testes na Lector',
      description: 'Do zero à suíte automatizada: fluxos críticos, seletores estáveis, comandos reutilizáveis e manutenção contínua.',
      duration: '10h 00min', price: '' },
    { id: 'qt1-5', type: 'TRAIL', thumb: trail06, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Documentação e Manuais da Plataforma',
      description: 'Como criar, revisar e distribuir manuais claros que acompanham cada liberação do sistema.',
      duration: '4h 30min', price: '' },
    { id: 'qt1-6', type: 'TRAIL', thumb: trail07, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Testes por Perfil de Usuário',
      description: 'Valide o comportamento separado de alunos, administradores e gestores do início ao fim do fluxo.',
      duration: '6h 00min', price: '' },
    { id: 'qt1-7', type: 'TRAIL', thumb: trail08, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Comunicação e Alinhamento de Time',
      description: 'Boas práticas de uso dos grupos de WhatsApp, atualização de painel e consistência de informações.',
      duration: '3h 00min', price: '' },
    { id: 'qt1-8', type: 'TRAIL', thumb: trail09, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Priorização e Gestão de Tarefas QA',
      description: 'Como organizar o dia, priorizar demandas críticas e garantir que nenhuma tarefa fique sem validação.',
      duration: '5h 30min', price: '' },
    { id: 'qt1-9', type: 'TRAIL', thumb: trail10, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Prevenção de Regressão',
      description: 'Identifique padrões de erro recorrentes, documente como padrão e implemente testes para evitar que se repitam.',
      duration: '7h 00min', price: '' },
    { id: 'qt1-10', type: 'TRAIL', thumb: trail11, authors: 'Time QA Lector', progress: 0, grade: 0,
      title: 'Trilha Qualidade em Produção',
      description: 'Rotina pós-liberação em produção: como agir rápido diante de falhas, acionar o time e documentar o ocorrido.',
      duration: '4h 00min', price: '' },
  ] },

  { id: 'a2', title: 'Avançado 2', variant: 'avancado-2', items: generateItems(11, 'a2') },
  { id: 'a3', title: 'Avançado 3', variant: 'avancado-3', items: generateItems(11, 'a3') },
  { id: 'a4', title: 'Avançado 4', variant: 'avancado-4', items: generateItems(11, 'a4') },
  { id: 'a5', title: 'Avançado 5', variant: 'avancado-5', items: generateItems(11, 'a5') },
  { id: 'a6', title: 'Avançado 6', variant: 'avancado-6', items: generateItems(11, 'a6') },
  { id: 'a7', title: 'Avançado 7 (Pôster)', variant: 'avancado-7', items: generateItems(11, 'a7') },
];

// --- Vitrine Switcher Data ---

interface Vitrine {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  cor: string;
}

const VITRINES: Vitrine[] = [
  { id: 'v1', nome: 'Vitrine Padrão',          descricao: 'Portal corporativo principal',          categoria: 'Corporativo', cor: '#FF7A1A' },
  { id: 'v2', nome: 'Vitrine RH',              descricao: 'Treinamentos para equipe de RH',        categoria: 'Corporativo', cor: '#2563EB' },
  { id: 'v3', nome: 'Vitrine Onboarding',      descricao: 'Integração de novos colaboradores',    categoria: 'Corporativo', cor: '#EC4899' },
  { id: 'v4', nome: 'Vitrine IA & Automação',  descricao: 'Cursos de IA e ferramentas digitais',  categoria: 'Produtos',    cor: '#8B5CF6' },
  { id: 'v5', nome: 'Vitrine Liderança',       descricao: 'Desenvolvimento de líderes',           categoria: 'Produtos',    cor: '#10B981' },
  { id: 'v6', nome: 'Vitrine Empresa X',       descricao: 'Portal exclusivo — Empresa X',         categoria: 'Clientes',    cor: '#F59E0B' },
  { id: 'v7', nome: 'Vitrine QA',              descricao: 'Biblioteca de QA — Lector Live',       categoria: 'QA',          cor: '#0EA5E9' },
];

const CATEGORIA_COR: Record<string, string> = {
  Corporativo: 'bg-blue-50 text-blue-700',
  Produtos:    'bg-purple-50 text-purple-700',
  Clientes:    'bg-amber-50 text-amber-700',
  QA:          'bg-sky-50 text-sky-600',
};

const VITRINE_SECTIONS: Record<string, string[]> = {
  v1: ['a1', 't1'],
  v2: ['a1', 't1'],
  v3: ['a1', 't1'],
  v4: ['a1', 't1'],
  v5: ['a1', 't1'],
  v6: ['a1', 't1'],
  v7: ['qa1', 'qt1'],
};

// --- Components ---

// ============================================================
// TOPBAR
// ============================================================
const Topbar = ({
  onMenuToggle,
  setActiveTab,
  activeTab,
}: {
  onMenuToggle: () => void;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMinhaAreaOpen, setIsMinhaAreaOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ContentItem[]>([]);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const allItems = SECTIONS.flatMap(s => s.items);
      const filtered = allItems
        .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Close user menu and suggestions on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestions([]);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-100">
      <div className="flex h-full">

        {/* ── Brand zone: alinha com o sidebar (desktop) ── */}
        <div className="hidden lg:flex items-center px-5 w-64 flex-shrink-0 border-r border-gray-100">
          <img
            src={logoLector}
            alt="Lector"
            className="h-8 w-auto cursor-pointer hover:opacity-75 transition-opacity"
            onClick={() => setActiveTab('Conteúdo')}
          />
        </div>

        {/* ── Content zone: alinha com a área principal ── */}
        <div className="flex items-center flex-1 px-4 lg:px-6 gap-3 min-w-0">
          {/* Hamburger - mobile only */}
          <button
            onClick={onMenuToggle}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors lg:hidden flex-shrink-0"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo - mobile only */}
          <div className="lg:hidden flex-shrink-0 cursor-pointer" onClick={() => setActiveTab('Conteúdo')}>
            <img src={logoLector} alt="Lector" className="h-8 w-auto" />
          </div>

          {/* Search */}
          <div ref={searchRef} className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Pesquisar cursos, trilhas..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100/80 border border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30 rounded-full text-sm transition-all duration-200 placeholder:text-gray-400"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
              >
                <div className="p-2">
                  {suggestions.map(item => (
                    <button
                      key={item.id}
                      onClick={() => { setSearchQuery(''); setSuggestions([]); }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.thumb} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-1">{item.title}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{item.type === 'COURSE' ? 'Treinamento' : item.type}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation tabs */}
        <div className="hidden md:flex items-center gap-1">
          {['Conteúdo', 'Social', 'Minha Área'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-brand-primary/10 text-brand-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 ml-auto">
          <Tooltip content="Notificações">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </Tooltip>
          <Tooltip content="Idioma">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Globe className="h-5 w-5" />
            </button>
          </Tooltip>
          <div className="h-8 w-px bg-gray-200 mx-1" />
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setIsUserMenuOpen(v => !v)}
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
                    onClick={() => setIsMinhaAreaOpen(v => !v)}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3"><LayoutDashboard className="h-4 w-4" /> Minha Area</div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMinhaAreaOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isMinhaAreaOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50/30"
                      >
                        <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors"><Play className="h-3.5 w-3.5" /> Meus Treinamentos</button>
                        <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors"><Compass className="h-3.5 w-3.5" /> Minhas Trilhas</button>
                        <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors"><Star className="h-3.5 w-3.5" /> Minhas Habilidades</button>
                        <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors"><Award className="h-3.5 w-3.5" /> Meus Certificados</button>
                        <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors"><Calendar className="h-3.5 w-3.5" /> Meu Calendário</button>
                        <button className="w-full text-left pl-11 pr-4 py-2.5 text-sm text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center gap-3 transition-colors"><ShoppingBag className="h-3.5 w-3.5" /> Minhas Compras</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 transition-colors"><Users className="h-4 w-4" /> Selecionar perfil</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 transition-colors"><Globe className="h-4 w-4" /> Alterar idioma</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 transition-colors"><Download className="h-4 w-4" /> Instalar</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 transition-colors"><CheckCircle className="h-4 w-4" /> Validar termos de Aceite</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 transition-colors"><BookOpen className="h-4 w-4" /> Ver glossário</button>
                  <div className="h-px bg-gray-100 my-2" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium"><LogOut className="h-4 w-4" /> Sair</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    </header>
  );
};

// ============================================================
// SIDEBAR
// ============================================================
const Sidebar = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
  activeVitrineId,
  setActiveVitrineId,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  activeVitrineId: string;
  setActiveVitrineId: (id: string) => void;
}) => {
  const [vitrineBusca, setVitrineBusca] = useState('');

  // Close sidebar on desktop resize or Escape key
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) onClose(); };
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const vitrineFiltradas = vitrineBusca.trim().length > 0
    ? VITRINES.filter(v =>
        v.nome.toLowerCase().includes(vitrineBusca.toLowerCase()) ||
        v.categoria.toLowerCase().includes(vitrineBusca.toLowerCase())
      )
    : VITRINES;
  const categorias = [...new Set(vitrineFiltradas.map(v => v.categoria))];

  const NAV_ITEMS = [
    { id: 'Conteúdo', label: 'Conteúdo', icon: BookOpen },
    { id: 'Social', label: 'Social', icon: Users },
    { id: 'Minha Área', label: 'Minha Área', icon: LayoutDashboard },
  ];

  const handleNavClick = (id: string) => { setActiveTab(id); onClose(); };

  return (
    <>
      {/* Single sidebar — CSS transform handles mobile open/close */}
      <aside
        className={`fixed left-0 top-0 lg:top-16 h-full lg:h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-100 z-40 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100 flex-shrink-0 lg:hidden">
          <img src={logoLector} alt="Lector" className="h-9 w-auto cursor-pointer" onClick={() => { setActiveTab('Conteúdo'); onClose(); }} />
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {/* Menu principal */}
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-brand-primary/8 text-brand-primary'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}

          <div className="h-px bg-gray-100 mx-1 my-3" />

          {/* Vitrines */}
          <p className="text-[11px] font-semibold text-gray-400 px-2 mb-2 tracking-wide">Vitrines</p>
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Buscar vitrine..."
              value={vitrineBusca}
              onChange={e => setVitrineBusca(e.target.value)}
              className="w-full pl-7 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
            />
            <Search className="absolute left-2 top-[7px] w-3.5 h-3.5 text-gray-400" />
          </div>

          {categorias.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-3">Nenhuma encontrada</p>
          )}
          {categorias.map(cat => (
            <div key={cat} className="mb-1">
              <p className={`text-[10px] font-medium px-2 py-0.5 mb-0.5 ${CATEGORIA_COR[cat] ?? 'text-gray-400'}`}>{cat}</p>
              {vitrineFiltradas.filter(v => v.categoria === cat).map(vitrine => {
                const isActive = vitrine.id === activeVitrineId;
                return (
                  <button
                    key={vitrine.id}
                    onClick={() => { setActiveVitrineId(vitrine.id); onClose(); }}
                    className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-brand-primary/10 text-brand-primary' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-white text-[10px] font-black"
                      style={{ background: vitrine.cor }}
                    >
                      {vitrine.nome.charAt(0)}
                    </span>
                    <span className="flex-1 text-left text-xs font-semibold truncate">{vitrine.nome}</span>
                    {isActive && <Check className="w-3 h-3 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Backdrop - mobile only */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};

type StorySegment = { type: 'image' | 'video'; url: string };
type Story = { id: number; user: { id: number; name: string; role: string; avatar: string }; segments: StorySegment[]; viewed: boolean };

const STORY_USERS = [
  { id: 1, name: 'Lia do RH', role: 'Recursos Humanos', avatar: 'https://ui-avatars.com/api/?name=Lia+RH&background=F3E8FF&color=9333EA' },
  { id: 2, name: 'Patrick', role: 'Engenharia de Software', avatar: 'https://ui-avatars.com/api/?name=Patrick&background=DBEAFE&color=2563EB' },
  { id: 3, name: 'Carla', role: 'Marketing', avatar: 'https://ui-avatars.com/api/?name=Carla&background=FCE7F3&color=DB2777' },
  { id: 4, name: 'Serginho', role: 'Vendas', avatar: 'https://ui-avatars.com/api/?name=Serginho&background=FEF3C7&color=D97706' },
];

const INITIAL_STORIES: Story[] = [
  { id: 1, user: STORY_USERS[0], viewed: false, segments: [{ type: 'image', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=890&fit=crop' }] },
  { id: 2, user: STORY_USERS[1], viewed: false, segments: [{ type: 'image', url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=890&fit=crop' }, { type: 'image', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=890&fit=crop' }] },
  { id: 3, user: STORY_USERS[2], viewed: false, segments: [{ type: 'image', url: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=500&h=890&fit=crop' }] },
  { id: 4, user: STORY_USERS[3], viewed: false, segments: [{ type: 'image', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=890&fit=crop' }] },
];

const StoryViewerSideCard = ({ s, side, onPrev, onNext }: { s: Story; side: 'left' | 'right'; onPrev: () => void; onNext: () => void }) => (
  <div
    onClick={side === 'left' ? onPrev : onNext}
    className="absolute top-1/2 cursor-pointer select-none"
    style={{
      transform: `translateY(-50%) translateX(${side === 'left' ? '-65%' : '65%'}) scale(0.87)`,
      [side === 'left' ? 'right' : 'left']: '50%',
      zIndex: 5,
      opacity: 0.65,
    }}
  >
    <div className="w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl max-h-[72vh]">
      {s.segments[0].type === 'image'
        ? <img src={s.segments[0].url} alt="" className="w-full h-full object-cover" />
        : <video src={s.segments[0].url} className="w-full h-full object-cover scale-x-[-1]" muted />
      }
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center gap-2">
          <img src={s.user.avatar} alt={s.user.name} className="w-8 h-8 rounded-full border-2 border-white/50" />
          <div>
            <p className="text-white font-bold text-sm leading-tight">{s.user.name}</p>
            <p className="text-white/60 text-[11px]">1 h</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SOCIAL_FEEDS = [
  { id: 'geral', label: 'Geral' },
  { id: 'rh', label: 'Recursos Humanos' },
  { id: 'tecnologia', label: 'Tecnologia' },
  { id: 'lideranca', label: 'Liderança' },
  { id: 'comercial', label: 'Comercial' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'inovacao', label: 'Inovação' },
];

const SOCIAL_BANNER_SLIDES = [
  { text: 'Bem-vindo à sua plataforma de aprendizagem', sub: 'Cresça junto com sua equipe todos os dias' },
  { text: 'Compartilhe conquistas e ideias', sub: 'Celebre cada avanço com quem importa' },
  { text: 'Desenvolva novas habilidades', sub: 'Seu próximo nível começa aqui' },
  { text: 'Conecte-se com sua organização', sub: 'Troca de conhecimento que transforma' },
];

const SocialView = () => {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [activeFeed, setActiveFeed] = useState('geral');
  const [activeProfile, setActiveProfile] = useState<any | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const storyRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const scrollStory = (dir: 'left' | 'right') => storyRef.current?.scrollBy({ left: dir === 'right' ? 140 : -140, behavior: 'smooth' });
  const scrollFeed = (dir: 'left' | 'right') => feedRef.current?.scrollBy({ left: dir === 'right' ? 180 : -180, behavior: 'smooth' });

  // ── Stories ──────────────────────────────────────────────────────
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);

  // Recorder
  const [recorderOpen, setRecorderOpen] = useState(false);
  const [recState, setRecState] = useState<'idle' | 'recording' | 'review'>('idle');
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const MAX_REC = 15;
  const cameraRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % SOCIAL_BANNER_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!recorderOpen) {
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;
      if (recTimerRef.current) clearInterval(recTimerRef.current);
      return;
    }
    setRecState('idle');
    setRecordedUrl(null);
    setRecordSeconds(0);
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true })
      .then(stream => {
        streamRef.current = stream;
        if (cameraRef.current) { cameraRef.current.srcObject = stream; cameraRef.current.play(); }
      })
      .catch(() => setRecorderOpen(false));
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()); if (recTimerRef.current) clearInterval(recTimerRef.current); };
  }, [recorderOpen]);

  const startRecording = () => {
    if (!streamRef.current) return;
    chunksRef.current = [];
    const mr = new MediaRecorder(streamRef.current, { mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm' });
    mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedUrl(URL.createObjectURL(blob));
      setRecState('review');
    };
    mr.start(100);
    recorderRef.current = mr;
    setRecState('recording');
    let secs = 0;
    recTimerRef.current = setInterval(() => {
      secs++;
      setRecordSeconds(secs);
      if (secs >= MAX_REC) stopRecording();
    }, 1000);
  };

  const stopRecording = () => {
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    recorderRef.current?.stop();
  };

  const publishStory = () => {
    if (!recordedUrl) return;
    const me = { id: 0, name: 'Caio Gomes', role: 'Você', avatar: 'https://ui-avatars.com/api/?name=Caio+Gomes&background=FF7A1A&color=fff' };
    setStories(prev => {
      const idx = prev.findIndex(s => s.id === 0);
      if (idx !== -1) return prev.map(s => s.id === 0 ? { ...s, segments: [...s.segments, { type: 'video' as const, url: recordedUrl }], viewed: false } : s);
      return [{ id: 0, user: me, segments: [{ type: 'video' as const, url: recordedUrl }], viewed: false }, ...prev];
    });
    setRecorderOpen(false);
  };

  // Viewer
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerStoryIdx, setViewerStoryIdx] = useState(0);
  const [viewerSegIdx, setViewerSegIdx] = useState(0);
  const [segProgress, setSegProgress] = useState(0);
  const viewerVideoRef = useRef<HTMLVideoElement>(null);
  const segTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearSegTimer = () => { if (segTimerRef.current) { clearInterval(segTimerRef.current); segTimerRef.current = null; } };

  const advanceSegment = (sIdx: number, stIdx: number, allStories: Story[]) => {
    const story = allStories[stIdx];
    if (!story) { setViewerOpen(false); return; }
    if (sIdx < story.segments.length - 1) { setViewerSegIdx(sIdx + 1); setSegProgress(0); }
    else if (stIdx < allStories.length - 1) { setViewerStoryIdx(stIdx + 1); setViewerSegIdx(0); setSegProgress(0); }
    else setViewerOpen(false);
  };

  const goNext = () => { clearSegTimer(); advanceSegment(viewerSegIdx, viewerStoryIdx, stories); };
  const goPrev = () => {
    clearSegTimer();
    if (viewerSegIdx > 0) { setViewerSegIdx(i => i - 1); setSegProgress(0); }
    else if (viewerStoryIdx > 0) { setViewerStoryIdx(i => i - 1); setViewerSegIdx(0); setSegProgress(0); }
  };

  const [likedStories, setLikedStories] = useState<string[]>([]);
  const [storyReply, setStoryReply] = useState('');
  const toggleStoryLike = (key: string) => setLikedStories(p => p.includes(key) ? p.filter(k => k !== key) : [...p, key]);

  const openViewer = (idx: number) => {
    setViewerStoryIdx(idx); setViewerSegIdx(0); setSegProgress(0); setViewerOpen(true);
    setStories(prev => prev.map((s, i) => i === idx ? { ...s, viewed: true } : s));
  };

  useEffect(() => {
    if (!viewerOpen) { clearSegTimer(); return; }
    const story = stories[viewerStoryIdx];
    if (!story) return;
    const seg = story.segments[viewerSegIdx];
    if (!seg) return;
    clearSegTimer();
    setSegProgress(0);
    if (seg.type === 'image') {
      const duration = 5000;
      const step = 50;
      let elapsed = 0;
      segTimerRef.current = setInterval(() => {
        elapsed += step;
        setSegProgress((elapsed / duration) * 100);
        if (elapsed >= duration) { clearSegTimer(); advanceSegment(viewerSegIdx, viewerStoryIdx, stories); }
      }, step);
    }
    return clearSegTimer;
  }, [viewerOpen, viewerStoryIdx, viewerSegIdx]);

  // ── Feed data ──────────────────────────────────────────────────────
  const users = STORY_USERS;

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


  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] relative">

      {/* HEADER BANNER */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #041433 0%, #0a2254 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FF7A1A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2563EB 0%, transparent 40%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative flex flex-col items-center text-center">
          <img src={logoLector} alt="Lector" className="h-10 w-auto mb-6 brightness-0 invert" />
          <div className="relative h-20 w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={bannerIdx}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute text-center px-4"
              >
                <p className="text-white text-xl sm:text-2xl font-bold leading-snug">{SOCIAL_BANNER_SLIDES[bannerIdx].text}</p>
                <p className="text-white/55 text-sm mt-1.5">{SOCIAL_BANNER_SLIDES[bannerIdx].sub}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-1.5 mt-4">
            {SOCIAL_BANNER_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setBannerIdx(i)}
                className={`rounded-full transition-all duration-300 ${i === bannerIdx ? 'w-5 h-1.5 bg-brand-primary' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FEEDS / FÓRUNS */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-1">
          <button onClick={() => scrollFeed('left')} className="flex-shrink-0 text-gray-300 hover:text-gray-600 transition-colors p-1">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div ref={feedRef} className="flex items-center gap-2 overflow-x-hidden flex-1" style={{ scrollbarWidth: 'none' }}>
            {SOCIAL_FEEDS.map(feed => (
              <button
                key={feed.id}
                onClick={() => setActiveFeed(feed.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeFeed === feed.id
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                {feed.label}
              </button>
            ))}
          </div>
          <button onClick={() => scrollFeed('right')} className="flex-shrink-0 text-gray-300 hover:text-gray-600 transition-colors p-1">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FEED */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">

        {/* CRIAR POST */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5">
          <div className="flex gap-4 mb-4">
            <img src={users[0].avatar} alt="Seu Perfil" className="w-10 h-10 rounded-full shadow-sm flex-shrink-0" />
            <input
              type="text"
              placeholder="Compartilhe algo com a rede..."
              className="flex-grow bg-gray-50 border border-gray-200 rounded-full px-5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
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
            <button className="bg-brand-primary text-white font-semibold text-sm px-6 py-2 rounded-full hover:opacity-90 shadow-sm transition-opacity">
              Publicar
            </button>
          </div>
        </div>

        {/* LABEL DO FEED */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-brand-primary" />
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Feed Recente</h3>
          </div>
          <button className="text-sm text-brand-primary font-medium hover:underline">
            Filtrar timeline
          </button>
        </div>

        {/* POSTS */}
        {posts.map((post, index) => {
          const isLiked = likedPosts.includes(post.id);
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setActiveProfile(post.user)} className="flex-shrink-0">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-11 h-11 rounded-full shadow-sm hover:ring-2 hover:ring-brand-primary hover:ring-offset-2 transition-all"
                    />
                  </button>
                  <div>
                    <button
                      onClick={() => setActiveProfile(post.user)}
                      className="font-bold text-gray-900 hover:text-brand-primary transition-colors text-[15px] leading-tight"
                    >
                      {post.user.name}
                    </button>
                    <p className="text-xs text-gray-400 mt-0.5">{post.time} · {post.user.role}</p>
                  </div>
                </div>
                <Tooltip content="Mais Opções">
                  <button className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>

              {/* Conteúdo */}
              <div className="px-5 pb-4">
                <p className="text-gray-700 leading-relaxed text-[15px] mb-4">{post.content}</p>
                {post.image && (
                  <div className="rounded-xl overflow-hidden border border-gray-100">
                    <img src={post.image} alt="Publicação" className="w-full h-auto object-cover max-h-96" />
                  </div>
                )}
              </div>

              {/* Action bar */}
              <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-6">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 font-semibold text-sm transition-colors ${isLiked ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  <motion.div animate={{ scale: isLiked ? [1, 1.35, 1] : 1 }} transition={{ duration: 0.25 }}>
                    <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                  </motion.div>
                  {post.likes + (isLiked ? 1 : 0)}
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-2 font-semibold text-sm text-gray-500 hover:text-gray-800 transition-colors"
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
                    className="border-t border-gray-100 bg-gray-50/40 overflow-hidden"
                  >
                    <div className="px-5 py-4 space-y-4">
                      {post.commentsList.map(comment => (
                        <div key={comment.id} className="flex gap-3 text-sm">
                          <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full shadow-sm flex-shrink-0" />
                          <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex-grow shadow-sm">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-gray-900">{comment.user.name}</span>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{comment.time}</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-3 pt-3 border-t border-gray-100">
                        <img src={users[0].avatar} alt="Seu Perfil" className="w-8 h-8 rounded-full shadow-sm flex-shrink-0" />
                        <div className="flex-grow flex relative">
                          <input
                            type="text"
                            placeholder="Escreva um comentário..."
                            className="w-full bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary shadow-sm transition-all"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                          />
                          <div className="absolute right-1 top-1/2 -translate-y-1/2">
                            <Tooltip content="Enviar" direction="left">
                              <button
                                onClick={() => handleAddComment(post.id)}
                                className={`p-1.5 rounded-full transition-colors ${commentInputs[post.id]?.trim() ? 'bg-brand-primary text-white hover:bg-brand-primary/90' : 'text-gray-400 bg-gray-100 hover:bg-gray-200'}`}
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

      {/* ── STORY RECORDER ──────────────────────────────────────── */}
      <AnimatePresence>
        {recorderOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black flex flex-col items-center justify-center"
          >
            {/* Header */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 pt-5 z-10">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {recState === 'review' ? 'Seu Story' : 'Novo Story'}
              </span>
              <button onClick={() => setRecorderOpen(false)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera / Review */}
            <div className="relative w-full max-w-sm aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden">
              {recState !== 'review' && (
                <video ref={cameraRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
              )}
              {recState === 'review' && recordedUrl && (
                <video src={recordedUrl} autoPlay loop playsInline className="w-full h-full object-cover scale-x-[-1]" />
              )}

              {/* Recording progress bar */}
              {recState === 'recording' && (
                <div className="absolute top-0 inset-x-0 h-1 bg-white/20">
                  <motion.div
                    className="h-full bg-brand-primary"
                    animate={{ width: `${(recordSeconds / MAX_REC) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
              {recState === 'recording' && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {MAX_REC - recordSeconds}s
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-col items-center gap-4">
              {recState === 'idle' && (
                <button
                  onClick={startRecording}
                  className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                >
                  <span className="w-10 h-10 rounded-full bg-red-500 block" />
                </button>
              )}
              {recState === 'recording' && (
                <button
                  onClick={stopRecording}
                  className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                >
                  <span className="w-6 h-6 rounded bg-white block" />
                </button>
              )}
              {recState === 'review' && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => { setRecState('idle'); setRecordedUrl(null); setRecordSeconds(0); }}
                    className="px-6 py-2.5 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition"
                  >
                    Gravar de novo
                  </button>
                  <button
                    onClick={publishStory}
                    className="px-6 py-2.5 rounded-full bg-brand-primary text-white text-sm font-bold hover:opacity-90 transition shadow-lg"
                  >
                    Publicar Story
                  </button>
                </div>
              )}
              {recState === 'idle' && (
                <p className="text-white/40 text-xs">Toque para gravar · máximo {MAX_REC}s</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STORY VIEWER ─────────────────────────────────────────── */}
      <AnimatePresence>
        {viewerOpen && stories[viewerStoryIdx] && (() => {
          const story = stories[viewerStoryIdx];
          const seg = story.segments[viewerSegIdx];
          const prevStory = stories[viewerStoryIdx - 1];
          const nextStory = stories[viewerStoryIdx + 1];
          const likeKey = `${story.id}-${viewerSegIdx}`;
          const isLiked = likedStories.includes(likeKey);


          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] flex flex-col items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.92)' }}
            >
              {/* Close */}
              <button
                onClick={() => setViewerOpen(false)}
                className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Cards area */}
              <div className="relative flex items-center justify-center w-full overflow-hidden" style={{ height: 'calc(100dvh - 90px)' }}>

                {/* Side cards */}
                {prevStory && <StoryViewerSideCard s={prevStory} side="left" onPrev={goPrev} onNext={goNext} />}
                {nextStory && <StoryViewerSideCard s={nextStory} side="right" onPrev={goPrev} onNext={goNext} />}

                {/* Active card */}
                <motion.div
                  key={`story-${viewerStoryIdx}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 flex-shrink-0"
                  style={{ width: 'min(360px, 90vw)' }}
                >
                  <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl" style={{ maxHeight: 'calc(100dvh - 90px)' }}>

                    {/* Tap zones */}
                    <div className="absolute inset-0 flex z-20 pointer-events-auto">
                      <div className="flex-1 cursor-pointer" onClick={goPrev} />
                      <div className="flex-1 cursor-pointer" onClick={goNext} />
                    </div>

                    {/* Media */}
                    {seg.type === 'image'
                      ? <img src={seg.url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      : <video
                          ref={viewerVideoRef}
                          src={seg.url}
                          autoPlay
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                          onEnded={goNext}
                          onTimeUpdate={e => { const v = e.currentTarget; if (v.duration) setSegProgress((v.currentTime / v.duration) * 100); }}
                        />
                    }

                    {/* Gradients */}
                    <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                    {/* Progress bars */}
                    <div className="relative z-30 flex gap-[3px] px-3 pt-3">
                      {story.segments.map((_, i) => (
                        <div key={i} className="flex-1 h-[3px] rounded-full bg-white/30 overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-none"
                            style={{ width: i < viewerSegIdx ? '100%' : i === viewerSegIdx ? `${segProgress}%` : '0%' }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* User info row */}
                    <div className="relative z-30 flex items-center gap-3 px-4 pt-3">
                      <img src={story.user.avatar} alt={story.user.name} className="w-9 h-9 rounded-full border-2 border-white/60 shadow" />
                      <div className="flex-1">
                        <p className="text-white font-bold text-sm leading-tight">{story.user.name}</p>
                        <p className="text-white/60 text-[11px]">1 h · {story.user.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Reply bar */}
              <div className="w-full flex items-center gap-3 px-4 pb-4 pt-3" style={{ maxWidth: 'min(360px, 90vw)' }}>
                <input
                  type="text"
                  placeholder={`Responder a ${story.user.name.split(' ')[0]}...`}
                  value={storyReply}
                  onChange={e => setStoryReply(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && setStoryReply('')}
                  className="flex-grow bg-white/10 border border-white/25 rounded-full px-4 py-2.5 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white/50 transition"
                />
                <motion.button
                  onClick={() => toggleStoryLike(likeKey)}
                  animate={{ scale: isLiked ? [1, 1.35, 1] : 1 }}
                  transition={{ duration: 0.25 }}
                  className={`p-2 flex-shrink-0 transition ${isLiked ? 'text-red-400' : 'text-white/60 hover:text-white'}`}
                >
                  <Heart className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} />
                </motion.button>
                <button
                  onClick={() => setStoryReply('')}
                  className="p-2 flex-shrink-0 text-white/60 hover:text-white transition"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>

              {/* Chevron nav buttons */}
              {prevStory && (
                <button
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              {nextStory && (
                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* MODAL DE PERFIL */}
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
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="relative h-28" style={{ background: 'linear-gradient(135deg, #041433 0%, #0a2254 100%)' }}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #FF7A1A 0%, transparent 60%)' }} />
                <div className="absolute top-4 right-4">
                  <button onClick={() => setActiveProfile(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="px-6 -mt-10 mb-4">
                <img src={activeProfile.avatar} alt={activeProfile.name} className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-3 bg-white" />
                <h2 className="text-xl font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{activeProfile.name}</h2>
                <p className="text-brand-primary font-medium text-sm">{activeProfile.role}</p>
              </div>
              <div className="px-6 flex items-center gap-8 mb-5 pb-5 border-b border-gray-100">
                {[['45', 'Posts'], ['12', 'Grupos'], ['2.4k', 'Likes']].map(([val, label]) => (
                  <div key={label} className="text-center">
                    <span className="block text-xl font-bold text-gray-900">{val}</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex-grow overflow-y-auto px-6 pb-8">
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Últimas Publicações</h3>
                <div className="space-y-3">
                  {['Estou muito feliz de anunciar a nova turma do treinamento de liderança!', 'Agradecimentos ao time pelo empenho na entrega de sexta-feira.'].map((text, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-sm text-gray-600 line-clamp-3">{text}</p>
                      <span className="text-xs text-gray-400 mt-2 block">{i === 0 ? 'Há 2 dias' : 'Semana passada'}</span>
                    </div>
                  ))}
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
      nome: 'Fundamentos de Inteligência Artificial para Negócios',
      cargaHoraria: '03:20:00',
      inscricao: '10/03/2026',
      termino: '-',
      expiracao: '-',
      situacao: 'Em andamento',
      progresso: 28.57,
      aproveitamento: 28.57,
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: '2',
      nome: 'ChatGPT para Produtividade no Trabalho',
      cargaHoraria: '02:45:00',
      inscricao: '20/02/2026',
      termino: '-',
      expiracao: '-',
      situacao: 'Em andamento',
      progresso: 14.29,
      aproveitamento: 14.29,
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: '3',
      nome: 'Automação de Processos com Inteligência Artificial',
      cargaHoraria: '04:10:00',
      inscricao: '15/01/2026',
      termino: '10/03/2026',
      expiracao: '-',
      situacao: 'Aguardando correção de avaliações',
      progresso: 100,
      aproveitamento: 62.5,
      badgeColor: 'bg-amber-100 text-amber-700'
    },
    {
      id: '4',
      nome: 'Gestão do Tempo com Ferramentas de IA',
      cargaHoraria: '02:10:00',
      inscricao: '05/12/2025',
      termino: '05/12/2025',
      expiracao: '-',
      situacao: 'Evadido',
      progresso: 42.86,
      aproveitamento: 0,
      badgeColor: 'bg-gray-100 text-gray-700'
    },
    {
      id: '5',
      nome: 'IA Aplicada à Criação de Conteúdo',
      cargaHoraria: '03:00:00',
      inscricao: '02/10/2025',
      termino: '15/11/2025',
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
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary rounded-lg text-sm transition-all text-gray-700"
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
                         className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedSituacao === opcao ? 'bg-brand-primary/10 text-brand-primary font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
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
               className={`px-5 py-2.5 border rounded-lg text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${isAdvancedFiltersOpen ? 'bg-brand-primary border-brand-primary text-white' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'}`}
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
                         className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-primary transition-colors font-medium"
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
                      <input type="text" placeholder="Data inicial" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <span className="text-gray-400 text-sm">até</span>
                    <div className="relative flex-1">
                      <input type="text" placeholder="Data final" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
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
                      <input type="text" placeholder="Data inicial" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <span className="text-gray-400 text-sm">até</span>
                    <div className="relative flex-1">
                      <input type="text" placeholder="Data final" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
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
                      className={`h-full rounded-full ${curso.situacao.includes('Concluído') ? 'bg-green-500' : 'bg-brand-primary'}`} 
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
                      className={`h-full rounded-full ${curso.situacao.includes('Concluído') ? 'bg-green-500' : 'bg-brand-primary'}`} 
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
                <button className="w-full sm:w-auto bg-brand-primary hover:bg-[#E07010] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
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
                ? 'bg-brand-primary text-white shadow-sm'
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
             <span className="text-3xl font-display font-bold text-brand-primary">33%</span>
           </div>
           <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-brand-primary" strokeWidth="4" strokeDasharray="33, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
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
                    <div className="h-full bg-brand-primary rounded-full" style={{ width: `${train.progress}%` }}></div>
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

const MyAreaTrilhas = () => {
  const [isSituacaoOpen, setIsSituacaoOpen] = useState(false);
  const situacaoOptions = ['Qualquer', 'Em andamento', 'Aguardando correção de avaliações', 'Evadido', 'Concluído - Aprovado', 'Concluído - Reprovado'];
  const [selectedSituacao, setSelectedSituacao] = useState('Qualquer');

  const [isExportOpen, setIsExportOpen] = useState(false);
  const exportOptions = ['CSV', 'Excel', 'PDF'];

  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  const trilhasData = [
    {
      id: '1',
      nome: 'Trilha Liderança e Performance de Equipes',
      cargaHoraria: '10:40:00',
      inscricao: '15/01/2026',
      termino: '-',
      expiracao: '-',
      situacao: 'Em andamento',
      progresso: 37.5,
      aproveitamento: 37.5,
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: '2',
      nome: 'Trilha Comunicação Corporativa de Alta Performance',
      cargaHoraria: '07:45:00',
      inscricao: '10/11/2025',
      termino: '15/02/2026',
      expiracao: '-',
      situacao: 'Aguardando correção de avaliações',
      progresso: 100,
      aproveitamento: 62.5,
      badgeColor: 'bg-amber-100 text-amber-700'
    },
    {
      id: '3',
      nome: 'Trilha Gestão do Tempo e Prioridades',
      cargaHoraria: '08:20:00',
      inscricao: '05/09/2025',
      termino: '-',
      expiracao: '-',
      situacao: 'Evadido',
      progresso: 25,
      aproveitamento: 0,
      badgeColor: 'bg-gray-100 text-gray-700'
    },
    {
      id: '4',
      nome: 'Trilha Gestão de Projetos para Times Corporativos',
      cargaHoraria: '11:15:00',
      inscricao: '12/07/2025',
      termino: '30/09/2025',
      expiracao: '-',
      situacao: 'Concluído - Aprovado',
      progresso: 100,
      aproveitamento: 88,
      badgeColor: 'bg-green-100 text-green-700'
    },
    {
      id: '5',
      nome: 'Trilha Eficiência Operacional e Processos',
      cargaHoraria: '10:30:00',
      inscricao: '20/04/2025',
      termino: '15/06/2025',
      expiracao: '-',
      situacao: 'Concluído - Reprovado',
      progresso: 100,
      aproveitamento: 42,
      badgeColor: 'bg-red-100 text-red-700'
    }
  ];

  return (
    <div className="space-y-6">

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col gap-4">

        {/* Top Row: Search and Quick Actions */}
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
          <div className="relative flex-grow w-full max-w-2xl">
            <input
              type="text"
              placeholder="Pesquisar trilhas por nome..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary rounded-lg text-sm transition-all text-gray-700"
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
                     className="absolute z-20 top-full mt-2 left-0 w-full min-w-[240px] bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 focus:outline-none overflow-hidden"
                   >
                     {situacaoOptions.map((opcao) => (
                       <button
                         key={opcao}
                         onClick={() => {
                           setSelectedSituacao(opcao);
                           setIsSituacaoOpen(false);
                         }}
                         className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedSituacao === opcao ? 'bg-brand-primary/10 text-brand-primary font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
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
               className={`px-5 py-2.5 border rounded-lg text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${isAdvancedFiltersOpen ? 'bg-brand-primary border-brand-primary text-white' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'}`}
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
                         className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-primary transition-colors font-medium"
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
                      <input type="text" placeholder="Data inicial" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <span className="text-gray-400 text-sm">até</span>
                    <div className="relative flex-1">
                      <input type="text" placeholder="Data final" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
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
                      <input type="text" placeholder="Data inicial" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <span className="text-gray-400 text-sm">até</span>
                    <div className="relative flex-1">
                      <input type="text" placeholder="Data final" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {trilhasData.map((trilha) => (
        <div key={trilha.id} className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col xl:flex-row gap-6 hover:shadow-md hover:border-gray-300 hover:bg-white transition-all relative overflow-hidden group">
          {trilha.situacao === 'Concluído - Aprovado' && (
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500/80"></div>
          )}
          {trilha.situacao === 'Concluído - Reprovado' && (
            <div className="absolute top-0 left-0 w-1 h-full bg-red-400/80"></div>
          )}

          {/* Esquerda: Informações da Trilha */}
          <div className="flex-grow xl:w-1/2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Compass className="w-4 h-4 text-brand-primary" />
              </div>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${trilha.badgeColor}`}>
                {trilha.situacao}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-4 pr-4">
              {trilha.nome}
            </h3>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-gray-500">
              {trilha.cargaHoraria !== '-' && (
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gray-400"/> {trilha.cargaHoraria}</span>
              )}
              {trilha.inscricao !== '-' && (
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-400"/> Inscrito em: {trilha.inscricao}</span>
              )}
              {trilha.termino !== '-' && (
                <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-600/60"/> Término: {trilha.termino}</span>
              )}
            </div>
          </div>

          {/* Direita: Progresso e Ações */}
          <div className="flex flex-col sm:flex-row xl:w-1/2 items-start xl:items-center justify-between gap-6 pt-5 xl:pt-0 border-t xl:border-t-0 xl:border-l border-gray-100 xl:pl-8">

            {/* Medidores */}
            <div className="flex flex-col gap-3 w-full xl:w-48 shrink-0">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Progresso</span>
                <div className="flex items-center gap-2">
                  <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${trilha.situacao === 'Concluído - Aprovado' ? 'bg-green-500' : trilha.situacao === 'Concluído - Reprovado' ? 'bg-red-400' : 'bg-brand-primary'}`}
                      style={{ width: `${trilha.progresso}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-12 text-right">{trilha.progresso.toFixed(2)}%</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Aproveitamento</span>
                <div className="flex items-center gap-2">
                  <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${trilha.situacao === 'Concluído - Aprovado' ? 'bg-green-500' : trilha.situacao === 'Concluído - Reprovado' ? 'bg-red-400' : 'bg-brand-primary'}`}
                      style={{ width: `${trilha.aproveitamento}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-12 text-right">{trilha.aproveitamento.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            {/* Ação Button Dinâmica */}
            <div className="flex-shrink-0 w-full sm:w-auto flex flex-col gap-2">
              {trilha.situacao === 'Em andamento' && (
                <button className="w-full sm:w-auto bg-brand-primary hover:bg-[#E07010] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Play size={16} fill="currentColor" /> Continuar Trilha
                </button>
              )}

              {trilha.situacao === 'Aguardando correção de avaliações' && (
                <button disabled className="w-full sm:w-auto bg-gray-100/50 text-gray-400 cursor-not-allowed px-6 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2">
                  <Clock size={16} /> Em Correção
                </button>
              )}

              {(trilha.situacao === 'Concluído - Aprovado' || trilha.situacao === 'Concluído - Reprovado') && (
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <TrendingUp size={15} /> Desempenho
                  </button>
                  {trilha.situacao === 'Concluído - Aprovado' && (
                    <button className="w-full sm:w-auto bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <Award size={15} /> Certificado
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      ))}

      {/* Paginação */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">Mostrando de 1 até 5 de 12 registros</span>
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

const MyAreaCertificados = () => {
  const certs = [
    { id: 1, nome: 'Comunicação Assertiva no Trabalho', data: '10/03/2026', carga: '8h' },
    { id: 2, nome: 'Gestão de Equipes Híbridas', data: '22/02/2026', carga: '12h' },
    { id: 3, nome: 'Liderança em Momentos Críticos', data: '05/01/2026', carga: '6h' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-brand-primary" />
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Certificados Emitidos</span>
        </div>
        <span className="text-xs text-gray-400">{certs.length} certificado{certs.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-4 hover:shadow-md hover:border-brand-primary/30 transition-all group">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award size={22} className="text-brand-primary" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 leading-tight text-sm">{c.nome}</h3>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> {c.data}</span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {c.carga}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-gray-50 border border-gray-200 hover:bg-brand-primary hover:border-brand-primary hover:text-white text-gray-600 rounded-xl py-2 text-sm font-semibold transition-all flex justify-center items-center gap-2">
              <Download size={15} /> Baixar PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MyAreaCalendario = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(today);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'done'>('all');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Completar Módulo 3 — Liderança', done: false, priority: 'high', date: today },
    { id: 2, title: 'Assistir aula gravada de Feedback', done: false, priority: 'medium', date: today },
    { id: 3, title: 'Preencher pesquisa GPTW', done: true, priority: 'low', date: today },
    { id: 4, title: 'Enviar trabalho Módulo 2', done: false, priority: 'high', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) },
    { id: 5, title: 'Agendar sessão de mentoria', done: false, priority: 'medium', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3) },
  ]);

  const events = [
    { id: 1, date: today, time: '14:00', title: 'Aula ao vivo: Liderança em Momentos Críticos', color: '#FF7A1A', type: 'aula' },
    { id: 2, date: today, time: '16:30', title: 'Prazo: Entrega do trabalho Módulo 2', color: '#EF4444', type: 'prazo' },
    { id: 3, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3), time: '10:00', title: 'Webinar: IA no Trabalho', color: '#2563EB', type: 'webinar' },
    { id: 4, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8), time: '09:00', title: 'Treinamento Presencial: Excel Avançado', color: '#FF7A1A', type: 'treinamento' },
    { id: 5, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 13), time: '15:00', title: 'Avaliação: Comunicação Assertiva', color: '#EF4444', type: 'prazo' },
    { id: 6, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 18), time: '—', title: 'Nova trilha disponível: Gestão de Dados', color: '#10B981', type: 'trilha' },
    { id: 7, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 21), time: '11:00', title: 'Certificação: Comunicação Assertiva', color: '#F59E0B', type: 'cert' },
  ];

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const yr = currentDate.getFullYear();
  const mo = currentDate.getMonth();
  const firstWeekday = new Date(yr, mo, 1).getDay();
  const daysInMonth = new Date(yr, mo + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(yr, mo, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsForDay = (d: Date) => events.filter(e => isSameDay(e.date, d));
  const selectedEvents = eventsForDay(selectedDay);
  const pendingTasks = tasks.filter(t => !t.done).length;
  const filteredTasks = tasks.filter(t =>
    taskFilter === 'pending' ? !t.done : taskFilter === 'done' ? t.done : true
  );
  const cyclePriority = (id: number) =>
    setTasks(prev => prev.map(t => t.id !== id ? t : {
      ...t, priority: ({ high: 'medium', medium: 'low', low: 'high' } as Record<string,string>)[t.priority] as 'high'|'medium'|'low'
    }));
  const deleteTask = (id: number) => setTasks(prev => prev.filter(t => t.id !== id));
  const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const DAYS = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

  const priorityBadge: Record<string, string> = {
    high: 'bg-red-50 text-red-600 border-red-200',
    medium: 'bg-orange-50 text-orange-600 border-orange-200',
    low: 'bg-gray-50 text-gray-500 border-gray-200',
  };
  const eventTypeIcon: Record<string, string> = { aula: '🎓', prazo: '⚠️', webinar: '💻', treinamento: '📚', trilha: '🧭', cert: '🏆' };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), title: newTaskText.trim(), done: false, priority: newTaskPriority, date: selectedDay }]);
    setNewTaskText('');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

      {/* ── CALENDÁRIO ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header do mês */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {MONTHS[mo]} <span className="text-gray-400 font-medium">{yr}</span>
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))}
              className="px-3 py-1.5 text-xs font-bold text-brand-primary border border-brand-primary/30 rounded-lg hover:bg-brand-primary/5 transition"
            >
              Hoje
            </button>
            <button onClick={() => setCurrentDate(new Date(yr, mo - 1, 1))} className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentDate(new Date(yr, mo + 1, 1))} className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Nomes dos dias */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[11px] font-bold text-gray-400 uppercase py-3 tracking-wider">{d}</div>
          ))}
        </div>

        {/* Células dos dias */}
        <div className="grid grid-cols-7 p-3 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const isToday = isSameDay(day, today);
            const isSel = isSameDay(day, selectedDay);
            const dayEvents = eventsForDay(day);
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(day)}
                className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all min-h-[52px]
                  ${isToday ? 'bg-brand-primary text-white shadow-sm' : isSel ? 'bg-brand-primary/10 text-brand-primary ring-1 ring-brand-primary/30' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                <span className={`text-sm font-bold leading-none ${isToday ? 'text-white' : isSel ? 'text-brand-primary' : ''}`}>
                  {day.getDate()}
                </span>
                {dayEvents.length > 0 && (
                  <div className="flex gap-[3px] mt-1 flex-wrap justify-center">
                    {dayEvents.slice(0, 3).map(ev => (
                      <span key={ev.id} className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: isToday ? 'rgba(255,255,255,0.7)' : ev.color }} />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="px-5 pb-4 flex flex-wrap gap-4">
          {[['#FF7A1A','Aulas'],['#EF4444','Prazos'],['#2563EB','Webinars'],['#10B981','Trilhas'],['#F59E0B','Certificações']].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c as string }} />
              <span className="text-[11px] text-gray-500 font-medium">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PAINEL LATERAL ── */}
      <div className="flex flex-col gap-4">

        {/* Eventos do dia selecionado */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {isSameDay(selectedDay, today) ? 'Hoje' : DAYS[selectedDay.getDay()]}
              </p>
              <h4 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {selectedDay.getDate()} de {MONTHS[selectedDay.getMonth()]}
              </h4>
            </div>
            {isSameDay(selectedDay, today) && (
              <span className="bg-brand-primary/10 text-brand-primary text-xs font-bold px-3 py-1 rounded-full">Hoje</span>
            )}
          </div>

          {selectedEvents.length === 0 ? (
            <div className="text-center py-6">
              <Calendar className="w-8 h-8 mx-auto text-gray-200 mb-2" />
              <p className="text-sm text-gray-400">Sem eventos neste dia</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map(ev => {
                const isOnline = ev.type === 'aula' || ev.type === 'webinar';
                return (
                  <div key={ev.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-lg leading-none mt-0.5">{eventTypeIcon[ev.type]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{ev.title}</p>
                      {ev.time !== '—' && (
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {ev.time}
                        </p>
                      )}
                      {isOnline && (
                        <button className="mt-2 flex items-center gap-1.5 bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity shadow-sm">
                          <Play className="w-3 h-3" fill="currentColor" /> Acessar
                        </button>
                      )}
                    </div>
                    <div className="w-1 h-full min-h-[32px] rounded-full flex-shrink-0" style={{ backgroundColor: ev.color }} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tarefas */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex-1">

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Tarefas</h4>
              {pendingTasks > 0 && (
                <span className="bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{pendingTasks}</span>
              )}
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1">
            {([['all','Todas'], ['pending','Pendentes'], ['done','Concluídas']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setTaskFilter(val)}
                className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-all ${
                  taskFilter === val ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input nova tarefa */}
          <div className="flex gap-2 mb-4">
            {/* Seletor de prioridade */}
            <button
              onClick={() => setNewTaskPriority(p => ({ high: 'medium', medium: 'low', low: 'high' } as Record<string,'high'|'medium'|'low'>)[p])}
              className={`px-2.5 py-2 rounded-lg text-[10px] font-bold uppercase border transition flex-shrink-0 ${priorityBadge[newTaskPriority]}`}
              title="Clique para trocar a prioridade"
            >
              {newTaskPriority === 'high' ? 'Alta' : newTaskPriority === 'medium' ? 'Média' : 'Baixa'}
            </button>
            <input
              type="text"
              placeholder="Nova tarefa..."
              value={newTaskText}
              onChange={e => setNewTaskText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition"
            />
            <button
              onClick={addTask}
              className="px-3 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Lista */}
          <div className="space-y-1">
            {filteredTasks.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-6">Nenhuma tarefa {taskFilter === 'pending' ? 'pendente' : taskFilter === 'done' ? 'concluída' : ''}</p>
            )}
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center gap-2.5 py-2 px-2 rounded-lg transition-all group ${task.done ? 'opacity-60' : 'hover:bg-gray-50'}`}
              >
                {/* Checkbox */}
                <button
                  onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${task.done ? 'bg-brand-primary border-brand-primary' : 'border-gray-300 hover:border-brand-primary'}`}
                >
                  {task.done && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </button>

                {/* Título */}
                <p className={`flex-1 text-sm min-w-0 leading-tight ${task.done ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                  {task.title}
                </p>

                {/* Badge de prioridade — clicável para trocar */}
                <button
                  onClick={() => cyclePriority(task.id)}
                  title="Clique para trocar a prioridade"
                  className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border flex-shrink-0 transition-opacity hover:opacity-70 ${priorityBadge[task.priority]}`}
                >
                  {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                </button>

                {/* Botão deletar — aparece no hover */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                  title="Remover tarefa"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyAreaView = () => {
  const tabs = [
    { label: 'Meus Treinamentos', icon: BookOpen },
    { label: 'Minhas Trilhas', icon: Compass },
    { label: 'Minhas Habilidades', icon: Brain },
    { label: 'Meus Certificados', icon: Award },
    { label: 'Meu Calendário', icon: Calendar },
    { label: 'Minhas Compras', icon: ShoppingBag },
  ];
  const [activeSubTab, setActiveSubTab] = useState('Meus Treinamentos');

  const stats = [
    { label: 'Treinamentos', value: '5', sub: '1 concluído', icon: BookOpen },
    { label: 'Trilhas', value: '3', sub: '1 em andamento', icon: Compass },
    { label: 'Certificados', value: '3', sub: 'emitidos', icon: Award },
    { label: 'Horas', value: '24h', sub: 'de aprendizado', icon: Clock },
  ];

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)]">

      {/* ── HEADER BANNER ── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #041433 0%, #0a2254 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 15% 60%, #FF7A1A 0%, transparent 50%), radial-gradient(circle at 85% 20%, #2563EB 0%, transparent 45%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <img
              src="https://ui-avatars.com/api/?name=Caio+Gomes&background=FF7A1A&color=fff&size=80"
              alt="Caio Gomes"
              className="w-16 h-16 rounded-full border-2 border-white/20 shadow-lg flex-shrink-0"
            />
            <div className="flex-1">
              <p className="text-white/50 text-sm font-medium">Bem-vindo de volta,</p>
              <h1 className="text-white font-bold text-2xl leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Caio Gomes</h1>
              <p className="text-white/50 text-sm mt-0.5">Engenharia de Software · Analista SR</p>
            </div>
          </div>

          {/* Stats rápidos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {stats.map(s => (
              <div key={s.label} className="rounded-xl px-4 py-3 border border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <s.icon className="w-3.5 h-3.5 text-brand-primary" />
                  <span className="text-white/50 text-[11px] font-medium">{s.label}</span>
                </div>
                <p className="text-white font-bold text-xl leading-none" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
                <p className="text-white/40 text-[11px] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SUB-TABS ── */}
      <div className="bg-white border-b border-gray-200 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex overflow-x-auto scrollbar-hide pb-[1px] gap-1">
            {tabs.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setActiveSubTab(label)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-[3px] flex-shrink-0 ${
                  activeSubTab === label
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTEÚDO ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-8 min-h-[400px]">
        {activeSubTab === 'Meus Treinamentos' && <MyAreaTreinamentos />}
        {activeSubTab === 'Minhas Trilhas' && <MyAreaTrilhas />}
        {activeSubTab === 'Minhas Habilidades' && <MyAreaHabilidades />}
        {activeSubTab === 'Meus Certificados' && <MyAreaCertificados />}
        {activeSubTab === 'Meu Calendário' && <MyAreaCalendario />}
        {activeSubTab === 'Minhas Compras' && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-5">
              <ShoppingBag className="w-10 h-10 text-brand-primary/40" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Nenhuma compra ainda</h3>
            <p className="text-gray-500 text-sm max-w-xs">Quando você adquirir um treinamento ou upgrade de plano, ele aparecerá aqui.</p>
            <button className="mt-6 bg-brand-primary text-white px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition text-sm shadow-sm">
              Explorar Treinamentos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const HERO_SLIDES_DEFAULT = [
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
          <h3 className="mt-2 text-3xl font-display font-bold text-white leading-tight">Copsoq</h3>
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

const HERO_SLIDES_QA = [
  {
    id: 'qa-slide-1',
    badge: 'Time QA • Lector Live',
    title: (
      <>
        Garanta que o que foi<br />
        prometido <span className="text-gradient-orange">realmente funciona.</span>
      </>
    ),
    description:
      'Biblioteca completa do time de QA: do onboarding ao checklist completo do sistema. Valide fluxos, documente chamados e evite regressões com processos sólidos.',
    card: (
      <div className="relative rounded-3xl overflow-hidden aspect-[4/5] p-6 flex flex-col justify-between"
           style={{ background: 'linear-gradient(135deg, #082040 0%, #0c2d5e 55%, #0EA5E9 160%)' }}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[10px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            BIBLIOTECA QA
          </span>
          <Shield className="w-5 h-5 text-sky-300/70" />
        </div>
        <div className="space-y-2">
          {['Validar fluxo completo', 'Evitar regressão', 'Organizar processo', 'Documentar chamados'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-sky-400/20 border border-sky-400/40 flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-sky-300" />
              </div>
              <span className="text-sm text-white/80">{item}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-white/50 text-xs uppercase tracking-widest font-semibold">QA</p>
          <h3 className="mt-1 text-2xl font-display font-bold text-white leading-tight">Lector Live</h3>
          <p className="mt-2 text-sm text-white/60">11 treinamentos · 11 trilhas</p>
        </div>
      </div>
    ),
  },
  {
    id: 'qa-slide-2',
    badge: 'Automação • Testes em Escala',
    title: (
      <>
        Automatize fluxos críticos,<br />
        <span className="text-gradient-orange">previna regressões.</span>
      </>
    ),
    description:
      'Aprenda a estruturar testes independentes, escolher o que automatizar e manter a suíte atualizada a cada liberação — sem aumentar a complexidade do processo.',
    card: (
      <div className="relative rounded-3xl overflow-hidden aspect-[4/5] p-6 flex flex-col justify-between"
           style={{ background: 'linear-gradient(135deg, #061830 0%, #0a2550 60%, #FF7A1A 160%)' }}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[10px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            AUTOMAÇÃO
          </span>
          <Code className="w-5 h-5 text-white/50" />
        </div>
        <div className="space-y-1.5">
          {['Login e autenticação', 'Matrícula e pagamento', 'Trilhas e progresso', 'Vitrines e treinamentos'].map(item => (
            <div key={item} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
              <span className="text-xs text-white/75 font-mono">{item}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-white/50 text-xs uppercase tracking-widest font-semibold">Fluxos Críticos</p>
          <h3 className="mt-1 text-2xl font-display font-bold text-white leading-tight">Candidatos naturais</h3>
          <p className="mt-2 text-sm text-white/60">Alto impacto · Recorrentes · Bem definidos</p>
        </div>
      </div>
    ),
  },
];

const Hero = ({ layoutVersion = 1, activeVitrineId = 'v1' }: { layoutVersion?: number; activeVitrineId?: string }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    setCurrentBanner(0);
  }, [activeVitrineId]);

  useEffect(() => {
    const slides = activeVitrineId === 'v7' ? HERO_SLIDES_QA : HERO_SLIDES_DEFAULT;
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeVitrineId]);

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

  const slides = activeVitrineId === 'v7' ? HERO_SLIDES_QA : HERO_SLIDES_DEFAULT;
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
            <button className="absolute right-2 top-2 bottom-2 bg-brand-primary hover:bg-[#E07010] text-white px-8 rounded-lg font-medium transition-colors">
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeVitrineId, setActiveVitrineId] = useState('v1');

  const handleMenuToggle = useCallback(() => setIsSidebarOpen(v => !v), []);
  const handleSidebarClose = useCallback(() => setIsSidebarOpen(false), []);
  const handleVitrineChange = useCallback((id: string) => setActiveVitrineId(id), []);

  return (
    <div className="min-h-screen bg-white">
      <Topbar
        onMenuToggle={handleMenuToggle}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      {/* Content offset: pt-16 for topbar */}
      <div className="pt-16">
        <main className="min-h-[calc(100vh-64px)]">
          <AnimatePresence mode="wait">
            {activeTab === 'Conteúdo' && (
              <motion.div
                key="conteudo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Hero activeVitrineId={activeVitrineId} />
                <div className="bg-[#F7F9FC] py-12 border-t border-slate-200/70">
                  <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    <div className="flex-1 overflow-hidden">
                      {SECTIONS
                        .filter(s => (VITRINE_SECTIONS[activeVitrineId] ?? ['a1', 't1']).includes(s.id))
                        .map(section => (
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
    </div>
  );
}
