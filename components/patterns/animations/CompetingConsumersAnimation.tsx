
import React, { useState, useEffect } from 'react';
import { Producer, Consumer, BrokerComponent, AnimatedMessage, Arrow } from './AnimationComponents';

const CompetingConsumersAnimation: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; phase: number; consumer: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => {
        const updated = prev.map(m => ({ ...m, phase: m.phase + 1 })).filter(m => m.phase < 4);
        const newMsg = { id: Date.now(), phase: 1, consumer: updated.length % 3 };
        return [...updated, newMsg];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getMessageStyle = (phase: number, consumerIndex: number): React.CSSProperties => {
    switch (phase) {
      case 1: return { transform: 'translateX(110px)', opacity: 1 };
      case 2:
        const yOffset = (consumerIndex - 1) * 80;
        return { transform: `translateX(240px) translateY(${yOffset}px)`, opacity: 1 };
      case 3:
        const yOffsetDone = (consumerIndex - 1) * 80;
        return { transform: `translateX(240px) translateY(${yOffsetDone}px)`, opacity: 0 };
      default: return { opacity: 0 };
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="flex items-center gap-12">
        <Producer active={true} />
        <BrokerComponent label="Queue" active={true} />
        <div className="flex flex-col gap-8">
          {[0, 1, 2].map(i => (
            <Consumer key={i} label={`Consumer ${String.fromCharCode(65 + i)}`} active={messages.some(m => m.consumer === i && m.phase === 2)} />
          ))}
        </div>
      </div>
      <Arrow className="top-1/2 -translate-y-1/2 left-[88px] w-12" />
      <Arrow className="top-[calc(50%-80px)] left-[200px] w-16" />
      <Arrow className="top-1/2 -translate-y-1/2 left-[200px] w-16" />
      <Arrow className="top-[calc(50%+80px)] left-[200px] w-16" />

      {messages.map(msg => (
        <AnimatedMessage key={msg.id} id={msg.id} style={getMessageStyle(msg.phase, msg.consumer)} />
      ))}
    </div>
  );
};

export default CompetingConsumersAnimation;
