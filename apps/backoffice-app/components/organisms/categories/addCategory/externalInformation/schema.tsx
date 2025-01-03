import { IFormFieldMapper, ITranslateFunc } from 'types/global';
import InfoIcon from '@mui/icons-material/Info';

export const categoryExternalInformationSchema = (
  translate: ITranslateFunc
): IFormFieldMapper[] => [
  {
    title: translate('categories.categoryExternalInfromationURL'),
    field: 'title',
    description: {
      text: translate('categories.categoryExternalInfromationUrlDesc'),
      icon: ''
    },
    multiLocale: true,
    required: true,
    type: 'text'
  },
  {
    title: translate('categories.categoryExternalInfromationMetaTitle'),
    field: 'customerName',
    description: {
      text: translate('categories.categoryExternalInfromationMetaTitleDesc'),
      icon: ''
    },
    multiLocale: false,
    required: false,
    type: 'text'
  },
  {
    title: translate('categories.categoryExternalInfromationMeta'),
    field: 'middlename',
    description: {
      text: translate('categories.categoryExternalInfromationMetaDescription'),
      icon: ''
    },
    multiLocale: false,
    required: false,
    type: 'text'
  }
];
