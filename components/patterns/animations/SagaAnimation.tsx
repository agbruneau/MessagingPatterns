
import React, { useState, useEffect } from 'react';
import { Node, AnimatedMessage, Arrow } from './AnimationComponents';
import { ServerIcon } from '../../icons/Icons';

const SagaAnimation: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const [fail, setFail] = useState(false);

  useEffect(() => {
     const interval = setInterval(() => {
      setPhase(prev => {
        const next = (prev + 1);
        if (next === 3 && fail) return 4; // Skip to fail state
        if (next === 6) { setFail(f => !f); return 0; } // Reset and toggle fail for next run
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [fail]);

  const getMessageStyle = (p: number): React.CSSProperties => {
    if (phase === p) return { opacity: 1, transform: 'scale(1)' };
    return { opacity: 0, transform: 'scale(0.5)' };
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="flex flex-col items-center gap-16">
        <div className="flex items-center gap-12">
            <Node label="Order" icon={<ServerIcon />} active={phase === 1} />
            <Arrow className="top-1/2 -translate-y-1/2 left-[88px] w-12" />
            <Node label="Payment" icon={<ServerIcon />} active={phase === 2 || phase === 5} />
            <Arrow className="top-1/2 -translate-y-1/2 left-[212px] w-12" />
            <Node label="Shipping" icon={<ServerIcon />} active={phase === 3} />
        </div>
        {fail && <div className="text-sm font-bold text-red-500">SIMULATING FAILURE</div>}
      </div>

       {/* Events */}
       <div style={getMessageStyle(1)} className="absolute top-[calc(50%-40px)] left-[35%] transition-all duration-500"><MessageItem content="OrderPlaced" className="bg-cyan-800"/></div>
       <div style={getMessageStyle(2)} className="absolute top-[calc(50%-40px)] left-[60%] transition-all duration-500"><MessageItem content="PaymentSuccess" className="bg-cyan-800"/></div>
       <div style={getMessageStyle(3)} className="absolute top-[calc(50%-40px)] left-[85%] transition-all duration-500"><MessageItem content="OrderShipped" className="bg-green-800"/></div>

       {/* Compensating Events */}
       <div style={getMessageStyle(4)} className="absolute top-[calc(50%+40px)] left-[60%] transition-all duration-500"><MessageItem content="PaymentFailed" className="bg-red-800"/></div>
       <div style={getMessageStyle(5)} className="absolute top-[calc(50%+40px)] left-[35%] transition-all duration-500"><MessageItem content="CancelOrder" className="bg-red-800"/></div>

    </div>
  );
};

const MessageItem: React.FC<{ content: string; className?: string }> = ({ content, className }) => (
    <div className={`text-xs p-1 rounded ${className}`}>
        {content}
    </div>
);


export default SagaAnimation;
