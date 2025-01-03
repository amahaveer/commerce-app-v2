import { IFormFieldMapper, ITranslateFunc } from 'types/global';

export const customerGeneralSchema = (
  translate: ITranslateFunc
): IFormFieldMapper[] => [
  {
    title: translate('customers.salutation'),
    field: 'salutation',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.title'),
    field: 'title',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.firstName'),
    field: 'customerName',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.middleName'),
    field: 'middlename',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.lastName'),
    field: 'customerLastName',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.email'),
    field: 'email',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: true,
    type: 'text'
  },
  {
    title: translate('customers.customerKey'),
    field: 'customerkey',
    description: { text: translate('customers.customerKeyDetails'), icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.locale'),
    field: 'locale',
    description: { text: '', icon: '' },
    multiLocale: false,
    options: [{ label: 'Default', value: 'select..' }],
    required: false,
    type: 'select'
  },
  {
    title: translate('customers.dob'),
    field: 'dob',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.customerNumber'),
    field: 'customerNumber',
    info: translate('customers.fieldUpdates'),
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.externalID'),
    field: 'externalId',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('product.customerGroup'),
    field: 'customerGroup',
    options: [{ label: 'Default', value: 'select..' }],
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'select'
  },
  {
    title: translate('customers.acRestrictionTitle'),
    field: 'accountRestriction',
    info: translate('customers.accountRestriction'),
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  }
];

export const companyInfoSchema = (
  translate: ITranslateFunc
): IFormFieldMapper[] => [
  {
    title: translate('common.companyName'),
    field: 'compnayName',
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.vat'),
    field: 'vatId',
    multiLocale: false,
    required: false,
    type: 'text'
  }
];

// customer password and confirm password
export const customerSecuritySchema = (
  translate: ITranslateFunc
): IFormFieldMapper[] => [
  {
    title: translate('common.customerPassword'),
    field: 'customerPassword',
    info: translate('customers.passwordInfo'),
    description: { text: '', icon: '' },
    multiLocale: false,
    required: true,
    type: 'password'
  },
  {
    title: translate('common.confirmPassword'),
    field: 'confirmPassword',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: true,
    type: 'password'
  }
];
