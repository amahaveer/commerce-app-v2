import { CustomerGroupReference, Reference } from "@commercetools/platform-sdk";
import { ClientType, CustomerGroup } from "@royalcyber/global-types";
import { Locale } from "../Locale";
import LocalizedValue from "../utils/LocalizedValue";


export class CustomerGroupMapper {
    static commercetoolsCustomerGroupToCustomerGroup = (
        commercetoolsCustomerGroup: CustomerGroupReference,
        clientType: ClientType,
        locale?: Locale,
        defaultLocale?: string,
    ): CustomerGroup | undefined => {
        if (commercetoolsCustomerGroup?.obj !== undefined) {
            return {
                id: commercetoolsCustomerGroup?.id,
                typeId: commercetoolsCustomerGroup?.typeId,
                version: commercetoolsCustomerGroup?.obj?.version,
                key: commercetoolsCustomerGroup?.obj?.key,
                name: commercetoolsCustomerGroup?.obj?.name,
                custom: commercetoolsCustomerGroup?.obj?.custom,
                createdAt: commercetoolsCustomerGroup?.obj?.createdAt,
                lastModifiedAt: commercetoolsCustomerGroup?.obj?.lastModifiedAt
            };
        }
        return undefined;
    }
}
 
