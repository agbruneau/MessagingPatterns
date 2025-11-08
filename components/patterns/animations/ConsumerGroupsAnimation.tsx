
import React, { useState, useEffect } from 'react';
import { Node, AnimatedMessage, Arrow, Consumer } from './AnimationComponents';
import { ServerIcon } from '../../icons/Icons';

const ConsumerGroupsAnimation: React.FC = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 4);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const getMessageStyle = (partition: number): React.CSSProperties => {
        const p = (phase + partition) % 4;
        const y = (partition - 1) * 30;

        if (p === 0) return { opacity: 0, transform: `translateX(0) translateY(${y}px)` };
        if (p === 1) return { opacity: 1, transform: `translateX(80px) translateY(${y}px)` };
        
        // Group A splits partitions
        const groupA_consumer = partition % 2 === 0 ? -60 : 0;
        // Group B gets all
        const groupB_consumer = 60;

        if (p === 2) return { opacity: 1, transform: `translateX(200px) translateY(${partition < 2 ? groupA_consumer : groupB_consumer}px)` };
        
        return { opacity: 0 };
    };

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="flex items-center gap-12">
                <Node label="Topic/Stream" icon={<ServerIcon className="w-10 h-10" />} active={true} />
                <div className="flex flex-col gap-12">
                    <div className="p-2 border border-dashed border-navy-600 rounded">
                        <p className="text-xs text-center mb-2 text-navy-300">Consumer Group A</p>
                        <div className="flex gap-4">
                           <Consumer label="A-1" active={phase % 4 === 2} />
                           <Consumer label="A-2" active={phase % 4 === 2} />
                        </div>
                    </div>
                    <div className="p-2 border border-dashed border-navy-600 rounded">
                         <p className="text-xs text-center mb-2 text-navy-300">Consumer Group B</p>
                         <Consumer label="B-1" active={phase % 4 === 2} />
                    </div>
                </div>
            </div>
            
             {[0, 1, 2].map(i => (
                <AnimatedMessage key={i} id={i} style={getMessageStyle(i)} />
            ))}
        </div>
    );
};

export default ConsumerGroupsAnimation;
