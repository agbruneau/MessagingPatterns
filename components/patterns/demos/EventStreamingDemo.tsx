
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const EventStreamingDemo: React.FC = () => {
    const [clicks, setClicks] = useState<string[]>([]);
    const [fraudAlerts, setFraudAlerts] = useState<string[]>([]);
    const clickCounter = useRef(0);
    const recentClicks = useRef<number[]>([]);

    const handleGenerateClick = useCallback(() => {
        clickCounter.current += 1;
        const newClick = `Click #${clickCounter.current}`;
        const timestamp = Date.now();
        
        setClicks(c => [newClick, ...c].slice(0, 5));

        // Fraud detection logic
        recentClicks.current.push(timestamp);
        recentClicks.current = recentClicks.current.filter(t => timestamp - t < 2000); // 2 second window
        if (recentClicks.current.length > 3) {
            setFraudAlerts(a => [`Fraud Alert: High click rate at ${new Date(timestamp).toLocaleTimeString()}`, ...a].slice(0, 3));
            recentClicks.current = []; // Reset after alert
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(handleGenerateClick, 500 + Math.random() * 500);
        return () => clearInterval(interval);
    }, [handleGenerateClick]);
    
    const resetDemo = useCallback(() => {
        setClicks([]);
        setFraudAlerts([]);
        clickCounter.current = 0;
        recentClicks.current = [];
    }, []);

    return (
        <DemoContainer title="Simulate processing a real-time stream of click events for fraud detection." onReset={resetDemo}>
            <div className="grid grid-cols-3 gap-4">
                <Actor label="Click Stream (Producer)">
                     {clicks.map(c => <MessageItem key={c} content={c} />)}
                </Actor>
                <Actor label="Stream Processor">
                    <p className="text-xs text-navy-400">Logic: Alert if > 3 clicks in 2s</p>
                </Actor>
                <Actor label="Alerts (Consumer)">
                    {fraudAlerts.map((a, i) => <MessageItem key={i} content={a} className="bg-red-800" />)}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default EventStreamingDemo;
