import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { Target, TrendingUp, Activity, Clock } from 'lucide-react';

interface PerformanceDashboardProps {
  type: 'content' | 'trilha';
  data: any[];
  status: 'aprovado' | 'reprovado' | 'andamento';
  brandColor?: string;
}

const StatCard = ({ title, value, color, icon, iconBg, iconText, isBrand = false }: { title: string, value: string, color: string, icon: React.ReactNode, iconBg: string, iconText: string, isBrand?: boolean }) => (
  <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-28 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className={`h-1 w-full ${isBrand ? 'bg-gradient-to-r from-brand to-brand-dark' : color}`} />
    <div className="p-4 flex items-center gap-3 h-full">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} ${iconText} group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <span className="text-[11px] font-semibold text-gray-400 mb-1 truncate">{title}</span>
        <span className={`text-xl font-black ${isBrand ? 'text-brand' : color.replace('bg-', 'text-')} tracking-tight leading-none`}>
          {value}
        </span>
      </div>
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
      {/* 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Aproveitamento Requerido" value="100,00%" color="bg-brand" isBrand
          icon={<Target size={18} />} iconBg="bg-brand/10" iconText="text-brand" />
        <StatCard title="Aproveitamento Parcial" value="21,43%" color="bg-brand" isBrand
          icon={<TrendingUp size={18} />} iconBg="bg-brand/10" iconText="text-brand" />
        <StatCard title="Status Atual" value={currentStatus.label} color={currentStatus.color}
          icon={<Activity size={18} />} iconBg="bg-blue-50" iconText="text-blue-500" />
        <StatCard title="Carga Horária" value="02:00" color="bg-[#003366]"
          icon={<Clock size={18} />} iconBg="bg-slate-100" iconText="text-[#003366]" />
      </div>

      {/* Gráfico full width */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
        <h3 className="text-sm font-bold text-[#003366] mb-8">
          {type === 'content' ? 'Desempenho por Conteúdo' : 'Desempenho por Etapa'}
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand-color)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--brand-color)" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#EEF2F7" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#64748B' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94A3B8' }} domain={[0, 100]} unit="%" />
              <Tooltip
                cursor={{ fill: 'rgba(255,122,26,0.04)' }}
                formatter={(v: any) => [`${v}%`, 'Desempenho']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 700 }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={48}>
                <LabelList dataKey="value" position="top" formatter={(v: any) => `${v}%`}
                  style={{ fontSize: 10, fontWeight: 800, fill: '#475569' }} />
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isAlt ? '#003366' : 'url(#barGradient)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
