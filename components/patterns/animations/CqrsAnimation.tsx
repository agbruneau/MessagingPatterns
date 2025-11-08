
import React, { useState, useEffect } from 'react';
import { Node, Arrow } from './AnimationComponents';
import { UserIcon, DatabaseIcon, MessageIcon } from '../../icons/Icons';

const CqrsAnimation: React.FC = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 5);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const getStyle = (name: 'command' | 'sync' | 'query'): React.CSSProperties => {
        switch (name) {
            case 'command':
                return {
                    opacity: phase === 1 ? 1 : 0,
                    transform: phase === 1 ? 'translateX(100px) translateY(-60px)' : 'translateX(0) translateY(-60px)',
                    left: '88px',
                };
            case 'sync':
                return {
                    opacity: phase === 3 ? 1 : 0,
                    transform: phase === 3 ? 'translateY(120px)' : 'translateY(0)',
                    left: '176px',
                    top: 'calc(50% - 60px)',
                };
             case 'query':
                return {
                    opacity: phase === 4 ? 1 : 0,
                    transform: phase === 4 ? 'translateX(100px) translateY(60px)' : 'translateX(0) translateY(60px)',
                    left: '88px',
                };
            default: return { opacity: 0 };
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="flex items-center gap-16">
                <Node label="Client" icon={<UserIcon />} active={phase === 1 || phase === 4} />
                <div className="flex flex-col gap-24">
                    <Node label="Write Model" icon={<DatabaseIcon />} active={phase === 2} color="bg-rose-800" />
                    <Node label="Read Model" icon={<DatabaseIcon />} active={phase === 3} color="bg-sky-800" />
                </div>
            </div>
            
            {/* Arrows */}
            <Arrow className="top-[calc(50%-60px)] left-[88px] w-16" />
            <Arrow className="top-[calc(50%+60px)] left-[88px] w-16" />
            <Arrow isVertical={true} className="left-[176px] top-[calc(50%-28px)] h-14" />
            
            {/* Animated Icons */}
            <div className="absolute top-1/2 -translate-y-1/2 text-rose-400 transition-all duration-700 ease-in-out" style={getStyle('command')}><MessageIcon /></div>
            <div className="absolute text-cyan-400 transition-all duration-700 ease-in-out" style={getStyle('sync')}><MessageIcon /></div>
            <div className="absolute top-1/2 -translate-y-1/2 text-sky-400 transition-all duration-700 ease-in-out" style={getStyle('query')}><MessageIcon /></div>
        </div>
    );
};

export default CqrsAnimation;
