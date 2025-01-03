import { IFormFieldMapper, ITranslateFunc } from 'types/global';
import InfoIcon from '@mui/icons-material/Info';

export const categoryGeneralInformationSchema = (
  translate: ITranslateFunc
): IFormFieldMapper[] => [
  {
    title: translate('categories.generalInformationName'),
    field: 'salutation',
    description: {
      text: translate('categories.generalInformationNameCategoryName'),
      icon: ''
    },
    multiLocale: true,
    required: true,
    type: 'text'
  },
  {
    title: translate('categories.generalInformationDescription'),
    field: 'title',
    description: {
      text: translate('categories.generalInformationNameDescription'),
      icon: ''
    },
    multiLocale: true,
    required: false,
    type: 'text'
  },
  {
    title: translate('categories.generalInformationKey'),
    field: 'customerName',
    description: {
      text: translate('categories.generalInformationNameCategoryKey'),
      icon: ''
    },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('categories.generalInformationExternalID'),
    field: 'middlename',
    description: {
      text: '',
      icon: ''
    },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('categories.generalInformationOrderHint'),
    field: 'middlename',
    description: {
      text: translate('categories.generalInformationNameDescription'),
      icon: 'InfoIcon'
    },
    multiLocale: false,
    required: true,
    type: 'text'
  }
];

export const companyInfoSchema = (
  translate: ITranslateFunc
): IFormFieldMapper[] => [
  {
    title: translate('common.companyName'),
    field: 'compnayName',
    description: { text: '', icon: '' },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('common.vat'),
    field: 'vatId',
    description: { text: '', icon: '' },
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
