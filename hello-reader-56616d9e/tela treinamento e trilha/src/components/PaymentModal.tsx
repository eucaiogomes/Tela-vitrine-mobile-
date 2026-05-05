import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, CreditCard, Check, Copy, Tag, AlertCircle, Loader2, PlusCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemPrice: number;
  onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  itemName,
  itemPrice,
  onSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [couponState, setCouponState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [discount, setDiscount] = useState(0);

  // Payment State
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPaymentMethod('pix');
      setCouponCode('');
      setCouponState('idle');
      setDiscount(0);
      setIsProcessing(false);
      setPixCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const finalPrice = Math.max(0, itemPrice - discount);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    setCouponState('loading');
    
    // Simulate API call
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'DESCONTO') {
        setDiscount(itemPrice * 0.2); // 20% discount
        setCouponState('success');
      } else {
        setCouponState('error');
      }
    }, 800);
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponState('idle');
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(); // Triggers the "Reenviar campos" state in the parent
    }, 1500);
  };

  const handleCopyPix = () => {
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/10"
        />

        {/* Modal Card - Consistent with the "Institutional/Acolhedor" style */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="relative w-full max-w-[380px] bg-white rounded-[40px] shadow-2xl shadow-black/5 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100/50">
            <h2 className="text-[19px] font-bold text-gray-800">Pagamento</h2>
            <button 
              onClick={onClose}
              className="p-1 text-gray-300 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-7 flex flex-col gap-6 custom-scrollbar">
            
            {/* Top Info Area */}
            <div className="space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-[13px] font-bold text-gray-800 leading-tight flex-1 pr-6">{itemName}</span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Valor</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex-1" /> {/* Spacer */}
                <div className="text-[18px] font-bold text-gray-800">
                  R$ {itemPrice.toFixed(2)}
                </div>
              </div>
              <div className="flex justify-end mt-2">
                {couponState === 'success' ? (
                  <button 
                    onClick={handleRemoveCoupon}
                    className="bg-green-50 text-green-600 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-green-100 transition-all border border-green-100"
                  >
                    <Tag size={12} /> {couponCode} <X size={12} />
                  </button>
                ) : (
                  <div className="flex items-center bg-[#e0e0e0]/50 rounded-full pl-4 pr-1 py-0.5 w-full max-w-[240px] border border-transparent focus-within:border-gray-300 transition-all">
                    <input 
                      type="text"
                      placeholder="CÓDIGO"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        if (couponState === 'error') setCouponState('idle');
                      }}
                      className="bg-transparent border-none text-[10px] font-bold text-gray-600 outline-none flex-1 placeholder:text-gray-400"
                    />
                    <div className="w-[1px] h-4 bg-gray-300 mx-1" />
                    <button 
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim() || couponState === 'loading'}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] font-medium text-gray-500 hover:text-gray-900 transition-all disabled:opacity-50"
                    >
                      {couponState === 'loading' ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <>
                          <PlusCircle size={15} strokeWidth={1} className="text-gray-400" />
                          <span className="text-[10px] text-gray-500">Aplicar cupom</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
              {couponState === 'error' && (
                <div className="flex justify-end mt-1">
                  <span className="text-[8px] text-red-500 font-bold uppercase tracking-tighter">Cupom inválido</span>
                </div>
              )}
            </div>

            {/* Total Label */}
            <div className="mt-2">
              <span className="text-[11px] font-bold text-gray-800 uppercase tracking-widest">Total</span>
            </div>

            {/* Payment Methods - Vertical List */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setPaymentMethod('pix')}
                className={`w-full py-3 px-5 rounded-full flex items-center gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'pix' ? 'bg-[#f0f9fa]' : 'bg-transparent'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#cc0000]' : 'border-gray-200'}`}>
                  {paymentMethod === 'pix' && <div className="w-2 h-2 rounded-full bg-[#cc0000]" />}
                </div>
                <QrCode size={16} className={paymentMethod === 'pix' ? 'text-gray-800' : 'text-gray-400'} />
                <span className={`text-[12px] font-bold ${paymentMethod === 'pix' ? 'text-gray-800' : 'text-gray-400'}`}>Pix</span>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full py-3 px-5 rounded-full flex items-center gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'card' ? 'bg-[#f0f9fa]' : 'bg-transparent'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#cc0000]' : 'border-gray-200'}`}>
                  {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#cc0000]" />}
                </div>
                <CreditCard size={16} className={paymentMethod === 'card' ? 'text-gray-800' : 'text-gray-400'} />
                <span className={`text-[12px] font-bold ${paymentMethod === 'card' ? 'text-gray-800' : 'text-gray-400'}`}>Cartão</span>
              </button>
            </div>

            {/* Dynamic Content Area */}
            <div className="flex-1 flex items-center justify-center py-4">
              <AnimatePresence mode="wait">
                {paymentMethod === 'pix' ? (
                  <motion.div 
                    key="pix"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center text-center w-full"
                  >
                    <div className="mb-4">
                      <h4 className="text-[13px] font-bold text-gray-800">Escaneie o QR Code</h4>
                      <p className="text-[10px] text-gray-400 font-medium">para pagar com pix</p>
                    </div>

                    <div className="bg-white p-2 rounded-2xl mb-6">
                      {/* Fake QR Code */}
                      <QrCode size={140} className="text-gray-800" strokeWidth={1} />
                    </div>

                    <button 
                      onClick={handleCopyPix}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-800 border-2 border-gray-100 px-6 py-2.5 rounded-full transition-all bg-white"
                    >
                      {pixCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      {pixCopied ? 'Código Copiado!' : 'Pix copia e cola'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-4 w-full"
                  >
                    <div>
                      <input type="text" placeholder="NÚMERO DO CARTÃO" className="w-full bg-[#f8f9fa] border-none rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-gray-300" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/AA" className="w-full bg-[#f8f9fa] border-none rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-gray-300" />
                      <input type="text" placeholder="CVV" className="w-full bg-[#f8f9fa] border-none rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-gray-300" />
                    </div>

                    <input type="text" placeholder="NOME NO CARTÃO" className="w-full bg-[#f8f9fa] border-none rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest outline-none placeholder:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Footer Actions - Optional in the photo, but we need the confirm button */}
          <div className="px-7 pb-8">
            <button 
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full bg-[#cc0000] text-white h-13 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-red-700 shadow-xl shadow-red-500/10 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? <Loader2 size={16} className="animate-spin" /> : (paymentMethod === 'pix' ? 'Confirmar pagamento' : 'Finalizar compra')}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
