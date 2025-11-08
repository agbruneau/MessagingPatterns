
import React, { useState, useCallback, useRef } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const CqrsDemo: React.FC = () => {
    const [writeModel, setWriteModel] = useState<string[]>([]);
    const [readModel, setReadModel] = useState<string[]>([]);
    const [isSyncing, setIsSyncing] = useState<boolean>(false);
    const userCounter = useRef(0);

    const handleAddUser = useCallback(() => {
        userCounter.current += 1;
        const newUser = `User #${userCounter.current}`;
        
        // 1. Command is processed, write model is updated instantly.
        setWriteModel(wm => [...wm, newUser]);
        
        // 2. Start syncing to the read model (with a delay).
        setIsSyncing(true);
        setTimeout(() => {
            setReadModel(rm => [...rm, newUser]);
            setIsSyncing(false);
        }, 1500);

    }, []);

    const resetDemo = useCallback(() => {
        setWriteModel([]);
        setReadModel([]);
        setIsSyncing(false);
        userCounter.current = 0;
    }, []);

    return (
        <DemoContainer title="Simulate adding a user and observing eventual consistency." onReset={resetDemo}>
            <div className="mb-4">
                <button onClick={handleAddUser} className="w-full sm:w-auto bg-cyan-600 text-white text-sm py-2 px-4 rounded hover:bg-cyan-700">
                    Execute 'Add User' Command
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Actor label="Command Side">
                    <p className="text-xs text-navy-400">Commands are sent here.</p>
                </Actor>
                <Actor label="Write Model (Source of Truth)">
                    {writeModel.map(user => <MessageItem key={user} content={user} className="bg-rose-800" />)}
                </Actor>
                <Actor label="Read Model (Denormalized View)">
                    {readModel.map(user => <MessageItem key={user} content={user} className="bg-sky-800" />)}
                    {isSyncing && <MessageItem content="Syncing..." className="bg-purple-800 animate-pulse-fast" />}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default CqrsDemo;
