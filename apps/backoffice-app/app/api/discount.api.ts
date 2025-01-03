export const getDiscountCartData = (): any[] => {
    return [
        {
            id: 'row-1',
            name: 'Discount 1',
            key: 'discount-1',
            active: true,
            amount: '10%',
            type: 'Percentage',
            target: 'Cart total',
            stores: ['Store A', 'Store B'],
            validFrom: '2023-01-01',
            validUntil: '2023-12-31'
        },
        {
            id: 'row-2',
            name: 'Discount 2',
            key: 'discount-2',
            active: false,
            amount: '15%',
            type: 'Percentage',
            target: 'Category',
            stores: ['Store C'],
            validFrom: '2023-05-01',
            validUntil: '2023-09-30'
        },
        {
            id: 'row-3',
            name: 'Discount 3',
            key: 'discount-3',
            active: true,
            amount: '$20',
            type: 'Fixed amount',
            target: 'Products',
            stores: ['Store D', 'Store E'],
            validFrom: '2023-03-01',
            validUntil: '2023-06-30'
        }
    ];
};