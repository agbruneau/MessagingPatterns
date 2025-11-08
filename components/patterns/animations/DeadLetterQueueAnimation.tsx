
import React, { useState, useEffect } from 'react';
import { Producer, Consumer, BrokerComponent, AnimatedMessage, Arrow } from './AnimationComponents';
import { XCircleIcon } from '../../icons/Icons';

const DeadLetterQueueAnimation: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const sequence = [
      () => { setPhase(1); }, // Prod -> Queue
      () => { setPhase(2); }, // Queue -> Consumer
      () => { setPhase(3); setRetry(r => r+1); }, // Consumer fails, msg back to queue
      () => { setPhase(2); }, // Queue -> Consumer
      () => { setPhase(3); setRetry(r => r+1); }, // Consumer fails, msg back to queue
      () => { setPhase(4); }, // Queue -> DLQ
      () => { setPhase(0); setRetry(0); } // Reset
    ];
    let currentStep = 0;
    const interval = setInterval(() => {
      sequence[currentStep]();
      currentStep = (currentStep + 1) % sequence.length;
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  
  const getMessageStyle = (): React.CSSProperties => {
    if (phase === 1) return { transform: 'translateX(110px) translateY(-40px)', opacity: 1 };
    if (phase === 2) return { transform: 'translateX(240px) translateY(-40px)', opacity: 1 };
    if (phase === 3) return { transform: 'translateX(110px) translateY(-40px)', opacity: 1 }; // Back to queue
    if (phase === 4) return { transform: 'translateX(110px) translateY(40px)', opacity: 1 }; // To DLQ
    return { opacity: 0 };
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="flex items-center gap-12">
        <Producer active={phase === 1} />
        <div className="flex flex-col items-center gap-4">
            <BrokerComponent label="Main Queue" active={phase > 0 && phase < 4} />
            <BrokerComponent label="Dead-Letter Queue" active={phase === 4} color="bg-red-800" />
        </div>
        <div className="relative">
            <Consumer active={phase === 2} />
            {phase === 3 && <div className="absolute -top-2 -right-2 text-red-500 animate-fade-in"><XCircleIcon/></div>}
        </div>
      </div>
      
      <Arrow className="top-[calc(50%-40px)] left-[88px] w-12" />
      <Arrow className="top-[calc(50%-40px)] left-[212px] w-16" />
      <Arrow className="top-[calc(50%+40px)] left-[140px] w-0 h-0" /> 
      
      <AnimatedMessage id={1} style={getMessageStyle()} />
      {retry > 0 && phase < 4 && 
        <div className="absolute top-[65%] left-[65%] text-red-400 text-xs font-bold">
          Retry: {retry}/2
        </div>
      }
    </div>
  );
};

export default DeadLetterQueueAnimation;
