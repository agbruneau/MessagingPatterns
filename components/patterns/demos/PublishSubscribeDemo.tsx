
import React, { useState, useCallback, useEffect } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const PublishSubscribeDemo: React.FC = () => {
    const [publishedMessage, setPublishedMessage] = useState<string | null>(null);
    const [subA, setSubA] = useState<string[]>([]);
    const [subB, setSubB] = useState<string[]>([]);
    const [messageCounter, setMessageCounter] = useState(0);

    const handlePublish = useCallback(() => {
        const newMessage = `Update #${messageCounter + 1}`;
        setMessageCounter(c => c + 1);
        setPublishedMessage(newMessage);
    }, [messageCounter]);

    useEffect(() => {
        if (publishedMessage) {
            setSubA(s => [...s, publishedMessage]);
            setSubB(s => [...s, publishedMessage]);
            const timer = setTimeout(() => setPublishedMessage(null), 500);
            return () => clearTimeout(timer);
        }
    }, [publishedMessage]);
    
    const resetDemo = useCallback(() => {
        setPublishedMessage(null);
        setSubA([]);
        setSubB([]);
        setMessageCounter(0);
    }, []);

    return (
        <DemoContainer title="Simulate publishing an event to a topic." onReset={resetDemo}>
            <div className="grid grid-cols-3 gap-4">
                <Actor label="Publisher">
                    <button onClick={handlePublish} className="w-full bg-cyan-600 text-white text-sm py-2 rounded hover:bg-cyan-700">Publish Event</button>
                    {publishedMessage && <MessageItem content={`Published: ${publishedMessage}`} />}
                </Actor>
                <Actor label="Subscriber A">
                    {subA.map((m, i) => <MessageItem key={i} content={`Received: ${m}`} className="bg-green-800" />)}
                </Actor>
                <Actor label="Subscriber B">
                    {subB.map((m, i) => <MessageItem key={i} content={`Received: ${m}`} className="bg-green-800" />)}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default PublishSubscribeDemo;
