import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, Send, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CustomFieldsModal: React.FC<CustomFieldsModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [skipText, setSkipText] = useState(false);
  const [skipNumber, setSkipNumber] = useState(false);
  const [skipRegex, setSkipRegex] = useState(false);
  const [skipFile, setSkipFile] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsSending(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      // Wait for user to see success or auto-close
      setTimeout(() => {
        setIsSuccess(false);
        onConfirm();
      }, 1800);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!isSending && !isSuccess ? onClose : undefined}
          className="absolute inset-0 bg-slate-900/10"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="relative bg-white rounded-[40px] w-full max-w-[340px] p-6 sm:p-7 shadow-2xl shadow-black/5 flex flex-col min-h-[300px] max-h-[85vh] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[19px] font-bold text-gray-800">Campos personalizados</h2>
                  <button 
                    onClick={onClose}
                    disabled={isSending}
                    className="p-1 text-gray-300 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-0"
                  >
                    <X size={28} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Scrollable Fields Area */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar mb-6">
                  {/* Text Field */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      CAMPO 06/02 PARA TESTE
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group w-fit">
                      <input 
                        type="checkbox" 
                        checked={skipText}
                        onChange={(e) => setSkipText(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand/20 cursor-pointer"
                      />
                      <span className="text-[13px] text-gray-400 font-medium">Não preencher</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="campo 06/02 para teste"
                      disabled={skipText || isSending}
                      className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 text-[13px] font-medium placeholder:text-gray-300 focus:outline-none focus:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    />
                  </div>

                  {/* Number Field */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      VALOR ESTIMADO
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group w-fit">
                      <input 
                        type="checkbox" 
                        checked={skipNumber}
                        onChange={(e) => setSkipNumber(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand/20 cursor-pointer"
                      />
                      <span className="text-[13px] text-gray-400 font-medium">Não preencher</span>
                    </label>
                    <input 
                      type="number" 
                      placeholder="0000"
                      disabled={skipNumber || isSending}
                      className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 text-[13px] font-medium placeholder:text-gray-300 focus:outline-none focus:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    />
                  </div>

                  {/* File Field */}
                  <div className="flex flex-col gap-3 pb-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      ANEXO DE DOCUMENTO
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group w-fit">
                      <input 
                        type="checkbox" 
                        checked={skipFile}
                        onChange={(e) => setSkipFile(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand/20 cursor-pointer"
                      />
                      <span className="text-[13px] text-gray-400 font-medium">Não enviar</span>
                    </label>
                    <button 
                      disabled={skipFile || isSending}
                      className="bg-[#f2f2f2] text-gray-600 px-8 py-3.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-all disabled:opacity-40 w-fit cursor-pointer flex items-center gap-2"
                    >
                      <UploadCloud size={14} />
                      Escolher Arquivo
                    </button>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center gap-4 mt-auto">
                  <button 
                    onClick={handleConfirm}
                    disabled={isSending}
                    className="flex-1 bg-[#cc0000] text-white py-4 rounded-full text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/10 active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSending ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Confirmar</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={onClose}
                    disabled={isSending}
                    className="flex-1 bg-[#f2f2f2] text-gray-500 py-4 rounded-full text-sm font-bold hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-10"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                </div>
                <h3 className="text-[20px] font-bold text-gray-800 mb-2">Dados enviados!</h3>
                <p className="text-[13px] text-gray-400 text-center leading-relaxed">
                  Sua solicitação de matrícula foi recebida com sucesso.
                </p>
                <div className="mt-8 px-6 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Aguardando Aprovação
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
