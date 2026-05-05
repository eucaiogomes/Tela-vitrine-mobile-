import React from 'react';
import { 
  Play, 
  FileText, 
  MonitorPlay, 
  Video, 
  Box, 
  UploadCloud, 
  HelpCircle, 
  MessageSquare, 
  Award,
  List,
  User,
  Target
} from 'lucide-react';

export type ContentTypeLabel = 
  | 'Tópico'
  | 'Vídeos'
  | 'Documentos'
  | 'Gravado'
  | 'Aula presencial'
  | 'Webconferência'
  | 'Scorm'
  | 'Entrega de atividade'
  | 'Avaliação'
  | 'Avaliação de reação/pesquisa'
  | 'Certificado'
  | 'Treinamento';

interface ContentIndicatorProps {
  type: ContentTypeLabel;
  className?: string;
}

export const SidebarContentIndicator: React.FC<ContentIndicatorProps> = ({ type, className = '' }) => {
  const getConfig = (type: ContentTypeLabel) => {
    switch (type) {
      case 'Tópico':
        return { icon: <List size={10} />, label: type };
      case 'Vídeos':
        return { icon: <Play size={10} />, label: type };
      case 'Documentos':
        return { icon: <FileText size={10} />, label: type };
      case 'Gravado':
        return { icon: <Video size={10} />, label: type };
      case 'Aula presencial':
        return { icon: <User size={10} />, label: type };
      case 'Webconferência':
        return { icon: <MonitorPlay size={10} />, label: type };
      case 'Scorm':
        return { icon: <Box size={10} />, label: type };
      case 'Entrega de atividade':
        return { icon: <UploadCloud size={10} />, label: type };
      case 'Avaliação':
        return { icon: <HelpCircle size={10} />, label: type };
      case 'Avaliação de reação/pesquisa':
        return { icon: <MessageSquare size={10} />, label: type };
      case 'Certificado':
        return { icon: <Award size={10} />, label: type };
      case 'Treinamento':
        return { icon: <Target size={10} />, label: type };
      default:
        return { icon: <FileText size={10} />, label: type };
    }
  };

  const { icon, label } = getConfig(type);

  return (
    <div className={`flex items-center gap-1.5 text-gray-400 ${className}`}>
      {icon}
      <span className="text-[9.5px] font-medium tracking-tight truncate leading-none pt-0.5">{label}</span>
    </div>
  );
};
