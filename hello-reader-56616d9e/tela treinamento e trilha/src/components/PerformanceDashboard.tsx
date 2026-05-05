import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { Clock, Calendar } from 'lucide-react';

interface PerformanceDashboardProps {
  type: 'content' | 'trilha';
  data: any[];
  status: 'aprovado' | 'reprovado' | 'andamento';
  brandColor?: string;
}

const StatCard = ({ title, value, color, isBrand = false }: { title: string, value: string, color: string, isBrand?: boolean }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-24">
    <div className={`h-1 w-full ${isBrand ? 'bg-brand' : color}`} />
    <div className="p-4 flex flex-col justify-center h-full">
      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</span>
      <span className={`text-xl font-black ${isBrand ? 'text-brand' : color.replace('bg-', 'text-')} tracking-tight`}>
        {value}
      </span>
    </div>
  </div>
);

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ 
  type, 
  data, 
  status,
  brandColor = 'var(--brand-color)' 
}) => {
  const statusConfig = {
    aprovado: { label: 'Aprovado', color: 'bg-green-500', textColor: 'text-green-500' },
    reprovado: { label: 'Reprovado', color: 'bg-red-500', textColor: 'text-red-500' },
    andamento: { label: 'Em andamento', color: 'bg-blue-500', textColor: 'text-blue-500' },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="w-full space-y-6 py-4">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Aproveitamento Requerido" value="100,00%" color="bg-brand" isBrand />
        <StatCard title="Aproveitamento Parcial" value="21,43%" color="bg-brand" isBrand />
        <StatCard title="Status Atual" value={currentStatus.label.toUpperCase()} color={currentStatus.color} />
        <StatCard title="Carga Horária" value="02:00" color="bg-[#003366]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[11px] font-black uppercase text-[#003366] tracking-widest">
              {type === 'content' ? 'Desempenho por Conteúdo' : 'Desempenho por Trilhas'}
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand-color)" stopOpacity={1} />
                    <stop offset="100%" stopColor="var(--brand-color)" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 700, fill: '#64748B' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 700, fill: '#64748B' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isAlt ? '#003366' : 'url(#barGradient)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-8">
          <div>
            <h3 className="text-[11px] font-black uppercase text-[#003366] tracking-widest mb-6">Resumo de Tempo</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Tempo Total Online</span>
                  <span className="text-xs font-black text-[#003366] font-mono">00:04:24</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '40%' }}
                    className="h-full bg-[#003366]" 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Média por Acesso</span>
                  <span className="text-xs font-black text-[#003366] font-mono">00:01:08</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="h-full bg-[#003366]" 
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                  <Calendar size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase">Último Acesso</div>
                  <div className="text-[11px] font-black text-[#003366]">16/04/2026 14:32</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
