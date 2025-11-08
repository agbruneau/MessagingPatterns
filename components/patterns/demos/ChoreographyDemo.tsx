
import React, { useState, useCallback } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

const ChoreographyDemo: React.FC = () => {
    const [orderStatus, setOrderStatus] = useState('Pending');
    const [paymentStatus, setPaymentStatus] = useState('Pending');
    const [shippingStatus, setShippingStatus] = useState('Pending');
    const [events, setEvents] = useState<string[]>([]);

    const handlePlaceOrder = useCallback(() => {
        resetDemo();
        // 1. Order Service creates order and publishes event
        setTimeout(() => {
            setOrderStatus('Created');
            setEvents(e => [...e, 'OrderPlaced']);
        }, 500);

        // 2. Payment Service reacts to OrderPlaced
        setTimeout(() => {
            setPaymentStatus('Processing');
        }, 1000);
        setTimeout(() => {
            setPaymentStatus('Success');
            setEvents(e => [...e, 'PaymentSuccessful']);
        }, 2000);
        
        // 3. Shipping Service reacts to PaymentSuccessful
        setTimeout(() => {
            setShippingStatus('Preparing');
        }, 2500);
         setTimeout(() => {
            setShippingStatus('Shipped');
            setEvents(e => [...e, 'OrderShipped']);
        }, 3500);
    }, []);
    
    const resetDemo = useCallback(() => {
        setOrderStatus('Pending');
        setPaymentStatus('Pending');
        setShippingStatus('Pending');
        setEvents([]);
    }, []);

    return (
        <DemoContainer title="Simulate a choreographed order fulfillment process." onReset={resetDemo}>
             <div className="mb-4">
                <button onClick={handlePlaceOrder} className="w-full sm:w-auto bg-cyan-600 text-white text-sm py-2 px-4 rounded hover:bg-cyan-700">Place New Order</button>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Actor label="Order Service">
                    <MessageItem content={`Status: ${orderStatus}`} className={orderStatus === 'Created' ? 'bg-green-800' : ''} />
                </Actor>
                <Actor label="Payment Service">
                    <MessageItem content={`Status: ${paymentStatus}`} className={paymentStatus === 'Success' ? 'bg-green-800' : ''} />
                </Actor>
                <Actor label="Shipping Service">
                    <MessageItem content={`Status: ${shippingStatus}`} className={shippingStatus === 'Shipped' ? 'bg-green-800' : ''} />
                </Actor>
                <Actor label="Event Bus">
                    {events.map((e, i) => <MessageItem key={i} content={e} className="bg-purple-800" />)}
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default ChoreographyDemo;
