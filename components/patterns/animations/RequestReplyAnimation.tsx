
import React, { useState, useEffect } from 'react';
import { Node, AnimatedMessage, Arrow } from './AnimationComponents';
import { UserIcon, ServerIcon } from '../../icons/Icons';

const RequestReplyAnimation: React.FC = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 4);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const getMessageStyle = (p: 'request' | 'response'): React.CSSProperties => {
        if (p === 'request') {
            if (phase === 0) return { transform: 'translateX(0)', opacity: 0, top: 'calc(25% - 10px)' };
            if (phase === 1) return { transform: 'translateX(130px)', opacity: 1, top: 'calc(25% - 10px)' };
            return { transform: 'translateX(130px)', opacity: 0, top: 'calc(25% - 10px)' };
        }
        if (p === 'response') {
            if (phase < 2) return { transform: 'translateX(130px)', opacity: 0, top: 'calc(75% - 10px)' };
            if (phase === 2) return { transform: 'translateX(0)', opacity: 1, top: 'calc(75% - 10px)' };
            return { transform: 'translateX(0)', opacity: 0, top: 'calc(75% - 10px)' };
        }
        return {};
    };

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="flex items-center gap-16">
                <Node label="Client" icon={<UserIcon />} active={phase === 0 || phase === 3} />
                <div className="flex flex-col items-center justify-around h-48">
                    <div className="text-xs text-center p-2 border-dashed border-2 border-navy-700 rounded-md w-32">Request Queue</div>
                    <div className="text-xs text-center p-2 border-dashed border-2 border-navy-700 rounded-md w-32">Reply Queue</div>
                </div>
                <Node label="Service" icon={<ServerIcon />} active={phase === 1 || phase === 2} />
            </div>
            
            <Arrow className="top-[25%] left-[88px] w-16" />
            <Arrow className="top-[75%] right-[88px] w-16" />

            <AnimatedMessage id={1} style={getMessageStyle('request')} />
            <AnimatedMessage id={2} style={getMessageStyle('response')} />
        </div>
    );
};

export default RequestReplyAnimation;
