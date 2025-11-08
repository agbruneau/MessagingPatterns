
import React, { useState, useCallback } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const OrchestrationDemo: React.FC = () => {
    const [orchestratorLog, setOrchestratorLog] = useState<string[]>([]);
    const [paymentStatus, setPaymentStatus] = useState('Idle');
    const [stockStatus, setStockStatus] = useState('Idle');
    const [shippingStatus, setShippingStatus] = useState('Idle');

    const handleStartProcess = useCallback(() => {
        resetDemo();
        let log: string[] = [];
        
        // 1. Call Payment Service
        setTimeout(() => {
            log = [...log, 'Calling Payment Service...']; setOrchestratorLog([...log]);
            setPaymentStatus('Processing...');
        }, 500);
        setTimeout(() => {
            log = [...log, 'Payment OK.']; setOrchestratorLog([...log]);
            setPaymentStatus('Success');
        }, 1500);

        // 2. Call Stock Service
        setTimeout(() => {
            log = [...log, 'Calling Stock Service...']; setOrchestratorLog([...log]);
            setStockStatus('Checking...');
        }, 2000);
        setTimeout(() => {
            log = [...log, 'Stock OK.']; setOrchestratorLog([...log]);
            setStockStatus('Reserved');
        }, 3000);
        
        // 3. Call Shipping Service
        setTimeout(() => {
            log = [...log, 'Calling Shipping Service...']; setOrchestratorLog([...log]);
            setShippingStatus('Preparing...');
        }, 3500);
         setTimeout(() => {
            log = [...log, 'Process Complete.']; setOrchestratorLog([...log]);
            setShippingStatus('Shipped');
        }, 4500);
    }, []);
    
    const resetDemo = useCallback(() => {
        setOrchestratorLog([]);
        setPaymentStatus('Idle');
        setStockStatus('Idle');
        setShippingStatus('Idle');
    }, []);

    return (
        <DemoContainer title="Simulate an orchestrated booking process." onReset={resetDemo}>
             <div className="mb-4">
                <button onClick={handleStartProcess} className="w-full sm:w-auto bg-cyan-600 text-white text-sm py-2 px-4 rounded hover:bg-cyan-700">Start Process</button>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Actor label="Orchestrator">
                    {orchestratorLog.map((l, i) => <MessageItem key={i} content={l} className="bg-rose-800" />)}
                </Actor>
                <Actor label="Payment Service">
                    <MessageItem content={`Status: ${paymentStatus}`} className={paymentStatus === 'Success' ? 'bg-green-800' : ''} />
                </Actor>
                <Actor label="Stock Service">
                    <MessageItem content={`Status: ${stockStatus}`} className={stockStatus === 'Reserved' ? 'bg-green-800' : ''} />
                </Actor>
                <Actor label="Shipping Service">
                    <MessageItem content={`Status: ${shippingStatus}`} className={shippingStatus === 'Shipped' ? 'bg-green-800' : ''} />
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default OrchestrationDemo;
