
import React from 'react';
import { ArrowPathIcon } from '../../icons/Icons';

export const DemoContainer: React.FC<{ children: React.ReactNode, title: string, onReset: () => void }> = ({ children, title, onReset }) => (
    <div className="bg-navy-950 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-semibold text-navy-300">{title}</p>
            <button onClick={onReset} className="text-xs text-navy-400 hover:text-white flex items-center gap-1">
                <ArrowPathIcon /> Reset
            </button>
        </div>
        {children}
    </div>
);

export const Actor: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="bg-navy-800 p-4 rounded-lg min-h-[150px] flex flex-col">
        <h4 className="text-sm font-bold text-white mb-2">{label}</h4>
        <div className="flex-grow space-y-2">{children}</div>
    </div>
);

export const MessageItem: React.FC<{ content: string; className?: string }> = ({ content, className }) => (
    <div className={`text-xs bg-navy-700 p-2 rounded animate-slide-in ${className}`}>
        {content}
    </div>
);
