import React, { useState } from 'react';
import { CourseCatalog } from './components/CourseCatalog';
import { TrilhaCatalog } from './components/TrilhaCatalog';
import { TrilhaView } from './components/TrilhaView';
import TrainingView from './components/TrainingView';
import TreinamentoTrilhaView from './components/TreinamentoTrilhaView';
import { DesignSystem } from './components/DesignSystem';
import { BookOpen, Play, Box, Check, X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'catalog' | 'view' | 'design' | 'trilha' | 'trilhaView' | 'treinamentoTrilha'>('catalog');
  const [activeColor, setActiveColor] = useState('#c00000');
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [completedTrainings, setCompletedTrainings] = useState<string[]>([]);
  const [courseEnrollmentStatus, setCourseEnrollmentStatus] = useState<'default' | 'payment' | 'rejected' | 'pending'>('default');
  const [trilhaEnrollmentStatus, setTrilhaEnrollmentStatus] = useState<'default' | 'payment' | 'rejected' | 'pending'>('default');
  const [selectedCourseTurmaId, setSelectedCourseTurmaId] = useState<number | null>(null);
  const [selectedTrilhaTurmaId, setSelectedTrilhaTurmaId] = useState<number | null>(null);
  const [isCoursePaymentOpen, setIsCoursePaymentOpen] = useState(false);
  const [isTrilhaPaymentOpen, setIsTrilhaPaymentOpen] = useState(false);
  const [isCourseBoletoOpen, setIsCourseBoletoOpen] = useState(false);
  const [isTrilhaBoletoOpen, setIsTrilhaBoletoOpen] = useState(false);
  const [isCourseOldPaymentOpen, setIsCourseOldPaymentOpen] = useState(false);
  const [isTrilhaOldPaymentOpen, setIsTrilhaOldPaymentOpen] = useState(false);

  const handleReturnToTrilha = (trainingId: string) => {
    setCompletedTrainings(prev => {
      if (!prev.includes(trainingId)) {
        return [...prev, trainingId];
      }
      return prev;
    });
    setCurrentScreen('trilhaView');
  };

  const colors = [
    { id: 'red', value: '#c00000', dark: '#a00000' },
    { id: 'orange', value: '#eb6200', dark: '#c55200' },
    { id: 'green', value: '#8ed02e', dark: '#76ad26' },
    { id: 'dark', value: '#414141', dark: '#000000' }
  ];

  const handleColorChange = (color: { value: string, dark: string }) => {
    setActiveColor(color.value);
    document.documentElement.style.setProperty('--brand-color', color.value);
    document.documentElement.style.setProperty('--brand-color-dark', color.dark);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Minimalist Color Switcher / Control Panel */}
      <div className="fixed top-6 right-6 z-[60] flex flex-col items-end gap-2">
        {/* Toggle Button when panel is hidden */}
        {!isPanelVisible && (
          <button 
            onClick={() => setIsPanelVisible(true)}
            className="p-3 bg-white/80 backdrop-blur-md rounded-full border border-white/20 shadow-lg text-gray-400 hover:text-brand transition-colors"
            title="Exibir painel de controle"
          >
            <Eye size={20} />
          </button>
        )}

        {/* Full Panel */}
        {isPanelVisible && (
          <div className="flex items-center gap-4 bg-white/40 backdrop-blur-sm p-1.5 rounded-full border border-white/20 shadow-sm">
            <div className="flex gap-2 pl-1">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color)}
                  className={`w-4 h-4 rounded-full transition-all hover:scale-125 cursor-pointer shadow-sm ${
                    activeColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={`Mudar para ${color.id}`}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-1 pr-1 border-l border-gray-200 pl-2">
              <button 
                onClick={() => {
                  if (currentScreen === 'catalog') {
                    if (courseEnrollmentStatus === 'pending' && [3, 4, 7, 8].includes(selectedCourseTurmaId)) {
                      setIsCoursePaymentOpen(true);
                    } else {
                      setCurrentScreen('view');
                    }
                  }
                  if (currentScreen === 'trilha') {
                    if (trilhaEnrollmentStatus === 'pending' && [3, 4, 7, 8].includes(selectedTrilhaTurmaId)) {
                      setIsTrilhaPaymentOpen(true);
                    } else {
                      setCurrentScreen('trilhaView');
                    }
                  }
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors cursor-pointer"
                title="Aprovar / Navegar"
              >
                <Check size={16} />
              </button>
              <button 
                onClick={() => {
                  if (currentScreen === 'catalog') setCourseEnrollmentStatus('rejected');
                  if (currentScreen === 'trilha') setTrilhaEnrollmentStatus('rejected');
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                title="Recusar / Reenviar"
              >
                <X size={16} />
              </button>
              <button 
                onClick={() => setIsPanelVisible(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors cursor-pointer"
                title="Ocultar painel"
              >
                <EyeOff size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={currentScreen}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className={currentScreen === 'view' || currentScreen === 'trilhaView' || currentScreen === 'treinamentoTrilha' ? 'h-[100dvh] overflow-hidden' : 'min-h-[100dvh]'}
        >
          {currentScreen === 'catalog' && (
            <div className="pb-32">
              <CourseCatalog 
                onNavigate={setCurrentScreen} 
                enrollmentStatus={courseEnrollmentStatus}
                setEnrollmentStatus={setCourseEnrollmentStatus}
                selectedTurmaId={selectedCourseTurmaId}
                setSelectedTurmaId={setSelectedCourseTurmaId}
                isPaymentModalOpen={isCoursePaymentOpen}
                setIsPaymentModalOpen={setIsCoursePaymentOpen}
                isBoletoModalOpen={isCourseBoletoOpen}
                setIsBoletoModalOpen={setIsCourseBoletoOpen}
                isOldPaymentModalOpen={isCourseOldPaymentOpen}
                setIsOldPaymentModalOpen={setIsCourseOldPaymentOpen}
              />
            </div>
          )}
          {currentScreen === 'trilha' && (
            <div className="pb-32">
              <TrilhaCatalog 
                onNavigate={setCurrentScreen} 
                enrollmentStatus={trilhaEnrollmentStatus}
                setEnrollmentStatus={setTrilhaEnrollmentStatus}
                selectedTurmaId={selectedTrilhaTurmaId}
                setSelectedTurmaId={setSelectedTrilhaTurmaId}
                isPaymentModalOpen={isTrilhaPaymentOpen}
                setIsPaymentModalOpen={setIsTrilhaPaymentOpen}
                isBoletoModalOpen={isTrilhaBoletoOpen}
                setIsBoletoModalOpen={setIsTrilhaBoletoOpen}
                isOldPaymentModalOpen={isTrilhaOldPaymentOpen}
                setIsOldPaymentModalOpen={setIsTrilhaOldPaymentOpen}
              />
            </div>
          )}
          {currentScreen === 'view' && <TrainingView />}
          {currentScreen === 'trilhaView' && <TrilhaView completedTrainings={completedTrainings} onNavigateToTraining={() => setCurrentScreen('treinamentoTrilha')} />}
          {currentScreen === 'treinamentoTrilha' && <TreinamentoTrilhaView onReturn={() => handleReturnToTrilha('t1')} />}
          {currentScreen === 'design' && <div className="pb-32"><DesignSystem /></div>}
        </motion.main>
      </AnimatePresence>

      {/* Simple Navigation for Demo - Moved to bottom for better stacking context */}
      {isPanelVisible && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex gap-2 z-[100]">
          <button 
            onClick={() => setCurrentScreen('catalog')}
            title="Catálogo de Treinamento"
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              currentScreen === 'catalog' 
                ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            1
          </button>
          <button 
            onClick={() => setCurrentScreen('view')}
            title="Visualização"
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              currentScreen === 'view' 
                ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            2
          </button>
          <button 
            onClick={() => setCurrentScreen('design')}
            title="Design"
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              currentScreen === 'design' 
                ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            3
          </button>
          <button 
            onClick={() => setCurrentScreen('trilha')}
            title="Catálogo de Trilha"
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              currentScreen === 'trilha' 
                ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            4
          </button>
          <button 
            onClick={() => setCurrentScreen('trilhaView')}
            title="Visualização da Trilha"
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              currentScreen === 'trilhaView' 
                ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            5
          </button>
          <button 
            onClick={() => setCurrentScreen('treinamentoTrilha')}
            title="Treinamento na Trilha"
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
              currentScreen === 'treinamentoTrilha' 
                ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            6
          </button>
        </div>
      )}
    </div>
  );
}
