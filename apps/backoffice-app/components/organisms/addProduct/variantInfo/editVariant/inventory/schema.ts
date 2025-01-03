import { IFormFieldMapper, ITranslateFunc } from 'types/global';

export const addInventorySchema = (
  translate: ITranslateFunc
): IFormFieldMapper[] => [
  {
    title: translate('product.inventoryKey'),
    field: 'inventory_key',
    description: {
      text: translate('product.uniqueInventoryIdentifier'),
      icon: ''
    },
    type: 'text'
  },
  {
    title: translate('common.channel'),
    field: 'channelName',
    description: {
      text: translate('product.referenceToWarehouseOrSupplierChannel'),
      icon: ''
    },
    options: [],
    type: 'select'
  },
  {
    title: translate('common.quantity'),
    field: 'quantity',
    description: {
      text: translate('product.referenceToWarehouseOrSupplierChannel'),
      icon: ''
    },
    type: 'number',
    required: true
  },
  {
    title: translate('product.averageRestockPeriodDays'),
    field: 'restockDateRange',
    description: {
      text: translate('product.averageNumberOfDaysForRestock'),
      icon: ''
    },
    type: 'number',
    required: true
  },
  {
    title: translate('product.averageRestockPeriodDays'),
    field: 'averageRestockPeriodDays',
    description: {
      text: translate('product.averageNumberOfDaysForRestock'),
      icon: ''
    },
    type: 'date_range',
    required: true
  }
];
