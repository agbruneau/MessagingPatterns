
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const ConsumerGroupsDemo: React.FC = () => {
    const [stream, setStream] = useState<{id: number; partition: number}[]>([]);
    const [groupA, setGroupA] = useState<{c1: string[], c2: string[]}>({c1: [], c2: []});
    const [groupB, setGroupB] = useState<string[]>([]);
    const counter = useRef(0);

    const generateEvent = useCallback(() => {
        counter.current++;
        const newEvent = { id: counter.current, partition: counter.current % 2 };
        setStream(s => [newEvent, ...s].slice(0, 5));

        // Distribute to consumers
        setTimeout(() => {
            // Group A (competing)
            if (newEvent.partition === 0) {
                setGroupA(g => ({ ...g, c1: [`Event #${newEvent.id}`, ...g.c1].slice(0, 3)}));
            } else {
                setGroupA(g => ({ ...g, c2: [`Event #${newEvent.id}`, ...g.c2].slice(0, 3)}));
            }
            // Group B (gets all)
            setGroupB(g => [`Event #${newEvent.id}`, ...g].slice(0, 3));
        }, 500);

    }, []);

    useEffect(() => {
        const interval = setInterval(generateEvent, 1500);
        return () => clearInterval(interval);
    }, [generateEvent]);

    const resetDemo = useCallback(() => {
        setStream([]);
        setGroupA({c1: [], c2: []});
        setGroupB([]);
        counter.current = 0;
    }, []);

    return (
        <DemoContainer title="Simuler un flux d'événements traité par plusieurs groupes de consommateurs." onReset={resetDemo}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Actor label="Stream (avec 2 partitions)">
                    {stream.map(e => <MessageItem key={e.id} content={`Event #${e.id} (P${e.partition})`} className={e.partition === 0 ? 'bg-cyan-800' : 'bg-purple-800'} />)}
                </Actor>
                <div className="md:col-span-2">
                    <Actor label="Groupe de Consommateurs A (Analytics)">
                        <div className="grid grid-cols-2 gap-2">
                             <div>
                                 <h5 className="text-xs text-center font-bold text-navy-300">Consumer A-1 (P0)</h5>
                                {groupA.c1.map((e,i) => <MessageItem key={i} content={e} className="bg-green-800" />)}
                             </div>
                             <div>
                                <h5 className="text-xs text-center font-bold text-navy-300">Consumer A-2 (P1)</h5>
                                {groupA.c2.map((e,i) => <MessageItem key={i} content={e} className="bg-green-800" />)}
                             </div>
                        </div>
                    </Actor>
                </div>
                 <Actor label="Groupe de Consommateurs B (Archive)">
                    {groupB.map((e,i) => <MessageItem key={i} content={e} className="bg-sky-800" />)}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default ConsumerGroupsDemo;
