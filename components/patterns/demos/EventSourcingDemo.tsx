
import React, { useState, useCallback } from 'react';
import { DemoContainer, Actor, MessageItem } from './DemoComponents';

type CartEvent = { type: 'ADDED_ITEM'; item: string } | { type: 'REMOVED_ITEM'; item: string };
type CartState = { items: string[] };

const EventSourcingDemo: React.FC = () => {
    const [events, setEvents] = useState<CartEvent[]>([]);
    const [cartState, setCartState] = useState<CartState>({ items: [] });
    const [itemCounter, setItemCounter] = useState(0);

    const applyEvent = (state: CartState, event: CartEvent): CartState => {
        switch (event.type) {
            case 'ADDED_ITEM': return { ...state, items: [...state.items, event.item] };
            case 'REMOVED_ITEM': return { ...state, items: state.items.filter(i => i !== event.item) };
            default: return state;
        }
    };
    
    const addEvent = useCallback((event: CartEvent) => {
        const newEvents = [...events, event];
        setEvents(newEvents);
        // Rebuild state from all events
        const newState = newEvents.reduce(applyEvent, { items: [] });
        setCartState(newState);
    }, [events]);

    const handleAddItem = useCallback(() => {
        const newItem = `Item #${itemCounter + 1}`;
        setItemCounter(c => c + 1);
        addEvent({ type: 'ADDED_ITEM', item: newItem });
    }, [addEvent, itemCounter]);
    
    const resetDemo = useCallback(() => {
        setEvents([]);
        setCartState({ items: [] });
        setItemCounter(0);
    }, []);

    return (
        <DemoContainer title="Simulate adding events to build up application state." onReset={resetDemo}>
            <div className="grid grid-cols-3 gap-4">
                <Actor label="Actions">
                    <button onClick={handleAddItem} className="w-full bg-cyan-600 text-white text-sm py-2 rounded hover:bg-cyan-700">Add Item to Cart</button>
                </Actor>
                <Actor label="Event Store (Log)">
                    {events.map((e, i) => <MessageItem key={i} content={`${e.type}: ${e.item}`} className="bg-purple-800" />)}
                </Actor>
                <Actor label="Projected State (Cart)">
                    <div className="text-sm p-2 rounded bg-navy-700">
                        <pre><code>{JSON.stringify(cartState, null, 2)}</code></pre>
                    </div>
                </Actor>
            </div>
        </DemoContainer>
    );
};

export default EventSourcingDemo;
