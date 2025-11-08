
import React, { useState, useEffect } from 'react';
import { Node, AnimatedMessage, Arrow } from './AnimationComponents';
import { ServerIcon } from '../../icons/Icons';

const ChoreographyAnimation: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getMessageStyle = (p: number): React.CSSProperties => {
    if (p === 1 && phase === 1) return { transform: 'translateX(110px)', opacity: 1 };
    if (p === 2 && phase === 3) return { transform: 'translateX(-110px)', opacity: 1 };
    return { opacity: 0 };
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="flex items-center gap-12">
        <Node label="Order Service" icon={<ServerIcon />} active={phase === 1} />
        <Node label="Event Bus" icon={<ServerIcon className="w-10 h-10" />} active={phase === 1 || phase === 3} color="bg-purple-800" />
        <Node label="Payment Service" icon={<ServerIcon />} active={phase === 2 || phase === 3} />
      </div>
      <Arrow className="top-1/2 -translate-y-1/2 left-[88px] w-12" />
      <Arrow className="top-1/2 -translate-y-1/2 left-[212px] w-12" />
      
      {/* Order -> Event Bus */}
      <div style={getMessageStyle(1)} className="absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-1000 ease-in-out text-cyan-400 z-10">
        <div className="flex flex-col items-center">
          <ServerIcon className="w-5 h-5"/>
          <span className="text-xs">OrderPlaced</span>
        </div>
      </div>
      
      {/* Payment -> Event Bus */}
      <div style={getMessageStyle(2)} className="absolute top-1/2 right-0 -translate-y-1/2 transition-all duration-1000 ease-in-out text-green-400 z-10">
        <div className="flex flex-col items-center">
            <ServerIcon className="w-5 h-5"/>
            <span className="text-xs">PaymentSuccess</span>
        </div>
      </div>
    </div>
  );
};

export default ChoreographyAnimation;
