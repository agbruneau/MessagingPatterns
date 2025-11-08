
import React, { useState, useEffect } from 'react';
import { Consumer, AnimatedMessage, Arrow, Node } from './AnimationComponents';
import { DatabaseIcon } from '../../icons/Icons';

const IdempotentReceiverAnimation: React.FC = () => {
    const [phase, setPhase] = useState(0);
    const [processed, setProcessed] = useState(false);

    useEffect(() => {
        const sequence = [
            () => setPhase(1), // Msg arrives
            () => setPhase(2), // Check DB
            () => { setPhase(3); setProcessed(true); }, // Process & update DB
            () => setPhase(0), // Idle
            () => setPhase(1), // Same Msg arrives again
            () => setPhase(2), // Check DB (finds ID)
            () => setPhase(4), // Discard
            () => { setPhase(0); setProcessed(false); } // Reset
        ];
        let currentStep = 0;
        const interval = setInterval(() => {
          sequence[currentStep]();
          currentStep = (currentStep + 1) % sequence.length;
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const getMessageStyle = (): React.CSSProperties => {
        if (phase === 1) return { transform: 'translateX(100px)', opacity: 1 };
        if (phase === 4) return { transform: 'translateX(100px)', opacity: 0 };
        return { opacity: 0 };
    };

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="flex items-center gap-12">
                <Consumer active={phase === 1 || phase === 3} />
                <Node label="Processed IDs" icon={<DatabaseIcon />} active={phase === 2} color="bg-emerald-800" />
            </div>
            
            <Arrow className="top-1/2 -translate-y-1/2 left-[88px] w-12" />
            
            <div className="absolute top-1/2 -translate-y-1/2 text-cyan-400 transition-all duration-700 ease-in-out" style={getMessageStyle()}>
                <div className="text-center">
                    <span className="text-xs bg-navy-900 px-1 rounded">ID: abc-123</span>
                </div>
            </div>

             {phase === 2 && processed && 
                <div className="absolute top-[65%] right-[25%] text-red-400 text-xs font-bold animate-fade-in">
                  Duplicate Found!
                </div>
              }
             {phase === 3 && 
                <div className="absolute top-[65%] left-[25%] text-green-400 text-xs font-bold animate-fade-in">
                  Processed OK
                </div>
              }
               {phase === 4 && 
                <div className="absolute top-[65%] left-[25%] text-yellow-400 text-xs font-bold animate-fade-in">
                  Discarded
                </div>
              }
        </div>
    );
};

export default IdempotentReceiverAnimation;
