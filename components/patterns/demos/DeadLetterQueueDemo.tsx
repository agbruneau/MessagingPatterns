
import React, { useState, useCallback } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const MAX_RETRIES = 2;

const DeadLetterQueueDemo: React.FC = () => {
    const [mainQueue, setMainQueue] = useState<{content: string, retries: number}[]>([]);
    const [dlq, setDlq] = useState<string[]>([]);
    const [consumerLog, setConsumerLog] = useState<string[]>([]);
    const [messageCounter, setMessageCounter] = useState(0);

    const handleSendBadMessage = useCallback(() => {
        const newMessage = `Msg #${messageCounter + 1}`;
        setMessageCounter(c => c + 1);
        setMainQueue(q => [...q, { content: newMessage, retries: 0 }]);
    }, [messageCounter]);

    const processQueue = useCallback(() => {
        if (mainQueue.length > 0) {
            const [message, ...rest] = mainQueue;
            
            // Simulate processing failure
            setConsumerLog(log => [`Failed to process ${message.content} (Attempt ${message.retries + 1})`, ...log].slice(0,3));

            if (message.retries < MAX_RETRIES) {
                // Re-queue for retry
                setTimeout(() => {
                    setMainQueue(q => [...q, { ...message, retries: message.retries + 1}]);
                }, 1000);
            } else {
                // Move to DLQ
                 setTimeout(() => {
                    setConsumerLog(log => [`Moving ${message.content} to DLQ`, ...log].slice(0,3));
                    setDlq(d => [message.content, ...d]);
                }, 1000);
            }
             setMainQueue(rest);
        }
    }, [mainQueue]);

    const resetDemo = useCallback(() => {
        setMainQueue([]);
        setDlq([]);
        setConsumerLog([]);
        setMessageCounter(0);
    }, []);

    return (
        <DemoContainer title="Simuler un 'message empoisonné' qui finit dans une DLQ." onReset={resetDemo}>
             <div className="flex flex-wrap gap-4 mb-4">
                <button onClick={handleSendBadMessage} className="bg-cyan-600 text-white text-sm py-2 px-4 rounded hover:bg-cyan-700">Envoyer "Mauvais" Message</button>
                <button onClick={processQueue} disabled={mainQueue.length === 0} className="bg-green-600 text-white text-sm py-2 px-4 rounded hover:bg-green-700 disabled:bg-navy-600">Traiter Message</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Actor label="File Principale">
                    {mainQueue.map(m => <MessageItem key={m.content + m.retries} content={`${m.content} (Tentatives: ${m.retries})`} className="bg-purple-800" />)}
                </Actor>
                 <Actor label="Consumer Log">
                    {consumerLog.map((log, i) => <MessageItem key={i} content={log} className="bg-yellow-800" />)}
                </Actor>
                 <Actor label="Dead-Letter Queue">
                    {dlq.map(m => <MessageItem key={m} content={m} className="bg-red-800" />)}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default DeadLetterQueueDemo;
