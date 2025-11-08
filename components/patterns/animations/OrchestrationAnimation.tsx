
import React, { useState, useEffect } from 'react';
import { Node, AnimatedMessage, Arrow } from './AnimationComponents';
import { ServerIcon } from '../../icons/Icons';

const OrchestrationAnimation: React.FC = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 6);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const getMessageStyle = (p: number): React.CSSProperties => {
        if (p === 1 && phase === 1) return { transform: 'translateX(100px) translateY(-60px)', opacity: 1 };
        if (p === 2 && phase === 2) return { transform: 'translateX(-100px) translateY(-60px)', opacity: 1 };
        if (p === 3 && phase === 3) return { transform: 'translateX(100px) translateY(60px)', opacity: 1 };
        if (p === 4 && phase === 4) return { transform: 'translateX(-100px) translateY(60px)', opacity: 1 };
        return { opacity: 0 };
    };

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="flex items-center gap-16">
                <Node label="Orchestrator" icon={<ServerIcon className="w-10 h-10" />} active={phase > 0 && phase < 5} color="bg-rose-800" />
                <div className="flex flex-col gap-12">
                    <Node label="Service A" icon={<ServerIcon />} active={phase === 1 || phase === 2} />
                    <Node label="Service B" icon={<ServerIcon />} active={phase === 3 || phase === 4} />
                </div>
            </div>
            <Arrow className="top-[calc(50%-60px)] left-[88px] w-16" />
            <Arrow className="top-[calc(50%+60px)] left-[88px] w-16" />
            
            <AnimatedMessage id={1} style={getMessageStyle(1)} />
            <AnimatedMessage id={2} style={getMessageStyle(2)} />
            <AnimatedMessage id={3} style={getMessageStyle(3)} />
            <AnimatedMessage id={4} style={getMessageStyle(4)} />
        </div>
    );
};

export default OrchestrationAnimation;
