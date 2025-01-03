import { useOrders } from 'context/orders';
import CustomerSelection from './customerSelection';
import OrderAddressSelection from './addressSelection';


const OrderCustomerInfo = () => {

    const { mappedOrderData, setMappedOrderData } = useOrders();

    const onSelectCustomer = (data: any) => {
        setMappedOrderData((prev) => ({
            ...prev,
            customer: {
                selectedCustomer: data,
            }
        }))
    }

    if (!mappedOrderData.customer.selectedCustomer) {
        return <CustomerSelection onSelectCustomer={onSelectCustomer} />

    } else {
        return <OrderAddressSelection onSelectCustomer={onSelectCustomer} />
    }

}

export default OrderCustomerInfo;