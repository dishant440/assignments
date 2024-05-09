import React, { useState, useMemo } from 'react';

export const Assignment3 = () => {
    const [items, setItems] = useState([
        { name: 'Chocolates', value: 10 },
        { name: 'Chips', value: 20 },
        { name: 'Onion', value: 30 },
        { name: 'Tomato', value: 100 },
        // Add more items as needed
    ]);

    // Calculate total value using useMemo
    const totalValue = useMemo(() => {
        let total = 0;
        for (const item of items) {
            total += item.value;
        }
        return total;
    }, [items]);

    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Price: ${item.value}</li>
                ))}
            </ul>
            <p>Total Value: ${totalValue}</p>
        </div>
    );
};
