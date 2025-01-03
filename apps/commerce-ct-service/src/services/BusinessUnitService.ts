import {
  ApprovalFlowApproveAction,
  ApprovalFlowUpdateAction,
  ApprovalRuleUpdateAction,
  AssociateRoleAssignmentDraft,
  BusinessUnitDraft,
  BusinessUnitUpdateAction,
  ApprovalFlowRejectAction,
} from '@commercetools/platform-sdk';
import {
  BusinessUnit,
  BusinessUnitStatus,
  BusinessUnitType,
  StoreMode,
  Store,
  Account,
  AssociateRole,
  Address,
  ApprovalFlow,
  ApprovalFlowsQuery,
  ApprovalRule,
  PaginatedResult,
  ApprovalRuleQuery,
  StoreQuery,
  ActionContext,
  ClientType,
  Request,
} from '@royalcyber/global-types';
import BusinessUnitMapper from '../mappers/BusinessUnitMapper';
import { ExternalError } from '../errors/ExternalError';
import { businessUnitKeyFormatter } from '../utils/BussinessUnitFormatter';
import { BaseService } from './BaseService';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { AccountMapper } from '../mappers/AccountMapper';
import { Guid } from '../utils/Guid';
import { ProductMapper } from '../mappers/ProductMapper';
import { getOffsetFromCursor } from '../utils/Pagination';
import { getCurrency, getLocale } from '../utils/Request';
import { StoreService } from './StoreService';

const MAX_LIMIT = 50;

function getStoreService(request: Request, actionContext: ActionContext) {
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  const locale = getLocale(request);
  const currency = getCurrency(request);
  return new StoreService(actionContext.globalContext, locale, currency);
}

export default class BusinessUnitApi extends BaseService {
  async createForAccount(account: Account): Promise<BusinessUnit> {
    const businessUnitKey = businessUnitKeyFormatter(account.companyName || '');

    if (!account?.accountId) {
      throw new ResourceNotFoundError({ message: 'Account ID is missing.' });
    }

    const associateRoleAssignments = this.defaultAssociateRoleKeys.map(
      (associateRoleKey) => {
        const associateRoleAssignment: AssociateRoleAssignmentDraft = {
          associateRole: {
            typeId: 'associate-role',
            key: associateRoleKey,
          },
          inheritance: `Enabled`,
        };

        return associateRoleAssignment;
      },
    );

    const businessUnitDraft: BusinessUnitDraft = {
      key: businessUnitKey,
      name: account.companyName || '',
      status: BusinessUnitStatus.Active,
      // stores: [{ key: this.clientSettings.defaultStoreKey, typeId: 'store' }],
      storeMode: StoreMode.Explicit,
      unitType: BusinessUnitType.Company,
      contactEmail: account.email,
      associates: [
        {
          associateRoleAssignments,
          customer: {
            id: account.accountId,
            typeId: 'customer',
          },
        },
      ],
    };

    return this.associateRequestBuilder(account.accountId)
      .businessUnits()
      .post({
        body: businessUnitDraft,
      })
      .execute()
      .then((response) => {
        return BusinessUnitMapper.commercetoolsBusinessUnitToBusinessUnit(
          response.body,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async update(
    businessUnitKey: string,
    accountId: string,
    actions: BusinessUnitUpdateAction[],
  ): Promise<BusinessUnit> {
    return this.getByKey(businessUnitKey).then((businessUnit) => {
      if (typeof businessUnit.version === 'undefined') {
        throw new Error('BusinessUnit version is undefined');
      }

      return this.associateRequestBuilder(accountId)
        .businessUnits()
        .withKey({ key: businessUnitKey })
        .post({
          body: {
            version: businessUnit.version,
            actions,
          },
        })
        .execute()
        .then((response) =>
          BusinessUnitMapper.commercetoolsBusinessUnitToBusinessUnit(
            response.body,
          ),
        )
        .catch((error) => {
          throw new ExternalError({
            statusCode: error.code,
            message: error.message,
            body: error.body,
          });
        });
    });
  }

  async getByKey(businessUnitKey: string): Promise<BusinessUnit> {
    return this.requestBuilder()
      .businessUnits()
      .withKey({ key: businessUnitKey })
      .get()
      .execute()
      .then((response) => {
        return BusinessUnitMapper.commercetoolsBusinessUnitToBusinessUnit(
          response.body,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async createApprovalRule(
    accountId: string,
    businessUnitKey: string,
    approvalRuleDraft: ApprovalRule,
  ): Promise<ApprovalRule> {
    const approvalRule =
      BusinessUnitMapper.approvalRuleToCommercetoolsApprovalRule(
        approvalRuleDraft,
      );

    return this.associateRequestBuilder(accountId)
      .inBusinessUnitKeyWithBusinessUnitKeyValue({
        businessUnitKey: businessUnitKey,
      })
      .approvalRules()
      .post({
        body: approvalRule,
      })
      .execute()
      .then((response) => {
        return BusinessUnitMapper.commercetoolsApprovalRuleToApprovalRule(
          response.body,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getByKeyForAccount(
    businessUnitKey: string,
    accountId: string,
    expandStores?: boolean,
    clientType?: ClientType,
    request?: Request,
    actionContext?: ActionContext,
  ): Promise<BusinessUnit> {
    const expand = [
      'associates[*].customer',
      'inheritedAssociates[*].customer',
    ];
    const businessUnit = await this.associateRequestBuilder(accountId || '')
      .businessUnits()
      .withKey({ key: businessUnitKey })
      .get({
        queryArgs: {
          expand,
          limit: MAX_LIMIT,
        },
      })
      .execute()
      .then((response) => {
        return BusinessUnitMapper.commercetoolsBusinessUnitToBusinessUnit(
          response.body,
        );
      })
      .catch((error) => {
        if (error.code === 404) {
          throw new ResourceNotFoundError({
            message: `Business unit "${businessUnitKey}" not found for this account`,
          });
        }

        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    if (expandStores) {
      // The SDK doesn't return inherited stores, so we need to fetch them manually
      if (!businessUnit?.parentUnit?.key) {
        throw new ResourceNotFoundError({ message: 'Parent unit not found' });
      }
      if (businessUnit.storeMode === StoreMode.FromParent) {
        businessUnit.stores = await this.getBusinessUnitStoresFromParentUnitKey(
          businessUnit.parentUnit.key,
        );
      }
      if (!businessUnit.stores) {
        businessUnit.stores = [];
      }

      if (!request || !actionContext) {
        throw new Error(
          'Request and ActionContext are required to fetch store details',
        );
      }

      const storeApi = getStoreService(request, actionContext);

      const storeKeys = businessUnit?.stores
        ?.map((store) => `"${store.key}"`)
        .join(' ,');

      const storeQuery: StoreQuery = {
        name: storeKeys ? `key in (${storeKeys})` : undefined,
      };

      if (!clientType) {
        console.warn('clientType is not provided, defaulting to ClientType.BO');
        clientType = ClientType.BO;
      }

      const allStores = storeKeys
        ? (await storeApi.queryStores(storeQuery, clientType)).items
        : [];

      businessUnit.stores = BusinessUnitMapper.expandStores(
        businessUnit.stores,
        allStores,
      );
    }

    return businessUnit;
  }

  async getBusinessUnitsForUser(
    accountId: string,
    expandStores?: boolean,
    clientType?: ClientType,
    request?: Request,
    actionContext?: ActionContext,
  ): Promise<BusinessUnit[]> {
    const expand = [
      'associates[*].customer',
      'inheritedAssociates[*].customer',
    ];

    const businessUnits = await this.associateRequestBuilder(accountId)
      .businessUnits()
      .get({
        queryArgs: {
          expand,
          limit: MAX_LIMIT,
        },
      })
      .execute()
      .then((response) => {
        return response.body.results.map((commercetoolsBusinessUnit) => {
          return BusinessUnitMapper.commercetoolsBusinessUnitToBusinessUnit(
            commercetoolsBusinessUnit,
          );
        });
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    if (expandStores) {
      // The SDK doesn't return inherited stores, so we need to fetch them manually
      for (const businessUnit of businessUnits) {
        if (businessUnit.storeMode === StoreMode.FromParent) {
          if (!businessUnit?.parentUnit?.key) {
            throw new ResourceNotFoundError({
              message: 'Parent unit not found',
            });
          }
          businessUnit.stores =
            await this.getBusinessUnitStoresFromParentUnitKey(
              businessUnit.parentUnit.key,
            );
        }
      }

      if (!request || !actionContext) {
        throw new Error(
          'Request and ActionContext are required to fetch store details',
        );
      }

      const storeApi = getStoreService(request, actionContext);

      if (!clientType) {
        console.warn('clientType is not provided, defaulting to ClientType.BO');
        clientType = ClientType.BO;
      }

      const storeKeys = businessUnits
        .reduce((prev: Store[], curr) => {
          prev = prev.concat(curr.stores || []);
          return prev;
        }, [])
        ?.map((store) => `"${store.key}"`)
        .join(' ,');

      const storeQuery: StoreQuery = {
        name: storeKeys ? `key in (${storeKeys})` : undefined,
      };

      const allStores = storeKeys
        ? (await storeApi.queryStores(storeQuery, clientType)).items
        : [];

      businessUnits.map((businessUnit) => {
        if (!businessUnit.stores) {
          businessUnit.stores = [];
        }
        businessUnit.stores = BusinessUnitMapper.expandStores(
          businessUnit.stores,
          allStores,
        );
      });
    }

    return businessUnits;
  }

  async getAssociateRoles(): Promise<AssociateRole[]> {
    return this.getCommercetoolsAssociatesRoles()
      .then((associateRoles) => {
        return associateRoles
          .filter((associateRole) => associateRole.buyerAssignable)
          .map((associateRole) =>
            BusinessUnitMapper.commercetoolsAssociateRoleToAssociateRole(
              associateRole,
            ),
          );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async updateBusinessUnit(
    requestData: BusinessUnit,
    accountId: string,
  ): Promise<BusinessUnit> {
    let businessUnit = requestData;
    const updateActions: Array<BusinessUnitUpdateAction> = [];

    if (requestData.name) {
      updateActions.push({
        action: 'changeName',
        name: requestData.name,
      });
    }
    if (requestData.contactEmail) {
      updateActions.push({
        action: 'setContactEmail',
        contactEmail: requestData.contactEmail,
      });
    }
    if (!requestData.key) {
      throw new ResourceNotFoundError({
        message: 'Business unit key is missing.',
      });
    }
    if (updateActions.length > 0) {
      businessUnit = await this.update(
        requestData.key,
        accountId,
        updateActions,
      );
    }

    return businessUnit;
  }

  async updateBusinessUnitAddress(
    businessUnitKey: string,
    accountId: string,
    address: Address,
  ) {
    let commercetoolsAddress =
      AccountMapper.addressToCommercetoolsAddress(address);

    const businessUnitUpdateAction: BusinessUnitUpdateAction[] = [];

    if (
      commercetoolsAddress.key === undefined &&
      (address.isDefaultBillingAddress || address.isDefaultShippingAddress)
    ) {
      commercetoolsAddress = {
        ...commercetoolsAddress,
        key: Guid.newGuid(),
      };
    }

    businessUnitUpdateAction.push({
      action: 'changeAddress',
      addressId: commercetoolsAddress.id,
      address: commercetoolsAddress,
    });

    const addressIdentifiers = commercetoolsAddress.key
      ? { addressKey: commercetoolsAddress.key }
      : { addressId: commercetoolsAddress.id };

    address.isDefaultBillingAddress
      ? businessUnitUpdateAction.push({
          action: 'setDefaultBillingAddress',
          ...addressIdentifiers,
        })
      : businessUnitUpdateAction.push({
          action: 'removeBillingAddressId',
          ...addressIdentifiers,
        });

    address.isDefaultShippingAddress
      ? businessUnitUpdateAction.push({
          action: 'setDefaultShippingAddress',
          ...addressIdentifiers,
        })
      : businessUnitUpdateAction.push({
          action: 'removeShippingAddressId',
          ...addressIdentifiers,
        });

    return await this.update(
      businessUnitKey,
      accountId,
      businessUnitUpdateAction,
    );
  }

  async addBusinessUnitAddress(
    businessUnitKey: string,
    accountId: string,
    address: Address,
  ) {
    let commercetoolsAddress =
      AccountMapper.addressToCommercetoolsAddress(address);

    const businessUnitUpdateAction: BusinessUnitUpdateAction[] = [];

    // For new address, remove the id as CoCo will set it
    if (commercetoolsAddress.id !== undefined) {
      commercetoolsAddress = {
        ...commercetoolsAddress,
        id: undefined,
      };
    }

    if (commercetoolsAddress.key === undefined) {
      commercetoolsAddress = {
        ...commercetoolsAddress,
        key: Guid.newGuid(),
      };
    }

    businessUnitUpdateAction.push({
      action: 'addAddress',
      address: commercetoolsAddress,
    });

    if (address.isDefaultBillingAddress) {
      businessUnitUpdateAction.push({
        action: 'setDefaultBillingAddress',
        addressKey: commercetoolsAddress.key,
      });
    }

    if (address.isDefaultShippingAddress) {
      businessUnitUpdateAction.push({
        action: 'setDefaultShippingAddress',
        addressKey: commercetoolsAddress.key,
      });
    }

    return await this.update(
      businessUnitKey,
      accountId,
      businessUnitUpdateAction,
    );
  }

  async removeBusinessUnitAddress(
    businessUnitKey: string,
    accountId: string,
    addressId: string,
  ) {
    return await this.update(businessUnitKey, accountId, [
      {
        action: 'removeAddress',
        addressId,
      },
    ]);
  }

  async getAssociate(businessUnitKey: string, accountId: string) {
    const businessUnit = await this.getByKeyForAccount(
      businessUnitKey,
      accountId,
    );

    // Get associate from business unit
    const associate = businessUnit.associates?.find(
      (associate) => associate.accountId === accountId,
    );

    const commercetoolsAssociateRoles =
      await this.getCommercetoolsAssociatesRoles();

    // Include permissions in the associate roles
    if (!associate) {
      throw new ResourceNotFoundError({ message: 'Associate not found' });
    }
    associate.roles = associate?.roles?.map((associateRole) => {
      const commercetoolsAssociateRole = commercetoolsAssociateRoles.find(
        (commercetoolsAssociateRole) =>
          commercetoolsAssociateRole.key === associateRole.key,
      );
      if (!commercetoolsAssociateRole) {
        throw new ResourceNotFoundError({
          message: 'Associate role not found',
        });
      }
      return {
        ...associateRole,
        permissions: BusinessUnitMapper.commercetoolsPermissionsToPermissions(
          commercetoolsAssociateRole.permissions,
        ),
      };
    });

    return associate;
  }

  async updateAssociate(
    businessUnitKey: string,
    accountId: string,
    associateId: string,
    associateRoleKeys: string[],
  ) {
    return await this.update(businessUnitKey, accountId, [
      {
        action: 'changeAssociate',
        associate: {
          customer: {
            typeId: 'customer',
            id: associateId,
          },
          associateRoleAssignments: associateRoleKeys.map((roleKey) => ({
            associateRole: {
              typeId: 'associate-role',
              key: roleKey,
            },
          })),
        },
      },
    ]);
  }

  async removeAssociate(
    businessUnitKey: string,
    accountId: string,
    associateAccountId: string,
  ) {
    return await this.update(businessUnitKey, accountId, [
      {
        action: 'removeAssociate',
        customer: {
          typeId: 'customer',
          id: associateAccountId,
        },
      },
    ]);
  }

  async addAssociate(
    businessUnitKey: string,
    accountId: string,
    associateId: string,
    associateRoleKeys: string[],
  ) {
    return await this.update(businessUnitKey, accountId, [
      {
        action: 'addAssociate',
        associate: {
          customer: {
            typeId: 'customer',
            id: associateId,
          },
          associateRoleAssignments: associateRoleKeys.map((roleKey) => ({
            associateRole: {
              typeId: 'associate-role',
              key: roleKey,
            },
          })),
        },
      },
    ]);
  }

  protected async getBusinessUnitStoresFromParentUnitKey(
    parentUnitKey: string,
  ): Promise<Store[]> {
    const businessUnit = await this.getByKey(parentUnitKey);

    if (!businessUnit) {
      throw new ResourceNotFoundError({
        message: 'Parent business unit not found',
      });
    }

    if (!businessUnit.stores || !businessUnit?.parentUnit?.key) {
      throw new ResourceNotFoundError({
        message: 'Parent business unit stores or parent unit key not found',
      });
    }

    if (businessUnit.storeMode === StoreMode.Explicit) {
      return businessUnit.stores;
    }

    return this.getBusinessUnitStoresFromParentUnitKey(
      businessUnit.parentUnit.key,
    );
  }

  async queryApprovalRules(
    businessUnitKey: string,
    accountId: string,
    approvalRuleQuery: ApprovalRuleQuery,
  ): Promise<PaginatedResult<ApprovalRule>> {
    if (!approvalRuleQuery.limit || !approvalRuleQuery.cursor) {
      throw new ResourceNotFoundError({
        message: 'ApprovalRuleQuery limit or cursor not found.',
      });
    }
    const limit = +approvalRuleQuery.limit || undefined;
    const sortAttributes: string[] = [];

    if (approvalRuleQuery.sortAttributes !== undefined) {
      Object.keys(approvalRuleQuery.sortAttributes).map(
        (field, directionIndex) => {
          sortAttributes.push(
            `${field} ${Object.values(approvalRuleQuery.sortAttributes)[directionIndex]}`,
          );
        },
      );
    } else {
      // default sort
      sortAttributes.push(`lastModifiedAt desc`);
    }

    const whereClause = [];

    if (
      approvalRuleQuery.approvalRuleIds !== undefined &&
      approvalRuleQuery.approvalRuleIds.length !== 0
    ) {
      whereClause.push(
        `id in ("${approvalRuleQuery.approvalRuleIds.join('","')}")`,
      );
    }

    if (
      approvalRuleQuery.approvalRuleStatus !== undefined &&
      approvalRuleQuery.approvalRuleStatus.length > 0
    ) {
      whereClause.push(
        `status in ("${approvalRuleQuery.approvalRuleStatus.join('","')}")`,
      );
    }

    return this.associateRequestBuilder(accountId)
      .inBusinessUnitKeyWithBusinessUnitKeyValue({ businessUnitKey })
      .approvalRules()
      .get({
        queryArgs: {
          where: whereClause,
          limit: limit,
          offset: getOffsetFromCursor(approvalRuleQuery.cursor),
          sort: sortAttributes,
        },
      })
      .execute()
      .then((response) => {
        const approvalRules = response.body.results.map((approvalRule) =>
          BusinessUnitMapper.commercetoolsApprovalRuleToApprovalRule(
            approvalRule,
          ),
        );

        if (!response?.body?.total) {
          throw new ResourceNotFoundError({ message: 'Total is undefined.' });
        }

        const result: PaginatedResult<ApprovalRule> = {
          total: response.body.total,
          items: approvalRules,
          count: response.body.count,
          previousCursor: ProductMapper.calculatePreviousCursor(
            response.body.offset,
            response.body.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.body.offset,
            response.body.count,
            response.body.total,
          ),
        };
        return result;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getApprovalRuleById(
    accountId: string,
    businessUnitKey: string,
    approvalRuleId: string,
  ): Promise<ApprovalRule> {
    return this.associateRequestBuilder(accountId)
      .inBusinessUnitKeyWithBusinessUnitKeyValue({ businessUnitKey })
      .approvalRules()
      .withId({ ID: approvalRuleId })
      .get()
      .execute()
      .then((response) => {
        return BusinessUnitMapper.commercetoolsApprovalRuleToApprovalRule(
          response.body,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async updateApprovalRule(
    approvalRuleRequest: ApprovalRule,
    accountId: string,
    businessUnitKey: string,
  ): Promise<ApprovalRule> {
    const updateActions: Array<ApprovalRuleUpdateAction> = [];

    if (approvalRuleRequest.name) {
      updateActions.push({
        action: 'setName',
        name: approvalRuleRequest.name,
      });
    }

    if (approvalRuleRequest.approvalRuleStatus) {
      updateActions.push({
        action: 'setStatus',
        status: approvalRuleRequest.approvalRuleStatus,
      });
    }

    if (approvalRuleRequest.description) {
      updateActions.push({
        action: 'setDescription',
        description: approvalRuleRequest.description,
      });
    }

    if (approvalRuleRequest.key) {
      updateActions.push({
        action: 'setKey',
        key: approvalRuleRequest.key,
      });
    }

    if (approvalRuleRequest.predicate) {
      updateActions.push({
        action: 'setPredicate',
        predicate: approvalRuleRequest.predicate,
      });
    }

    if (approvalRuleRequest.approvers) {
      updateActions.push({
        action: 'setApprovers',
        approvers:
          BusinessUnitMapper.approvalRuleApproverToCommercetoolsApprovalRuleApprover(
            approvalRuleRequest.approvers,
          ),
      });
    }

    if (approvalRuleRequest.requesters) {
      updateActions.push({
        action: 'setRequesters',
        requesters:
          BusinessUnitMapper.approvalRuleRequesterToCommercetoolsRuleRequester(
            approvalRuleRequest.requesters,
          ),
      });
    }

    if (updateActions.length === 0) {
      // There is nothing to be updated
      return approvalRuleRequest;
    }

    if (!approvalRuleRequest.approvalRuleId) {
      throw new ResourceNotFoundError({
        message: 'Approval rule id not found',
      });
    }

    return this.getApprovalRuleById(
      accountId,
      businessUnitKey,
      approvalRuleRequest.approvalRuleId,
    ).then((approvalRule) => {
      // Add the if statement here
      if (!approvalRule.approvalRuleVersion || !approvalRule.approvalRuleId) {
        throw new ResourceNotFoundError({
          message: 'Approval rule version or ID missing.',
        });
      }

      // Continue with the next operations
      return this.associateRequestBuilder(accountId)
        .inBusinessUnitKeyWithBusinessUnitKeyValue({ businessUnitKey })
        .approvalRules()
        .withId({ ID: approvalRule.approvalRuleId })
        .post({
          body: {
            version: approvalRule.approvalRuleVersion,
            actions: updateActions,
          },
        })
        .execute()
        .then((response) => {
          return BusinessUnitMapper.commercetoolsApprovalRuleToApprovalRule(
            response.body,
          );
        })
        .catch((error) => {
          throw new ExternalError({
            statusCode: error.code,
            message: error.message,
            body: error.body,
          });
        });
    });
  }

  async queryApprovalFlows(
    businessUnitKey: string,
    accountId: string,
    approvalRuleQuery: ApprovalFlowsQuery,
    clientType: ClientType,
  ): Promise<PaginatedResult<ApprovalFlow>> {
    if (!approvalRuleQuery.limit || !approvalRuleQuery.cursor) {
      throw new ResourceNotFoundError({
        message: 'ApprovalRuleQuery limit or cursor not found.',
      });
    }
    const limit = +approvalRuleQuery.limit || undefined;
    const sortAttributes: string[] = [];
    const locale = await this.getCommercetoolsLocal(clientType);

    if (approvalRuleQuery.sortAttributes !== undefined) {
      Object.keys(approvalRuleQuery.sortAttributes).map(
        (field, directionIndex) => {
          sortAttributes.push(
            `${field} ${Object.values(approvalRuleQuery.sortAttributes)[directionIndex]}`,
          );
        },
      );
    } else {
      // default sort
      sortAttributes.push(`lastModifiedAt desc`);
    }

    const whereClause = [];

    if (
      approvalRuleQuery.approvalFlowIds !== undefined &&
      approvalRuleQuery.approvalFlowIds.length !== 0
    ) {
      whereClause.push(
        `id in ("${approvalRuleQuery.approvalFlowIds.join('","')}")`,
      );
    }

    if (
      approvalRuleQuery.approvalFlowStatus !== undefined &&
      approvalRuleQuery.approvalFlowStatus.length > 0
    ) {
      whereClause.push(
        `status in ("${approvalRuleQuery.approvalFlowStatus.join('","')}")`,
      );
    }

    return this.associateRequestBuilder(accountId)
      .inBusinessUnitKeyWithBusinessUnitKeyValue({ businessUnitKey })
      .approvalFlows()
      .get({
        queryArgs: {
          where: whereClause,
          limit: limit,
          offset: getOffsetFromCursor(approvalRuleQuery.cursor),
          sort: sortAttributes,
        },
      })
      .execute()
      .then((response) => {
        const commercetoolsApprovalFlows = response.body.results.map(
          (approvalFlow) =>
            BusinessUnitMapper.commercetoolsApprovalFlowToApprovalFlow(
              approvalFlow,
              locale,
              clientType,
            ),
        );

        if (!response?.body?.total) {
          throw new ResourceNotFoundError({ message: 'Total is undefined.' });
        }

        const result: PaginatedResult<ApprovalFlow> = {
          total: response.body.total,
          items: commercetoolsApprovalFlows,
          count: response.body.count,
          previousCursor: ProductMapper.calculatePreviousCursor(
            response.body.offset,
            response.body.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.body.offset,
            response.body.count,
            response.body.total,
          ),
        };

        return result;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getApprovalFlowById(
    accountId: string,
    businessUnitKey: string,
    approvalFlowId: string,
    clientType: ClientType,
  ): Promise<ApprovalFlow> {
    const locale = await this.getCommercetoolsLocal(clientType);
    return this.associateRequestBuilder(accountId)
      .inBusinessUnitKeyWithBusinessUnitKeyValue({ businessUnitKey })
      .approvalFlows()
      .withId({ ID: approvalFlowId })
      .get()
      .execute()
      .then((response) => {
        return BusinessUnitMapper.commercetoolsApprovalFlowToApprovalFlow(
          response.body,
          locale,
          clientType,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async updateApprovalFlow(
    businessUnitKey: string,
    accountId: string,
    actions: ApprovalFlowUpdateAction[],
    approvalFlowId: string,
    clientType: ClientType,
  ): Promise<ApprovalFlow> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return this.getApprovalFlowById(
      accountId,
      businessUnitKey,
      approvalFlowId,
      clientType,
    ).then((approvalRule) => {
      // Check if approvalFlowVersion is not defined
      if (!approvalRule.approvalFlowVersion) {
        throw new Error('Approval flow version is missing.');
      }

      // Continue with the subsequent operations
      return this.associateRequestBuilder(accountId)
        .inBusinessUnitKeyWithBusinessUnitKeyValue({ businessUnitKey })
        .approvalFlows()
        .withId({ ID: approvalRule.approvalFlowId })
        .post({
          body: {
            version: approvalRule.approvalFlowVersion,
            actions,
          },
        })
        .execute()
        .then((response) => {
          return BusinessUnitMapper.commercetoolsApprovalFlowToApprovalFlow(
            response.body,
            locale,
            clientType,
          );
        })
        .catch((error) => {
          throw new ExternalError({
            statusCode: error.code,
            message: error.message,
            body: error.body,
          });
        });
    });
  }

  async approveApprovalFlow(
    businessUnitKey: string,
    accountId: string,
    approvalFlowId: string,
    clientType: ClientType,
  ): Promise<ApprovalFlow> {
    const approveAction: ApprovalFlowApproveAction = {
      action: 'approve',
    };

    return this.updateApprovalFlow(
      businessUnitKey,
      accountId,
      [approveAction],
      approvalFlowId,
      clientType,
    );
  }

  async rejectApprovalFlow(
    businessUnitKey: string,
    accountId: string,
    approvalFlowId: string,
    reason?: string,
    clientType?: ClientType,
  ): Promise<ApprovalFlow> {
    const rejectAction: ApprovalFlowRejectAction = {
      action: 'reject',
      reason: reason,
    };

    return this.updateApprovalFlow(
      businessUnitKey,
      accountId,
      [rejectAction],
      approvalFlowId,
      clientType as NonNullable<ClientType>,
    );
  }
}
