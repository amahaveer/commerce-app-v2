import {
  ApprovalRule as CommercetoolsApprovalRule,
  ApprovalRuleStatus as CommercetoolsApprovalRuleStatus,
  ApproverHierarchy as CommercetoolsApproverHierarchy,
  Associate as CommercetoolsAssociate,
  AssociateRole as CommercetoolsAssociateRole,
  AssociateRoleKeyReference as CommercetoolsAssociateRoleKeyReference,
  BusinessUnit as CommercetoolsBusinessUnit,
  BusinessUnitKeyReference as CommercetoolsBusinessUnitKeyReference,
  InheritedAssociate as CommercetoolsInheritedAssociate,
  Permission as CommercetoolsPermission,
  RuleRequester as CommercetoolsRuleRequester,
  StoreKeyReference as CommercetoolsStoreKeyReference,
  ApprovalFlow as CommercetoolsApprovalFlow,
  OrderReference as CommercetoolsOrderReference,
  ApprovalRuleDraft as CommerceToolsApprovalRuleDraft,
} from '@commercetools/platform-sdk';
import {
  BusinessUnit,
  Store,
  Associate,
  AssociateRole,
  Permission,
  ApprovalFlow,
  ApprovalFlowStatus,
  ApprovalRule,
  ApprovalRuleStatus,
  ApproverHierarchy,
  Order,
  ClientType,
} from '@royalcyber/global-types';
import { AccountMapper } from './AccountMapper';
import { ValidationError } from '../errors/ValidationError';
import { CartMapper } from './CartMapper';
import { Locale } from '../Locale';

export default class BusinessUnitMapper {
  static commercetoolsBusinessUnitToBusinessUnit(
    commercetoolsBusinessUnit: CommercetoolsBusinessUnit,
  ): BusinessUnit {
    return {
      businessUnitId: commercetoolsBusinessUnit.id,
      key: commercetoolsBusinessUnit.key,
      name: commercetoolsBusinessUnit.name,
      status: commercetoolsBusinessUnit.status,
      stores: commercetoolsBusinessUnit.stores?.map(
        (commercetoolsStoreKeyReference) => {
          return this.commercetoolsStoreKeyReferencesToStore(
            commercetoolsStoreKeyReference,
          );
        },
      ),
      storeMode: commercetoolsBusinessUnit.storeMode,
      unitType: commercetoolsBusinessUnit.unitType,
      contactEmail: commercetoolsBusinessUnit.contactEmail,
      addresses: AccountMapper.commercetoolsAddressesToAddresses(
        commercetoolsBusinessUnit.addresses,
        commercetoolsBusinessUnit.defaultBillingAddressId,
        commercetoolsBusinessUnit.defaultShippingAddressId,
        commercetoolsBusinessUnit.billingAddressIds,
        commercetoolsBusinessUnit.shippingAddressIds,
      ),
      defaultShippingAddressId:
        commercetoolsBusinessUnit.defaultShippingAddressId,
      defaultBillingAddressId:
        commercetoolsBusinessUnit.defaultBillingAddressId,
      associates: this.commercetoolsAssociatesToAssociate(
        commercetoolsBusinessUnit.associates,
        commercetoolsBusinessUnit.inheritedAssociates,
      ),
      parentUnit: commercetoolsBusinessUnit.parentUnit
        ? this.commercetoolsBusinessUnitKeyReferenceToBusinessUnit(
            commercetoolsBusinessUnit.parentUnit,
          )
        : undefined,
      topLevelUnit: commercetoolsBusinessUnit.topLevelUnit
        ? this.commercetoolsBusinessUnitKeyReferenceToBusinessUnit(
            commercetoolsBusinessUnit.topLevelUnit,
          )
        : undefined,
      version: commercetoolsBusinessUnit.version,
    };
  }

  static commercetoolsBusinessUnitKeyReferenceToBusinessUnit(
    commercetoolsBusinessUnitKeyReference: CommercetoolsBusinessUnitKeyReference,
  ): BusinessUnit {
    return {
      key: commercetoolsBusinessUnitKeyReference.key,
    };
  }

  static commercetoolsAssociatesToAssociate(
    commercetoolsAssociates: CommercetoolsAssociate[],
    commercetoolsInheritedAssociates?: CommercetoolsInheritedAssociate[],
  ): Associate[] {
    const associates: Associate[] = [];

    commercetoolsAssociates
      .filter(
        (commercetoolsAssociate) =>
          commercetoolsAssociate.customer?.obj !== undefined,
      )
      .map((commercetoolsAssociate) => {
        const customerObj = commercetoolsAssociate.customer!.obj!;
        const associate: Associate =
          AccountMapper.commercetoolsCustomerToAccount(customerObj);

        associate.roles = commercetoolsAssociate.associateRoleAssignments?.map(
          (commercetoolsAssociateRoleAssigment) => {
            return this.commercetoolsAssociateRoleKeyReferenceToAssociateRole(
              commercetoolsAssociateRoleAssigment.associateRole,
            );
          },
        );

        associates.push(associate);
      });

    if (commercetoolsInheritedAssociates !== undefined) {
      commercetoolsInheritedAssociates
        .filter(
          (commercetoolsInheritedAssociate) =>
            commercetoolsInheritedAssociate.customer?.obj,
        )
        .map((commercetoolsInheritedAssociate) => {
          const customerObj = commercetoolsInheritedAssociate.customer!.obj!;
          const associate: Associate =
            AccountMapper.commercetoolsCustomerToAccount(customerObj);

          associate.roles =
            commercetoolsInheritedAssociate.associateRoleAssignments?.map(
              (commercetoolsAssociateRoleAssigment) => {
                return this.commercetoolsAssociateRoleKeyReferenceToAssociateRole(
                  commercetoolsAssociateRoleAssigment.associateRole,
                );
              },
            );

          associates.push(associate);
        });
    }

    return associates;
  }

  static commercetoolsAssociateRoleKeyReferenceToAssociateRole(
    commercetoolsAssociateRoleKeyReference: CommercetoolsAssociateRoleKeyReference,
  ): AssociateRole {
    return {
      key: commercetoolsAssociateRoleKeyReference.key,
    };
  }

  static expandStores(stores: Store[], allStores: Store[]): Store[] {
    return stores?.map((store) => {
      const storeObj = allStores.find((s) => s.key === store.key);
      return storeObj
        ? {
            name: storeObj.name,
            key: storeObj.key,
            typeId: 'store',
            storeId: storeObj.id,
            distributionChannels: storeObj?.distributionChannels,
            supplyChannels: storeObj?.supplyChannels,
          }
        : (store as Store);
    });
  }

  static commercetoolsStoreKeyReferencesToStore(
    commercetoolsStoreKeyReference: CommercetoolsStoreKeyReference,
  ): Store {
    return {
      key: commercetoolsStoreKeyReference.key,
    };
  }

  static commercetoolsAssociateRoleToAssociateRole(
    associateRole: CommercetoolsAssociateRole,
  ): AssociateRole {
    return {
      key: associateRole.key,
      name: associateRole.name,
      permissions: this.commercetoolsPermissionsToPermissions(
        associateRole.permissions,
      ),
    };
  }

  static commercetoolsAssociateRoleReferenceToAssociateRole(
    associateRole: CommercetoolsAssociateRole,
  ): AssociateRole {
    return {
      key: associateRole.key,
      name: associateRole.name,
      permissions: this.commercetoolsPermissionsToPermissions(
        associateRole.permissions,
      ),
    };
  }

  static commercetoolsPermissionsToPermissions(
    commercetoolsPermissions: CommercetoolsPermission[],
  ): Permission[] {
    const permissions: Permission[] = [];

    commercetoolsPermissions.forEach((commercetoolsPermission) => {
      switch (commercetoolsPermission) {
        case 'AcceptMyQuotes':
        case 'AcceptOthersQuotes':
        case 'AddChildUnits':
        case 'CreateApprovalRules':
        case 'CreateMyCarts':
        case 'CreateMyOrdersFromMyCarts':
        case 'CreateMyOrdersFromMyQuotes':
        case 'CreateMyQuoteRequestsFromMyCarts':
        case 'CreateOrdersFromOthersCarts':
        case 'CreateOrdersFromOthersQuotes':
        case 'CreateOthersCarts':
        case 'CreateQuoteRequestsFromOthersCarts':
        case 'DeclineMyQuotes':
        case 'DeclineOthersQuotes':
        case 'DeleteMyCarts':
        case 'DeleteOthersCarts':
        case 'ReassignMyQuotes':
        case 'ReassignOthersQuotes':
        case 'RenegotiateMyQuotes':
        case 'RenegotiateOthersQuotes':
        case 'UpdateApprovalFlows':
        case 'UpdateApprovalRules':
        case 'UpdateAssociates':
        case 'UpdateBusinessUnitDetails':
        case 'UpdateMyCarts':
        case 'UpdateMyOrders':
        case 'UpdateMyQuoteRequests':
        case 'UpdateOthersCarts':
        case 'UpdateOthersOrders':
        case 'UpdateOthersQuoteRequests':
        case 'UpdateParentUnit':
        case 'ViewMyCarts':
        case 'ViewMyOrders':
        case 'ViewMyQuoteRequests':
        case 'ViewMyQuotes':
        case 'ViewOthersCarts':
        case 'ViewOthersOrders':
        case 'ViewOthersQuoteRequests':
        case 'ViewOthersQuotes':
          return permissions.push(commercetoolsPermission);
        default:
          throw new ValidationError({ message: 'Invalid permission' });
      }
    });

    return permissions;
  }

  static commercetoolsApprovalRuleToApprovalRule(
    response: CommercetoolsApprovalRule,
  ): ApprovalRule {
    return {
      key: response.key,
      approvalRuleVersion: response.version,
      approvalRuleId: response.id,
      approvers: this.commercetoolsApprovalRuleApproverToApprover(
        response.approvers,
      ),
      name: response.name,
      approvalRuleStatus: this.commercetoolsApprovalRuleStatusToStatus(
        response.status,
      ),
      description: response.description,
      predicate: response.predicate,
      requesters: this.commercetoolsRuleRequesterToApprovalRuleRequester(
        response.requesters,
      ),
    };
  }

  static approvalRuleToCommercetoolsApprovalRule(
    approvalRuleDraft: ApprovalRule,
  ): CommerceToolsApprovalRuleDraft {
    return {
      key: approvalRuleDraft.key,
      name: approvalRuleDraft.name,
      status: approvalRuleDraft.approvalRuleStatus ?? '',
      approvers:
        BusinessUnitMapper.approvalRuleApproverToCommercetoolsApprovalRuleApprover(
          approvalRuleDraft.approvers,
        ),
      predicate: approvalRuleDraft.predicate,
      requesters:
        BusinessUnitMapper.approvalRuleRequesterToCommercetoolsRuleRequester(
          approvalRuleDraft.requesters,
        ),
      description: approvalRuleDraft.description,
    };
  }

  private static commercetoolsApprovalRuleStatusToStatus(
    status: CommercetoolsApprovalRuleStatus,
  ): ApprovalRuleStatus {
    switch (status) {
      case 'Active':
        return 'Active';
      case 'Inactive':
        return 'Inactive';
      default:
        throw new ValidationError({
          message: 'Approval rule status permission',
        });
    }
  }

  private static commercetoolsRuleRequesterToApprovalRuleRequester(
    requesters: CommercetoolsRuleRequester[],
  ): AssociateRole[] {
    return requesters.map((requester) => {
      return {
        key: requester.associateRole.key,
        typeId: requester.associateRole.typeId,
      };
    });
  }

  private static commercetoolsApprovalRuleApproverToApprover(
    approvers: CommercetoolsApproverHierarchy,
  ): ApproverHierarchy {
    return {
      tiers: approvers.tiers.map((tier) => ({
        and: tier.and.map((conjunction) => ({
          or: conjunction.or.map((approver) => ({
            key: approver.associateRole.key,
            typeId: approver.associateRole.typeId,
          })),
        })),
      })),
    };
  }

  static approvalRuleApproverToCommercetoolsApprovalRuleApprover(
    approvers: ApproverHierarchy,
  ): CommercetoolsApproverHierarchy {
    return {
      tiers: approvers.tiers.map((tier) => ({
        and: tier.and.map((conjunction) => ({
          or: conjunction.or.map((approver) => {
            if (!approver.key) {
              throw new Error('Approver key is required.');
            }
            return {
              associateRole: {
                typeId: 'associate-role',
                key: approver.key,
              },
            };
          }),
        })),
      })),
    };
  }

  static approvalRuleRequesterToCommercetoolsRuleRequester(
    requesters: AssociateRole[],
  ): CommercetoolsRuleRequester[] {
    return requesters.map((requester) => {
      if (!requester.key) {
        throw new Error('Requester key is required.');
      }
      return {
        associateRole: {
          typeId: 'associate-role',
          key: requester.key,
        },
      };
    });
  }

  static commercetoolsApprovalFlowToApprovalFlow(
    commercetoolsApprovalFlow: CommercetoolsApprovalFlow,
    locale: Locale,
    clientType: ClientType
  ): ApprovalFlow {
    return {
      approvalFlowId: commercetoolsApprovalFlow.id,
      approvalFlowVersion: commercetoolsApprovalFlow.version,
      order: {
        typeId: 'order',
        id: commercetoolsApprovalFlow.order.id,
        ...this.commercetoolsOrderReferenceToOrder(
          commercetoolsApprovalFlow.order,
          locale,
          clientType,
        ),
      },
      businessUnitKey: commercetoolsApprovalFlow.businessUnit.key,
      approvalRules: commercetoolsApprovalFlow.rules.map(
        (commercetoolsRule) => {
          return this.commercetoolsApprovalRuleToApprovalRule(
            commercetoolsRule,
          );
        },
      ),
      approvalFlowStatus: this.commercetoolsApprovalFlowStatusToApprovalStatus(
        commercetoolsApprovalFlow.status,
      ),
      approvalFlowRejection: commercetoolsApprovalFlow.rejection
        ? {
            rejecter: this.commercetoolsAssociateToAssociate(
              commercetoolsApprovalFlow.rejection.rejecter,
            ),
            rejectedAt: new Date(
              commercetoolsApprovalFlow.rejection.rejectedAt,
            ),
            reason: commercetoolsApprovalFlow.rejection.reason ?? undefined,
          }
        : undefined,
      approvalFlowApprovals: commercetoolsApprovalFlow.approvals.map(
        (approval) => {
          return {
            approver: this.commercetoolsAssociateToAssociate(approval.approver),
            approvedAt: new Date(approval.approvedAt),
          };
        },
      ),
      eligibleApprovers: commercetoolsApprovalFlow.eligibleApprovers.map(
        (commercetoolsRuleApprover) => {
          return this.commercetoolsAssociateRoleKeyReferenceToAssociateRole(
            commercetoolsRuleApprover.associateRole,
          );
        },
      ),
      pendingApprovers: commercetoolsApprovalFlow.pendingApprovers.map(
        (commercetoolsPendingApprover) => {
          return this.commercetoolsAssociateRoleKeyReferenceToAssociateRole(
            commercetoolsPendingApprover.associateRole,
          );
        },
      ),
      currentTierPendingApprovers:
        commercetoolsApprovalFlow.currentTierPendingApprovers.map(
          (commercetoolsCurrentTierPendingApprovers) => {
            return this.commercetoolsAssociateRoleKeyReferenceToAssociateRole(
              commercetoolsCurrentTierPendingApprovers.associateRole,
            );
          },
        ),
    };
  }

  static commercetoolsOrderReferenceToOrder(
    order: CommercetoolsOrderReference,
    locale: Locale,
    clientType: ClientType,
  ): Order {
    if (!order?.obj) {
      throw new Error(
        'Invalid commercetoolsOrderReference: order object is missing',
      );
    }

    const mappedOrder = CartMapper.commercetoolsOrderToOrder(
      order.obj,
      clientType,
      locale,
      '',
    );

    return {
      ...mappedOrder,
      cartId: order.id,
    };
  }

  static commercetoolsAssociateToAssociate(
    commercetoolsAssociate: CommercetoolsAssociate,
  ): Associate {
    if (!commercetoolsAssociate.customer?.obj) {
      throw new Error(
        'Invalid commercetoolsAssociate: customer object is missing',
      );
    }

    const associate: Associate = AccountMapper.commercetoolsCustomerToAccount(
      commercetoolsAssociate.customer.obj,
    );

    associate.roles =
      commercetoolsAssociate.associateRoleAssignments?.map(
        (commercetoolsAssociateRoleAssignment) => {
          return this.commercetoolsAssociateRoleKeyReferenceToAssociateRole(
            commercetoolsAssociateRoleAssignment.associateRole,
          );
        },
      ) || [];

    return associate;
  }

  private static commercetoolsApprovalFlowStatusToApprovalStatus(
    status: CommercetoolsApprovalRuleStatus,
  ): ApprovalFlowStatus {
    switch (status) {
      case 'Pending':
        return 'Pending';
      case 'Approved':
        return 'Approved';
      case 'Rejected':
        return 'Rejected';
      default:
        throw new ValidationError({
          message: 'Approval rule status does not exist',
        });
    }
  }
}
