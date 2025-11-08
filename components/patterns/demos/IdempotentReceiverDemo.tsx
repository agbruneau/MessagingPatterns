
import React, { useState, useCallback } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const IdempotentReceiverDemo: React.FC = () => {
    const [processedIds, setProcessedIds] = useState<Set<string>>(new Set());
    const [consumerLog, setConsumerLog] = useState<string[]>([]);
    const [lastMessageId, setLastMessageId] = useState(1);

    const handleSendMessage = useCallback((isDuplicate: boolean) => {
        const messageId = isDuplicate ? `msg-${lastMessageId}` : `msg-${lastMessageId + 1}`;
        if (!isDuplicate) {
            setLastMessageId(id => id + 1);
        }
        
        // Simulate receiving the message
        if (processedIds.has(messageId)) {
            setConsumerLog(log => [`Ignored duplicate: ${messageId}`, ...log].slice(0, 4));
        } else {
            setConsumerLog(log => [`Processed: ${messageId}`, ...log].slice(0, 4));
            setProcessedIds(ids => new Set(ids).add(messageId));
        }
    }, [processedIds, lastMessageId]);
    
    const resetDemo = useCallback(() => {
        setProcessedIds(new Set());
        setConsumerLog([]);
        setLastMessageId(1);
    }, []);

    return (
        <DemoContainer title="Simuler la réception de messages en double." onReset={resetDemo}>
            <div className="flex flex-wrap gap-4 mb-4">
                <button onClick={() => handleSendMessage(false)} className="bg-cyan-600 text-white text-sm py-2 px-4 rounded hover:bg-cyan-700">Envoyer Nouveau Message</button>
                <button onClick={() => handleSendMessage(true)} className="bg-yellow-600 text-white text-sm py-2 px-4 rounded hover:bg-yellow-700">Renvoyer le Dernier Message</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Actor label="Consumer Log">
                    {consumerLog.map((log, i) => 
                        <MessageItem key={i} content={log} className={log.startsWith('Ignored') ? 'bg-yellow-800' : 'bg-green-800'} />
                    )}
                </Actor>
                <Actor label="DB des IDs Traités">
                    {[...processedIds].map(id => <MessageItem key={id} content={id} className="bg-sky-800" />)}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default IdempotentReceiverDemo;
