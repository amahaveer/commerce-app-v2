'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useLanguage } from "./language.context";
import { IExposeOrders, IMappedOrderData } from "types/orders.type";
import { getOrderDetails, getOrders } from "app/api/orders.api";
import { useStepper } from "./stepper";
import { eToolbarButtonActions } from "@/components/molecules/SaveToolBar/type";
import { useRouter } from 'next/navigation';
import { initialMapOrderValues } from "constants/orders.constant";

export const OrderContext = createContext<IExposeOrders>({
	orders: [],
	orderDetails: {},
	mappedOrderData: initialMapOrderValues,
	setMappedOrderData: () => {},
	onToolbarAction: () => {}
});

export const OrdersProvider = ({ children, orderId }: any) => {

	const { locale } = useLanguage()
	const { onNext, onBack } = useStepper();
	const router = useRouter();
	const [orders, setOrders] = useState([]);
	const [orderDetails, setOrderDetails] = useState({});
	const [mappedOrderData, setMappedOrderData] = useState<IMappedOrderData>(initialMapOrderValues);
	
	useEffect(() => {
		if (orderId) {
			getOrderDetailsById()
		} else {
			getOrdersHandler()
		}
	}, [])

	const getOrderDetailsById = async () => {
		try {
			const data = await getOrderDetails({ params: orderId });
			setOrderDetails(data);
		} catch (error) {
			console.log('ERROR::', error);
		}
	}

	const getOrdersHandler = async () => {
		try {
			const data: any = await getOrders();
			setOrders(data.results)
		} catch (error) {
			console.log("ERROR::", error);
		}
	}

	const onClickCancel = () => {
		router.push("/products");
	}

	const onClickAddOrder = () => {

	}

	const onToolbarAction = (actionType: eToolbarButtonActions) => {
		const actions = {
			cancel: onClickCancel,
			save: onClickAddOrder,
			next: onNext,
			back: onBack,
		};
		actions[actionType]?.();
	};

	const expose: IExposeOrders = {
		orders,
		orderDetails,
		mappedOrderData,
		onToolbarAction,
		setMappedOrderData
	}

	return (
		<OrderContext.Provider value={expose}>
			{children}
		</OrderContext.Provider>
	);
}

export const useOrders = () => {
	const context = useContext(OrderContext);

	if (context === undefined) {
		throw new Error("Component Must be used within a Orders Provider");
	}

	return context;
}