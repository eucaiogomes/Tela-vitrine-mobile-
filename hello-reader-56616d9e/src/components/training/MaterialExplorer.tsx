import React, { useState } from 'react';
import { Folder, FileText, Download, ChevronRight, File, FilePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MaterialFile {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLS' | 'PPT';
  size: string;
}

interface MaterialFolder {
  id: string;
  name: string;
  files: MaterialFile[];
}

const folders: MaterialFolder[] = [
  {
    id: 'f1',
    name: 'Biblioteca teste',
    files: [
      { id: 'file1', name: 'Capítulo 1 - Concepção e Desenvolvimento', type: 'PDF', size: '692.12 KB' },
      { id: 'file2', name: 'Guia de Estilo Adotado', type: 'PDF', size: '1.2 MB' },
    ]
  },
  {
    id: 'f2',
    name: 'Material 2',
    files: [
      { id: 'file3', name: 'Planilha de Fluxos', type: 'XLS', size: '45 KB' },
      { id: 'file4', name: 'Apresentação Institucional', type: 'PPT', size: '3.4 MB' },
    ]
  },
  {
    id: 'f3',
    name: 'Documentação Técnica',
    files: [
      { id: 'file5', name: 'Manual do Usuário v2', type: 'DOCX', size: '890 KB' },
    ]
  }
];

export const MaterialExplorer: React.FC = () => {
  const [activeFolderId, setActiveFolderId] = useState(folders[0].id);
  const activeFolder = folders.find(f => f.id === activeFolderId) || folders[0];

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[400px] border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Folders Sidebar */}
      <div className="w-full md:w-64 bg-gray-50/50 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-white/50">
          <h4 className="text-[10px] font-black text-[#003366] uppercase tracking-widest flex items-center gap-2">
            <Folder size={12} className="text-brand" /> Pastas Disponíveis
          </h4>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {folders.map((folder) => {
            const isActive = folder.id === activeFolderId;
            return (
              <button
                key={folder.id}
                onClick={() => setActiveFolderId(folder.id)}
                className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all group relative ${
                  isActive ? 'bg-brand/5' : 'hover:bg-gray-100/50'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeFolderIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-brand" 
                  />
                )}
                <div className="flex items-center gap-3">
                  <Folder 
                    size={16} 
                    className={isActive ? 'text-brand' : 'text-gray-400 group-hover:text-brand transition-colors'} 
                    fill={isActive ? 'currentColor' : 'none'}
                    fillOpacity={0.1}
                  />
                  <span className={`text-[11px] font-bold ${isActive ? 'text-brand' : 'text-[#003366]'} truncate`}>
                    {folder.name}
                  </span>
                </div>
                <ChevronRight size={14} className={isActive ? 'text-brand' : 'text-gray-300'} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Files Content */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-[11px] font-black text-[#003366] uppercase tracking-widest flex items-center gap-2">
            CONTEÚDO PUBLICADO: <span className="text-brand">{activeFolder.name}</span>
          </h3>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
            {activeFolder.files.length} {activeFolder.files.length === 1 ? 'Arquivo' : 'Arquivos'}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFolderId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeFolder.files.map((file) => (
                <div 
                  key={file.id}
                  className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black text-brand tracking-widest">{file.type}</span>
                    <span className="text-[10px] font-bold text-gray-400">{file.size}</span>
                  </div>
                  
                  <h4 className="text-[12.5px] font-bold text-[#003366] mb-6 leading-tight min-h-[36px] line-clamp-2">
                    {file.name}.{file.type.toLowerCase()}
                  </h4>

                  <button className="flex items-center gap-2 text-[10px] font-black text-brand uppercase tracking-widest hover:text-brand-dark transition-colors border border-brand/20 bg-brand/5 px-4 py-2 rounded-lg w-full justify-center group/btn">
                    <Download size={14} className="group-hover/btn:translate-y-0.5 transition-transform" />
                    Baixar Arquivo
                  </button>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {activeFolder.files.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <FilePlus size={48} className="text-gray-300 mb-4" />
              <p className="text-xs font-bold text-[#003366] uppercase tracking-widest">Nenhum arquivo nesta pasta</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
