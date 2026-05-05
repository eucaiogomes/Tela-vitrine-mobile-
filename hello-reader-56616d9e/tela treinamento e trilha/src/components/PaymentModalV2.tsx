import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, Calendar, Check, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemPrice: number;
  onSuccess: () => void;
}

export const PaymentModalV2: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  itemName,
  itemPrice,
  onSuccess
}) => {
  const [paymentOption, setPaymentOption] = useState<'cash' | 'installments' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPaymentOption(null);
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!paymentOption) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 1500);
  };

  const installments = Array.from({ length: 5 }, (_, i) => ({
    number: i + 1,
    value: itemPrice / 5,
    dueDate: i === 0 ? 'Vence primeiro' : `Mês ${i + 1}`
  }));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px]"
        />

        {/* Modal Card */}
        <motion.div 
          layout
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30,
            layout: { duration: 0.3 }
          }}
          className="relative w-full max-w-[400px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
            <h2 className="text-[14px] font-extrabold text-gray-800 uppercase tracking-[0.2em]">PAGAMENTO</h2>
            <button 
              onClick={onClose}
              className="p-1 text-gray-300 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar">
            
            {/* Selection Options */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Opções de Pagamento</span>
              
              <div 
                onClick={() => setPaymentOption('cash')}
                className={`group relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentOption === 'cash' 
                    ? 'border-brand bg-brand/5 shadow-md shadow-brand/5' 
                    : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentOption === 'cash' ? 'border-brand bg-brand' : 'border-gray-300 bg-white'
                }`}>
                  {paymentOption === 'cash' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 rounded-xl transition-colors ${
                    paymentOption === 'cash' ? 'bg-brand text-white' : 'bg-white text-gray-400 group-hover:text-gray-600'
                  }`}>
                    <Wallet size={18} />
                  </div>
                  <span className={`text-[13px] font-bold ${paymentOption === 'cash' ? 'text-brand' : 'text-gray-600'}`}>Compra à vista</span>
                </div>
              </div>

              <div 
                onClick={() => setPaymentOption('installments')}
                className={`group relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentOption === 'installments' 
                    ? 'border-brand bg-brand/5 shadow-md shadow-brand/5' 
                    : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentOption === 'installments' ? 'border-brand bg-brand' : 'border-gray-300 bg-white'
                }`}>
                  {paymentOption === 'installments' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 rounded-xl transition-colors ${
                    paymentOption === 'installments' ? 'bg-brand text-white' : 'bg-white text-gray-400 group-hover:text-gray-600'
                  }`}>
                    <Calendar size={18} />
                  </div>
                  <span className={`text-[13px] font-bold ${paymentOption === 'installments' ? 'text-brand' : 'text-gray-600'}`}>Compra parcelada</span>
                </div>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <motion.div layout className="overflow-hidden">
              <AnimatePresence mode="wait">
                {paymentOption === 'cash' && (
                  <motion.div 
                    key="cash"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-ice border border-gray-100 rounded-2xl p-6"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-brand font-bold">
                        <Check size={16} />
                        <span className="text-[13px]">Pagamento à vista</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Valor Total</span>
                        <span className="text-2xl font-black text-gray-800">R$ {itemPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[11px] font-bold text-gray-500">Boleto único gerado</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentOption === 'installments' && (
                  <motion.div 
                    key="installments"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between px-1">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-gray-800">Parcelamento em 5x</span>
                        <span className="text-[10px] text-gray-400 font-medium tracking-wide">Planos mensais automáticos</span>
                      </div>
                      <Calendar size={18} className="text-gray-300" />
                    </div>

                    <div className="flex flex-col gap-2">
                      {installments.map((step) => (
                        <div 
                          key={step.number}
                          className="flex items-center justify-between p-3.5 bg-gray-50/50 border border-gray-100 rounded-xl group hover:bg-white hover:border-brand/20 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-black text-gray-300 group-hover:text-brand transition-colors w-6">
                              {step.number}/5
                            </span>
                            <span className="text-[12px] font-bold text-gray-700">
                              R$ {step.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${
                            step.number === 1 ? 'bg-brand/10 text-brand' : 'text-gray-400'
                          }`}>
                            {step.dueDate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {!paymentOption && (
                  <motion.div 
                    key="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-100 rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                      <Check size={20} className="text-gray-200" />
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic">
                      Selecione uma opção de pagamento<br />para visualizar os detalhes
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="p-8 pt-4">
            <button 
              onClick={handleConfirm}
              disabled={!paymentOption || isProcessing}
              className={`w-full h-14 rounded-2xl text-[12px] font-black transition-all flex items-center justify-center gap-3 shadow-xl ${
                !paymentOption 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-brand text-white hover:bg-brand-dark shadow-brand/10 active:scale-95 cursor-pointer'
              } ${isProcessing ? 'opacity-80' : ''}`}
            >
              {isProcessing ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                'Confirmar pagamento'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
