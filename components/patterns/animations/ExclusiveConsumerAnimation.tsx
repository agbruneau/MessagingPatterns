
import React, { useState, useEffect } from 'react';
import { Producer, Consumer, BrokerComponent, AnimatedMessage, Arrow } from './AnimationComponents';

const ExclusiveConsumerAnimation: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const [activeConsumer, setActiveConsumer] = useState(0); // 0 or 1

  useEffect(() => {
    const sequence = [
      () => setPhase(1), // Message to broker
      () => setPhase(2), // Message to consumer A
      () => setPhase(3), // Consumer A processes
      () => setPhase(1), // Message to broker
      () => setPhase(2), // Message to consumer A
      () => { setPhase(4); setActiveConsumer(1) }, // Consumer A fails, B becomes active
      () => setPhase(1), // Message to broker
      () => setPhase(2), // Message to consumer B
      () => setPhase(3), // Consumer B processes
      () => { setPhase(0); setActiveConsumer(0); } // Reset
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      sequence[currentStep]();
      currentStep = (currentStep + 1) % sequence.length;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getMessageStyle = (): React.CSSProperties => {
    if (phase === 1) return { transform: 'translateX(130px)', opacity: 1 };
    if (phase === 2) {
      const yOffset = activeConsumer === 0 ? '-60px' : '60px';
      return { transform: `translateX(240px) translateY(${yOffset})`, opacity: 1 };
    }
    if (phase > 2) {
      const yOffset = activeConsumer === 0 ? '-60px' : '60px';
       return { transform: `translateX(240px) translateY(${yOffset})`, opacity: 0 };
    }
    return { opacity: 0 };
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="flex items-center gap-16">
        <Producer active={phase === 1} />
        <BrokerComponent label="Queue" active={phase === 1 || phase === 2} />
        <div className="flex flex-col gap-12">
          <Consumer label="Consumer A" active={activeConsumer === 0 && phase > 0} />
          <Consumer label="Consumer B" active={activeConsumer === 1 && phase > 0} />
        </div>
      </div>
      <Arrow className="top-1/2 -translate-y-1/2 left-[88px] w-16" />
      <Arrow className="top-[calc(50%-60px)] left-[200px] w-16" />
      <Arrow className="top-[calc(50%+60px)] left-[200px] w-16" />
      {phase === 4 && <div className="absolute top-[calc(50%-60px)] left-[290px] text-red-500 font-bold text-xs animate-fade-in">FAIL</div>}
      <AnimatedMessage id={1} style={getMessageStyle()} />
    </div>
  );
};

export default ExclusiveConsumerAnimation;
