import { IFormFieldMapper, ITranslateFunc } from "types/global";
import { getReturnShipmentStateOptions } from "utils/order";

export const generalformSchema = (translate: ITranslateFunc): IFormFieldMapper[] => [
    {
        title: translate("orders.returnTrackingId"),
        field: "trackingId",
        type: "text",
    },
    {
        title: translate("orders.returnDate"),
        field: "returnDate",
        type: "date_picker",
    },
    {
        title: translate("orders.shipmentState"),
        field: "shipmentState",
        type: "select",
        options: getReturnShipmentStateOptions(translate)
    },

]