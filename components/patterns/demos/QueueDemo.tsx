
import React, { useState, useCallback, useEffect } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const QueueDemo: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [queue, setQueue] = useState<string[]>([]);
    const [processed, setProcessed] = useState<string[]>([]);
    const [messageCounter, setMessageCounter] = useState(0);

    const handleSendMessage = useCallback(() => {
        const newMessage = `Task #${messageCounter + 1}`;
        setMessageCounter(c => c + 1);
        setMessages(m => [...m, newMessage]);
        setQueue(q => [...q, newMessage]);
    }, [messageCounter]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (queue.length > 0) {
                const [messageToProcess, ...rest] = queue;
                setQueue(rest);
                setProcessed(p => [...p, messageToProcess]);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [queue]);

    const resetDemo = useCallback(() => {
        setMessages([]);
        setQueue([]);
        setProcessed([]);
        setMessageCounter(0);
    }, []);

    return (
        <DemoContainer title="Simulate sending a task to a queue." onReset={resetDemo}>
            <div className="grid grid-cols-3 gap-4">
                <Actor label="Producer">
                    <button onClick={handleSendMessage} className="w-full bg-cyan-600 text-white text-sm py-2 rounded hover:bg-cyan-700">Send Task</button>
                    {messages.map(m => <MessageItem key={m} content={`Sent: ${m}`} />)}
                </Actor>
                <Actor label="Queue">
                    {queue.map(m => <MessageItem key={m} content={m} className="bg-purple-800" />)}
                </Actor>
                <Actor label="Consumer">
                    {processed.map(m => <MessageItem key={m} content={`Processed: ${m}`} className="bg-green-800" />)}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default QueueDemo;
