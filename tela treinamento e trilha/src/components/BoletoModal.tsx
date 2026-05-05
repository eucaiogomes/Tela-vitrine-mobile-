import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle2 } from 'lucide-react';

interface BoletoModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
}

export const BoletoModal: React.FC<BoletoModalProps> = ({ isOpen, onClose, price }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden font-mono text-[13px] text-slate-700"
        >
          {/* Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-dashed border-slate-200 flex justify-between items-center">
            <span className="font-bold tracking-widest text-[#c00000]">PAGAMENTO VIA BOLETO</span>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center border-y border-dashed border-slate-200 py-2">
              <span className="font-bold text-slate-900">BOLETO GERADO COM SUCESSO</span>
            </div>

            {/* Linha Digitável */}
            <div className="bg-slate-50 p-3 rounded border border-slate-100 break-all text-center leading-relaxed">
              <span className="text-slate-900 font-bold">23790.12345 60000.123456 12345.67890 1 93280000020000</span>
            </div>

            {/* Informações */}
            <div className="space-y-2 border-y border-dashed border-slate-200 py-4">
              <div className="flex justify-between">
                <span className="text-slate-400 uppercase">Beneficiário:</span>
                <span className="font-bold">Lector</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 uppercase">Pagador:</span>
                <span className="font-bold">João Silva</span>
              </div>
              <div className="pt-2 flex justify-between text-base">
                <span className="text-slate-400 uppercase">Valor:</span>
                <span className="font-bold text-slate-900">R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 uppercase">Vencimento:</span>
                <span className="font-bold">25/04/2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 uppercase">Parcela:</span>
                <span className="font-bold">1 de 5</span>
              </div>
            </div>

            {/* Código de Barras Visual */}
            <div className="flex justify-center py-4 bg-white">
              <div className="h-10 w-full bg-slate-200 overflow-hidden flex gap-[2px]">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-slate-900" 
                    style={{ width: `${Math.random() * 4 + 1}px` }} 
                  />
                ))}
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleCopy}
                className="w-full bg-[#c00000] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#a00000] transition-colors"
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                {copied ? 'Código Copiado!' : 'Copiar código'}
              </button>
              <button 
                onClick={onClose}
                className="w-full text-slate-400 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Fechar
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center italic">
              * Simulação para fins de demonstração visual
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
