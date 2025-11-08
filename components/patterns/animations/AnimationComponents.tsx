
import React from 'react';
import { UserIcon, ServerIcon, MessageIcon } from '../../icons/Icons';

export const Node: React.FC<{ label: string; icon: React.ReactNode; color?: string; active?: boolean }> = ({ label, icon, color = 'bg-navy-700', active = false }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <div className={`relative w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${active ? 'border-cyan-400 scale-110' : 'border-navy-600'} ${color}`}>
      <div className="text-white">{icon}</div>
      {active && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-cyan-400 ring-2 ring-navy-900 animate-pulse-fast"></span>}
    </div>
    <span className="text-xs font-semibold tracking-wider text-navy-200">{label}</span>
  </div>
);

export const Producer: React.FC<{ active?: boolean }> = ({ active }) => <Node label="Producer" icon={<UserIcon />} active={active} />;
export const Consumer: React.FC<{ active?: boolean, label?: string }> = ({ active, label="Consumer" }) => <Node label={label} icon={<UserIcon />} active={active} />;
// FIX: Added optional color prop to BrokerComponent to allow customization
export const BrokerComponent: React.FC<{ active?: boolean, label?: string, color?: string }> = ({ active, label="Broker", color }) => <Node label={label} icon={<ServerIcon />} active={active} color={color} />;

export const AnimatedMessage: React.FC<{ id: number; style: React.CSSProperties }> = ({ id, style }) => (
  <div
    style={style}
    className="absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-1000 ease-in-out text-cyan-400 z-10"
  >
    <MessageIcon />
  </div>
);

export const Arrow: React.FC<{ isVertical?: boolean; className?: string }> = ({ isVertical = false, className = '' }) => (
  <div className={`absolute bg-navy-600 ${isVertical ? 'w-0.5' : 'h-0.5'} ${className}`}>
    <div className={`absolute ${isVertical ? 'left-1/2 -translate-x-1/2 -bottom-1 border-t-[6px] border-t-navy-500' : '-right-1 top-1/2 -translate-y-1/2 border-l-[6px] border-l-navy-500'} w-0 h-0 border-transparent`}></div>
  </div>
);