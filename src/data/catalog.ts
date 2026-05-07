import type { ContentTypeLabel } from '../components/training/SidebarContentIndicator';

export interface CatalogLesson {
  id: number;
  title: string;
  type: ContentTypeLabel;
  duration: string;
  status: 'completed' | 'current' | 'locked';
}

export interface CatalogEtapaItem {
  id: string;
  type: ContentTypeLabel;
  title: string;
  completed: boolean;
}

export interface CatalogEtapa {
  id: string;
  number: number;
  title: string;
  progress: number;
  items: CatalogEtapaItem[];
}

export interface CatalogCourse {
  id: string;
  title: string;
  duration: string;
  lessons: CatalogLesson[];
}

export interface CatalogTrail {
  id: string;
  title: string;
  duration: string;
  etapas: CatalogEtapa[];
}

const L = (id: number, title: string, type: ContentTypeLabel, duration: string, status: CatalogLesson['status'] = 'locked'): CatalogLesson =>
  ({ id, title, type, duration, status });

const I = (id: string, type: ContentTypeLabel, title: string, completed = false): CatalogEtapaItem =>
  ({ id, type, title, completed });

export const CATALOG_COURSES: CatalogCourse[] = [
  {
    id: 'a1-0',
    title: 'Fundamentos de Inteligência Artificial para Negócios',
    duration: '03:20:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'O que é Inteligência Artificial', 'Vídeos', '18:00', 'current'),
      L(3, 'IA nos Negócios: Casos de Uso Reais', 'Documentos', '15 min'),
      L(4, 'Ferramentas de IA Essenciais', 'Vídeos', '25:00'),
      L(5, 'Automação com IA na Prática', 'Scorm', '30:00'),
      L(6, 'Implementando IA na sua Empresa', 'Aula presencial', '01:00h'),
      L(7, 'Avaliação Final', 'Avaliação', '20:00'),
    ],
  },
  {
    id: 'a1-1',
    title: 'ChatGPT para Produtividade no Trabalho',
    duration: '02:45:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'Introdução ao ChatGPT', 'Vídeos', '15:00', 'current'),
      L(3, 'Guia de Primeiros Prompts', 'Documentos', '10 min'),
      L(4, 'Criando Prompts Eficientes', 'Vídeos', '20:00'),
      L(5, 'ChatGPT nas Tarefas do Dia a Dia', 'Scorm', '25:00'),
      L(6, 'Cases Reais de Produtividade', 'Vídeos', '30:00'),
      L(7, 'Avaliação Final', 'Avaliação', '15:00'),
    ],
  },
  {
    id: 'a1-2',
    title: 'Automação de Processos com Inteligência Artificial',
    duration: '04:10:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'Fundamentos de Automação', 'Vídeos', '20:00', 'current'),
      L(3, 'Mapeamento de Processos', 'Documentos', '20 min'),
      L(4, 'Ferramentas de Automação com IA', 'Vídeos', '35:00'),
      L(5, 'Criando Fluxos Automatizados', 'Scorm', '40:00'),
      L(6, 'Monitoramento e Otimização', 'Vídeos', '30:00'),
      L(7, 'Projeto Prático de Automação', 'Aula presencial', '01:30h'),
      L(8, 'Avaliação Final', 'Avaliação', '25:00'),
    ],
  },
  {
    id: 'a1-3',
    title: 'Gestão do Tempo com Ferramentas de IA',
    duration: '02:10:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'Diagnóstico do Seu Tempo', 'Vídeos', '15:00', 'current'),
      L(3, 'Ferramentas Inteligentes de Agenda', 'Documentos', '10 min'),
      L(4, 'Priorização com Suporte de IA', 'Vídeos', '18:00'),
      L(5, 'Bloqueio de Tempo e Foco', 'Scorm', '20:00'),
      L(6, 'Construindo sua Rotina Ideal', 'Vídeos', '22:00'),
      L(7, 'Avaliação Final', 'Avaliação', '15:00'),
    ],
  },
  {
    id: 'a1-4',
    title: 'IA Aplicada à Criação de Conteúdo',
    duration: '03:00:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'IA Generativa: Visão Geral', 'Vídeos', '20:00', 'current'),
      L(3, 'Guia de Ferramentas de Conteúdo', 'Documentos', '15 min'),
      L(4, 'Criação de Textos com IA', 'Vídeos', '25:00'),
      L(5, 'Apresentações e Slides com IA', 'Scorm', '25:00'),
      L(6, 'Revisão e Refinamento de Conteúdo', 'Vídeos', '20:00'),
      L(7, 'Avaliação Final', 'Avaliação', '20:00'),
    ],
  },
  {
    id: 'a1-5',
    title: 'Excel Inteligente com IA',
    duration: '02:30:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'Excel: Revisão de Conceitos-Chave', 'Vídeos', '15:00', 'current'),
      L(3, 'Planilha Base do Curso', 'Documentos', '10 min'),
      L(4, 'Fórmulas Inteligentes com IA', 'Vídeos', '20:00'),
      L(5, 'Dashboards Dinâmicos', 'Scorm', '25:00'),
      L(6, 'Análise de Dados com IA', 'Vídeos', '25:00'),
      L(7, 'Avaliação Final', 'Avaliação', '15:00'),
    ],
  },
  {
    id: 'a1-6',
    title: 'Notion e Organização Inteligente',
    duration: '01:55:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'Introdução ao Notion', 'Vídeos', '12:00', 'current'),
      L(3, 'Template Inicial do Workspace', 'Documentos', '10 min'),
      L(4, 'Estruturando seu Workspace', 'Vídeos', '18:00'),
      L(5, 'Banco de Dados e Views', 'Scorm', '20:00'),
      L(6, 'Integrações e Automações', 'Vídeos', '20:00'),
      L(7, 'Avaliação Final', 'Avaliação', '15:00'),
    ],
  },
  {
    id: 'a1-7',
    title: 'Prompt Engineering para Profissionais',
    duration: '03:40:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'Fundamentos de Engenharia de Prompts', 'Vídeos', '22:00', 'current'),
      L(3, 'Guia de Estrutura de Prompts', 'Documentos', '15 min'),
      L(4, 'Técnicas Avançadas de Prompt', 'Vídeos', '30:00'),
      L(5, 'Prompts para Diferentes Contextos', 'Scorm', '35:00'),
      L(6, 'Otimização e Testes de Prompts', 'Vídeos', '30:00'),
      L(7, 'Avaliação Final', 'Avaliação', '25:00'),
    ],
  },
  {
    id: 'a1-8',
    title: 'Assistentes Virtuais para Atendimento e Suporte',
    duration: '02:50:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'Fundamentos de Assistentes Virtuais', 'Vídeos', '18:00', 'current'),
      L(3, 'Configurando Fluxos de Atendimento', 'Vídeos', '25:00'),
      L(4, 'Manual de Configuração', 'Documentos', '15 min'),
      L(5, 'Personalização do Assistente', 'Scorm', '25:00'),
      L(6, 'Métricas e Melhoria Contínua', 'Vídeos', '25:00'),
      L(7, 'Avaliação Final', 'Avaliação', '20:00'),
    ],
  },
  {
    id: 'a1-9',
    title: 'Dashboards e Relatórios com IA',
    duration: '03:15:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'Fundamentos de Visualização de Dados', 'Vídeos', '20:00', 'current'),
      L(3, 'Ferramentas de Dashboard com IA', 'Documentos', '15 min'),
      L(4, 'Construindo seu Primeiro Dashboard', 'Vídeos', '30:00'),
      L(5, 'Relatórios Automatizados com IA', 'Scorm', '30:00'),
      L(6, 'Apresentando Insights para Decisores', 'Vídeos', '25:00'),
      L(7, 'Avaliação Final', 'Avaliação', '20:00'),
    ],
  },
  {
    id: 'a1-10',
    title: 'Produtividade Pessoal com Sistemas Inteligentes',
    duration: '02:20:00',
    lessons: [
      L(1, 'Boas-vindas ao Curso', 'Vídeos', '02:30', 'completed'),
      L(2, 'Diagnóstico de Produtividade', 'Vídeos', '15:00', 'current'),
      L(3, 'Sistemas de Organização Pessoal', 'Vídeos', '18:00'),
      L(4, 'Guia de Ferramentas Recomendadas', 'Documentos', '10 min'),
      L(5, 'Hábitos de Alta Performance', 'Scorm', '22:00'),
      L(6, 'Implementando sua Rotina com IA', 'Vídeos', '20:00'),
      L(7, 'Avaliação Final', 'Avaliação', '15:00'),
    ],
  },
];

export const CATALOG_TRAILS: CatalogTrail[] = [
  {
    id: 't1-0',
    title: 'Trilha Gestão do Tempo e Prioridades',
    duration: '08:20:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'FUNDAMENTOS', progress: 100,
        items: [
          I('c1', 'Vídeos', 'Diagnóstico do Seu Tempo', true),
          I('c2', 'Documentos', 'Guia de Prioridades', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'FERRAMENTAS DE GESTÃO', progress: 60,
        items: [
          I('c3', 'Vídeos', 'Matriz de Eisenhower na Prática', true),
          I('c4', 'Scorm', 'Bloqueio de Tempo Interativo', false),
          I('c5', 'Avaliação', 'Teste de Priorização', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'IA E AGENDA DIGITAL', progress: 0,
        items: [
          I('c6', 'Vídeos', 'Ferramentas Inteligentes de Agenda', false),
          I('c7', 'Vídeos', 'Automatizando sua Rotina', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c8', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
  {
    id: 't1-1',
    title: 'Trilha Comunicação Corporativa de Alta Performance',
    duration: '07:45:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'BASES DA COMUNICAÇÃO', progress: 100,
        items: [
          I('c1', 'Vídeos', 'Comunicação Eficaz no Trabalho', true),
          I('c2', 'Documentos', 'Guia de Comunicação Clara', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'COMUNICAÇÃO ESCRITA', progress: 80,
        items: [
          I('c3', 'Vídeos', 'E-mails Profissionais de Impacto', true),
          I('c4', 'Scorm', 'Técnicas de Redação Corporativa', false),
          I('c5', 'Avaliação', 'Exercício de Redação', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'COMUNICAÇÃO VERBAL', progress: 0,
        items: [
          I('c6', 'Vídeos', 'Oratória e Presença Executiva', false),
          I('c7', 'Aula presencial', 'Workshop Prático de Apresentação', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c8', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
  {
    id: 't1-2',
    title: 'Trilha Produtividade e Organização Digital',
    duration: '09:10:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'DIAGNÓSTICO', progress: 100,
        items: [
          I('c1', 'Vídeos', 'Avaliação do Ambiente Digital', true),
          I('c2', 'Documentos', 'Guia de Organização Digital', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'SISTEMAS DE ORGANIZAÇÃO', progress: 70,
        items: [
          I('c3', 'Vídeos', 'Gestão de Arquivos e Pastas', true),
          I('c4', 'Scorm', 'Ferramentas de Produtividade', false),
          I('c5', 'Vídeos', 'Notion para Organização Pessoal', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'AUTOMAÇÃO E IA', progress: 0,
        items: [
          I('c6', 'Vídeos', 'Automação de Tarefas Repetitivas', false),
          I('c7', 'Vídeos', 'IA no Fluxo de Trabalho', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c8', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
  {
    id: 't1-3',
    title: 'Trilha Eficiência Operacional e Processos',
    duration: '10:30:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'FUNDAMENTOS', progress: 100,
        items: [
          I('c1', 'Vídeos', 'Introdução à Eficiência Operacional', true),
          I('c2', 'Documentos', 'Guia de Mapeamento de Processos', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'MAPEAMENTO DE PROCESSOS', progress: 50,
        items: [
          I('c3', 'Vídeos', 'Identificando Gargalos', true),
          I('c4', 'Scorm', 'Ferramentas de Mapeamento', false),
          I('c5', 'Avaliação', 'Exercício de Mapeamento', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'PADRONIZAÇÃO', progress: 0,
        items: [
          I('c6', 'Vídeos', 'Criando SOPs Eficazes', false),
          I('c7', 'Vídeos', 'Implementação de Melhorias', false),
          I('c8', 'Aula presencial', 'Workshop de Processos', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c9', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
  {
    id: 't1-4',
    title: 'Trilha Reuniões Produtivas e Gestão de Follow-up',
    duration: '05:50:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'BASES', progress: 100,
        items: [
          I('c1', 'Vídeos', 'Cultura de Reuniões Eficazes', true),
          I('c2', 'Documentos', 'Templates de Reunião', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'ESTRUTURANDO REUNIÕES', progress: 40,
        items: [
          I('c3', 'Vídeos', 'Planejando e Conduzindo Reuniões', true),
          I('c4', 'Scorm', 'Prática: Facilitação de Reunião', false),
          I('c5', 'Avaliação', 'Avaliação de Facilitação', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'FOLLOW-UP', progress: 0,
        items: [
          I('c6', 'Vídeos', 'Sistema de Follow-up Eficaz', false),
          I('c7', 'Vídeos', 'Ferramentas de Acompanhamento', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c8', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
  {
    id: 't1-5',
    title: 'Trilha Colaboração e Trabalho em Equipe',
    duration: '08:00:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'FUNDAMENTOS', progress: 100,
        items: [
          I('c1', 'Vídeos', 'Dinâmicas de Colaboração', true),
          I('c2', 'Documentos', 'Guia de Trabalho em Equipe', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'FERRAMENTAS DE COLABORAÇÃO', progress: 65,
        items: [
          I('c3', 'Vídeos', 'Plataformas Colaborativas', true),
          I('c4', 'Scorm', 'Comunicação entre Times', false),
          I('c5', 'Avaliação', 'Diagnóstico de Equipe', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'ALINHAMENTO E METAS', progress: 0,
        items: [
          I('c6', 'Vídeos', 'OKRs e Metas Compartilhadas', false),
          I('c7', 'Aula presencial', 'Workshop de Alinhamento', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c8', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
  {
    id: 't1-6',
    title: 'Trilha Gestão de Projetos para Times Corporativos',
    duration: '11:15:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'FUNDAMENTOS DE PROJETOS', progress: 100,
        items: [
          I('c1', 'Vídeos', 'Introdução à Gestão de Projetos', true),
          I('c2', 'Documentos', 'Guia PMBOK Simplificado', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'PLANEJAMENTO', progress: 55,
        items: [
          I('c3', 'Vídeos', 'Escopo, Cronograma e Orçamento', true),
          I('c4', 'Scorm', 'Criando um Plano de Projeto', false),
          I('c5', 'Avaliação', 'Avaliação de Planejamento', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'EXECUÇÃO E CONTROLE', progress: 0,
        items: [
          I('c6', 'Vídeos', 'Gerenciando Riscos', false),
          I('c7', 'Vídeos', 'Status Reports e Comunicação', false),
          I('c8', 'Aula presencial', 'Simulação de Projeto', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c9', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
  {
    id: 't1-7',
    title: 'Trilha Organização de Demandas e Fluxos de Trabalho',
    duration: '07:35:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'DIAGNÓSTICO', progress: 100,
        items: [
          I('c1', 'Vídeos', 'Mapeando suas Demandas Atuais', true),
          I('c2', 'Documentos', 'Framework de Organização', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'SISTEMAS DE DEMANDAS', progress: 50,
        items: [
          I('c3', 'Vídeos', 'Kanban e Gestão Visual', true),
          I('c4', 'Scorm', 'Configurando seu Sistema de Demandas', false),
          I('c5', 'Avaliação', 'Avaliação de Sistema', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'AUTOMAÇÃO DE FLUXOS', progress: 0,
        items: [
          I('c6', 'Vídeos', 'Fluxos Automatizados com IA', false),
          I('c7', 'Vídeos', 'Integrações entre Ferramentas', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c8', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
  {
    id: 't1-8',
    title: 'Trilha Liderança e Performance de Equipes',
    duration: '10:40:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'FUNDAMENTOS DE LIDERANÇA', progress: 100,
        items: [
          I('c1', 'Vídeos', 'O Líder do Século XXI', true),
          I('c2', 'Documentos', 'Guia de Estilos de Liderança', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'GESTÃO DE PESSOAS', progress: 45,
        items: [
          I('c3', 'Vídeos', 'Feedback e Desenvolvimento de Talentos', true),
          I('c4', 'Scorm', 'Delegação Eficaz', false),
          I('c5', 'Avaliação', 'Avaliação de Perfil de Liderança', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'PERFORMANCE E RESULTADOS', progress: 0,
        items: [
          I('c6', 'Vídeos', 'Metas e Acompanhamento de Performance', false),
          I('c7', 'Vídeos', 'Gestão de Conflitos', false),
          I('c8', 'Aula presencial', 'Workshop de Liderança', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c9', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
  {
    id: 't1-9',
    title: 'Trilha Atendimento, Relacionamento e Excelência Operacional',
    duration: '08:25:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'BASES DO ATENDIMENTO', progress: 100,
        items: [
          I('c1', 'Vídeos', 'Cultura de Atendimento ao Cliente', true),
          I('c2', 'Documentos', 'Guia de Excelência no Atendimento', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'CANAIS E TÉCNICAS', progress: 60,
        items: [
          I('c3', 'Vídeos', 'Atendimento Multicanal', true),
          I('c4', 'Scorm', 'Técnicas de Relacionamento', false),
          I('c5', 'Avaliação', 'Simulação de Atendimento', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'EXCELÊNCIA OPERACIONAL', progress: 0,
        items: [
          I('c6', 'Vídeos', 'Processos de Suporte Eficazes', false),
          I('c7', 'Vídeos', 'Métricas de Satisfação', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c8', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
  {
    id: 't1-10',
    title: 'Trilha Cultura de Resultado e Accountability',
    duration: '06:55:00',
    etapas: [
      {
        id: 'e1', number: 1, title: 'FUNDAMENTOS', progress: 100,
        items: [
          I('c1', 'Vídeos', 'Cultura de Dono e Responsabilidade', true),
          I('c2', 'Documentos', 'Framework de Accountability', true),
        ]
      },
      {
        id: 'e2', number: 2, title: 'METAS E EXECUÇÃO', progress: 55,
        items: [
          I('c3', 'Vídeos', 'Definindo Metas com OKRs', true),
          I('c4', 'Scorm', 'Plano de Execução Disciplinada', false),
          I('c5', 'Avaliação', 'Avaliação de Metas', false),
        ]
      },
      {
        id: 'e3', number: 3, title: 'CULTURA E HÁBITOS', progress: 0,
        items: [
          I('c6', 'Vídeos', 'Construindo Hábitos de Alta Performance', false),
          I('c7', 'Vídeos', 'Rituais de Acompanhamento de Resultados', false),
        ]
      },
      {
        id: 'e4', number: 4, title: 'CERTIFICAÇÃO', progress: 0,
        items: [
          I('c8', 'Avaliação', 'Avaliação Final da Trilha', false),
        ]
      }
    ]
  },
];

export function getCourseById(id: string): CatalogCourse | undefined {
  return CATALOG_COURSES.find(c => c.id === id);
}

export function getTrailById(id: string): CatalogTrail | undefined {
  return CATALOG_TRAILS.find(t => t.id === id);
}
