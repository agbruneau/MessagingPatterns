
import React, { useState, useEffect } from 'react';
import { Producer, Consumer, BrokerComponent, AnimatedMessage, Arrow } from './AnimationComponents';

const EventStreamingAnimation: React.FC = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 4);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const getMessageStyle = (index: number): React.CSSProperties => {
        const p = (phase + index) % 4;
        if (p === 0) return { transform: 'translateX(20px)', opacity: 0 };
        if (p === 1) return { transform: 'translateX(130px)', opacity: 1 };
        if (p === 2) return { transform: 'translateX(240px)', opacity: 1 };
        return { transform: 'translateX(240px)', opacity: 0 };
    };

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="flex items-center gap-16">
                <Producer active={phase % 2 === 1} />
                <BrokerComponent label="Stream Platform" active={true} />
                <Consumer label="Stream Processor" active={phase % 2 === 0 && phase > 0} />
            </div>
            <Arrow className="top-1/2 -translate-y-1/2 left-[88px] w-16" />
            <Arrow className="top-1/2 -translate-y-1/2 left-[200px] w-16" />
            
            {[0, 1, 2].map(i => (
                <AnimatedMessage key={i} id={i} style={getMessageStyle(i)} />
            ))}
        </div>
    );
};

export default EventStreamingAnimation;
