
import React, { useState, useCallback } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const BrokerDemo: React.FC = () => {
    const [sentMessages, setSentMessages] = useState<string[]>([]);
    const [routedMessage, setRoutedMessage] = useState<string | null>(null);
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
    const [messageCounter, setMessageCounter] = useState(0);

    const handleSend = useCallback(() => {
        const newMessage = `Msg #${messageCounter + 1}`;
        setMessageCounter(c => c + 1);
        setSentMessages(m => [...m, newMessage]);
        // Simulate broker routing
        setTimeout(() => setRoutedMessage(newMessage), 500);
        setTimeout(() => {
            setRoutedMessage(null);
            setReceivedMessages(r => [...r, newMessage]);
        }, 1500);
    }, [messageCounter]);

    const resetDemo = useCallback(() => {
        setSentMessages([]);
        setRoutedMessage(null);
        setReceivedMessages([]);
        setMessageCounter(0);
    }, []);

    return (
        <DemoContainer title="Simulate sending a message via a central broker." onReset={resetDemo}>
            <div className="grid grid-cols-3 gap-4">
                <Actor label="Sender App">
                    <button onClick={handleSend} className="w-full bg-cyan-600 text-white text-sm py-2 rounded hover:bg-cyan-700">Send Message</button>
                    {sentMessages.map(m => <MessageItem key={m} content={`Sent: ${m}`} />)}
                </Actor>
                <Actor label="Message Broker">
                    {routedMessage && <MessageItem content={`Routing: ${routedMessage}`} className="bg-purple-800 animate-pulse-fast" />}
                </Actor>
                <Actor label="Receiver App">
                    {receivedMessages.map(m => <MessageItem key={m} content={`Received: ${m}`} className="bg-green-800" />)}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default BrokerDemo;
