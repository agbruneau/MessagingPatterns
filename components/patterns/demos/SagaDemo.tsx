
import React, { useState, useCallback, useRef } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

type Status = 'Pending' | 'Success' | 'Compensating' | 'Failed';

const SagaDemo: React.FC = () => {
    const [order, setOrder] = useState<Status>('Pending');
    const [payment, setPayment] = useState<Status>('Pending');
    const [shipping, setShipping] = useState<Status>('Pending');
    const [failPayment, setFailPayment] = useState(false);
    const timeoutIds = useRef<number[]>([]);

    const clearTimeouts = () => {
        timeoutIds.current.forEach(clearTimeout);
        timeoutIds.current = [];
    };

    const resetDemo = useCallback(() => {
        clearTimeouts();
        setOrder('Pending');
        setPayment('Pending');
        setShipping('Pending');
    }, []);

    const startSaga = useCallback(() => {
        resetDemo();

        const run = (fn: () => void, delay: number) => {
            timeoutIds.current.push(window.setTimeout(fn, delay));
        };
        
        // 1. Order Service
        setOrder('Success');
        
        // 2. Payment Service
        run(() => {
            if (failPayment) {
                setPayment('Failed');
                // 2a. Start compensation
                run(() => {
                    setOrder('Compensating');
                }, 1000);
                run(() => {
                    setOrder('Failed');
                }, 2000);
            } else {
                setPayment('Success');
                // 3. Shipping Service
                run(() => {
                    setShipping('Success');
                }, 1000);
            }
        }, 1000);

    }, [failPayment, resetDemo]);
    
    const getStatusColor = (status: Status) => {
        switch(status) {
            case 'Success': return 'bg-green-800';
            case 'Failed': return 'bg-red-800';
            case 'Compensating': return 'bg-yellow-800 animate-pulse-fast';
            default: return '';
        }
    }

    return (
        <DemoContainer title="Simuler une Saga de réservation avec compensation d'échec." onReset={resetDemo}>
             <div className="flex flex-wrap gap-4 mb-4 items-center">
                <button onClick={startSaga} className="bg-cyan-600 text-white text-sm py-2 px-4 rounded hover:bg-cyan-700">Démarrer la Saga</button>
                 <label className="flex items-center space-x-2 text-sm text-navy-200">
                    <input type="checkbox" checked={failPayment} onChange={() => setFailPayment(f => !f)} className="h-4 w-4 rounded bg-navy-900 border-navy-600 text-cyan-500 focus:ring-cyan-600"/>
                    <span>Simuler l'échec du paiement</span>
                </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Actor label="Service de Commande">
                    <MessageItem content={`Statut: ${order}`} className={getStatusColor(order)} />
                </Actor>
                <Actor label="Service de Paiement">
                    <MessageItem content={`Statut: ${payment}`} className={getStatusColor(payment)} />
                </Actor>
                 <Actor label="Service d'Expédition">
                    <MessageItem content={`Statut: ${shipping}`} className={getStatusColor(shipping)} />
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default SagaDemo;
