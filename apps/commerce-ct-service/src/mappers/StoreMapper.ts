import {
  Store as CommercetoolsStore,
  Channel as CommercetoolsChannel,
  ProductSelectionSetting,
  ProductSelection as CommercetoolsProductSelection,
} from '@commercetools/platform-sdk';
import {
  Channel,
  ClientType,
  Store,
  ProductSelection,
} from '@royalcyber/global-types';
import { AccountMapper } from './AccountMapper';
import { Locale } from '../Locale';

export class StoreMapper {
  static commercetoolsStoreToStore: (
    commercetoolsStore: CommercetoolsStore,
    clientType: ClientType,
    locale?: Locale,
  ) => Store = (
    commercetoolsStore: CommercetoolsStore,
    clientType: ClientType,
    locale?: Locale,
  ) => {
    return {
      id: commercetoolsStore.id,
      version: commercetoolsStore.version.toString(),
      key: commercetoolsStore.key,
      name:
        clientType === ClientType.WEB && locale
          ? commercetoolsStore.name?.[locale.language]
          : commercetoolsStore.name,
      languages: commercetoolsStore.languages,
      distributionChannels: commercetoolsStore.distributionChannels.map(
        (channel) => {
          return channel.obj
            ? StoreMapper.commercetoolsChannelToChannel(
                channel.obj,
                clientType,
                locale,
              )
            : channel.id;
        },
      ),
      countries: commercetoolsStore.countries.map((country) => country.code),
      supplyChannels: commercetoolsStore.supplyChannels.map((channel) => {
        return channel.obj
          ? StoreMapper.commercetoolsChannelToChannel(
              channel.obj,
              clientType,
              locale,
            )
          : channel.id;
      }),
      productSelections: commercetoolsStore.productSelections.map((selection) =>
        this.commercetoolsProductSelectionSettingToProductSelection(
          selection,
          clientType,
          locale,
        ),
      ),
      custom: commercetoolsStore.custom,
      createdAt: commercetoolsStore.createdAt,
      lastModifiedAt: commercetoolsStore.lastModifiedAt,
    } as Store;
  };

  static commercetoolsChannelToChannel: (
    commercetoolsChannel: CommercetoolsChannel,
    clientType: ClientType,
    locale?: Locale,
  ) => Channel = (
    commercetoolsChannel: CommercetoolsChannel,
    clientType: ClientType,
    locale?: Locale,
  ) => {
    const channel: Channel = {
      id: commercetoolsChannel.id,
      version: commercetoolsChannel.version.toString(),
      key: commercetoolsChannel.key,
      roles: commercetoolsChannel.roles,
      name:
        clientType === ClientType.WEB && locale
          ? commercetoolsChannel.name?.[locale.language]
          : commercetoolsChannel.name,
      description:
        clientType === ClientType.WEB && locale
          ? commercetoolsChannel.description?.[locale.language]
          : commercetoolsChannel.description,
      address: commercetoolsChannel.address
        ? AccountMapper.commercetoolsAddressToAddress(
            commercetoolsChannel.address,
          )
        : commercetoolsChannel.address,
      reviewRatingStatistics: commercetoolsChannel.reviewRatingStatistics,
      geoLocation: commercetoolsChannel.geoLocation,
      custom: commercetoolsChannel.custom,
      createdAt: commercetoolsChannel.createdAt,
      lastModifiedAt: commercetoolsChannel.lastModifiedAt,
    };

    return channel;
  };

  static commercetoolsProductSelectionSettingToProductSelection: (
    productSelectionSetting: ProductSelectionSetting,
    clientType: ClientType,
    locale?: Locale,
  ) => ProductSelection = (
    productSelectionSetting: ProductSelectionSetting,
    clientType: ClientType,
    locale?: Locale,
  ) => {
    const productSelection = productSelectionSetting.productSelection.obj
      ? StoreMapper.commercetoolsProductSelectionToProductSelection(
          productSelectionSetting.productSelection.obj,
          clientType,
          locale,
        )
      : { id: productSelectionSetting.productSelection.id };

    productSelection.active = productSelectionSetting.active;
    return productSelection;
  };

  static commercetoolsProductSelectionToProductSelection: (
    commercetoolsProductSelection: CommercetoolsProductSelection,
    clientType: ClientType,
    locale?: Locale,
  ) => ProductSelection = (
    commercetoolsProductSelection: CommercetoolsProductSelection,
    clientType: ClientType,
    locale?: Locale,
  ) => {
    const productSelection: ProductSelection = {
      id: commercetoolsProductSelection.id,
      version: commercetoolsProductSelection.version.toString(),
      key: commercetoolsProductSelection.key,
      name:
        clientType === ClientType.WEB && locale
          ? commercetoolsProductSelection.name[locale.language]
          : commercetoolsProductSelection.name,
      productCount: commercetoolsProductSelection.productCount,
      mode: commercetoolsProductSelection.mode,
      custom: commercetoolsProductSelection.custom,
      createdAt: commercetoolsProductSelection.createdAt,
      lastModifiedAt: commercetoolsProductSelection.lastModifiedAt,
    };
    return productSelection;
  };
}
