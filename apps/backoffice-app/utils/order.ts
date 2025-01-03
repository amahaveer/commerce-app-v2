import { ITranslateFunc } from "types/global";

export const getOrderStatusOptions  = (translate: ITranslateFunc) => [
	{ value: "Open", label: translate("common.open") },
	{ value: "Confirmed", label: translate("common.confirmed") },
	{ value: "Completed", label: translate("common.completed") },
	{ value: "Cancelled", label: translate("common.cancelled") },
]

export const getPaymentStatusOptions  = (translate: ITranslateFunc) => [
	{ value: "Blanace Due", label: translate("common.blanaceDue") },
	{ value: "Pending", label: translate("common.pending") },
	{ value: "Credit Owed", label: translate("common.creditOwed") },
	{ value: "Failed", label: translate("common.failed") },
]

export const getShipmentStatusOptions  = (translate: ITranslateFunc) => [
	{ value: "Ready", label: translate("common.ready") },
	{ value: "Pending", label: translate("common.pending") },
	{ value: "Partial", label: translate("common.partial") },
	{ value: "Delayed", label: translate("common.delayed") },
	{ value: "Shipped", label: translate("common.shipped") },
]

/* INFO:  for orders -> return creating page */
export const getReturnShipmentStateOptions = (translate: ITranslateFunc) => [
	{ value: "Returned", label: translate("orders.returned") },
	{ value: "Advised", label: translate("orders.advised") },
]

/* INFO: for order -> returns listing page */
export const getShipmentStateOptions = (translate: ITranslateFunc) => [
	{ value: "Returned", label: translate("orders.returned") },
	{ value: "Back in stock", label: translate("orders.backInStock") },
	{ value: "Unusable", label: translate("orders.unsusable") },
]

export const getPaymentStateOptions  = (translate: ITranslateFunc) => [
	{ value: "Initial", label: translate("orders.initial") },
	{ value: "Refunded", label: translate("orders.refunded") },
	{ value: "Not refunded", label: translate("orders.notRefunded") },
]

export const getCustomerSearchOptions = (translate: ITranslateFunc) => [
	{ value: "Email address", label: translate("common.emailAddress") },
	{ value: "Customer number", label: translate("customers.customerNumber") },
	{ value: "Company name", label: translate("common.companyName") },
]

export const getAddressTitlePanelOptions = (params:any={}) => [
	{ 
		value: params.id, 
		label: `${params.firstName} ${params.lastName}`, 
		description: `${params.streetName} ${params.houseNumber}`, 
	},
]
