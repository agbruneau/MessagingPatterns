
import React, { useState, useEffect } from 'react';
import { Producer, Consumer, BrokerComponent, AnimatedMessage, Arrow } from './AnimationComponents';
import { DatabaseIcon } from '../../icons/Icons';

const BrokerAnimation: React.FC = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const getMessageStyle = (path: number): React.CSSProperties => {
        const isPath1 = path === 1;
        const producerActive = phase === 1;
        const brokerActive = phase === 2;
        const consumerActive = phase === 3;
        
        if (producerActive) return { left: '20px', transform: 'translateX(130px)', opacity: 1 };
        if (brokerActive) return { left: '150px', transform: isPath1 ? 'translateX(100px) translateY(-60px)' : 'translateX(100px) translateY(60px)', opacity: 1 };
        if (consumerActive) return { left: '250px', transform: isPath1 ? 'translateY(-60px)' : 'translateY(60px)', opacity: 0 };
        return { opacity: 0 };
    };

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="flex items-center gap-16">
                <Producer active={phase === 1} />
                <BrokerComponent active={phase === 2} />
                <div className="flex flex-col gap-12">
                    <Consumer label="Consumer A" active={phase === 3} />
                    <Consumer label="Consumer B" active={phase === 3} />
                </div>
            </div>
            <Arrow className="top-1/2 -translate-y-1/2 left-[88px] w-16" />
            <Arrow className="top-[calc(50%-60px)] left-[200px] w-16" />
            <Arrow className="top-[calc(50%+60px)] left-[200px] w-16" />
            <AnimatedMessage id={1} style={getMessageStyle(1)} />
            <AnimatedMessage id={2} style={getMessageStyle(2)} />
        </div>
    );
};

export default BrokerAnimation;
