import OrdersComponent from "@/components/organisms/orders";
import { OrdersProvider } from "context/orders";
import { PermissionsProvider } from "context/permissions.context";


const OrderPage = () => {

    return (
        <PermissionsProvider moduleName="orders">
            <OrdersProvider>
                <OrdersComponent />
            </OrdersProvider>
        </PermissionsProvider>
    )
}

export default OrderPage;