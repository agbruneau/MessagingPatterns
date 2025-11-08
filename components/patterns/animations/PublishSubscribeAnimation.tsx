
import React, { useState, useEffect } from 'react';
import { Producer, Consumer, BrokerComponent, AnimatedMessage, Arrow } from './AnimationComponents';

const PublishSubscribeAnimation: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getMessageStyle = (target: 'topic' | 'sub1' | 'sub2' | 'sub3'): React.CSSProperties => {
    switch (target) {
      case 'topic':
        return {
          left: '20px',
          transform: phase >= 1 ? 'translateX(130px)' : 'translateX(20px)',
          opacity: phase === 1 ? 1 : (phase > 1 ? 0 : 0),
        };
      case 'sub1':
        return {
          left: '150px',
          top: '50%',
          transform: `translateX(${phase >= 2 ? '100px' : '0px'}) translateY(${phase >= 2 ? '-60px' : '0px'})`,
          opacity: phase >= 2 ? 1 : 0,
        };
      case 'sub2':
        return {
          left: '150px',
          transform: `translateX(${phase >= 2 ? '100px' : '0px'})`,
          opacity: phase >= 2 ? 1 : 0,
        };
      case 'sub3':
        return {
          left: '150px',
          top: '50%',
          transform: `translateX(${phase >= 2 ? '100px' : '0px'}) translateY(${phase >= 2 ? '60px' : '0px'})`,
          opacity: phase >= 2 ? 1 : 0,
        };
      default: return {};
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="flex items-center gap-16">
        <Producer active={phase === 1} />
        <BrokerComponent label="Topic" active={phase >= 1} />
        <div className="flex flex-col gap-8">
          <Consumer label="Subscriber A" active={phase >= 2} />
          <Consumer label="Subscriber B" active={phase >= 2} />
          <Consumer label="Subscriber C" active={phase >= 2} />
        </div>
      </div>
      <Arrow className="top-1/2 -translate-y-1/2 left-[88px] w-16" />
      <Arrow className="top-[calc(50%-60px)] left-[200px] w-16" />
      <Arrow className="top-1/2 -translate-y-1/2 left-[200px] w-16" />
      <Arrow className="top-[calc(50%+60px)] left-[200px] w-16" />
      
      <AnimatedMessage id={1} style={getMessageStyle('topic')} />
      <AnimatedMessage id={2} style={getMessageStyle('sub1')} />
      <AnimatedMessage id={3} style={getMessageStyle('sub2')} />
      <AnimatedMessage id={4} style={getMessageStyle('sub3')} />
    </div>
  );
};

export default PublishSubscribeAnimation;
