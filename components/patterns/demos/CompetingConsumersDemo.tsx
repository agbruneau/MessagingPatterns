
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const NUM_CONSUMERS = 3;

const CompetingConsumersDemo: React.FC = () => {
    const [queue, setQueue] = useState<string[]>([]);
    const [consumers, setConsumers] = useState<Array<string[]>>(Array(NUM_CONSUMERS).fill([]));
    const [messageCounter, setMessageCounter] = useState(0);
    const nextConsumer = useRef(0);

    const handleSendMessage = useCallback(() => {
        const newMessage = `Task #${messageCounter + 1}`;
        setMessageCounter(c => c + 1);
        setQueue(q => [...q, newMessage]);
    }, [messageCounter]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (queue.length > 0) {
                const [messageToProcess, ...rest] = queue;
                setQueue(rest);
                
                const consumerIndex = nextConsumer.current;
                setConsumers(prevConsumers => {
                    const newConsumers = [...prevConsumers];
                    newConsumers[consumerIndex] = [messageToProcess, ...newConsumers[consumerIndex]].slice(0, 3);
                    return newConsumers;
                });
                
                nextConsumer.current = (nextConsumer.current + 1) % NUM_CONSUMERS;
            }
        }, 1500);
        return () => clearInterval(interval);
    }, [queue]);

    const resetDemo = useCallback(() => {
        setQueue([]);
        setConsumers(Array(NUM_CONSUMERS).fill([]));
        setMessageCounter(0);
        nextConsumer.current = 0;
    }, []);

    return (
        <DemoContainer title="Simuler l'envoi de tâches à plusieurs consommateurs concurrents." onReset={resetDemo}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* FIX: Moved button inside Actor to provide required children prop */}
                <Actor label="Producer">
                    <button onClick={handleSendMessage} className="w-full bg-cyan-600 text-white text-sm py-2 rounded hover:bg-cyan-700">Envoyer une Tâche</button>
                </Actor>
                <Actor label="Queue">
                    {queue.map(m => <MessageItem key={m} content={m} className="bg-purple-800" />)}
                </Actor>
                {consumers.map((processed, i) => (
                     <Actor key={i} label={`Consumer ${i + 1}`}>
                        {processed.map(m => <MessageItem key={m} content={`Processing: ${m}`} className="bg-green-800" />)}
                    </Actor>
                ))}
            </div>
        </DemoContainer>
    );
};

export default CompetingConsumersDemo;