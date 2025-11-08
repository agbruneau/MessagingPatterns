
import React, { useState, useCallback } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const EventBusDemo: React.FC = () => {
    const [busEvents, setBusEvents] = useState<string[]>([]);
    const [notificationLog, setNotificationLog] = useState<string[]>([]);
    const [auditLog, setAuditLog] = useState<string[]>([]);
    const [userCounter, setUserCounter] = useState(0);

    const handleCreateUser = useCallback(() => {
        const newUserEvent = `UserCreated: user_${userCounter + 1}`;
        setUserCounter(c => c + 1);
        
        // Publish to bus
        setBusEvents(e => [newUserEvent, ...e].slice(0, 3));

        // Subscribers react
        setTimeout(() => {
            setNotificationLog(l => [`Sent welcome email for ${newUserEvent.split(':')[1]}`, ...l].slice(0, 2));
            setAuditLog(l => [`Logged event: ${newUserEvent}`, ...l].slice(0, 2));
        }, 500);

    }, [userCounter]);
    
    const resetDemo = useCallback(() => {
        setBusEvents([]);
        setNotificationLog([]);
        setAuditLog([]);
        setUserCounter(0);
    }, []);

    return (
        <DemoContainer title="Simuler la publication d'un événement sur un bus central." onReset={resetDemo}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Actor label="User Service">
                     <button onClick={handleCreateUser} className="w-full bg-cyan-600 text-white text-sm py-2 rounded hover:bg-cyan-700">Créer un Utilisateur</button>
                </Actor>
                <Actor label="Event Bus">
                    {busEvents.map((e, i) => <MessageItem key={i} content={e} className="bg-purple-800" />)}
                </Actor>
                <Actor label="Notification Service">
                     {notificationLog.map((l, i) => <MessageItem key={i} content={l} className="bg-green-800" />)}
                </Actor>
                <Actor label="Audit Service">
                     {auditLog.map((l, i) => <MessageItem key={i} content={l} className="bg-sky-800" />)}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default EventBusDemo;
