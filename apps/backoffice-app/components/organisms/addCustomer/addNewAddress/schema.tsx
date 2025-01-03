import { IFormFieldMapper, ITranslateFunc } from 'types/global';

export const customerGeneralSchema = (
  translate: ITranslateFunc
): IFormFieldMapper[] => [
  {
    title: translate('customers.addressType'),
    field: 'addressType',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'select'
  },
  {
    title: translate('customers.streetNumber'),
    field: 'streetNumber',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    wrapperClass: 'w-[50%]',
    type: 'text'
  },
  {
    title: translate('customers.streetName'),
    field: 'streetName',
    description: { text: '', icon: '' },
    multiLocale: false,
    wrapperClass: 'w-[50%]',
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.building'),
    field: 'building',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.appartment'),
    field: 'appartment',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.poBox'),
    field: 'poBox',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.city'),
    field: 'city',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.postalCode'),
    field: 'postalCode',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.region'),
    field: 'region',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.state'),
    field: 'state',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.country'),
    field: 'country',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'select'
  },
  {
    title: translate('customers.state'),
    field: 'state',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.streetInfo'),
    field: 'streetInfo',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('customers.addressInfo'),
    field: 'addressInfo',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  }
];

export const companyInfoSchema = (translate: ITranslateFunc): IFormFieldMapper[] => [
  {
    title: translate('common.firstName'),
    field: 'firstname',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.lastName'),
    field: 'lastname',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
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
    title: translate('common.company'),
    field: 'company',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.dapartment'),
    field: 'dapartment',
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
    required: false,
    type: 'text'
  },
  {
    title: translate('common.phone'),
    field: 'email',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.mobile'),
    field: 'email',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.fax'),
    field: 'email',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  }
];
