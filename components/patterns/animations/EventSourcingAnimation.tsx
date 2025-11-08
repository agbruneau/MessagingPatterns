
import React, { useState, useEffect } from 'react';
import { Producer, AnimatedMessage, Arrow, Node } from './AnimationComponents';
import { DatabaseIcon } from '../../icons/Icons';

const EventSourcingAnimation: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const [events, setEvents] = useState<string[]>([]);
  const [state, setState] = useState<{ count: number }>({ count: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => {
        const nextPhase = (prev + 1) % 4;
        if (nextPhase === 2) {
          setEvents(e => [...e, 'ItemAdded']);
        }
        if (nextPhase === 3) {
          setState(s => ({ count: s.count + 1 }));
        }
        if (nextPhase === 0) {
            setEvents([]);
            setState({count: 0})
        }
        return nextPhase;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getMessageStyle = (): React.CSSProperties => {
    if (phase === 1) return { transform: 'translateX(110px)', opacity: 1 };
    if (phase > 1) return { transform: 'translateX(110px)', opacity: 0 };
    return { opacity: 0 };
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="flex items-center gap-12">
        <Producer active={phase === 1} />
        <Node label="Event Store" icon={<DatabaseIcon />} active={phase === 2} color="bg-emerald-800" />
        <div className="flex flex-col items-center gap-2">
            <div className="text-center p-4 border-2 rounded-lg w-40 h-28 flex flex-col justify-center items-center transition-all" style={phase === 3 ? {borderColor: '#34d399', transform: 'scale(1.05)'} : {borderColor: '#3f3f46'}}>
                <span className="text-sm font-bold text-navy-200">Current State</span>
                <span className="text-lg font-mono text-white">count: {state.count}</span>
            </div>
            <span className="text-xs font-semibold tracking-wider text-navy-200">Projection</span>
        </div>
      </div>
      <Arrow className="top-1/2 -translate-y-1/2 left-[88px] w-12" />
      <Arrow className="top-1/2 -translate-y-1/2 left-[212px] w-12" />
      <AnimatedMessage id={1} style={getMessageStyle()} />
      <div className="absolute top-[85%] left-1/2 -translate-x-1/2 flex gap-1">
        {events.map((e, i) => (
            <div key={i} className="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded animate-fade-in">{e}</div>
        ))}
      </div>
    </div>
  );
};

export default EventSourcingAnimation;
