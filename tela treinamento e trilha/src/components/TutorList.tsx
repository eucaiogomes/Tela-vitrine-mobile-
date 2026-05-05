import React from 'react';
import { MessageSquare, User, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface Tutor {
  id: string;
  name: string;
  role: string;
  photo: string;
  isOnline: boolean;
}

const tutors: Tutor[] = [
  {
    id: 't1',
    name: 'Dr. Roberto Silveira',
    role: 'Instrutor Master — Gestão de Fluxos',
    photo: 'https://picsum.photos/seed/tutor1/200/200',
    isOnline: true
  },
  {
    id: 't2',
    name: 'Ana Luiza Mello',
    role: 'Especialista em Atendimento',
    photo: 'https://picsum.photos/seed/tutor2/200/200',
    isOnline: false
  },
  {
    id: 't3',
    name: 'Marcos Oliveira',
    role: 'Suporte Técnico e Integrações',
    photo: 'https://picsum.photos/seed/tutor3/200/200',
    isOnline: true
  }
];

export const TutorList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutors.map((tutor) => (
        <motion.div
          key={tutor.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:shadow-brand/5 transition-all group"
        >
          <div className="flex flex-col items-center text-center">
            {/* Avatar with Status */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full border-2 border-brand/10 p-1 group-hover:border-brand/30 transition-colors">
                <img 
                  src={tutor.photo} 
                  alt={tutor.name} 
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${tutor.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} title={tutor.isOnline ? 'Disponível' : 'Ausente'} />
            </div>

            {/* Info */}
            <h3 className="text-sm font-bold text-[#003366] mb-1">{tutor.name}</h3>
            <p className="text-[11px] text-gray-400 font-medium mb-5">{tutor.role}</p>

            {/* Action */}
            <button className="flex items-center gap-2 text-[10px] font-black text-brand uppercase tracking-widest hover:text-brand-dark transition-colors border border-brand/20 bg-brand/5 px-6 py-2.5 rounded-xl w-full justify-center group/btn">
              <MessageSquare size={14} className="group-hover/btn:scale-110 transition-transform" />
              Falar com tutor
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
