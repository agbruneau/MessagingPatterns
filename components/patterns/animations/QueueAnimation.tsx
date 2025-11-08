
import React, { useState, useEffect } from 'react';
import { Producer, Consumer, BrokerComponent, AnimatedMessage, Arrow } from './AnimationComponents';

const QueueAnimation: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getMessageStyle = (): React.CSSProperties => {
    switch (phase) {
      case 0: return { transform: 'translateX(20px)', opacity: 0 };
      case 1: return { transform: 'translateX(130px)', opacity: 1 };
      case 2: return { transform: 'translateX(240px)', opacity: 1 };
      case 3: return { transform: 'translateX(240px)', opacity: 0 };
      default: return {};
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="flex items-center gap-16">
        <Producer active={phase === 1} />
        <BrokerComponent label="Queue" active={phase === 2} />
        <Consumer active={phase === 3} />
      </div>
      <Arrow className="top-1/2 -translate-y-1/2 left-[88px] w-16" />
      <Arrow className="top-1/2 -translate-y-1/2 left-[200px] w-16" />
      <AnimatedMessage id={1} style={getMessageStyle()} />
    </div>
  );
};

export default QueueAnimation;
