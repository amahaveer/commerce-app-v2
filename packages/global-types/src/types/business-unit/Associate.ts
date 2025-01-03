import { Account } from '../account';

export type Permission =
  | 'AcceptMyQuotes'
  | 'AcceptOthersQuotes'
  | 'AddChildUnits'
  | 'CreateApprovalRules'
  | 'CreateMyCarts'
  | 'CreateMyOrdersFromMyCarts'
  | 'CreateMyOrdersFromMyQuotes'
  | 'CreateMyQuoteRequestsFromMyCarts'
  | 'CreateOrdersFromOthersCarts'
  | 'CreateOrdersFromOthersQuotes'
  | 'CreateOthersCarts'
  | 'CreateQuoteRequestsFromOthersCarts'
  | 'DeclineMyQuotes'
  | 'DeclineOthersQuotes'
  | 'DeleteMyCarts'
  | 'DeleteOthersCarts'
  | 'ReassignMyQuotes'
  | 'ReassignOthersQuotes'
  | 'RenegotiateMyQuotes'
  | 'RenegotiateOthersQuotes'
  | 'UpdateApprovalFlows'
  | 'UpdateApprovalRules'
  | 'UpdateAssociates'
  | 'UpdateBusinessUnitDetails'
  | 'UpdateMyCarts'
  | 'UpdateMyOrders'
  | 'UpdateMyQuoteRequests'
  | 'UpdateOthersCarts'
  | 'UpdateOthersOrders'
  | 'UpdateOthersQuoteRequests'
  | 'UpdateParentUnit'
  | 'ViewMyCarts'
  | 'ViewMyOrders'
  | 'ViewMyQuoteRequests'
  | 'ViewMyQuotes'
  | 'ViewOthersCarts'
  | 'ViewOthersOrders'
  | 'ViewOthersQuoteRequests'
  | 'ViewOthersQuotes';

export interface AssociateRole {
  key?: string;
  id?: string;
  name?: string;
  version?: number;
  permissions?: Permission[];
}

export interface Associate extends Account {
  roles?: AssociateRole[];
}
