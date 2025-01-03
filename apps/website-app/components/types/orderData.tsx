export interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export interface OrderData {
    invoiceId: string;
    orderDate: string;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    items: OrderItem[];
    paymentMethod: string;
    shippingCost: number;
    discount: number;
    totalAmount: number;
}
