
import React, { useState, useCallback } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const RequestReplyDemo: React.FC = () => {
    const [requests, setRequests] = useState<{id: number, content: string}[]>([]);
    const [responses, setResponses] = useState<{id: number, content: string}[]>([]);
    const [serviceMessage, setServiceMessage] = useState<{id: number, content: string} | null>(null);
    const [reqCounter, setReqCounter] = useState(0);

    const handleSendRequest = useCallback(() => {
        const newId = reqCounter + 1;
        setReqCounter(c => c + 1);
        const newRequest = { id: newId, content: `Query #${newId}`};

        setRequests(r => [...r, newRequest]);
        
        setTimeout(() => {
            setRequests(r => r.filter(req => req.id !== newId));
            setServiceMessage(newRequest);
        }, 1000);
        
        setTimeout(() => {
            setServiceMessage(null);
            const newResponse = { id: newId, content: `Result for #${newId}`};
            setResponses(r => [...r, newResponse]);
        }, 2500);

    }, [reqCounter]);
    
    const resetDemo = useCallback(() => {
        setRequests([]);
        setResponses([]);
        setServiceMessage(null);
        setReqCounter(0);
    }, []);

    return (
        <DemoContainer title="Simuler un appel Requête-Réponse." onReset={resetDemo}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Actor label="Client">
                    <button onClick={handleSendRequest} className="w-full bg-cyan-600 text-white text-sm py-2 rounded hover:bg-cyan-700">Envoyer Requête</button>
                    <h5 className="text-xs font-bold text-navy-300 mt-2">Réponses reçues:</h5>
                    {responses.map(r => <MessageItem key={r.id} content={r.content} className="bg-green-800" />)}
                </Actor>
                <Actor label="Request/Reply Queues">
                    <h5 className="text-xs font-bold text-navy-300">File de requêtes:</h5>
                    {requests.map(r => <MessageItem key={r.id} content={r.content} className="bg-purple-800" />)}
                </Actor>
                <Actor label="Service">
                    {serviceMessage && <MessageItem content={`Processing: ${serviceMessage.content}`} className="animate-pulse-fast" />}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default RequestReplyDemo;
