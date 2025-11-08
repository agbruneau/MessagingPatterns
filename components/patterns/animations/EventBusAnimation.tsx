
import React, { useState, useEffect } from 'react';
import { Node, AnimatedMessage, Arrow } from './AnimationComponents';
import { ServerIcon } from '../../icons/Icons';

const EventBusAnimation: React.FC = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 3);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const getMessageStyle = (target: 'bus' | 'sub1' | 'sub2'): React.CSSProperties => {
        if (target === 'bus') {
            return { opacity: phase === 1 ? 1: 0, transform: `translateY(-80px)` };
        }
        if (target === 'sub1') {
             return { opacity: phase === 2 ? 1: 0, transform: `translateX(-100px) translateY(-80px)` };
        }
        if (target === 'sub2') {
             return { opacity: phase === 2 ? 1: 0, transform: `translateX(100px) translateY(-80px)` };
        }
        return { opacity: 0 };
    };

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="flex flex-col items-center gap-12">
                <Node label="Publisher Service" icon={<ServerIcon />} active={phase === 1} />
                <Node label="Event Bus" icon={<ServerIcon className="w-10 h-10" />} active={phase === 1 || phase === 2} color="bg-purple-800" />
                <div className="flex gap-16">
                    <Node label="Subscriber A" icon={<ServerIcon />} active={phase === 2} />
                    <Node label="Subscriber B" icon={<ServerIcon />} active={phase === 2} />
                </div>
            </div>
            
            <AnimatedMessage id={1} style={getMessageStyle('bus')} />
            <AnimatedMessage id={2} style={getMessageStyle('sub1')} />
            <AnimatedMessage id={3} style={getMessageStyle('sub2')} />
        </div>
    );
};

export default EventBusAnimation;
