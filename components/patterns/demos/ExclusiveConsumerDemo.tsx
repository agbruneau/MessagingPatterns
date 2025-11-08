
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const ExclusiveConsumerDemo: React.FC = () => {
    const [queue, setQueue] = useState<string[]>([]);
    const [consumerA, setConsumerA] = useState<string[]>([]);
    const [consumerB, setConsumerB] = useState<string[]>([]);
    const [activeConsumer, setActiveConsumer] = useState<'A' | 'B'>('A');
    const [messageCounter, setMessageCounter] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const resetDemo = useCallback(() => {
        setQueue([]);
        setConsumerA([]);
        setConsumerB([]);
        setActiveConsumer('A');
        setMessageCounter(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    const startProcessing = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
            setQueue(q => {
                if (q.length > 0) {
                    const [messageToProcess, ...rest] = q;
                    if (activeConsumer === 'A') {
                        setConsumerA(p => [messageToProcess, ...p].slice(0, 3));
                    } else {
                        setConsumerB(p => [messageToProcess, ...p].slice(0, 3));
                    }
                    return rest;
                }
                return q;
            });
        }, 2000);
    }, [activeConsumer]);
    
    useEffect(() => {
        startProcessing();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [startProcessing]);

    const handleSendMessage = useCallback(() => {
        const newMessage = `Task #${messageCounter + 1}`;
        setMessageCounter(c => c + 1);
        setQueue(q => [...q, newMessage]);
    }, [messageCounter]);
    
    const handleFailover = useCallback(() => {
        setActiveConsumer(c => c === 'A' ? 'B' : 'A');
    }, []);

    return (
        <DemoContainer title="Simuler un basculement (failover) entre consommateurs." onReset={resetDemo}>
            <div className="flex flex-wrap gap-4 mb-4">
                <button onClick={handleSendMessage} className="bg-cyan-600 text-white text-sm py-2 px-4 rounded hover:bg-cyan-700">Envoyer Message Critique</button>
                <button onClick={handleFailover} className="bg-red-600 text-white text-sm py-2 px-4 rounded hover:bg-red-700">Simuler une Panne</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 <Actor label="Queue">
                    {queue.map(m => <MessageItem key={m} content={m} className="bg-purple-800" />)}
                </Actor>
                <Actor label={`Consumer A ${activeConsumer === 'A' ? '(Actif)' : '(Standby)'}`}>
                    {consumerA.map(m => <MessageItem key={m} content={`Processed: ${m}`} className="bg-green-800" />)}
                </Actor>
                 <Actor label={`Consumer B ${activeConsumer === 'B' ? '(Actif)' : '(Standby)'}`}>
                    {consumerB.map(m => <MessageItem key={m} content={`Processed: ${m}`} className="bg-green-800" />)}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default ExclusiveConsumerDemo;
